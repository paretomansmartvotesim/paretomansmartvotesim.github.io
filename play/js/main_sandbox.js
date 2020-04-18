
// Search for HOWTO to see notes on making changes. (right now, just for renaming menus)

function main(preset) {


    var s = new Sandbox(preset.modelName)
    var l = new Loader()
    
    // CONFIGURE
    s.url = window.location.href;
    l.onload = s.update // this might look like an update but we're configuring Loader

    // INIT
	s.setConfig(preset.config)
	if (preset.update) preset.update(s)
    
    // UPDATE
    l.load(s.assets);
}

function Sandbox(modelName) {
	var self = this

    // Big update: Added pattern to the code: LOAD, CREATE, CONFIGURE, INIT, & UPDATE. LOAD loads the input or defaults.  CREATE makes an empty data structure to be used.  CONFIGURE adds all the input to the data structure.  INIT completes the data structure by doing steps that needed to use the data structure as input, and is otherwise similar to CONFIGURE.  UPDATE runs the actions, now that the data structure is complete.

    // Basic description of main_sandbox.js
    // First we load the config,
    // Then we update the model and menu.
    // Then wait for mouse events.

    // switch
    var tryNewURL = true

    // LOAD DEFAULTS and INPUT
    var all_candidate_names = Object.keys(Candidate.graphicsByIcon["Default"]) // helper
    var yes_all_candidates = {}
    for (var i = 0; i < all_candidate_names.length; i++) {
        yes_all_candidates[i] = true
    }
    var defaults = {
        configversion:2.5,
        sandboxsave: false,
        hidegearconfig: false,
        description: "",
        keyyee: "newcan",
        snowman: false, // section
        x_voters: false,
        oneVoter: false,
        system: "FPTP", // section
        rbsystem: "Tideman",
        seats: 3,
        numOfCandidates: 3,
        customNames: "No",
        namelist: "",
        numVoterGroups: 1,
        xNumVoterGroups: 4,
        nVoterGroupsRealName: "One Group",
        spread_factor_voters: 1,
        arena_size: 300,
        median_mean: 1,
        theme: "Default",
        utility_shape: "linear",
        votersAsCandidates: false,
        visSingleBallotsOnly: false,
        ballotVis: true,
        stepMenu: "geom",
        menuVersion: "1",
        menuLevel: "normal",
        dimensions: "2D",
        nDistricts: 1,
        colorChooser: "pick and generate",
        colorSpace: "hsluv with dark",
        arena_border: 2,
        preFrontrunnerIds: ["square","triangle"],
        autoPoll: "Manual",
        // primaries: "No",
        firstStrategy: "zero strategy. judge on an absolute scale.",
        secondStrategy: "zero strategy. judge on an absolute scale.",
        doTwoStrategies: true,
        yeefilter: yes_all_candidates,
        computeMethod: "ez",
        pixelsize: 60,
        featurelist: ['gearconfig',"doFeatureFilter"],
        doFeatureFilter: true, 
        yeeon: false,
        beatMap: "auto",
        kindayee: "newcan",
        ballotConcept: "auto",
        powerChart: "auto",
        sidebarOn: "on",
        lastTransfer: "on",
    }

    self.url = undefined
    var maxVoters = 10  // workaround  // there is a bug where the real max is one less than this

    // CREATE
    var model = new Model(modelName);
    var ui = {}
    self.ui = ui
    ui.model = model
    var config
    var initialConfig
    var basediv = document.querySelector("#" + modelName)

    // CREATE div stuff for sandbox
    function newDivOnBase(name) {
        var a = document.createElement("div");
        a.setAttribute("id", name);
        basediv.appendChild(a);
    }
    newDivOnBase("left")
    newDivOnBase("center")
    newDivOnBase("right")
    model.createDOM()
    var centerDiv = basediv.querySelector("#center")
    if (centerDiv.hasChildNodes()){
        var firstNode = centerDiv.childNodes[0]
        centerDiv.insertBefore(model.dom,firstNode);
    } else {
        centerDiv.appendChild(model.dom)
    }
    model.dom.removeChild(model.caption);
    basediv.querySelector("#right").appendChild(model.caption);
    model.caption.style.width = "";

    // FUNCTIONS and CLASSES for INIT and UPDATE

    model.inSandbox = true

    self.setConfig = function(c) {
        config = c
        // INIT - initialize all data structures
        // the data structure for a sandbox is the configuration of the model.  Init completes this data structures.
        // backwards compatibility
        // the data structure for a model is model.<property>
        if (self.url != undefined) {
            var modelData = _getParameterByName("m",self.url);
            if (tryNewURL) var version = _getParameterByName("v",self.url);
        }
        function _getParameterByName(name,url){
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " ")).replace("}/","}"); //not sure how that / got there.
        };
        if(modelData){
            if (tryNewURL) {
                if (version) { 
                    // if we have a version number, then we know the data is in this format
                    config = {
                        zipped:modelData,
                        configversion:version
                    }
                } else {
                    var data = JSON.parse(modelData);
                    config = data;
                }
            } else {
                var data = JSON.parse(modelData);
                config = data;
            }
        }
        cleanConfig(config)
        initialConfig = _jcopy(config);
    
    }

   function cleanConfig(config) {
        // Load the defaults.  This runs at the start and after loading a preset.

        // FILENAME
        // config.presethtmlname = self.url.substring(self.url.lastIndexOf('/')+1);


        if(config.configversion == undefined || config.configversion == 1) {
            // GRANDFATHER URL variable names
            // change old variable names to new names to preserve backward compatibility with urls and presets
            // and clear grandfathered variables
            function newname(config,oldname,newname) {
                if(config[oldname] != undefined) config[newname] = config[oldname]
                delete config[oldname]
            }
            newname(config,"candidates","numOfCandidates")
            newname(config,"voters","numVoterGroups")
            newname(config,"s","system")
            if(config.c != undefined) { // grandfather in the variables
                config.numOfCandidates = config.c.length
                config.numVoterGroups = config.v.length
                config.features = 4
            }
            newname(config,"c","candidatePositions")
            newname(config,"v","voterPositions")
            newname(config,"d","description")

            // GRANDFATHER OLD NAMES OF VARIABLES
            if(config.unstrategic) config.firstStrategy = config.unstrategic
            if(config.strategic) config.secondStrategy = config.strategic
            if(config.strategy) config.secondStrategy = config.strategy
            if(config.voterStrategies) config.secondStrategies = _jcopy(config.voterStrategies)
            if(config.voterPercentStrategy) config.percentSecondStrategy = _jcopy(config.voterPercentStrategy)
            if(config.second_strategy) config.doTwoStrategies = config.second_strategy
            delete config.unstrategic
            delete config.strategic
            delete config.strategy
            delete config.voterStrategies
            delete config.voterPercentStrategy
            delete config.second_strategy

            // GRANDFATHER Feature List...
            // config.features: 1-basic, 2-voters, 3-candidates, 4-save
            if ( config.featurelist == undefined) {
                config.featurelist = fl()
                function fl() {
                    switch(config.features){
                        case 1: return ["systems"]
                        case 2: return ["systems","voters"]
                        case 3: return ["systems","voters","candidates"]
                        case 4: 
                            config.sandboxsave = true
                            return ["systems","voters","candidates"]
                    }
                }
            }
            if (config.doPercentFirst) config.featurelist = config.featurelist.concat(["percentStrategy"]);
            if (config.doFullStrategyConfig) {
                config.doFeatureFilter = false
                // The feature filter is off, so all items are displayed.
                // basically everything that should be displayed at the start
                // This config.doFullStrategyConfig is a shorthand that gets replaced by the featurelist
                // The featurelist has it's own control as an item
            }
            // clear the grandfathered config settings
            delete config.doPercentFirst
            delete config.features
            delete config.doFullStrategyConfig

            // GRANDFATHER featurelist step 2
            // HOWTO: When replacing the name of a menu item, the old configurations with that name still need to work
            // So, add the new menu item to the list below.
            // replace old names with new names
            if (config.featurelist) {
                var menuNameTranslator = {
                    "voters":"nVoterGroups",
                    "candidates":"nCandidates",
                    "unstrategic":"firstStrategy",
                    "second strategy":"doTwoStrategies",
                    "yee":"yee",
                    "rbvote":"rbSystems",
                    "custom_number_voters":"xVoterGroups",
                    "xHowManyVoterGroups":"xVoterGroups",
                    "strategy":"secondStrategy",
                    "percentstrategy":"percentSecondStrategy",
                }
                // all the current names get translated as themselves
                for (var id of Object.keys(ui.menu)) {
                    menuNameTranslator[id] = id
                }
                var temp_featurelist = []
                for (var i=0; i<config.featurelist.length; i++) {
                    var oldName = config.featurelist[i]
                    var newName = menuNameTranslator[oldName]
                    temp_featurelist.push(newName)
                }
                config.featurelist = temp_featurelist
            }
            config.configversion = 2 // updating to next version
        }

        if (config.configversion == 2) {
            if (config.yeefilter) {
                var oldyeefilter = config.yeefilter
                var newyeefilter = {}
                var oldcandidates = ["square","triangle","hexagon","pentagon","bob"]
                for (var i = 0; i < oldcandidates.length; i++) {
                    var id = oldcandidates[i]
                    if (oldyeefilter.includes(id)) {
                        newyeefilter[id] = true
                    } else {
                        newyeefilter[id] = false
                    }
                }
                config.yeefilter = newyeefilter
            }

            config.configversion = 2.1 // bump to next version
        }
        // we are now generating a new version of config.  We are done with grandfathering

        decode_config(config) // decodes the config, depending on version number
        // so in this case, we're decoding stuff from 2.2, but not 2.1 because 2.1 isn't encoded
        if (config.configversion == 2.1) {
            config.configversion = 2.2 // 2.1 is now treated the same as 2.2 because both are decoded
        }
        
        if (config.configversion == 2.2) { 
            if (config.yeefilter) {
                var oldy = config.yeefilter
                var newy = {}
                var oldcandidates = ["square","triangle","hexagon","pentagon","bob"]
                var serial = 0
                for (var i = 0; i < oldcandidates.length; i++) {
                    for (var k=1; k<=20; k++) {
                        var id = oldcandidates[i]
                        if (k > 1) id += k
                        if (id in oldy) {
                            newy[serial] = oldy[id]
                        }
                        serial++
                    }
                }
                config.yeefilter = newy
            }

            config.configversion = 2.3
        }
        if (config.configversion == 2.3) { 
            config.configversion = 2.4
        }
        // add in features that were not included with the old version
        if (config.configversion == 2.4) { 
            config.configversion = 2.5
                
            // There is a problem in going from an old featureset to a new one.
            // The new features are not included in the set.
            // So we add an opton to choose whether to filter features.
            // By default the filter is on.
            // The default in the sandbox preset is off.
            // In this way, it is easy to switch the filter off and update the features.
            // The filter switch is inside the config menu.

            // if this is a save from before version 2.5
            // then the featurelist is on and it didn't include the menu items that are hidden in menuVersion 1
            // so, allow the user to remove the filter

            // so, if the featurelist is set then we want to turn on the filter
            // if the featurelist is not set, then we don't do the filter
            if ( config.featurelist == undefined) {
                config.doFeatureFilter = false
            } else {
                modifyConfigFeaturelist(true, ["doFeatureFilter"]) 
            }

            // Hmm. on the one hand, I want to load an example where I have purposely set the filter
            // and that example is indistinguishable from an example where I want to see the new features
            // because I can't tell the difference (in the old version) between manual and automatic hiding
            // So maybe I should have an upgrade button, to allow the user to decide what to do.
            // or maybe the user could manually change the 2.4 to 2.5 in the URL.
            // 2.4 would not have the upgrade button
            // 2.5 
            // Oh
            // The difference between the locked down version and the updating version is the "config" menu
            // So I put the "Disable filters" button in the config menu,




            // one more thing
            // switch the name for this setting:
            if (config.kindayee == "beatCircles") {
                config.beatMap = "on"
                config.keyyee = "off"
                config.kindayee = "off"
            }
            var isSomething = x => (x != undefined && x != "off"      )
            if (isSomething(config.kindayee) || isSomething(config.keyyee)) {
                config.yeeon = true
            }

            // if the yee menu was in the featurelist, then make sure the new yee on/off switch is added to the featurelist // and beatMap
            if (config.featurelist != undefined && config.featurelist.includes("yee")) modifyConfigFeaturelist(true,["yeeon","beatMap"])

            // so basically, we are getting rid of the "none" button in the yee chooser and making it into a separate control.


        }

        // Finally done with old versions!

        // VOTER DEFAULTS
        // we want individual strategies to be loaded in, if they are there
        // if we have a blank slate, then we want to fill in with the variable "secondStrategy"
        if (config.secondStrategy && config.secondStrategies === undefined) {
            config.secondStrategies = []
            for (var i = 0; i < maxVoters; i++) {
                config.secondStrategies[i] = config.secondStrategy
            }	
        }
        config.secondStrategies = config.secondStrategies || []
        config.percentSecondStrategy = config.percentSecondStrategy || []
        config.voter_group_count = config.voter_group_count || []
        config.voter_group_spread = config.voter_group_spread || []
        for (var i = 0; i < maxVoters; i++) {
            config.secondStrategies[i] = config.secondStrategies[i] || "zero strategy. judge on an absolute scale."
            if(config.percentSecondStrategy[i] == undefined) config.percentSecondStrategy[i] = 0
            config.voter_group_count[i] = config.voter_group_count[i] || 50
            config.voter_group_spread[i] = config.voter_group_spread[i] || 190
        }

        _fillInDefaults(config, defaults)

        
    }

    model.start = function(){

        // CREATE
        
        if (config.candidatePositions) {
            for(var i=0; i<config.candidatePositions.length; i++) model.candidates.push(new Candidate(model))
        } else {
            for(var i=0; i<config.numOfCandidates; i++) model.candidates.push(new Candidate(model))
        }

        if (config.voterGroupTypes) {
            for(var i=0; i<config.voterGroupTypes.length; i++) {
                var vType = window[config.voterGroupTypes[i]]
                var n = new vType(model)
                model.voters.push(n)
            }
        } else if (config.oneVoter) {
            model.voters.push(new SingleVoter(model))
        } else {
            for(var i=0; i<config.numVoterGroups; i++) model.voters.push(new GaussianVoters(model))
        }
        model.voterCenter = new VoterCenter(model)

        // PRE CONFIGURE
        model.dimensions = config.dimensions
        
        // CONFIGURE
            // expand config to calculate some values to add to the model			
            // load expanded config into the model
            // configure writes to model and reads from config.  Sanity rule: configure does not read from model.
        _objF(ui.menu,"configure")
        // CONFIGURE DEFAULTS (model)
        model.border = config.arena_border
        model.HACK_BIG_RANGE = true;
        // INIT
        model.initDOM()
        for (var i=0; i<model.candidates.length; i++) {
            model.candidates[i].init()
        }
        model.initMODEL()
        for (var i=0; i<model.voters.length; i++) {
            model.voters[i].init()
        }
        model.arena.pileVoters()
        model.arena.redistrict()
		// INIT (menu)
		ui.menu.presetconfig.init_sandbox()
		// ui.menu.gearicon.init_sandbox()
		ui.arena.desc.init_sandbox()
        ui.menu.theme.init_sandbox();
        // UPDATE
        model.update()
        menu_update()
    };

    model.onDraw = function(){

        
        drawButtons() // make sure the icons show up
        
        // CREATE A BALLOT
        
        var myNode = basediv.querySelector("#right");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }  // remove old one, if there was one
        // basediv.querySelector("#ballot").remove()

        var doOldBallot = false
        if (config.oneVoter) {
            if (doOldBallot) {
                var BallotType = model.ballotType
                var ballot = new BallotType(model);
                basediv.querySelector("#right").appendChild(ballot.dom);
            } else {
                var divBallot = document.createElement("div")
                basediv.querySelector("#right").appendChild(divBallot);
            }
        }
        basediv.querySelector("#right").appendChild(model.caption);
        
        if (config.oneVoter) {
            if (model.voters[0].voterGroupType == "SingleVoter") {
                var text = ""
                if (doOldBallot) ballot.update(model.voters[0].ballot);
                if (doOldBallot) text += "<br />"
                text += '<div class="div-ballot">'
                text += model.voters[0].type.toTextV(model.voters[0].ballot);
                text += '</div>'
                if (0) {
                    text += "<br /><br />"
                    text += model.result.text
                }
                if (doOldBallot) {
                    model.caption.innerHTML = text
                } else {
                    model.caption.innerHTML = ""
                    divBallot.innerHTML = text
                }
            }
        }
    };

    model.updateFromModel = function() {
        _objF(ui.menu,"updateFromModel")
    }

    function menu_update() {
        // UPDATE MENU //

        // Make the MENU look correct.  The MENU is not part of the "model".
        // for (i in ui.menu.percentSecondStrategy.choose.sliders) ui.menu.percentSecondStrategy.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
        // for (i in ui.menu.group_count.choose.sliders) ui.menu.group_count.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
        // for (i in ui.menu.group_spread.choose.sliders) ui.menu.group_spread.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")

        for (i in ui.menu.percentSecondStrategy.choose.sliders) {
            if (i < model.voters.length && model.voters[i].voterGroupType == "GaussianVoters") {
                var style = "display:inline"
            } else {
                var style = "display:none"
            }
            ui.menu.percentSecondStrategy.choose.sliders[i].setAttribute("style",style)
            ui.menu.group_count.choose.sliders[i].setAttribute("style",style)
            ui.menu.group_spread.choose.sliders[i].setAttribute("style",style)
        }
        

        // todo: move to config for menu item
        var multiWinnerSystem = ( config.system == "QuotaApproval" || config.system == "RRV" ||  config.system == "RAV" ||  config.system == "STV" || config.system == "QuotaMinimax")
        if (multiWinnerSystem) {
            ui.menu.seats.choose.dom.hidden = false
        } else {
            ui.menu.seats.choose.dom.hidden = true
        }
    }

    
    // helpers
    
    function modifyConfigFeaturelist(condition, xlist) {
        // e.g. var xlist = ["choose_pixel_size","yeefilter"]
        var featureset = new Set(config.featurelist)
        for (var i in xlist){
            var xi = xlist[i]
            if (condition) {
                featureset.add(xi)
            } else {
                featureset.delete(xi)
            }
        }
        config.featurelist = Array.from(featureset)
    }    

    model.onInitModel = function() {
        // update sandbox buttons
        var m = [ui.menu.yee, ui.menu.yeefilter, ui.menu.frontrunners]
        m.forEach(function(m) {
            m.choose.buttonConfigs = m.makelist()
            m.choose.init()
            m.select()
        })
    }
    
    model.onAddCandidate = function() {
        var n = model.candidates.length
        model.numOfCandidates = n
        config.numOfCandidates = n
        ui.menu.nCandidates.select()

        drawButtons()
    }

    function drawButtons() {
        var m = [ui.menu.yee, ui.menu.yeefilter, ui.menu.frontrunners]
        m.forEach(function(m) {
            m.choose.buttonConfigs = m.makelist()
            m.choose.init()
            m.select()
        })    

    }

    ///////////////////
    // SLIDERS CLASS //
    ///////////////////

    var makeslider = function(cf) {
        var self = this
        self.slider = document.createElement("input");
        self.slider.type = "range";
        self.slider.max = cf.max;
        self.slider.min = cf.min;
        self.slider.value = cf.value;
        //self.slider.setAttribute("width","20px");
        self.slider.id = cf.chid;
        self.slider.n = cf.n
        self.slider.chfn = cf.chfn
        self.slider.class = "slider";
        self.slider.addEventListener('input', function() {self.slider.chfn(self.slider,self.slider.n)}, true);
        var label = document.createElement('label')
        label.htmlFor = cf.chid;
        label.appendChild(document.createTextNode(cf.chtext));
        cf.containchecks.appendChild(self.slider);
        //cf.containchecks.appendChild(label);
        self.slider.innerHTML = cf.chtext;
    } // https://stackoverflow.com/a/866249/8210071

    var sliderSet = function(cf){
        var self = this
        self.dom = document.createElement('div')
        self.dom.className = "button-group"
        if (cf.labelText) {
            var button_group_label = document.createElement('div')
            button_group_label.className = "button-group-label"
            button_group_label.innerHTML = cf.labelText;
            self.dom.appendChild(button_group_label)
        }

        cf.containchecks = self.dom.appendChild(document.createElement('div'));
        cf.containchecks.id="containsliders"
        self.sliders = []
        if(cf.num) {
            for (var i = 0; i < cf.num; i++) {	
                cf.n = i
                var slider = new makeslider(cf)
                self.sliders.push(slider.slider)
            }
        } else {
            cf.n = 0
            var slider = new makeslider(cf)
            self.sliders.push(slider.slider)
        }
    }

    //////////////////////////////////
    // BUTTONS - WHAT VOTING SYSTEM //
    //////////////////////////////////

    ui.menu = {}
    ui.menu.systems = new function() { // Which voting system?
        // "new function () {code}" means make an object "this", and run "code" in a new scope
        // I made a singleton class so we can use "self" instead of saying "systems" (or another button group name).  
        // This is useful when we want to make another button group and we copy and paste this code.
        // It might be better to make a class and then an instance, but I think this singleton class is easier.
        // single = function() {stuff}; var systems = new single()
        var self = this
        
        var autoSwitchDim = false
        
        self.name = "systems"
        self.list = [
            {name:"FPTP", voter:PluralityVoter, ballot:"PluralityBallot", election:Election.plurality, margin:4},
            {name:"+Primary", voter:PluralityVoter, ballot:"PluralityBallot", election:Election.pluralityWithPrimary},
            {name:"Top Two", voter:PluralityVoter, ballot:"PluralityBallot", election:Election.toptwo, margin:4},
            {name:"RBVote", realname:"Rob Legrand's RBVote (Ranked Ballot Vote)", voter:RankedVoter, ballot:"RankedBallot", election:Election.rbvote},
            {name:"IRV", realname:"Instant Runoff Voting.  Sometimes called RCV Ranked Choice Voting but I call it IRV because there are many ways to have ranked ballots.", voter:RankedVoter, ballot:"RankedBallot", election:Election.irv, margin:4},
            {name:"Borda", voter:RankedVoter, ballot:"RankedBallot", election:Election.borda},
            {name:"Minimax", realname:"Minimax Condorcet method.", voter:RankedVoter, ballot:"RankedBallot", election:Election.minimax, margin:4},
            {name:"Schulze", realname:"Schulze Condorcet method.", voter:RankedVoter, ballot:"RankedBallot", election:Election.schulze},
            {name:"RankedPair", realname:"Ranked Pairs Condorcet method.", voter:RankedVoter, ballot:"RankedBallot", election:Election.rankedPairs, margin:4},
            {name:"Condorcet", realname:"Choose the Condorcet Winner, and if there isn't one, Tie", voter:RankedVoter, ballot:"RankedBallot", election:Election.condorcet},
            {name:"Approval", voter:ApprovalVoter, ballot:"ApprovalBallot", election:Election.approval, margin:4},
            {name:"Score", voter:ScoreVoter, ballot:"ScoreBallot", election:Election.score},
            {name:"STAR", voter:ScoreVoter, ballot:"ScoreBallot", election:Election.star, margin:4},
            {name:"3-2-1", voter:ThreeVoter, ballot:"ThreeBallot", election:Election.three21},
            {name:"RRV", voter:ScoreVoter, ballot:"ScoreBallot", election:Election.rrv, margin:4},
            {name:"RAV", voter:ApprovalVoter, ballot:"ApprovalBallot", election:Election.rav},
            {name:"STV", voter:RankedVoter, ballot:"RankedBallot", election:Election.stv, margin:4},
            {name:"QuotaApproval", realname:"Using a quota with approval voting to make proportional representation.",voter:ApprovalVoter, ballot:"ApprovalBallot", election:Election.quotaApproval},
            {name:"QuotaMinimax", realname:"Using a quota with Minimax Condorcet voting to make proportional representation.",voter:RankedVoter, ballot:"RankedBallot", election:Election.quotaMinimax}
        ];
        self.codebook = [
            {
                field: "system",
                decodeVersion: 2.2,
                decode: {
                    0:"FPTP",
                    1:"+Primary",
                    2:"Top Two",
                    3:"RBVote",
                    4:"IRV", 
                    5:"Borda",
                    6:"Minimax",
                    7:"Schulze",
                    8:"RankedPair",
                    9:"Condorcet",
                    10:"Approval",
                    11:"Score",
                    12:"STAR",
                    13:"3-2-1",
                    14:"RRV", 
                    15:"RAV",
                    16:"STV",
                    17:"QuotaApproval"
                }
            }
        ]
        self.listByName = function() {
            var votingSystem = self.list.filter(function(system){
                return(system.name==config.system);
            })[0];
            return votingSystem;
        }
        self.onChoose = function(data){
            // LOAD INPUT
            config.system = data.name;
            // CONFIGURE
            self.configure()
            // UPDATE
            
            // TODO: work this out so that the voters get re initialized in the correct place
            if (autoSwitchDim) {
                ui.menu.dimensions.onChoose({name:model.dimensions}) 
                ui.menu.dimensions.select()
            }
            model.update();
            menu_update()
        };
        self.choose = new ButtonGroup({
            label: "what voting system?",
            width: 108,
            data: self.list,
            onChoose: self.onChoose
        });
        self.configure= function() {
            
            showMenuItemsIf("divRBVote", config.system === "RBVote")
            showMenuItemsIf("divLastTransfer", config.system === "IRV" || config.system === "STV")
            
            var s = self.listByName()
            model.election = s.election
            model.system = config.system;
            var doTarena = model.checkGotoTarena()
            if (autoSwitchDim) {
                if (doTarena) {
                    model.dimensions = "1D+B"
                } else {
                    model.dimensions = "2D"
                }
            }
            
            if (doTarena) {
                model.tarena.canvas.hidden = false
            } else {
                model.tarena.canvas.hidden = true
            }
            model.voterType = s.voter // probably don't need
            model.ballotType = window[s.ballot];
            model.voters.map(v=>{
                v.setType( s.voter ); // calls "new VoterType(model)"
            }) 
            model.pollResults = undefined
        }
        self.select = function() {
            self.choose.highlight("name", config.system)
        }
    }

    ui.menu.rbSystems = new function() { // Which RB voting system?
        var self = this
        self.name = "rbSystems"
        self.list = [
            {name:"Baldwin",rbelection:rbvote.calcbald, margin:4},
            {name:"Black",rbelection:rbvote.calcblac},
            {name:"Borda",rbelection:rbvote.calcbord, margin:4},
            {name:"Bucklin",rbelection:rbvote.calcbuck},
            {name:"Carey",rbelection:rbvote.calccare, margin:4},
            {name:"Coombs",rbelection:rbvote.calccoom},
            {name:"Copeland",rbelection:rbvote.calccope, margin:4},
            {name:"Dodgson",rbelection:rbvote.calcdodg},
            {name:"Hare",rbelection:rbvote.calchare, margin:4},
            {name:"Nanson",rbelection:rbvote.calcnans},
            {name:"Raynaud",rbelection:rbvote.calcrayn, margin:4},
            {name:"Schulze",rbelection:rbvote.calcschu},
            {name:"Simpson",rbelection:rbvote.calcsimp, margin:4},
            {name:"Small",rbelection:rbvote.calcsmal},
            {name:"Tideman",rbelection:rbvote.calctide}
            ]	
            
        self.codebook = [
            {
                field: "rbsystem",
                decodeVersion: 2.2,
                decode: {
                    0:"Baldwin",
                    1:"Black",
                    2:"Borda",
                    3:"Bucklin",
                    4:"Carey",
                    5:"Coombs",
                    6:"Copeland",
                    7:"Dodgson",
                    8:"Hare",
                    9:"Nanson",
                    10:"Raynaud",
                    11:"Schulze",
                    12:"Simpson",
                    13:"Small",
                    14:"Tideman"
                }
            }
        ]
        self.listByName = function() {
            var votingSystem = self.list.filter(function(system){
                return(system.name==config.rbsystem);
            })[0];
            return votingSystem;
        }
        self.onChoose = function(data){
            // LOAD INPUT
            config.rbsystem = data.name;
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
        };
        self.choose = new ButtonGroup({
            label: "which RB voting system?",
            width: 108,
            data: self.list,
            onChoose: self.onChoose
        });
        self.configure= function() {
            model.rbsystem = config.rbsystem
            model.rbelection = self.listByName().rbelection
            model.pollResults = undefined
        }
        self.select = function() {
            self.choose.highlight("name", config.rbsystem)
        }
    }

    ui.menu.dimensions = new function () {
        var self = this
        // self.name = dimensions
        self.list = [
            {name:"2D",realname:"Two Position Dimensions",margin:4},
            {name:"1D+B",realname:"One Position Dimension Horizontally, Plus Broadness in the Vertical Dimension", margin:4},
            {name:"1D", realname:"One Dimension Horizontally, Vertical Doesn't Matter"}
        ]
        self.onChoose = function(data){
            // LOAD
            config.dimensions = data.name
            // CONFIGURE
            self.configure()
            // INIT (LOADER)	
            model.initDOM()
            // INIT
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
            model.arena.pileVoters()
            model.arena.redistrict()
            for (var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            // UPDATE
            model.update()
            // _objF(ui.arena,"update")
            // ui.menu.spread_factor_voters.select()
        };
        self.configure = function() {
            model.dimensions = config.dimensions
        }
        self.select = function() {
            self.choose.highlight("name", config.dimensions);
        }
        self.choose = new ButtonGroup({
            label: "Arena Dimensions:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.nDistricts = new function () {
        var self = this
        // self.name = nDistricts
        self.list = [
            {name:"1",margin:4},
            {name:"2",margin:4},
            {name:"3",margin:4},
            {name:"4",margin:4},
            {name:"5",margin:4},
            {name:"6",margin:4},
            {name:"7",margin:4},
            {name:"8",margin:4},
            {name:"9",margin:4},
            {name:"10"}
        ]
        self.onChoose = function(data){
            // LOAD
            config.nDistricts = Number(data.name)
            // CONFIGURE
            self.configure()
            // INIT
            model.arena.redistrict()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.nDistricts = config.nDistricts
            if (model.checkGotoTarena()) { // TODO: make a visualization for more than 1 district
                model.tarena.canvas.hidden = false
            } else {
                model.tarena.canvas.hidden = true
            }
        }
        self.select = function() {
            self.choose.highlight("name", config.nDistricts);
        }
        self.choose = new ButtonGroup({
            label: "Number of Districts:",
            width: 18,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.seats = new function () {
        var self = this
        // self.name = dimensions
        self.list = [
            {name:"1",margin:4},
            {name:"2",margin:4},
            {name:"3",margin:4},
            {name:"4",margin:4},
            {name:"5",margin:4},
            {name:"6",margin:4},
            {name:"7",margin:4},
            {name:"8",margin:4},
            {name:"9",margin:4},
            {name:"10"}
        ]
        self.onChoose = function(data){
            // LOAD
            config.seats = Number(data.name)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.seats = config.seats
        }
        self.select = function() {
            self.choose.highlight("name", config.seats);
        }
        self.choose = new ButtonGroup({
            label: "How many Seats:",
            width: 18,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.nVoterGroups = new function() { // How many voters?
        var self = this
        self.name = "nVoterGroups"

        self.list = [
            {realname: "Single Voter", name:"&#50883;", num:1, margin:6, oneVoter:true},
            {realname: "One Group", name:"1", num:1, margin:5},
            {realname: "Two Groups", name:"2", num:2, margin:5},
            {realname: "Three Groups", name:"3", num:3, margin:6},
            {realname: "Different Sized Groups (like a snowman)", name:"&#x2603;", num:3, snowman:true, margin:6},
            {realname: "Custom Number of Voters and Sizes and Spreads", name:"X", num:4, x_voters:true},
        ];
        self.codebook = [
            {
                decode: {
                    0:"Single Voter",
                    1:"One Group", 
                    2:"Two Groups", 
                    3:"Three Groups",
                    4:"Different Sized Groups (like a snowman)",
                    5:"Custom Number of Voters and Sizes and Spreads"
                },
                decodeVersion: 2.2,
                field: "nVoterGroupsRealName"
            },
            {
                decode: {
                    0:1,
                    1:2,
                    2:3,
                    3:4,
                },
                decodeVersion: 2.2,
                field: "numVoterGroups"
            },
            {
                decode: {
                    0:"GaussianVoters",
                    1:"SingleVoter"
                },
                decodeVersion: 2.2,
                field: "voterGroupTypes"
            }
        ]
        self.listByName = function() { // when we load from a config
            if (config.x_voters) {
                return self.list.filter( function(x){return x.x_voters || false})[0]
            } else if (config.snowman) {
                return self.list.filter( function(x){return x.snowman || false})[0]
            } else if (config.oneVoter) {
                return self.list.filter( function(x){return x.oneVoter || false})[0]
            } else {
                return self.list.filter( function(x){return x.num==config.numVoterGroups && (x.oneVoter || false) == false && (x.snowman || false) == false})[0]
            }
        }
        self.onChoose = function(data){
            // LOAD INPUT
            // add the configuration for the voter groups when "X" is chosen
            
            
            if(data.x_voters) {
                config.numVoterGroups = config.xNumVoterGroups
            } else {
                config.numVoterGroups = data.num;
            }
            config.nVoterGroupsRealName = data.realname // this set of attributes is calculated based on config
            config.snowman = data.snowman || false;
            config.x_voters = data.x_voters || false;
            config.oneVoter = data.oneVoter || false;
            config.voterPositions = null
            config.voterGroupTypes = null
            // CREATE
            model.voters = []
            if (config.oneVoter) {
                model.voters.push(new SingleVoter(model))
            } else {
                for(var i=0; i<config.numVoterGroups; i++) {
                    model.voters.push(new GaussianVoters(model))
                }
            }
            // CONFIGURE
            self.configure()
            //_objF(ui.menu,"configure")  // TODO: do I need this?
            ui.menu.firstStrategy.configure()
            ui.menu.secondStrategy.configure()
            ui.menu.spread_factor_voters.configure()
            // INIT
            model.initMODEL()
            for(var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
            model.arena.pileVoters()
            model.arena.redistrict()
            // UPDATE
            model.update()
            menu_update()
        };
        self.configure = function() {	
            // MODEL //

            showMenuItemsIf("divXVoterGroups", config.x_voters)

            // MODEL //
            model.nVoterGroupsRealName = config.nVoterGroupsRealName	
            if (config.voterGroupTypes && config.voterPositions) {
                // we are reading a config string of version 2.2 or greater
                for(var i=0; i<config.voterPositions.length; i++){
                    var pos = config.voterPositions[i];
                    Object.assign(model.voters[i], {
                        vid: i,
                        disk:(4-num),
                        x:pos[0],
                        y:pos[1],
                        snowman: config.voterGroupSnowman[i],
                        x_voters: config.voterGroupX[i],
                        disk: config.voterGroupDisk[i]
                    })
                    model.voters[i].setType( ui.menu.systems.listByName().voter );	
                }
            } else if (config.voterPositions) {
                var num = model.voters.length
                for(var i=0; i<config.voterPositions.length; i++){
                    var pos = config.voterPositions[i];
                    Object.assign(model.voters[i], {
                        vid: i,
                        disk:(4-num),
                        x:pos[0],
                        y:pos[1],
                        snowman: config.snowman,
                        x_voters: config.x_voters
                    })
                    model.voters[i].setType( ui.menu.systems.listByName().voter );	
                }
            } else {
                var num = model.voters.length
                var voterPositions;
                if (config.snowman) {
                    voterPositions =  [[150,83],[150,150],[150,195]]
                }else if(config.x_voters) {
                    voterPositions =  [[65,150],[150,150],[235,150],[150,65]]
                    if (1) {//(num > 4) {


                        var points = [];
                        var angle = 0;
                        var _radius = 0;
                        var _radius_norm = 0;
                        var _spread_factor = 600 * .2
                        var theta = Math.TAU * .5 * (3 - Math.sqrt(5))
                        for (var count = 0; count < num; count++) {
                            angle = theta * count
                            _radius_norm = Math.sqrt((count+.5)/num)
                            _radius = _radius_norm * _spread_factor

                            var x = Math.cos(angle)*_radius  + 150 ;
                            var y = Math.sin(angle)*_radius  + 150 ;
                            points.push([x,y]);
                        }
                        voterPositions = points

                    }
                }else if(num==1){
                    voterPositions = [[150,150]];
                }else if(num==2){
                    voterPositions = [[95,150],[205,150]];
                }else if(num==3){
                    voterPositions = [[65,150],[150,150],[235,150]];

                }
                
                for(var i=0; i<num; i++){
                    var pos = voterPositions[i];
                    Object.assign(model.voters[i], {
                        vid: i,
                        disk:(4-num),
                        x:pos[0] * config.arena_size / 300, //+ (config.arena_size - 300) * .5
                        y:pos[1] * config.arena_size / 300, //+ (config.arena_size - 300) * .5
                        snowman: config.snowman,
                        x_voters: config.x_voters
                    })
                    model.voters[i].setType( ui.menu.systems.listByName().voter );	

                }
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.nVoterGroupsRealName);
        }
        self.choose = new ButtonGroup({
            label: "how many groups of voters?",
            width: 32,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.xVoterGroups = new function() { // if the last option X is selected, we need a selection for number of voters
        var self = this
        self.name = "xVoterGroups"
        self.onChoose = function(slider,n) {
            // LOAD INPUT
            var num = slider.value
            config.xNumVoterGroups = num;
            config.numVoterGroups = num;

            // CREATE
            model.voters = []
            for(var i=0; i<num; i++) {
                model.voters.push(new GaussianVoters(model))
            }
            config.voterPositions = null
            // CONFIGURE
            ui.menu.nVoterGroups.configure() // same settings in this other button
            ui.menu.firstStrategy.configure()
            ui.menu.secondStrategy.configure()
            ui.menu.spread_factor_voters.configure()
            // INIT
            model.initMODEL()
            for(var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
            model.arena.pileVoters()
            model.arena.redistrict()
            // UPDATE
            model.update()
            menu_update()

        }		
        self.choose = new sliderSet({
            max: maxVoters-1,
            min:"1",
            value:"4",
            chtext:"",
            chid:"choose number of voter groups",
            chfn:self.onChoose
        })
        self.select = function() {
            self.choose.sliders[0].value = config.xNumVoterGroups // TODO: load x_voters config somehow
        }
    }

    ui.menu.group_count = new function() {  // group count
        var self = this
        self.name = "group_count"

        self.onChoose = function(slider,n) {
            // LOAD INPUT
            config.voter_group_count[n] = slider.value;
            // CONFIGURE
            self.configure()
            // INIT
            model.voters[n].init()
            model.arena.pileVoters()
            model.arena.redistrict()
            // UPDATE
            model.update()
            menu_update()
        }
        self.configure = function() {
            for (var i=0; i<model.voters.length; i++) {
                self.configureN(i)
            }
        }
        self.configureN = function(n) {
            if (model.voters[n].voterGroupType=="GaussianVoters") {
            model.voters[n].group_count =config.voter_group_count[n]
        }
        }
        self.select = function() {
            for (i in self.choose.sliders) {
                self.choose.sliders[i].value = config.voter_group_count[i]
            }
        }	
        self.updateFromModel = function(n) {
            for (i in model.voters) {
                if (model.voters[i].voterGroupType=="GaussianVoters") {
                    var s = model.voters[i].group_count
                    config.voter_group_count[i] =  s
                    self.choose.sliders[i].value =  s
                }
            }
        }
        self.choose = new sliderSet({
            max: "200",
            min:"0",
            value:"50",
            chtext:"",
            chid:"choose number",
            chfn:self.onChoose,
            num:maxVoters,
            labelText: "what # voters in each group?"
        })
    }

    ui.menu.group_spread = new function() {  // group count
        var self = this
        self.name = "group_spread"

        self.onChoose = function(slider,n) {
            // LOAD INPUT
            config.voter_group_spread[n] = slider.value;
            // CONFIGURE
            self.configureN(n)
            // INIT
            model.voters[n].init()
            // UPDATE
            model.update()
            menu_update()
        }
        self.configure = function() {
            for (var i=0; i<model.voters.length; i++) {
                self.configureN(i)
            }
        }
        self.configureN = function(n) {
            if (model.voters[n].voterGroupType=="GaussianVoters") {
            model.voters[n].group_spread = config.voter_group_spread[n]
        }
        }
        self.choose = new sliderSet({
            max: "500",
            min:"10",
            value:"250",
            chtext:"",
            chid:"choose width in pixels",
            chfn:self.onChoose,
            num:maxVoters,
            labelText: "how spread out is the group?"
        })
        self.select = function() {
            for (i in self.choose.sliders) {
                self.choose.sliders[i].value = config.voter_group_spread[i]
            }
        }			
        self.updateFromModel = function(n) {
            for (i in model.voters) {
                if (model.voters[i].voterGroupType=="GaussianVoters") {
                    var s = model.voters[i].group_spread
                    config.voter_group_spread[i] =  s
                    self.choose.sliders[i].value =  s
                }
            }
        }
    }

    ui.menu.nCandidates = new function() { // how many candidates?
        var self = this
        self.name = "nCandidates"
        self.list = [
            {name:"two", num:2, margin:4},
            {name:"three", num:3, margin:4},
            {name:"four", num:4, margin:4},
            {name:"five", num:5}
        ];
        self.onChoose = function(data){
            // LOAD INPUT
            config.numOfCandidates = data.num;
            config.candidatePositions = null
            config.candidateSerials = null
            config.candidateB = null
            // CREATE
            model.candidates = []
            for(var i=0; i<config.numOfCandidates; i++) {
                model.candidates.push(new Candidate(model))
            }
            // CONFIGURE
            self.configure()

            // INIT
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            model.initMODEL()
            // UPDATE
            
            model.arena.redistrictCandidates()
            // update sandbox buttons

            // Note: model.onAddCandidate() is similar

            var m = [ui.menu.yee, ui.menu.yeefilter, ui.menu.frontrunners]
            m.forEach(function(m) {
                m.choose.buttonConfigs = m.makelist()
                m.choose.init()
                m.select()
            })

            // update model
            model.update()
        };
        self.choose = new ButtonGroup({
            label: "how many candidates?",
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.configure = function() { 
            // expanding upon what the button means for the model
            // this handles all the candidate creation every time a set of candidates is loaded
            model.numOfCandidates = config.numOfCandidates
            // Candidates, in a circle around the center.
			var _candidateIcons = Object.keys(Candidate.graphicsByIcon["Default"])
            var num = config.numOfCandidates;
            if (config.candidatePositions) {
                model.numOfCandidates = config.candidatePositions.length
                for(var i=0; i<config.candidatePositions.length; i++){
                    var serial = i
                    if (config.candidateSerials) {
                        serial = config.candidateSerials[i]
                    }
                    var b = 1
                    if (config.candidateB) {
                        b = config.candidateB[i]
                    }
                    var icon = _candidateIcons[serial % _candidateIcons.length];
                    var instance = Math.floor(serial / _candidateIcons.length) + 1
                    Object.assign(model.candidates[i],{
                        icon:icon,
                        instance:instance,
                        b:b,
                        x:config.candidatePositions[i][0],
                        y:config.candidatePositions[i][1]
                    })
                }
            } else {
                var angle = 0;
                switch(num){
                    case 3: angle=Math.TAU/12; break;
                    case 4: angle=Math.TAU/8; break;
                    case 5: angle=Math.TAU/6.6; break;
                }
                for(var i=0; i<num; i++){
                    var r = 100;
                    var x = 150 - r*Math.cos(angle) + (config.arena_size - 300) * .5; // probably replace "model" with "config", but maybe this will cause a bug
                    var y = 150 - r*Math.sin(angle) + (config.arena_size - 300) * .5; // TODO check for bug
                    var b = 1
                    var icon = _candidateIcons[i];
                    Object.assign(model.candidates[i],{
                        icon:icon,
                        x:x,
                        y:y,
                        b:b
                    })
                    angle += Math.TAU/num;
                }
            }
        }
        self.select = function() {
            self.choose.highlight("num", config.numOfCandidates);
        }
    }
  
    ui.menu.customNames = new function () {
        var self = this
        self.name = "customNames"
        self.list = [
            {name:"Yes",margin:4},
            {name:"No"}
        ]
        self.onChoose = function(data){
            // LOAD
            config.customNames = data.name
            // CONFIGURE
            self.configure()
            // INIT
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            model.initMODEL()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            showMenuItemsIf("divCustomNames", config.customNames === "Yes")
            model.customNames = config.customNames
            ui.menu.namelist.choose.dom.hidden = (model.customNames == "Yes") ? false : true
        }
        self.select = function() {
            self.choose.highlight("name", config.customNames);
        }
        self.choose = new ButtonGroup({
            label: "Customize Candidates' Names?",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    
    ui.menu.namelist = new function () {
        var self = this
        self.name = "namelist"
        self.onChoose = function(){
            // LOAD
            config.namelist = self.choose.dom.value
            // CONFIGURE
            self.configure()
            // INIT
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            model.initMODEL()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.namelist = config.namelist.split("\n")
        }
        self.select = function() {
            self.choose.dom.value = config.namelist
        }
        self.choose = {
            dom: document.createElement("textarea")
        }
        self.choose.dom.addEventListener("input",self.onChoose)
    }

    

    ui.menu.firstStrategy = new function() { // strategy 1 AKA unstrategic voters' strategy
        var self = this
        self.name = "firstStrategy"
        self.list = [
            {name:"O", realname:"zero strategy. judge on an absolute scale.", margin:5},
            {name:"N", realname:"normalize", margin:5},
            {name:"F", realname:"normalize frontrunners only", margin:5},
            {name:"F+", realname:"best frontrunner", margin:5},
            {name:"F-", realname:"not the worst frontrunner"}
        ];
        self.onChoose = function(data){
            // LOAD INPUT
            config.firstStrategy = data.realname;
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.choose = new ButtonGroup({
            label: "what's voters' strategy?",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
        self.configure = function() {
            _showOrHideMenuForStrategy(config)
            model.firstStrategy = config.firstStrategy
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].firstStrategy = config.firstStrategy
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.firstStrategy);
        }
    }

    function _showOrHideMenuForStrategy(config) {			
        var not_f = ["zero strategy. judge on an absolute scale.","normalize"]
        var turnOffFrontrunnerControls =  not_f.includes(config.firstStrategy)
        if (config.doTwoStrategies) {
            for(var i=0;i<config.secondStrategies.length;i++){
                if (! not_f.includes(config.secondStrategies[i])){
                    turnOffFrontrunnerControls = false
                }
            }
        }
        showMenuItemsIf("divPoll", ! turnOffFrontrunnerControls)
        showMenuItemsIf("divManualPoll", ! config.autoPoll == "Auto")
    }

    ui.menu.doTwoStrategies = new function() { // Is there a 2nd strategy?
        var self = this
        self.name = "doTwoStrategies"
        self.list = [
            {realname: "opton for 2nd strategy", name:"2"}
        ];
        self.onChoose = function(data){
            // LOAD INPUT
            config.doTwoStrategies = data.isOn
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            showMenuItemsIf("divSecondStrategy", config.doTwoStrategies)
            _showOrHideMenuForStrategy(config)
            model.doTwoStrategies = config.doTwoStrategies
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].doTwoStrategies = config.doTwoStrategies
            }
        }
        self.select = function() {
            if (config.doTwoStrategies) {
                self.choose.highlight("name", "2");
            }
        }
        self.choose = new ButtonGroup({
            label: "",
            width: 41,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });			
    }

    ui.menu.secondStrategy = new function() { // strategy 2 AKA strategic voters' strategy
        var self = this
        self.name = "secondStrategy"
        self.list = [
            {name:"O", realname:"zero strategy. judge on an absolute scale.", margin:5},
            {name:"N", realname:"normalize", margin:5},
            {name:"F", realname:"normalize frontrunners only", margin:5},
            {name:"F+", realname:"best frontrunner", margin:5},
            {name:"F-", realname:"not the worst frontrunner"}
        ];
        var decodeList = {
            0:"zero strategy. judge on an absolute scale.",
            1:"normalize",
            2:"normalize frontrunners only",
            3:"best frontrunner",
            4:"not the worst frontrunner"
        }
        self.codebook = [
            {
                decode: decodeList,
                decodeVersion: 2.2,
                field: "secondStrategies"
            },
            {
                decode: decodeList,
                decodeVersion: 2.2,
                field: "secondStrategy"
            },
            {
                decode: decodeList,
                decodeVersion: 2.2,
                field: "firstStrategy"
            }
        ]
        self.onChoose = function(data){
            // LOAD INPUT
            config.secondStrategy = data.realname
            for (var i = 0; i < maxVoters; i++) {
                config.secondStrategies[i] = data.realname
            }
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            _showOrHideMenuForStrategy(config)
            model.secondStrategy = config.secondStrategy
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].secondStrategy = config.secondStrategies[i]
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.secondStrategy);
            // if (config.secondStrategies[0] != "starnormfrontrunners") { // kind of a hack for now, but I don't really want another button
            // 	self.choose.highlight("realname", config.secondStrategies[0]);
            // }
        }
        self.choose = new ButtonGroup({
            label: "what's voters' 2nd strategy?",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.percentSecondStrategy = new function() {  // group count
        var self = this
        self.name = "percentSecondStrategy"

        self.onChoose = function(slider,n) {
            // LOAD INPUT
            config.percentSecondStrategy[n] = slider.value;
            // CONFIGURE
            self.configureN(n)
            // UPDATE
            model.update();
        }
        self.configure = function() {
            for (var i=0; i<model.voters.length; i++) {
                self.configureN(i)
            }
        }
        self.configureN = function(n) {
            // _showOrHideMenuForStrategy(config) // not necessary
            if (model.voters[n].voterGroupType=="GaussianVoters") {
            model.voters[n].percentSecondStrategy = config.percentSecondStrategy[n]
        }
        }
        self.select = function() {
            for (i in self.choose.sliders) {
                self.choose.sliders[i].value = config.percentSecondStrategy[i]
            }
        }
        self.choose = new sliderSet({
            max: "100",
            min:"0",
            value:"50",
            chtext:"",
            chid:"choosepercent",
            chfn:self.onChoose,
            num:maxVoters,
            labelText: "what % use this 2nd strategy?"
        })
    }	

    if (0) { // are there primaries?
        ui.menu.primaries = new function() {
            var self = this
            self.list = [
                {name:"Yes",realname:"Yes", margin:5},
                {name:"No",realname:"No"}
            ];
            self.onChoose = function(data){
                config.primaries = data.name
                self.configure()
                model.update()
            };
            self.configure = function() {
                model.primaries = data.name
            }
            self.select = function() {
                self.choose.highlight("name", config.primaries)
            }
            self.choose = new ButtonGroup({
                label: "Primaries?",
                width: 71,
                data: self.list,
                onChoose: self.onChoose
            });
        }
    }

    ui.menu.autoPoll = new function() { // do a poll to find frontrunner
        var self = this
        self.name = "autoPoll"
        self.list = [
            {name:"Auto",realname:"Choose frontrunners automatically.", margin:5},
            {name:"Manual",realname:"Press the poll button to find the frontrunners once."}
        ];
        self.codebook = [
            {
                field: "autoPoll",
                decodeVersion: 2.2,
                decode: {
                    0:"Auto",
                    1:"Manual"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD INPUT
            config.autoPoll = data.name
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            showMenuItemsIf("divManualPoll", config.autoPoll == "Manual")
            model.autoPoll = config.autoPoll
        }
        self.select = function() {
            self.choose.highlight("name", config.autoPoll)
        }
        self.choose = new ButtonGroup({
            label: "AutoPoll to find new frontrunner:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }


    function _iconButton(id) {
        return "<span class='buttonshape'>"+model.icon(id)+"</span>"
    }

    ui.menu.frontrunners = new function() { // frontrunners
        var self = this
        self.name = "frontrunners"
        self.list = [];
        self.makelist = function() {
            var a = []
            for (var i=0; i < model.candidates.length; i++) {
                var c = model.candidates[i]
                a.push({
                    name:_iconButton(c.id),
                    realname:c.id,
                    margin:5
                })
            }
            a[a.length-1].margin = 0
            return a
        }
        self.onChoose = function(data){
            // LOAD INPUT
            var preFrontrunnerSet = new Set(config.preFrontrunnerIds)
            if (data.isOn) {
                preFrontrunnerSet.add(data.realname)
            } else {
                preFrontrunnerSet.delete(data.realname)
            }
            config.preFrontrunnerIds = Array.from(preFrontrunnerSet)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.arena.districtsListCandidates()
            model.update();
        };
        self.configure = function() {
            model.preFrontrunnerIds = config.preFrontrunnerIds
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].preFrontrunnerIds = config.preFrontrunnerIds
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.preFrontrunnerIds);
        }
        self.choose = new ButtonGroup({
            label: "who are the frontrunners?",
            width: 41,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });			
    }

    ui.menu.poll = new function() { // do a poll to find frontrunner
        var self = this
        self.name = "poll"
        self.list = [
            {name:"Poll",margin:5},
            {name:"Poll 2",realname:"Find the top 2 frontrunners."}
        ];
        self.onChoose = function(data){
            // DO CALCULATIONS //
            // get poll results
            if (data.name == "Poll") { // get last poll
                var won = model.result.winners
            } else { // do new poll
                model.doTop2 = true
                model.update()
                model.doTop2 = false
                var won = model.result.theTop2
            }
            // UPDATE CONFIG //
            config.preFrontrunnerIds = won
            // UPDATE MENU //
            ui.menu.frontrunners.select()
            // CONFIGURE AND UPDATE MODEL //
            ui.menu.frontrunners.configure()
            model.arena.districtsListCandidates()
            model.update();
        };
        self.choose = new ButtonGroup({
            label: "Poll to find new frontrunner:",
            width: 52,
            data: self.list,
            onChoose: self.onChoose,
            justButton: true
        });
    }

    ui.menu.yee = new function() { // yee
        var self = this
        self.name = "yee"
        self.list = [];
        self.makelist = function() {
            var a = []
            for (var i=0; i < model.voters.length; i++) {
                var v = model.voters[i]
                a.push({
                    name:i+1,
                    realname:"voter group #"+(i+1),
                    keyyee:i,
                    kindayee:"voter",
                    margin:4
                })
            }
            a.push({
                name:"Voter Center",
                realname:"all voters",
                keyyee:"mean",
                kindayee:"center",
                width: 146, 
                margin:220-146
            })
            for (var i=0; i < model.candidates.length; i++) {
                var c = model.candidates[i]
                a.push({
                    name:_iconButton(c.id),
                    realname:c.id,
                    keyyee:c.id,
                    kindayee:"can",
                    margin:4
                })
            }
            a.push({
                name:"+",
                realname:"Additional Candidate",
                keyyee: "newcan",
                kindayee:"newcan",
                margin:4
            })
            return a
        }
        self.onChoose = function(data){
            // LOAD INPUT
            config.kindayee = data.kindayee
            config.keyyee = data.keyyee
            // CONFIGURE
            self.configure()
            // INIT
            model.initMODEL()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            showMenuItemsIf("divYee",  true) // kind of a holdover from a previous version
            model.kindayee = config.kindayee
            model.keyyee = config.keyyee
        }
        self.select = function() {
            self.choose.highlight("keyyee", config.keyyee);
        }
        self.choose = new ButtonGroup({
            label: "which object for yee map?",
            width: 21,
            data: self.list,
            onChoose: self.onChoose,
        });
        self.choose.dom.setAttribute("id",self.name) // interesting
    }

    ui.menu.yeefilter = new function() { 	// yee filter
        var self = this
        self.name = "yeefilter"
        self.list = [];
        self.makelist = function() {
            var a = []
            var newListSerial = {}
            var newListId = {}
            for (var i=0; i < model.candidates.length; i++) {
                var c = model.candidates[i]
                a.push({
                    name:_iconButton(c.id),
                    realname:c.id,
                    keyyee:c.id,
                    serial: c.serial,
                    margin:4
                })
                if (c.serial in config.yeefilter) {
                    // if (Object.keys(config.yeefilter).includes(c.serial)) {
                    newListSerial[c.serial] = config.yeefilter[c.serial]
                    newListId[c.id] = config.yeefilter[c.serial]
                } else {
                    newListSerial[c.serial] = true
                    newListId[c.id] = true
                }
            }

            // update yeefilter
            config.yeefilter = newListSerial
            model.yeefilter = newListId
            return a
        }
        self.onChoose = function(data){
            // LOAD CONFIG //
            config.yeefilter[data.serial] = data.isOn
            // CONFIGURE
            self.configure()
            // UPDATE
            model.drawArenas();
        };
        self.configure = function() {
            for (var serial in config.yeefilter) {
                var id = Candidate.idFromSerial(serial,config.theme)
                model.yeefilter[id] = config.yeefilter[serial]
            }
            return
            // model.yeefilter = config.yeefilter
        }
        self.select = function() {
            self.choose.highlight("serial", config.yeefilter);
        }
        self.choose = new ButtonGroup({
            label: "filter yee map?",
            width: 21,
            data: self.list,
            onChoose: self.onChoose,
            isCheckboxBool: true
        });
        self.choose.dom.setAttribute("id",self.name)
    }

    ui.menu.gearconfig = new function() { 	// gear config - decide which menu items to do
        var self = this
        // self.name = "gearconfig"
        self.initSpecial = function() {
            // list all the menu items
            self.list = []
            var n=1
            for (var name in ui.menu) {
                self.list.push({name:n,realname:name,margin:1})
                n++
            }
            self.choose = new ButtonGroup({
                label: "which menu options are displayed?",
                width: 18,
                data: self.list,
                onChoose: self.onChoose,
                isCheckbox: true
            });
        }
        self.codebook = [
            {
                decode: {
                    0:"systems",
                    1:"rbSystems",
                    2:"dimensions", // still need to keep this even though it isn't here anymore
                    3:"nVoterGroups",
                    4:"xVoterGroups",
                    5:"group_count",
                    6:"group_spread",
                    7:"nCandidates",
                    8:"firstStrategy",
                    9:"doTwoStrategies",
                    10:"secondStrategy",
                    11:"percentSecondStrategy",
                    12:"autoPoll",
                    13:"frontrunners",
                    14:"poll",
                    15:"yee",
                    16:"yeefilter",
                    17:"gearicon",
                },
                decodeVersion: 2.2,
                field: "featurelist"
            }
        ]

        self.codebook[1] = _jcopy(self.codebook[0])
        _fillInDefaults(self.codebook[1].decode, {
            18:"seats",
            19:"nDistricts",
        })
        self.codebook[1].decodeVersion = 2.4
        
        self.codebook[2] = _jcopy(self.codebook[1])
        _fillInDefaults(self.codebook[2].decode, {
            20: "customNames",
            21: "namelist",
            22: "gearconfig",
            23: "presetconfig",
            24: "choose_pixel_size",
            25: "computeMethod",
            26: "colorChooser",
            27: "colorSpace",
            28: "spread_factor_voters",
            29: "arena_size",
            30: "median_mean",
            31: "theme",
            32: "utility_shape",
            33: "votersAsCandidates",
            34: "ballotVis",
            35: "visSingleBallotsOnly",
            36: "gearoff",
            37: "menuVersion",
            38: "menuLevel",
            39: "stepMenu",
            40: "doFeatureFilter",
            41: "spacer",
            42: "yeeon",
            43: "beatMap",
            44: "ballotConcept",
            45: "powerChart",
            46: "sidebarOn",
            47: "lastTransfer",
        })
        self.codebook[2].decodeVersion = 2.5

        self.onChoose = function(data){
            // LOAD INPUT
            modifyConfigFeaturelist(data.isOn, [data.realname])
            // UPDATE
            self.configure()
        };
        self.configure = function() {
            for (i in ui.menu) {
                if(!config.doFeatureFilter || config.featurelist.includes(i)) {
                    ui.menu[i].choose.dom.hidden = false
                } else {
                    ui.menu[i].choose.dom.hidden = true
                }
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.featurelist);
        }
    }

    ui.menu.presetconfig = new function() { // pick a preset
        var self = this
        self.name = "presetconfig"  // no name needed
        self.list = _buildPresetConfig({nElection:14,nBallot:12})
        function _buildPresetConfig(c) {
            // var presetnames = ["O","SA"]
            // var presetModelNames = [config.filename,"sandbox.html"]
            // var presetdescription = ["original intended preset","sandbox"]
            var presetnames = ["S"]
            var presetModelNames = ["sandbox"]
            var presetdescription = ["sandbox"]

            // and fill in the rest
            for (var i=1;i<=c.nElection;i++) {presetnames.push("e"+i) ; presetModelNames.push("election"+i) ; presetdescription.push("election"+i)}
            presetnames.push("O") ; presetModelNames.push(modelName) ; presetdescription.push("original intended preset")
            // TODO
            for (var i=1;i<=c.nBallot;i++) {presetnames.push("b"+i) ; presetModelNames.push("ballot"+i) ; presetdescription.push("ballot"+i)}
            
            var presetconfig = []
            for (i in presetnames) presetconfig.push({name:presetnames[i],realname:presetdescription[i],modelName:presetModelNames[i],margin:4})
            return presetconfig
        }
        self.onChoose = function(data){
            if (data.isOn) {
                // LOAD MAIN
                var preset = loadpreset(data.modelName)
                var firstletter = data.modelName[0]
                if (firstletter == 'e' || firstletter == 's') {
                    
                    // LOAD Preset
                    config = loadpreset(data.modelName).config
                    
                } else if (firstletter == 'b') {
                    //document.location.replace(data.htmlname);
                    // LOAD Defaults
                    var ballotconfig = {
                        system: "Plurality",
                        voterPositions: [[81,92]],
                        candidatePositions: [[41,50],[153,95],[216,216]],
                        firstStrategy: "zero strategy. judge on an absolute scale.",
                        preFrontrunnerIds: ["square","triangle"],
                        showChoiceOfStrategy: false,
                        showChoiceOfFrontrunners: false,
                        doStarStrategy: false
                    }
                    // LOAD Preset
                    Object.assign(ballotconfig, loadpreset(data.modelName).config )
                    // get config from ballotconfig
                    var systemTranslator = {Plurality:"FPTP",Ranked:"Condorcet",Approval:"Approval",Score:"Score",Three:"3-2-1"}
                    config = {
                        system: systemTranslator[ballotconfig.system],
                        voterPositions: ballotconfig.voterPositions,
                        candidatePositions: ballotconfig.candidatePositions,
                        firstStrategy: ballotconfig.firstStrategy,
                        preFrontrunnerIds: ballotconfig.preFrontrunnerIds,
                        // these are not based on the ballot config
                        oneVoter: true,
                        arena_size: 300
                    }
                    config.featurelist = []
                    if (ballotconfig.showChoiceOfFrontrunners) {config.featurelist.push("frontrunners")}
                    if (ballotconfig.showChoiceOfStrategy) {config.featurelist.push("firstStrategy")}
                }
                // CONFIGURE MAIN
                cleanConfig(config)
                config.sandboxsave = true // we're in a sandbox
                config.featurelist = Array.from((new Set(config.featurelist)).add("gearicon").add("presetconfig"))
                initialConfig = _jcopy(config);
                // CONFIGURE (LOADER)
                model.size = config.arena_size
                // INIT (LOADER)
                model.initDOM()
                // RESET = CREATE, CONFIGURE, INIT, & UPDATE (FOR MODEL)
                model.reset()
                // UPDATE (MENU AND ARENA)
                _objF(ui.arena,"update")
                _objF(ui.menu,"select");
            }
        };
        self.choose = new ButtonGroup({
            label: "pick a preset:",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
		self.init_sandbox = function() {
			self.choose.highlight("modelName", modelName); // only do this once.  Otherwise it would be in updateUI
		}
    }

    ui.menu.choose_pixel_size = new function() {
        var self = this
        self.name = "choose_pixel_size"
        self.list = [
            {name:"60",val:60,margin:4},
            {name:"30",val:30,margin:4},
            {name:"12",val:12,margin:4},
            {name:"6",val:6}
        ]
        self.onChoose = function(data){
            // LOAD
            config.pixelsize = data.val
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.pixelsize = config.pixelsize
        }
        self.select = function() {
            self.choose.highlight("name", config.pixelsize);
        }
        self.choose = new ButtonGroup({
            label: "size of pixels in yee diagram:",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.computeMethod = new function () {
        var self = this
        // self.name = computeMethod
        self.list = [
            {name:"gpu",margin:4},
            {name:"js",margin:4},
            {name:"ez"}
        ]
        self.onChoose = function(data){
            // LOAD
            config.computeMethod = data.val
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.computeMethod = config.computeMethod
        }
        self.select = function() {
            self.choose.highlight("name", config.computeMethod);
        }
        self.choose = new ButtonGroup({
            label: "method of computing yee diagram:",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.colorChooser = new function () {
        var self = this
        // self.name = computeMethod
        self.list = [
            {name:"pick and repeat",margin:4},
            {name:"pick and repeat w/ offset",margin:4},
            {name:"generate all",margin:4},
            {name:"pick and generate"}
        ]
        self.codebook = [
            {
                field: "colorChooser",
                decodeVersion: 2.2,
                decode: {
                    0:"pick and repeat",
                    1:"pick and repeat w/ offset",
                    2:"generate all",
                    3:"pick and generate"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.colorChooser = data.name
            // CONFIGURE
            self.configure()
            // INIT
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            model.initMODEL()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.colorChooser = config.colorChooser
        }
        self.select = function() {
            self.choose.highlight("name", config.colorChooser);
        }
        self.choose = new ButtonGroup({
            label: "Method of Choosing Colors:",
            width: 220,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.colorSpace = new function () {
        var self = this
        // self.name = computeMethod
        self.list = [
            {name:"hsluv with dark"}
            // ,margin:4},
            // {name:"hsluv light",margin:4},
            // {name:"cie sampling",margin:4},
            // {name:"hsl with dark"}
        ]
        self.codebook = [
            {
                field: "colorSpace",
                decodeVersion: 2.2,
                decode: {
                    0:"hsluv with dark"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.colorSpace = data.name
            // CONFIGURE
            self.configure()
            // INIT
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            // model.initMODEL()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.colorSpace = config.colorSpace
        }
        self.select = function() {
            self.choose.highlight("name", config.colorSpace);
        }
        self.choose = new ButtonGroup({
            label: "Method of Choosing Colors:",
            width: 220,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.spread_factor_voters = new function () {
        var self = this
        // self.name = spread_factor_voters
        self.list = [
            {name:"1",val:1,margin:4},
            {name:"2",val:2,margin:4},
            {name:"5",val:5}
        ]
        self.onChoose = function(data){
            // LOAD
            config.spread_factor_voters = data.val
            // CONFIGURE
            self.configure()
            // INIT
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
            model.arena.pileVoters()
            model.arena.redistrict()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.spread_factor_voters = config.spread_factor_voters
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].spread_factor_voters = config.spread_factor_voters
            }
        }
        self.select = function() {
            self.choose.highlight("name", config.spread_factor_voters);
        }
        self.choose = new ButtonGroup({
            label: "Voter Spread:",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.arena_size = new function () {
        var self = this
        // self.name = "arena_size"
        self.list = [
            {name:"300",val:300,margin:4},
            {name:"600",val:600}
        ]
        self.codebook = [
            {
                field: "arena_size",
                decodeVersion: 2.2,
                decode: {
                    0:300,
                    1:600
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            var ratio = data.val / config.arena_size
            config.arena_size = data.val
            if ("300" == data.val) config.spread_factor_voters = 1
            if ("600" == data.val) config.spread_factor_voters = 2
            // CONFIGURE
            self.configure()
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].x *= ratio
                model.voters[i].y *= ratio
            }
            for (var i=0; i<model.candidates.length; i++) {
                model.candidates[i].x *= ratio
                model.candidates[i].y *= ratio
            }
            // INIT (LOADER)	
            model.initDOM()
            // INIT
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
            model.arena.pileVoters()
            model.arena.redistrict()
            for (var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            // UPDATE
            model.update()
            _objF(ui.arena,"update")
            ui.menu.spread_factor_voters.select()
        };
        self.configure = function() {
            // CONFIGURE (LOADER)
            model.size = config.arena_size
            // CONFIGURE
            model.spread_factor_voters = config.spread_factor_voters
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].spread_factor_voters = config.spread_factor_voters
            }
        }
        self.select = function() {
            self.choose.highlight("name", config.arena_size);
        }
        self.choose = new ButtonGroup({
            label: "Arena size:",
            width: 41,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.median_mean = new function () {
        var self = this
        // self.name = "median_mean"
        self.list = [
            {name:"median",val:2,margin:4},
            {name:"mean",val:1}
        ]

        self.onChoose = function(data){
            // LOAD
            config.median_mean = data.val
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.median_mean = config.median_mean
        }
        self.select = function() {
            self.choose.highlight("val", config.median_mean);
        }
        self.choose = new ButtonGroup({
            label: "Median or Mean:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.theme = new function () {
        var self = this
        // self.name = "theme"
        self.list = [
            {name:"Default",realname:"Default",margin:4},
            {name:"Nicky",realname:"The original style theme by Nicky Case",margin:4},
            {name:"Bees",realname:"The Bee mode style for Unsplit."},
            {name:"Letters",realname:"Use Letters for Candidates",margin:4}
        ]

        self.codebook = [
            {
                field: "theme",
                decodeVersion: 2.2,
                decode: {
                    0:"Default",
                    1:"Nicky",
                    2:"Bees",
                    3:"Letters"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.theme = data.name
            // CONFIGURE
            self.configure()
            // INIT MODEL
		    model.arena.initARENA()
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            // INIT SANDBOX
            self.init_sandbox()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.theme = config.theme
            if (config.theme == "Bees") {
                model.showVoters = false
                model.doBuzz = true
                model.buzzInterval = setInterval(function(){
                    if (model.doBuzz) {
                        model.buzz()
                        model.update()
                    }
                },60)
            } else {
                model.showVoters = true
                model.doBuzz = false
                clearInterval(model.buzzInterval)
            }
        }
        self.init_sandbox = function() {
            for (var i = 0; i < self.list.length; i++) {
               basediv.classList.remove("div-model-theme-" + self.list[i].name)
            }
            basediv.classList.add("div-model-theme-" + model.theme)
        }
        self.select = function() {
            self.choose.highlight("name", config.theme);
        }
        self.choose = new ButtonGroup({
            label: "Theme:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.utility_shape = new function () {
        var self = this
        // self.name = "utility_shape"
        self.list = [
            {name:"linear",margin:4},
            {name:"quadratic",margin:4},
            {name:"log"}
        ]
        self.codebook = [
            {
                field: "utility_shape",
                decodeVersion: 2.2,
                decode: {
                    0:"linear",
                    1:"quadratic",
                    2:"log"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.utility_shape = data.name
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.utility_shape = config.utility_shape
        }
        self.select = function() {
            self.choose.highlight("name", config.utility_shape);
        }
        self.choose = new ButtonGroup({
            label: "Utility Shape:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.votersAsCandidates = new function () {
        var self = this
        // self.name = "votersAsCandidates"
        self.list = [
            {name:"yes",value:true,margin:4},
            {name:"no",value:false}
        ]
        self.codebook = [
            {
                field: "votersAsCandidates",
                decodeVersion: 2.5,
                decode: {
                    0:"yes",
                    1:"no"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.votersAsCandidates = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.votersAsCandidates = config.votersAsCandidates
        }
        self.select = function() {
            self.choose.highlight("value", config.votersAsCandidates);
        }
        self.choose = new ButtonGroup({
            label: "Voters as Candidates:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.ballotVis = new function () {
        var self = this
        // self.name = "ballotVis"
        self.list = [
            {name:"yes",value:true,margin:4},
            {name:"no",value:false}
        ]
        self.codebook = [
            {
                field: "ballotVis",
                decodeVersion: 2.5,
                decode: {
                    0:"yes",
                    1:"no"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.ballotVis = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.ballotVis = config.ballotVis
        }
        self.select = function() {
            self.choose.highlight("value", config.ballotVis);
        }
        self.choose = new ButtonGroup({
            label: "Show Ballot Visuals:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.visSingleBallotsOnly = new function () {
        var self = this
        // self.name = "visSingleBallotsOnly"
        self.list = [
            {name:"yes",value:true,margin:4},
            {name:"no",value:false}
        ]
        self.codebook = [
            {
                field: "visSingleBallotsOnly",
                decodeVersion: 2.5,
                decode: {
                    0:"yes",
                    1:"no"
                }
            }
        ]
        self.onChoose = function(data){
            // LOAD
            config.visSingleBallotsOnly = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update()
        };
        self.configure = function() {
            model.visSingleBallotsOnly = config.visSingleBallotsOnly
        }
        self.select = function() {
            self.choose.highlight("value", config.visSingleBallotsOnly);
        }
        self.choose = new ButtonGroup({
            label: "Only Visualize Single Voters:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
    }

    ui.menu.gearicon = new function () {
        // gear button (combines with above)
        var self = this
        // self.name = gearicon
        self.list = [
            {name:"config"}
        ]
        self.isOn = false // by default
        self.onChoose = function(data){
            // LOAD
            self.isOn = data.isOn
            // no config.gearicon because we don't want to save with the config menu open
            // UPDATE
            self.configure()
            // gear means 
        };
        self.configure = function() {
            if (self.isOn) {
                m1.menuNameDivs["gearList"][0].hidden = false
            } else {
                m1.menuNameDivs["gearList"][0].hidden = true
            }
        }
        // no select because we don't want to save with the config menu open
        self.choose = new ButtonGroup({
            label: "",
            width: 71,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        })
    }

    ui.menu.gearoff = new function () {
        var self = this
        // self.name = gearoff
        self.list = [
            {name:"are you sure?",realname:"You won't be able to get the config back, so I'd recommend saving first and then disabling the config and then saving again.  That way you still have a copy that you can edit later if you made a mistake."}
        ]
        self.onChoose = function(data){
            // LOAD INPUT
            var hit = data.isOn
            if (hit) {
                var response = window.confirm("Press cancel and we can forget this ever happened.  Or press the other button and the config options will be removed.")
                config.hidegearconfig = response
                self.configure()
            }
        }
        self.configure = function() {
            if (config.hidegearconfig) {
                modifyConfigFeaturelist(false, ["gearicon"])
                ui.menu.gearicon.choose.dom.hidden = true
                ui.menu.gearicon.onChoose({isOn:false})

            }
        }
        // no select because it's either hidden or off
        self.choose = new ButtonGroup({
            label: "Disable Config Button !no",
            width: 220,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });
    }











    // if there is nothing in the menu, then don't show the option.

    // menuLevel select

    // submenu select

    // button to switch between old and new menus
    
    // menu version
    // set the default config to the old menu

    // set the preset config for the sandbox to the new menu
    

    // menuLevel select

    ui.menu.menuVersion = new function () {
        var self = this
        // self.name = menuVersion
        self.list = [
            {name:"1",value:"1",margin:4},
            {name:"2",value:"2"}
        ]
        self.onChoose = function(data){
            // LOAD
            config.menuVersion = data.value
            // CONFIGURE
            self.configure()
        };
        self.configure = function() {

            // remove nodes from menu
            // clearMenus()
            
            // reattach nodes
            if (config.menuVersion === "1") {
                m1.buildSubMenus()
            } else {
                // 
                ui.menu.doFeatureFilter.onChoose({value:false})
                ui.menu.doFeatureFilter.select()

                m2.buildSubMenus() // place menu items into dom structure
            }
            menu_update() // actually hide/show things
        }
        self.choose = new ButtonGroup({
            label: "Menu Version:",
            width: 71,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.menuVersion);
        }
    }

    ui.menu.menuLevel = new function () {
        var self = this
        // self.name = menuLevel
        self.list = [
            // {name:"basic",value:"basic",margin:4},
            {name:"stock",value:"normal",margin:4},
            {name:"more",value:"advanced"}
        ]
        self.codebook = [ {
            field: "menuLevel",
            decodeVersion: 2.5,
            decode: {
                0:"normal",  // stock?
                1:"advanced" // epic?
            }
        } ]
        self.onChoose = function(data){
            // LOAD
            config.menuLevel = data.value
            // CONFIGURE
            self.configure()
        };
        self.configure = function() {
            opts = ui.menu.stepMenu.choose.dom.children // stepMenu options

            if (config.menuLevel === "normal") { // hide advanced features
                for( var dom of m2.menuNameDivs["advanced"]) {
                    dom.hidden = true
                }
                opts[5].hidden = true // these options only have advanced features
                opts[6].hidden = true
            } else if (config.menuLevel === "advanced") {
                for( var dom of m2.menuNameDivs["advanced"]) {
                    dom.hidden = false
                }
                opts[5].hidden = false
                opts[6].hidden = false
            }
        }
        self.choose = new ButtonGroup({
            label: "Options:", // Level of Expertise
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.menuLevel);
        }
    }

    ui.menu.stepMenu = new function () {
        var self = this
        // self.name = stepMenu
        self.list = [
            {name:"geom",value:"geom",margin:4},
            {name:"style",value:"style",margin:4},
            {name:"vote",value:"vote",margin:4},
            {name:"viz",value:"viz",margin:0},
            {name:"ui",value:"ui",margin:4},
            {name:"dev",value:"dev"}
        ]
        self.codebook = [ {
            field: "stepMenu",
            decodeVersion: 2.5,
            decode: {
                0:"geom",
                1:"style",
                2:"vote",
                3:"viz",
                4:"ui",
                5:"dev"
            }
        } ]
        self.onChoose = function(data){
            // LOAD
            config.stepMenu = data.value
            // CONFIGURE
            self.configure()
        };
        self.configure = function() {
            for (var e of self.list) {
                m2.menuNameDivs[e.value][0].hidden = true
            }
            // one on
            m2.menuNameDivs[config.stepMenu][0].hidden = false
        }
        self.choose = new ButtonGroup({
            label: "Steps:", // Sub Menu
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.stepMenu);
        }
    }

    
    ui.menu.doFeatureFilter = new function () {
        var self = this
        // self.name = doFeatureFilter
        self.list = [
            {name:"yes",value:true,margin:4},
            {name:"no",value:false},
        ]
        self.onChoose = function(data){
            // LOAD
            config.doFeatureFilter = data.value
            // CONFIGURE
            self.configure()
        };
        self.configure = function() {
            ui.menu.gearconfig.configure()
        }
        self.choose = new ButtonGroup({
            label: "Enable filtering of menu items?:", // Sub Menu
            width: 108,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.doFeatureFilter);
        }
    }

    ui.menu.spacer = new function () {
        var self = this
        self.choose = {}
        self.choose.dom = document.createElement("div")
        self.choose.dom.className = "topMenuSpacer"
    }


    ui.menu.yeeon = new function () {
        // win map (+on off)
        var self = this
        // self.name = yeeon
        self.list = [
            {name:"on",value:true,margin:4},
            {name:"off",value:false},
        ]
        self.onChoose = function(data){
            // LOAD
            config.yeeon = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            if (config.yeeon) {
                model.update() // need to calculate
            } else {
                model.draw()
            }
        };
        self.configure = function() {
            showMenuItemsIf("divWinMap", config.yeeon)
            model.yeeon = config.yeeon
        }
        self.choose = new ButtonGroup({
            label: "Draw Win Map (Yee's Diagram)?", // Sub Menu
            width: 108,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.yeeon);
        }
    }


    ui.menu.beatMap = new function () {
        // win map (+on off)
        var self = this
        // self.name = beatMap
        self.list = [
            {name:"auto",value:"auto",margin:4},
            {name:"on",value:"on",margin:4},
            {name:"off",value:"off"},
        ]
        self.onChoose = function(data){
            // LOAD
            config.beatMap = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            if (config.beatMap == "off") {
                model.draw()
            } else {
                model.update() // might need to calculate
            }
        };
        self.configure = function() {
            model.beatMap = config.beatMap
        }
        self.choose = new ButtonGroup({
            label: "Beat Map", // Sub Menu
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.beatMap);
        }
    }


    ui.menu.ballotConcept = new function () {
        // win map (+on off)
        var self = this
        // self.name = ballotConcept
        self.list = [
            {name:"auto",value:"auto",margin:4},
            {name:"on",value:"on",margin:4},
            {name:"off",value:"off"},
        ]
        self.onChoose = function(data){
            // LOAD
            config.ballotConcept = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            if (config.ballotConcept == "off") {
                model.draw()
            } else {
                model.update() // might need to calculate
            }
        };
        self.configure = function() {
            model.ballotConcept = config.ballotConcept
        }
        self.choose = new ButtonGroup({
            label: "Ballot conceptualization:", // Sub Menu
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.ballotConcept);
        }
    }


    ui.menu.powerChart = new function () {
        // win map (+on off)
        var self = this
        // self.name = powerChart
        self.list = [
            {name:"auto",value:"auto",margin:4},
            // {name:"on",value:"on",margin:4},
            {name:"off",value:"off"},
        ]
        self.onChoose = function(data){
            // LOAD
            config.powerChart = data.value
            // CONFIGURE
            self.configure()
            // INIT
            if (config.sidebarOn == "auto") {
                model.update()
            }
        };
        self.configure = function() {
            model.powerChart = config.powerChart
            if (model.checkGotoTarena()) { // TODO: make a visualization for more than 1 district
                model.tarena.canvas.hidden = false
            } else {
                model.tarena.canvas.hidden = true
            }
        }
        self.choose = new ButtonGroup({
            label: "Power Chart:", // Sub Menu
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.powerChart);
        }
    }

    ui.menu.sidebarOn = new function () {
        // win map (+on off)
        var self = this
        // self.name = sidebarOn
        self.list = [
            // {name:"auto",value:"auto",margin:4},
            {name:"on",value:"on",margin:4},
            {name:"off",value:"off"},
        ]
        self.onChoose = function(data){
            // LOAD
            config.sidebarOn = data.value
            // CONFIGURE
            self.configure()
            // UPDATE
            if (config.sidebarOn == "on") {
                model.update()
            }
        };
        self.configure = function() {
            model.optionsForElection.sidebar = (config.sidebarOn == "on")
            if (config.sidebarOn == "on") {
                model.caption.hidden = false
            } else {
                model.caption.hidden = true
            }
        }
        self.choose = new ButtonGroup({
            label: "Written Results:", // Sub Menu
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.sidebarOn);
        }
    }

    
    ui.menu.lastTransfer = new function () {
        // win map (+on off)
        var self = this
        // self.name = lastTransfer
        self.list = [
            // {name:"auto",value:"auto",margin:4},
            {name:"on",value:"on",margin:4},
            {name:"off",value:"off"},
        ]
        self.onChoose = function(data){
            // LOAD
            config.lastTransfer = data.value
            // CONFIGURE
            self.configure()
            // INIT
            model.update() // must re-run election
        };
        self.configure = function() {
            model.opt.IRV100 = (config.lastTransfer == "on")
        }
        self.choose = new ButtonGroup({
            label: "Show Last Transfer for Transferable Methods?", // Sub Menu
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.select = function() {
            self.choose.highlight("value", config.lastTransfer);
        }
    }







    // run this after loading the whole menu
    ui.menu.gearconfig.initSpecial()




    // rebuild menu

    // function to make menu items visible/hidden

    // but there are some submenus that are dependent on selections from other menus,
    // so we need to run the choose operations for those menu items
    // well, visibility is hard to compute.   There are a series of checks that must all be positive.
    // There is a list of checks.  Each triggering menu item needs to add a check to the list.
    // Or, otoh, a tree would be simpler.  Each menu item sets the visibility flag on a visibility tree.
    // Updating the menu consists of traversing the tree and checking visibility at each node.
    // Decide whether to go to subnodes.
    // Some menu items, like "advanced", affect multiple nodes belonging to the advanced class.


    // Put all in order


    // In version 1, I had a single list, featurelist, that would be controlled by many buttons.
    // In version 2, I skip the featurelist and control the divs directly from the buttons.
    // That means version 2 has 
    // CONFIGURE is the right step to control the divs
    // I also have a leftover menu where I can add another control to the divs.  So I'm going to put two divs,
    // which is kind of redundant but works.




    /////////////////
    // BUILD MENUS //
    /////////////////


    menu1 = [
        ["gearicon", [
            "gearicon",
        ]],
        [ "gearList", [
            "doFeatureFilter",
            "gearconfig", // start of hidden list
            "presetconfig",
            "menuVersion",
            "computeMethod",
            "colorChooser",
            "colorSpace",
            "spread_factor_voters",
            "arena_size",
            "median_mean",
            "utility_shape",
            "votersAsCandidates",
            "ballotVis",
            "visSingleBallotsOnly",
            "gearoff",
        ]],
        [ "main", [
            "systems", // start of normal list
            [ "divRBVote", [
                "rbSystems",
            ]],
            "dimensions",
            "nDistricts",
            "seats",
            "nVoterGroups",
            [ "divXVoterGroups", [
                "xVoterGroups",
                "group_count",
                "group_spread",
            ]],
            "nCandidates",
            "theme",
            "customNames",
            ["divCustomNames", [
                "namelist",
            ]],
            "firstStrategy",
            "doTwoStrategies",
            [ "divSecondStrategy", [
                "secondStrategy",
                "percentSecondStrategy",
            ]],
            // "primaries", // not doing this one, comment out
            [ "divPoll", [
                "autoPoll",
                [ "divManualPoll", [
                    "frontrunners",
                    "poll",
                ]],
            ]],
            "yeeon",
            ["divWinMap", [
                "yee",
                ["divYee", [
                    "yeefilter" ,
                    "choose_pixel_size"
                ]],
            ]],
            "beatMap",
            "ballotConcept",
            "powerChart",
            "sidebarOn",
            ["divLastTransfer", [
                "lastTransfer",
            ]]
        ]],
        [ "hidden", [ // hidden menu - for things that don't fit into the other spots
            "stepMenu",
            "menuLevel",
            "spacer",
        ]],
    ]


    // organize into submenus

    menu2 = [
        ["topmenu", [
            "stepMenu",
            "menuLevel",
            "spacer",
        ]],
        [ "submenu", [
            [ "geom", [
                [ "normal", [
                    "dimensions",
                    "nDistricts",
                    "nVoterGroups",
                    [ "divXVoterGroups", [
                        "xVoterGroups",
                        "group_count",
                        "group_spread",
                    ]],
                    "nCandidates",
                ]],
                [ "advanced", [
                    "spread_factor_voters",
                    "arena_size",
                    "median_mean",
                    "utility_shape",
                    "votersAsCandidates",
                ]],
            ]],
            ["style", [
                ["normal", [
                    "theme",
                    "customNames",
                    ["divCustomNames", [
                        "namelist",
                    ]],
                ]],
                ["advanced", [
                    "colorChooser",
                    "colorSpace",
                ]],
            ]],
            ["vote", [
                ["normal", [
                    "systems",
                    [ "divRBVote", [
                        "rbSystems",
                    ]],
                    "seats",
                    "firstStrategy",
                    "doTwoStrategies",
                    [ "divSecondStrategy", [
                        "secondStrategy",
                        "percentSecondStrategy",
                    ]],
                    [ "divPoll", [
                        "autoPoll",
                        [ "divManualPoll", [
                            "frontrunners",
                            "poll",
                        ]],
                    ]],
                    // "primaries", // not doing this one, comment out               
                ]],
                ["advanced", [
                    
                ]],
            ]],
            ["viz", [
                ["normal", [
                    "yeeon",
                    ["divWinMap", [
                        "yee",
                        ["divYee", [
                            "yeefilter" ,
                            "choose_pixel_size"
                        ]],
                    ]],
                    "beatMap",
                    "ballotConcept",
                    "powerChart",
                    "sidebarOn",
                    ["divLastTransfer", [
                        "lastTransfer",
                    ]]
                ]],
                ["advanced", [
                    "ballotVis",
                    "visSingleBallotsOnly",
                ]],
            ]],
            ["ui", [
                ["normal", [
                ]],
                ["advanced", [
                    "menuVersion",
                    "doFeatureFilter",
                    "gearconfig", 
                    "presetconfig",
                ]],
            ]],
            ["dev", [
                ["normal", [

                ]],
                ["advanced", [
                    "computeMethod",
                ]],
            ]],
        ]],
        ["hidden", [
            "gearoff",
            "gearicon",
        ]],
    ]

    // TODO
    // basic = [
    //     "systems",
    //     "nCandidates",
    //     "nVoterGroups",
    // ]


    var m1 = new menuTree()
    m1.assignMenu( menu1 , basediv.querySelector("#left"), "basediv" )
    // detail: seems harmless, but the basediv gets reattached.
    
    m1.menuNameDivs["gearList"][0].hidden = true
    m1.menuNameDivs["hidden"][0].hidden = true

    m1.buildSubMenus()
    

    var m2 = new menuTree()
    m2.assignMenu( menu2 , basediv.querySelector("#left"), "basediv" )

    m2.menuNameDivs["hidden"][0].hidden = true

    
    function menuTree() {
        var self = this

        // Loop through and collect nodes with the same name into a list
        // Later, during build, use that list to turn divs on and off

        // append all the menu dom elements to the menu


        self.menuNameDivs = {}
        // Here are all the divs that correspond to names to toggle on and off
        // list of submenu doms to turn on/off

        var ap = []
        // Here are all the attachments points for the nodes
        // Now I just need a list of the child doms for each one
        // so that later I can loop through all the attachment points and attach the children.
        // ap[i].parent: parent div
        // ap[i].children:  [array of divs to attach]
        
        self.assignMenu = function(m,parent,parentName) {
            var children = []
            var childrenNames = []
            for (var a of m) {
                if (typeof a === "string") { // child
                    var div = ui.menu[a].choose.dom
                    var aName = a
                } else { // parent
                    var div = document.createElement("div")
                    parent.appendChild(div)
                    var aName = a[0]
                    if (self.menuNameDivs[aName] == undefined) {
                        self.menuNameDivs[aName] = []
                    }
                    self.menuNameDivs[aName].push(div)
                    self.assignMenu(a[1],div,aName) // recursion
                }
                children.push(div)
                childrenNames.push(aName)
            }
            ap.push({parentName:parentName,childrenNames:childrenNames,parent:parent,children:children})
        }
    
        // To build the menu, it's really easy, just attach the divs for the menu items to the submenu div structure
        self.buildSubMenus = function() {
            for (var a of ap) {
                for(var child of a.children) {
                    a.parent.appendChild(child)
                }
            }
        }

    }

    // helper
    function showMenuItemsIf(name,condition) {
        if (condition) {
            m1.menuNameDivs[name][0].hidden = false
            m2.menuNameDivs[name][0].hidden = false
        } else {
            m1.menuNameDivs[name][0].hidden = true
            m2.menuNameDivs[name][0].hidden = true
        }
    }


    //////////////////////////
    //////// RESET... ////////
    //////////////////////////

    ui.arena = {}
    ui.arena.reset = new function() {
        var self = this
        var resetDOM = document.createElement("div");
        resetDOM.id = "reset";
        resetDOM.innerHTML = "reset";
        resetDOM.onclick = function(){
            // LOAD INITIAL CONFIG
            config = _jcopy(initialConfig); // RESTORE IT!
            // RESET = CREATE, CONFIGURE, INIT, & UPDATE
            model.reset()
            // UPDATE MENU //
            _objF(ui.menu,"select");
        };
        basediv.querySelector("#center").appendChild(resetDOM);
        self.dom = resetDOM
    }

    //////////////////////////////////
    /////// SAVE & SHARE, YO! ////////
    //////////////////////////////////

    ui.arena.desc = new function() { // Create a description up top
        var self = this
        var descDOM = document.createElement("div");
        descDOM.id = "description_container";
        var refNode = basediv.querySelector("#left");
        basediv.insertBefore(descDOM, refNode);
        var descText = document.createElement("textarea");
        descText.id = "description_text";
        descText.placeholder = "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob."

        containText = document.createElement("div");
        containText.id = "double_description_container";
        descDOM.appendChild(containText);
        containText.appendChild(descText);
		// yay.
		self.init_sandbox = function() {
			descText.value = initialConfig.description;
		}
        self.update = function () {
            
            if (config.sandboxsave) {
                basediv.querySelector("#center").style.width = config.arena_size + model.border*2 + "px"
                descDOM.hidden = false
                descText.hidden = false
            } else {
                descDOM.hidden = true
                descText.hidden = true
            }
        }
        self.dom = descDOM
        self.text = {}
        self.text.dom = descText
    }

    ui.arena.save = new function() { // Create a "save" button
        var self = this
        var saveDOM = document.createElement("div");
        saveDOM.id = "save";
        saveDOM.innerHTML = "save:";
        saveDOM.onclick = function(){
            // UPDATE CONFIG //
            config.sandboxsave = true // this seems to fix a bug
            var pos = savePositions()  // saves the candidate and voter positions in the config.
            for (i in pos) config[i] = pos[i]  // for some weird reason config doesn't have the correct positions, hope i'm not introducing a bug
            // Description
            var description = basediv.querySelector("#description_text") || {value:""};
            config.description = description.value;
            // UPDATE MAIN //
            initialConfig = _jcopy(config); // now the reset button will restore these saved settings
            // UPDATE SAVE URL //
            _writeURL(config);
            // CONSOLE OUTPUT //
            console_out(1,config)  // gives a log of settings to copy and paste
            

        };
        basediv.querySelector("#center").appendChild(saveDOM);
        self.dom = saveDOM
    }

    ui.arena.linkText = new function() { // The share link textbox
        var self = this
        var linkText = document.createElement("input");
        linkText.id = "savelink";
        linkText.placeholder = "[when you save your model, a link you can copy will show up here]";
        linkText.setAttribute("readonly", true);
        linkText.onclick = function(){
            linkText.select();
        };
        basediv.querySelector("#center").appendChild(linkText);
        self.dom = linkText
    }

    var tinyLink = document.createElement("a")
    centerDiv.appendChild(tinyLink)
    tinyLink.setAttribute("target", "_blank")
    tinyLink.setAttribute("class", "tinyURL")

    var embed = false
    var embedLink = document.createElement("span")
    centerDiv.appendChild(embedLink)
    embedLink.setAttribute("class", "tinyURL")
    embedLink.setAttribute("style", "text-decoration: underline;")
    embedLink.onclick = function(){
        embed = ! embed
        ui.arena.save.dom.onclick()
    }




    ///////////////////////////
    ////// SAVE POSITION //////
    ///////////////////////////

    var savePositions = function(log){ 
        // The positions of voters and candidates are not held in config.
        // So, we need to save them occasionally.

        // Candidate positions
        var positions = [];
        var serials = [];
        var b = []
        for(var i=0; i<model.candidates.length; i++){
            var candidate = model.candidates[i];
            positions.push([
                Math.round(candidate.x),
                Math.round(candidate.y)
            ]);
            serials.push(candidate.serial)
            b.push(candidate.b)
        }
        if(log) console.log("candidatePositions: "+JSON.stringify(positions));
        var candidatePositions = positions;

        // Voter positions
        positions = [];
        vTypes = []
        x = []
        snowman = []
        disk = []
        // voter types are varied in style
        for(var i=0; i<model.voters.length; i++){
            var voter = model.voters[i];
            positions.push([
                Math.round(voter.x),
                Math.round(voter.y)
            ]);
            vTypes.push(voter.voterGroupType)
            x.push(voter.x_voters)
            snowman.push(voter.snowman)
            disk.push(voter.disk)
        }
        if(log) console.log("voterPositions: "+JSON.stringify(positions));
        var voterPositions = positions;

        // positions!
        return {
            candidatePositions: candidatePositions,
            voterPositions: voterPositions,
            candidateSerials: serials,
            candidateB: b,
            voterGroupTypes: vTypes,
            voterGroupX: x,
            voterGroupSnowman: snowman,
            voterGroupDisk: disk
        };

    };

    var console_out = function (log,config){
        // helper function to output the config to the console.
        var logtext = ''
        for (i in config) {
            logtext += i + ": " +JSON.stringify(config[i]) + ',\n'
            // logtext += '"' + i + '",\n' // for codebook
        }
        var aloc = window.location.pathname.split('/')
        //logtext += "\n\npaste this JSON into" + aloc[aloc.length-2] + "/" + aloc[aloc.length-1]
        logtext += "\n\npaste this JSON into /play/js/Presets.js under option " + aloc[aloc.length-1]
        console.log(logtext)
        if (log==2) console.log(JSON.stringify(config))
    }
    window.jsave = function(){
        // I used to use jsave() to output to console for debugging.
        var pos = savePositions()  // saves the candidate and voter positions in the config.
        for (i in pos) config[i] = pos[i] 
        console_out(1,config)
    }

    var _writeURL = function(config){

        // URI ENCODE!
        var doEncode = true
        if (doEncode) {
            var eConfig = encode_config(config)
        } else {
            var eConfig = config
        }
        if (tryNewURL) {
            var uri = encodeURIComponent(eConfig)
        } else {
            var uri = encodeURIComponent(JSON.stringify(eConfig));
        }
        
        // Put it in the save link box!
        
        // make link string
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host; // http://ncase.me/
        var restofurl = getUrl.pathname.split('/')
        for (var i=1; i < restofurl.length - 1; i++) { //  /ballot/
            if (restofurl[i] != "sandbox") {
                baseUrl += "/" + restofurl[i];
            }
        }
        if (embed) {            
		    relativePath = "/sandbox/embedbox.html?v="
        } else {
            relativePath = "/sandbox/?v="
        }
        if (tryNewURL) {
            var link = baseUrl + relativePath + config.configversion + "&m="+uri;    
        } else {
            var link = baseUrl + relativePath + uri;
        }
        if (embed) {            
		    linkText = '<iframe src="' + link + '" scrolling="yes" width="1000" height="600"></iframe>'
        } else {
            linkText = link
        }
        
        var doTinyURL = true
        if (doTinyURL) {
            var goTiny='https://tinyurl.com/create.php?url='+encodeURIComponent(link)
            tinyLink.setAttribute("href",goTiny)
            tinyLink.innerHTML = `TinyURL<img src="play/img/external_link.svg">`
            embedLink.innerHTML = "&lt;embed&gt;";
        }
        
        var savelink = basediv.querySelector("#savelink");
        savelink.value = "saving...";
        setTimeout(function(){
            savelink.value = linkText;
        },750);
        console.log("(Link length is ",linkText.length,")")
        console.log("")

    };
    

    // HOWTO: Add to the end of the list.  Don't add to the middle of this list.
    // safer: use a dictionary
    // These are the fields that show up in the URL, so we shorten them.
    decodeFields = {
        0:"candidatePositions",
        1:"voterPositions",
        2:"candidates",
        3:"dimensions",
        4:"system",
        5:"hidegearconfig",
        // "configversion",
        6:"secondStrategies",
        7:"percentSecondStrategy",
        8:"voter_group_count",
        9:"voter_group_spread",
        10:"sandboxsave",
        11:"featurelist",
        12:"description",
        13:"keyyee",
        14:"snowman",
        15:"x_voters",
        16:"oneVoter",
        17:"rbsystem",
        18:"numOfCandidates",
        19:"numVoterGroups",
        20:"xNumVoterGroups",
        21:"nVoterGroupsRealName",
        22:"spread_factor_voters",
        23:"arena_size",
        24:"median_mean",
        25:"theme",
        26:"utility_shape",
        27:"colorChooser",
        28:"colorSpace",
        29:"arena_border",
        30:"preFrontrunnerIds",
        31:"autoPoll",
        32:"firstStrategy",
        33:"secondStrategy",
        34:"doTwoStrategies",
        35:"yeefilter",
        36:"computeMethod",
        37:"pixelsize",
        38:"optionsForElection", // no longer used, but okay to have
        39:"candidateSerials",
        40:"voterGroupTypes",
        41:"voterGroupX",
        42:"voterGroupSnowman",
        43:"voterGroupDisk",
        44:"seats",
        45:"candidateB",
        46:"nDistricts",
        47:"votersAsCandidates",
        48:"visSingleBallotsOnly",
        49:"ballotVis",
        50:"customNames",
        51:"namelist",
        52:"menuVersion",
        53:"stepMenu",
        54:"menuLevel",
        55:"doFeatureFilter",
        56:"yeeon",
        57:"beatMap",
        58:"kindayee",
        59:"ballotConcept",
        60:"powerChart",
        61:"sidebarOn",
        62:"lastTransfer",
    } // add more on to the end ONLY
        
    var encodeFields = {}
    for ([i,v] of Object.entries(decodeFields)) {
        i = Number(i)
        encodeFields[v] = i
    }

    // additional codebooks
    var extraCodeBook = [
        {
            decode:[
                "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob."
            ],
            decodeVersion: 2.2,
            field: "description"
        }
    ]

    // set up encoders
    for (var e in ui.menu) {
        var item = ui.menu[e]
        if (item.codebook) {
            _makeEncode(item.codebook)
        }
    }
    _makeEncode(extraCodeBook)
    function _makeEncode(codebook) {
        for (k = 0; k < codebook.length; k++) {
            var decode = codebook[k].decode
            var encode = {}
            for (var [i,v] of Object.entries(decode)) {
                var value = JSON.stringify(v)
                i = Number(i)
                encode[value] = i
            }
            codebook[k].encode = encode
        }
    }

    var doFriendlyURI = true


    function encode_config(config) {
        var conf = _jcopy(config)
        for (var e in ui.menu) {
            var item = ui.menu[e]
            if (item.codebook) {  
                _encode(item.codebook)
            }
        }
        _encode(extraCodeBook)
        
        function _encode(codebook) {
            for (k = 0; k < codebook.length; k++) {
                var encode = codebook[k].encode
                var field = codebook[k].field
                var value = conf[field]
                var _lookup = function(v) {
                    vs = JSON.stringify(v)
                    if (vs in encode) {
                        return encode[vs]
                    } else {
                        return "~" + vs // store as JSON String, and set a flag character
                    }
                }
                if (Array.isArray(value)) {
                    var temp = []
                    for (var i =0; i < value.length; i++) {
                        temp.push(_lookup(value[i]))
                    }
                    conf[field] = temp
                } else {
                    conf[field] = _lookup(value) //  TODO: it is possible there could be a collision in encoded/decoded values
                }
            }
        }
        //
        // encode field names
        for (var i in encodeFields) {
            var n = encodeFields[i]
            conf[n] = conf[i]
            delete conf[i]
        }
        // zip
        delete conf["configversion"]
        var dataZ = pako.gzip( JSON.stringify(conf) ,{ to: 'string' })
        var dataString = btoa(dataZ)
        if (doFriendlyURI) dataString = Base64EncodeUrl(dataString)
        if (tryNewURL) {
            return dataString
        } else {
            var co = {}
            co["zipped"] = dataString
            co["configversion"] = config["configversion"]
            return co
        }
        // be careful to include all the zipped config items and add any new ones or they will appear as extras
    }
    function decode_config(config) {
        if (config.configversion == undefined) return config
        if (config.configversion <= 2.1) return config
        if (! ("zipped" in config) ) return config
        
        // unzip
        dataString = config["zipped"]
        if (doFriendlyURI) dataString = Base64DecodeUrl(dataString)
        var data = pako.inflate( atob( dataString))
        var strData = String.fromCharCode.apply(null, new Uint16Array(data));
        var conUnzipped = JSON.parse( strData )

        Object.assign(config,conUnzipped)
        delete config["zipped"]

        // note that we have to decode it in place
        var conf = _jcopy(config)
        // decode field names
        for (var [e,v] of Object.entries(conf)) {
            if (decodeFields.hasOwnProperty(e)) {                
                // if we can decode it, then decode it
                delete config[e]
                var d = decodeFields[e]
                config[d] = v
            }
        }

        for (var e in ui.menu) {
            var item = ui.menu[e]
            if (item.codebook) {  
                _decode(item.codebook)
            }
        }
        _decode(extraCodeBook)
        function _decode(codebook) {              
            for (k = 0; k < codebook.length; k++) {
                var version = codebook[k].decodeVersion
                if (conf.configversion < version) continue // the value wasn't encoded at this early version
                // so maybe if the value was an unencoded number that happens to now equal a coded number,
                // then we shouldn't change that number
                // HOWTO: If we are looking at an old sandbox, then don't use codebooks with new words in them
                // So, when you add new words to a codebook, put a version number on that page of words
                var decode = codebook[k].decode
                var field = codebook[k].field
                var value = config[field]
            
                if (Array.isArray(value)) {
                    var temp = []
                    for (var i =0; i < value.length; i++) {
                        temp.push(_lookup(value[i]))
                    }
                    config[field] = temp
                } else {
                    config[field] = _lookup(value)
                }
                function _lookup(v) {
                    if (v in decode) {
                        return decode[v]
                    } else {    
                        return JSON.parse(v.slice(1)) // remove the flag character and parse
                    }
                }
            }
        }
        return
    }


    // URL Friendly Base 64
    //  * use this to make a Base64 encoded string URL friendly, 
    //  * i.e. '+' and '/' are replaced with '-' and '~' also any trailing '=' 
    //  * characters are removed
    // https://tools.ietf.org/html/rfc4648
    function Base64EncodeUrl(str){
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    }

    function Base64DecodeUrl(str){
        str = str + '===' // pad
        newlen = str.length - str.length % 4 // round
        str = str.slice(0,newlen) // cut
        // str = (str + '===').slice(0, str.length + (str.length % 4));
        return str.replace(/-/g, '+').replace(/_/g, '/');
    }

    self.update = function(assets){
        // UPDATE SANDBOX

        model.assets = assets
        
        basediv.classList.add("div-model-theme-" + config.theme)
        _objF(ui.arena,"update")
        _objF(ui.menu,"select");
        model.start(); 
    };

    self.assets = [
        
        // the peeps
        "play/img/voter_face.png",

        "play/img/square.png",
        "play/img/triangle.png",
        "play/img/hexagon.png",
        "play/img/pentagon.png",
        "play/img/bob.png",

        "play/img/square.svg",
        "play/img/triangle.svg",
        "play/img/hexagon.svg",
        "play/img/pentagon.svg",
        "play/img/bob.svg",

        "play/img/blue_bee.png",
        "play/img/yellow_bee.png",
        "play/img/red_bee.png",
        "play/img/green_bee.png",
        "play/img/orange_bee.png",

        // plus
        "play/img/plusCandidate.png",
        "play/img/plusOneVoter.png",
        "play/img/plusVoterGroup.png",

        // Ballot instructions
        "play/img/ballot5_fptp.png",
        "play/img/ballot5_ranked.png",
        "play/img/ballot5_approval.png",
        "play/img/ballot5_range.png",

        // The boxes
        "play/img/ballot5_box.png",
        "play/img/ballot_rate.png",
        "play/img/ballot_three.png"

    ];

    //if(config.sandboxsave) resetDOM.onclick();

    // SAVE & PARSE
    // ?m={s:[system], v:[voterPositions], c:[candidatePositions], d:[description]}
}