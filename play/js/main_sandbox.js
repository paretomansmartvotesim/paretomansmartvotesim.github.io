function main(preset) {
    s = new Sandbox()
    
    // CONFIGURE
    s.url = window.location.href;
    Loader.onload = s.update // this might look like an update but we're configuring Loader

    // INIT
	s.setConfig(preset.config)
	if (preset.update) preset.update(s)
    
    // UPDATE
    Loader.load(s.assets);
}

function Sandbox() {
	var self = this

    // Big update: Added pattern to the code: LOAD, CREATE, CONFIGURE, INIT, & UPDATE. LOAD loads the input or defaults.  CREATE makes an empty data structure to be used.  CONFIGURE adds all the input to the data structure.  INIT completes the data structure by doing steps that needed to use the data structure as input, and is otherwise similar to CONFIGURE.  UPDATE runs the actions, now that the data structure is complete.

    // Basic description of main_sandbox.js
    // First we load the config,
    // Then we update the model and menu.
    // Then wait for mouse events.

    // LOAD DEFAULTS and INPUT
    var all_candidate_names = Object.keys(Candidate.graphics) // helper
    var defaults = {
        configversion:1,
        sandboxsave: false,
        featurelist: ["systems"],
        hidegearconfig: false,
        description: "",
        keyyee: "off",
        snowman: false, // section
        x_voters: false,
        oneVoter: false,
        system: "FPTP", // section
        rbsystem: "Tideman",
        numOfCandidates: 3,
        numVoterGroups: 1,
        xNumVoterGroups: 4,
        nVoterGroupsRealName: "One Group",
        spread_factor_voters: 1,
        arena_size: 300,
        median_mean: 1,
        utility_shape: "linear",
        arena_border: 2,
        preFrontrunnerIds: ["square","triangle"],
        autoPoll: "Manual",
        // primaries: "No",
        firstStrategy: "zero strategy. judge on an absolute scale.",
        secondStrategy: "zero strategy. judge on an absolute scale.",
        doTwoStrategies: true,
        yeefilter: all_candidate_names,
        computeMethod: "ez",
        pixelsize: 60,
        optionsForElection: {sidebar:true}, // sandboxes have this default
        featurelist: ["systems","nVoterGroups","nCandidates","firstStrategy","doTwoStrategies","yee","gearicon"]
    }
    self.url = undefined
    var maxVoters = 10  // workaround  // there is a bug where the real max is one less than this

    // CREATE
    var model = new Model();
    var ui = {}
    self.ui = ui
    var config
	var initialConfig

    // FUNCTIONS and CLASSES for INIT and UPDATE
    self.setConfig = function(c) {
        config = c
        // INIT - initialize all data structures
        // the data structure for a sandbox is the configuration of the model.  Init completes this data structures.
        // backwards compatibility
        // the data structure for a model is model.<property>
        if (self.url != undefined) var modelData = _getParameterByName("m",self.url);
        function _getParameterByName(name,url){
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " ")).replace("}/","}"); //not sure how that / got there.
        };
        if(modelData){
            var data = JSON.parse(modelData);
            config = data;
        }
        cleanConfig(config)
        initialConfig = _jcopy(config);


        ////////////////////////
        // THE FRIGGIN' MODEL //
        ////////////////////////
    
    
        // CONFIGURE DEFAULTS (model)
        model.size = config.arena_size
        model.border = config.arena_border
        model.electionOptions = {sidebar:true}
        model.HACK_BIG_RANGE = true;
    
        // INIT (model)
        ui.model = model
        model.initDOM()
        document.querySelector("#center").appendChild(model.dom);
        model.dom.removeChild(model.caption);
        document.querySelector("#right").appendChild(model.caption);
		model.caption.style.width = "";

		// INIT (menu)
		ui.menu.presetconfig.init_sandbox()
		ui.menu.gearicon.init_sandbox()
		ui.arena.desc.init_sandbox()

    }

    function cleanConfig(config) {
        // Load the defaults.  This runs at the start and after loading a preset.

        // FILENAME
        config.presethtmlname = self.url.substring(self.url.lastIndexOf('/')+1);

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
                            return ["systems","voters","candidates"] 	}	}	}
            if (config.doPercentFirst) config.featurelist = config.featurelist.concat(["percentStrategy"]);
            if (config.doFullStrategyConfig) config.featurelist = config.featurelist.concat(["firstStrategy","second strategy","yee","gearicon"])
            // clear the grandfathered config settings
            delete config.doPercentFirst
            delete config.features
            delete config.doFullStrategyConfig

            // GRANDFATHER featurelist step 2
            // replace old names with new names
            if (config.featurelist) {
                var menuNameTranslator = {
                    "systems":"systems",
                    "voters":"nVoterGroups",
                    "nVoterGroups":"nVoterGroups",
                    "candidates":"nCandidates",
                    "nCandidates":"nCandidates",
                    "unstrategic":"firstStrategy",
                    "firstStrategy":"firstStrategy",
                    "second strategy":"doTwoStrategies",
                    "doTwoStrategies":"doTwoStrategies",
                    "yee":"yee",
                    "rbvote":"rbSystems",
                    "rbSystems":"rbSystems",
                    "custom_number_voters":"xVoterGroups",
                    "xHowManyVoterGroups":"xVoterGroups",
                    "xVoterGroups":"xVoterGroups",
                    "group_count":"group_count",
                    "group_spread":"group_spread",
                    "strategy":"secondStrategy",
                    "secondStrategy":"secondStrategy",
                    "percentstrategy":"percentSecondStrategy",
                    "percentSecondStrategy":"percentSecondStrategy",
                    "choose_pixel_size":"choose_pixel_size",
                    "yeefilter":"yeefilter",
                    "poll":"poll",
                    "autoPoll":"autoPoll",
                    "frontrunners":"frontrunners",
                    "gearicon":"gearicon"
                    // "primaries":"primaries"
                }
                var temp_featurelist = []
                for (var i=0; i<config.featurelist.length; i++) {
                    var oldName = config.featurelist[i]
                    var newName = menuNameTranslator[oldName]
                    temp_featurelist.push(newName)
                }
                config.featurelist = temp_featurelist
            }
        }
        // we are now generating a new version of config
        config.configversion = 2

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
        for(var i=0; i<config.numOfCandidates; i++) model.candidates.push(new Candidate(model))
        if (config.oneVoter) {
            model.voters.push(new SingleVoter(model))
        } else {
            for(var i=0; i<config.numVoterGroups; i++) model.voters.push(new GaussianVoters(model))
        }
        model.voterCenter = new VoterCenter(model)
        // CONFIGURE
            // expand config to calculate some values to add to the model			
            // load expanded config into the model
            // configure writes to model and reads from config.  Sanity rule: configure does not read from model.
        _objF(ui.menu,"configure")
        // INIT
        model.initMODEL()
        for (var i=0; i<model.candidates.length; i++) {
            model.candidates[i].init()
        }
        for (var i=0; i<model.voters.length; i++) {
            model.voters[i].init()
        }
        // UPDATE
        model.update()
        menu_update()
    };

    model.onDraw = function(){
        
        // CREATE A BALLOT
        var myNode = document.querySelector("#right");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }  // remove old one, if there was one
        // document.querySelector("#ballot").remove()	
        if (config.oneVoter) {
            var ballot = new model.ballotType();
            document.querySelector("#right").appendChild(ballot.dom);
        }
        document.querySelector("#right").appendChild(model.caption);
        
        if (config.oneVoter) {
            ballot.update(model.voters[0].ballot);
            model.caption.innerHTML = "<br />" + model.voters[0].type.toText(model.voters[0].ballot,model.system,model.rbsystem);
        }
    };

    function menu_update() {
        // UPDATE MENU //
        for (i in ui.menu) if(config.featurelist.includes(i)) {ui.menu[i].choose.dom.hidden = false} else {ui.menu[i].choose.dom.hidden = true}
        // Make the MENU look correct.  The MENU is not part of the "model".
        for (i in ui.menu.percentSecondStrategy.choose.sliders) ui.menu.percentSecondStrategy.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
        for (i in ui.menu.group_count.choose.sliders) ui.menu.group_count.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
        for (i in ui.menu.group_spread.choose.sliders) ui.menu.group_spread.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")

        // reflect the number of voters
        for(var i=0;i<(maxVoters-1);i++) {
            if (i < config.numVoterGroups) {
                ui.menu.yee.choose.dom.childNodes[8+i].hidden=false
            } else {
                ui.menu.yee.choose.dom.childNodes[8+i].hidden=true
            }
        }
        if (config.numVoterGroups == 1) ui.menu.yee.choose.dom.childNodes[8+0].hidden=true
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
            {name:"STV", voter:RankedVoter, ballot:"RankedBallot", election:Election.stv, margin:4},
            {name:"RRV", voter:ScoreVoter, ballot:"ScoreBallot", election:Election.rrv}
        ];
        self.listByName = function() {
            var votingSystem = self.list.filter(function(system){
                return(system.name==config.system);
            })[0];
            return votingSystem;
        }
        self.onChoose = function(data){
            // LOAD INPUT
            config.system = data.name;
            var turnOnRBVote = (data.name == "RBVote")
            var xlist = ["rbSystems"]
            var featureset = new Set(config.featurelist)
            for (var i in xlist){
                var xi = xlist[i]
                if ( turnOnRBVote) {
                    featureset.add(xi)
                } else {
                    featureset.delete(xi)
                }
            }
            config.system = data.name;
            config.featurelist = Array.from(featureset)
            // CONFIGURE
            self.configure()
            // UPDATE
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
            var s = self.listByName()
            model.election = s.election
            model.system = config.system;
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
        document.querySelector("#left").appendChild(self.choose.dom);
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
        document.querySelector("#left").appendChild(self.choose.dom);
        self.choose.dom.hidden = true
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
            var xlist = ["group_count","group_spread","xVoterGroups"]
            var featureset = new Set(config.featurelist)
            for (var i in xlist){
                var xi = xlist[i]
                if (data.x_voters) {
                    featureset.add(xi)
                } else {
                    featureset.delete(xi)
                }
            }
            config.featurelist = Array.from(featureset)
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
            // self.configure()
            _objF(ui.menu,"configure")
            // INIT
            model.initMODEL()
            for(var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
            // UPDATE
            model.update()
            menu_update()
        };
        self.configure = function() {	
            // MODEL //
            model.numVoterGroups = config.numVoterGroups
            model.nVoterGroupsRealName = config.nVoterGroupsRealName
            var num = config.numVoterGroups;		
            if (config.voterPositions) {
                for(var i=0; i<num; i++){
                    var pos = config.voterPositions[i];
                    Object.assign(model.voters[i], {
                        vid: i,
                        num:(4-num),
                        x:pos[0],
                        y:pos[1],
                        snowman: config.snowman,
                        x_voters: config.x_voters
                    })
                    model.voters[i].setType( ui.menu.systems.listByName().voter );	
                }
            } else {
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
                        num:(4-num),
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
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    ui.menu.xVoterGroups = new function() { // if the last option X is selected, we need a selection for number of voters
        var self = this
        self.name = "xVoterGroups"
        self.onChoose = function(slider,n) {
            // LOAD INPUT
            config.xNumVoterGroups = slider.value;
            config.numVoterGroups = slider.value;

            // CREATE
            model.voters = []
            for(var i=0; i<config.numVoterGroups; i++) {
                model.voters.push(new GaussianVoters(model))
            }
            // CONFIGURE
            ui.menu.nVoterGroups.configure() // same settings in this other button
            // INIT
            model.initMODEL()
            for(var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
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
        // x_voter_sliders[0] = 
        document.querySelector("#left").appendChild(self.choose.dom)
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
            // UPDATE
            model.update()
            menu_update()
        }
        self.configure = function() {
            for (var i=0; i<config.numVoterGroups; i++) {
                self.configureN(i)
            }
        }
        self.configureN = function(n) {
            model.voters[n].group_count =config.voter_group_count[n]
        }
        self.select = function() {
            for (i in self.choose.sliders) {
                self.choose.sliders[i].value = config.voter_group_count[i]
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
        document.querySelector("#left").appendChild(self.choose.dom)
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
            for (var i=0; i<config.numVoterGroups; i++) {
                self.configureN(i)
            }
        }
        self.configureN = function(n) {
            model.voters[n].group_spread = config.voter_group_spread[n]
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
        document.querySelector("#left").appendChild(self.choose.dom)
        self.select = function() {
            for (i in self.choose.sliders) {
                self.choose.sliders[i].value = config.voter_group_spread[i]
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
            // CREATE
            model.candidates = []
            for(var i=0; i<config.numOfCandidates; i++) {
                model.candidates.push(new Candidate(model))
            }
            // CONFIGURE
            self.configure()

            // INIT
            model.initMODEL()
            for(var i=0; i<model.candidates.length; i++) {
                model.candidates[i].init()
            }
            // UPDATE
            model.update()
        };
        self.choose = new ButtonGroup({
            label: "how many candidates?",
            width: 52,
            data: self.list,
            onChoose: self.onChoose
        });
        self.configure = function() { // expanding upon what the button means for the model
            model.numOfCandidates = config.numOfCandidates
            // Candidates, in a circle around the center.
            var _candidateIDs = ["square","triangle","hexagon","pentagon","bob"];
            var num = config.numOfCandidates;
            if (config.candidatePositions) {
                for(var i=0; i<num; i++){
                    var id = _candidateIDs[i];
                    Object.assign(model.candidates[i],{
                        id:id,
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
                    var id = _candidateIDs[i];
                    Object.assign(model.candidates[i],{
                        id:id,
                        x:x,
                        y:y
                    })
                    angle += Math.TAU/num;
                }
            }
        }
        self.select = function() {
            self.choose.highlight("num", config.numOfCandidates);
        }
        document.querySelector("#left").appendChild(self.choose.dom);
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
            // CONFIGURE FEATURELIST
            _loadConfigForStrategyButtons(config)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.choose = new ButtonGroup({
            label: "what's voters' strategy?",
            width: 40,
            data: self.list,
            onChoose: self.onChoose
        });
        self.configure = function() {
            model.firstStrategy = config.firstStrategy
            for (var i=0; i<config.numVoterGroups; i++) {
                model.voters[i].firstStrategy = config.firstStrategy
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.firstStrategy);
        }
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    function _loadConfigForStrategyButtons(config) {			
        var not_f = ["zero strategy. judge on an absolute scale.","normalize"]
        var turnOffFrontrunnerControls =  not_f.includes(config.firstStrategy)
        if (config.doTwoStrategies) {
            for(var i=0;i<config.secondStrategies.length;i++){
                if (! not_f.includes(config.secondStrategies[i])){
                    turnOffFrontrunnerControls = false
                }
            }
        }
        var xlist = ["frontrunners","autoPoll","poll"]
        var featureset = new Set(config.featurelist)
        for (var i in xlist){
            var xi = xlist[i]
            if ( ! turnOffFrontrunnerControls) {
                featureset.add(xi)
            } else {
                featureset.delete(xi)
            }
        }
        if (config.autoPoll == "Auto") {
            var xlist = ["frontrunners","poll"]
            for (var i in xlist){
                var xi = xlist[i]
                featureset.delete(xi)
            }
        }
        config.featurelist = Array.from(featureset)
    }

    ui.menu.doTwoStrategies = new function() { // Is there a 2nd strategy?
        var self = this
        self.name = "doTwoStrategies"
        self.list = [
            {realname: "opton for 2nd strategy", name:"2"}
        ];
        self.onChoose = function(data){
            // LOAD INPUT
            var xlist = ["secondStrategy","percentSecondStrategy"]
            var featureset = new Set(config.featurelist)
            for (var i in xlist){
                var xi = xlist[i]
                if (data.isOn) {
                    featureset.add(xi)
                } else {
                    featureset.delete(xi)
                }
            }
            config.featurelist = Array.from(featureset)
            config.doTwoStrategies = data.isOn
            // CONFIGURE FEATURELIST
            _loadConfigForStrategyButtons(config)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            model.doTwoStrategies = config.doTwoStrategies
            for (var i=0; i<config.numVoterGroups; i++) {
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
            width: 40,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });
        document.querySelector("#left").appendChild(self.choose.dom);			
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
        self.onChoose = function(data){
            // LOAD INPUT
            config.secondStrategy = data.realname
            for (var i = 0; i < maxVoters; i++) {
                config.secondStrategies[i] = data.realname
            }
            // CONFIGURE FEATURELIST
            _loadConfigForStrategyButtons(config)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            model.secondStrategy = config.secondStrategy
            for (var i=0; i<config.numVoterGroups; i++) {
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
            width: 40,
            data: self.list,
            onChoose: self.onChoose
        });
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    ui.menu.percentSecondStrategy = new function() {  // group count
        var self = this
        self.name = "percentSecondStrategy"

        self.onChoose = function(slider,n) {
            // LOAD INPUT
            config.percentSecondStrategy[n] = slider.value;
            // _loadConfigForStrategyButtons(config) // not necessary
            // CONFIGURE
            self.configureN(n)
            // UPDATE
            model.update();
        }
        self.configure = function() {
            for (var i=0; i<config.numVoterGroups; i++) {
                self.configureN(i)
            }
        }
        self.configureN = function(n) {
            model.voters[n].percentSecondStrategy = config.percentSecondStrategy[n]
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
        document.querySelector("#left").appendChild(self.choose.dom)
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
                width: 72,
                data: self.list,
                onChoose: self.onChoose
            });
            document.querySelector("#left").appendChild(choosePrimaries.dom);
        }
    }

    ui.menu.autoPoll = new function() { // do a poll to find frontrunner
        var self = this
        self.name = "autoPoll"
        self.list = [
            {name:"Auto",realname:"Choose frontrunners automatically.", margin:5},
            {name:"Manual",realname:"Press the poll button to find the frontrunners once."}
        ];
        self.onChoose = function(data){
            // LOAD INPUT
            config.autoPoll = data.name
            var xlist = ["poll","frontrunners"]
            var featureset = new Set(config.featurelist)
            for (var i in xlist){
                var xi = xlist[i]
                if (data.name == "Manual") {
                    featureset.add(xi)
                } else {
                    featureset.delete(xi)
                }
            }
            config.featurelist = Array.from(featureset)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            model.autoPoll = config.autoPoll
        }
        self.select = function() {
            self.choose.highlight("name", config.autoPoll)
        }
        self.choose = new ButtonGroup({
            label: "AutoPoll to find new frontrunner:",
            width: 72,
            data: self.list,
            onChoose: self.onChoose
        });
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    function _iconButton(x) {return "<span class='buttonshape'>"+_icon(x)+"</span>"}

    ui.menu.frontrunners = new function() { // frontrunners
        var self = this
        self.name = "frontrunners"
        self.list = [
            {name:_iconButton("square"),realname:"square",margin:5},
            {name:_iconButton("triangle"),realname:"triangle",margin:5},
            {name:_iconButton("hexagon"),realname:"hexagon",margin:5},
            {name:_iconButton("pentagon"),realname:"pentagon",margin:5},
            {name:_iconButton("bob"),realname:"bob"}
        ];
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
            model.update();
        };
        self.configure = function() {
            model.preFrontrunnerIds = config.preFrontrunnerIds
            for (var i=0; i<config.numVoterGroups; i++) {
                model.voters[i].preFrontrunnerIds = config.preFrontrunnerIds
            }
        }
        self.select = function() {
            self.choose.highlight("realname", config.preFrontrunnerIds);
        }
        self.choose = new ButtonGroup({
            label: "who are the frontrunners?",
            width: 40,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });
        document.querySelector("#left").appendChild(self.choose.dom);			
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
                model.dotop2 = true // not yet implemented
                model.update()
                model.dotop2 = false
                var won = model.top2
                model.top2 = []
            }
            // SHOW CALCULATIONS //
            ui.menu.frontrunners.choose.highlight("realname", won);
            // UPDATE CONFIG //
            config.preFrontrunnerIds = won
            // CONFIGURE AND UPDATE MODEL //
            model.preFrontrunnerIds = config.preFrontrunnerIds // no need to run this at model init
            model.update();
        };
        self.choose = new ButtonGroup({
            label: "Poll to find new frontrunner:",
            width: 52,
            data: self.list,
            onChoose: self.onChoose,
            justButton: true
        });
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    ui.menu.yee = new function() { // yee
        var self = this
        self.name = "yee"
        self.list = [
            {name:_iconButton("square"),realname:"square",keyyee:"square",kindayee:"can",margin:4},
            {name:_iconButton("triangle"),realname:"triangle",keyyee:"triangle",kindayee:"can",margin:4},
            {name:_iconButton("hexagon"),realname:"hexagon",keyyee:"hexagon",kindayee:"can",margin:4},
            {name:_iconButton("pentagon"),realname:"pentagon",keyyee:"pentagon",kindayee:"can",margin:4},
            {name:_iconButton("bob"),realname:"bob",keyyee:"bob",kindayee:"can",margin:28},
            {name:"none",realname:"turn off",keyyee:"off",kindayee:"off",margin:5},
            {name:"A",realname:"all voters",keyyee:"mean",kindayee:"center",margin:28},
            {name:"1",realname:"first voter group",kindayee:"voter",keyyee:0,margin:4},
            {name:"2",realname:"second voter group",kindayee:"voter",keyyee:1,margin:4},
            {name:"3",realname:"third voter group",kindayee:"voter",keyyee:2,margin:4},
            {name:"4",realname:"fourth voter group",kindayee:"voter",keyyee:3,margin:4},
            {name:"5",realname:"fifth voter group",kindayee:"voter",keyyee:4,margin:4},
            {name:"6",realname:"sixth voter group",kindayee:"voter",keyyee:5,margin:4},
            {name:"7",realname:"seventh voter group",kindayee:"voter",keyyee:6,margin:4},
            {name:"8",realname:"eighth voter group",kindayee:"voter",keyyee:7,margin:4},
            {name:"9",realname:"ninth voter group",kindayee:"voter",keyyee:8,margin:8},
        ];
        self.onChoose = function(data){
            // LOAD INPUT
            config.kindayee = data.kindayee
            config.keyyee = data.keyyee
            var xlist = ["choose_pixel_size","yeefilter"]
            var featureset = new Set(config.featurelist)
            for (var i in xlist){
                var xi = xlist[i]
                if (config.kindayee != undefined && config.kindayee != "off") {
                    featureset.add(xi)
                } else {
                    featureset.delete(xi)
                }
            }
            config.featurelist = Array.from(featureset)
            // CONFIGURE
            self.configure()
            // INIT
            model.initMODEL()
            // UPDATE
            model.update();
            menu_update()
        };
        self.configure = function() {
            model.kindayee = config.kindayee
            model.keyyee = config.keyyee
        }
        self.select = function() {
            self.choose.highlight("keyyee", config.keyyee);
        }
        self.choose = new ButtonGroup({
            label: "which object for yee map?",
            width: 20,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.childNodes[6].style.width = "68px"
        self.choose.dom.setAttribute("id",self.name)
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    ui.menu.yeefilter = new function() { 	// yee filter
        var self = this
        self.name = "yeefilter"
        self.list = [
            {name:_iconButton("square"),realname:"square",keyyee:"square",margin:4},
            {name:_iconButton("triangle"),realname:"triangle",keyyee:"triangle",margin:4},
            {name:_iconButton("hexagon"),realname:"hexagon",keyyee:"hexagon",margin:4},
            {name:_iconButton("pentagon"),realname:"pentagon",keyyee:"pentagon",margin:4},
            {name:_iconButton("bob"),realname:"bob",keyyee:"bob"}
        ];
        self.onChoose = function(data){
            // LOAD CONFIG //
            var yeefilterset = new Set(config.yeefilter)
            if (data.isOn) {
                yeefilterset.add(data.realname)
            } else {
                yeefilterset.delete(data.realname)
            }
            config.yeefilter = Array.from(yeefilterset)
            // CONFIGURE
            self.configure()
            // UPDATE
            model.update();
        };
        self.configure = function() {
            model.yeefilter = config.yeefilter
        }
        self.select = function() {
            self.choose.highlight("realname", config.yeefilter);
        }
        self.choose = new ButtonGroup({
            label: "filter yee map?",
            width: 20,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });
        self.choose.dom.setAttribute("id",self.name)
        document.querySelector("#left").appendChild(self.choose.dom);
    }

    ui.menu.gearconfig = new function() { 	// gear config - decide which menu items to do
        var self = this
        // self.name = "gearconfig"
        self.list = []
        var n=1
        for (var name in ui.menu) {
            self.list.push({name:n,realname:name,margin:1})
            n++
        }
        self.onChoose = function(data){
            // LOAD INPUT
            var featureset = new Set(config.featurelist)
            if (data.isOn) {
                featureset.add(data.realname)
            } else {
                featureset.delete(data.realname)
            }
            config.featurelist = Array.from(featureset)
            // UPDATE
            menu_update()
        };
        self.select = function() {
            self.choose.highlight("realname", config.featurelist);
        }
        self.choose = new ButtonGroup({
            label: "which menu options are displayed?",
            width: 18,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });
        self.choose.dom.hidden = true
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
    }

    ui.menu.presetconfig = new function() { // pick a preset
        var self = this
        self.name = "presetconfig"  // no name needed
        self.list = _buildPresetConfig({nElection:14,nBallot:12})
        function _buildPresetConfig(c) {
            // var presetnames = ["O","SA"]
            // var presethtmlnames = [config.filename,"sandbox.html"]
            // var presetdescription = ["original intended preset","sandbox"]
            var presetnames = ["S"]
            var presethtmlnames = ["sandbox.html"]
            var presetdescription = ["sandbox"]

            // and fill in the rest
            for (var i=1;i<=c.nElection;i++) {presetnames.push("e"+i) ; presethtmlnames.push("election"+i+".html") ; presetdescription.push("election"+i+".html")}
            presetnames.push("O") ; presethtmlnames.push(filename) ; presetdescription.push("original intended preset")
            // TODO
            for (var i=1;i<=c.nBallot;i++) {presetnames.push("b"+i) ; presethtmlnames.push("ballot"+i+".html") ; presetdescription.push("ballot"+i+".html")}
            
            var presetconfig = []
            for (i in presetnames) presetconfig.push({name:presetnames[i],realname:presetdescription[i],htmlname:presethtmlnames[i],margin:4})
            return presetconfig
        }
        self.onChoose = function(data){
            if (data.isOn) {
                // LOAD MAIN
                var firstletter = data.htmlname[0]
                if (firstletter == 'e' || firstletter == 's') {
                    
                    // LOAD Preset
                    config = loadpreset(data.htmlname).config
                    
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
                    Object.assign(ballotconfig, loadpreset(data.htmlname).config )
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
                model.resize()
                // RESET = CREATE, CONFIGURE, INIT, & UPDATE (FOR MODEL)
                model.reset()
                // UPDATE (MENU AND ARENA)
                _objF(ui.arena,"update")
                _objF(ui.menu,"select");
            }
        };
        self.choose = new ButtonGroup({
            label: "pick a preset:",
            width: 38,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.hidden = true
		document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
		self.init_sandbox = function() {
			self.choose.highlight("htmlname", config.presethtmlname); // only do this once.  Otherwise it would be in updateUI
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
            width: 38,
            data: self.list,
            onChoose: self.onChoose
        });
        document.querySelector("#left").appendChild(self.choose.dom);
        self.choose.dom.hidden = true
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
            width: 38,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.hidden = true
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
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
            for (var i=0; i<config.numVoterGroups; i++) {
                model.voters[i].init()
            }
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
            width: 38,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.hidden = true
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
    }

    ui.menu.arena_size = new function () {
        var self = this
        // self.name = arena_size
        self.list = [
            {name:"300",val:300,margin:4},
            {name:"600",val:600}
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
            model.resize()
            // INIT
            for (var i=0; i<model.voters.length; i++) {
                model.voters[i].init()
            }
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
            width: 38,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.hidden = true
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
    }

    ui.menu.median_mean = new function () {
        var self = this
        // self.name = median_mean
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
            width: 68,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.hidden = true
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
    }

    ui.menu.utility_shape = new function () {
        var self = this
        // self.name = utility_shape
        self.list = [
            {name:"linear",margin:4},
            {name:"quadratic",margin:4},
            {name:"log"}
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
            width: 68,
            data: self.list,
            onChoose: self.onChoose
        });
        self.choose.dom.hidden = true
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
    }

    ui.menu.gearicon = new function () {
        // gear button (combines with above)
        var self = this
        // self.name = gearicon
        self.list = [
            {name:"config"}
        ]
        self.onChoose = function(data){
            // LOAD
            var turnOn = data.isOn
            // no config.gearicon because we don't want to save with the config menu open
            // UPDATE
            var gearItems = [
                ui.menu.gearconfig,
                ui.menu.presetconfig,
                ui.menu.computeMethod,
                ui.menu.spread_factor_voters,
                ui.menu.arena_size,
                ui.menu.median_mean,
                ui.menu.utility_shape,
                ui.menu.gearoff
            ]
            if (turnOn) {
                gearItems.forEach( x => x.choose.dom.hidden = false)
            } else {
                gearItems.forEach( x => x.choose.dom.hidden = true)
            }
        };
        // no select because we don't want to save with the config menu open
        self.choose = new ButtonGroup({
            label: "",
            width: 60,
            data: self.list,
            onChoose: self.onChoose,
            isCheckbox: true
        });
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.gearconfig.choose.dom);
        self.init_sandbox = function() {
            if(config.hidegearconfig) self.choose.dom.hidden = true
        }
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
                // INPUT
                var response = window.confirm("Press cancel and we can forget this ever happened.  Or press the other button and the config options will be removed.")
                if (response==false) return
                // LOAD INPUT
                config.hidegearconfig = true
                // UPDATE
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
        document.querySelector("#left").insertBefore(self.choose.dom,ui.menu.systems.choose.dom);
        self.choose.dom.hidden = true
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
        resetDOM.style.top = "340px";
        resetDOM.style.left = "350px";
        resetDOM.onclick = function(){
            // LOAD INITIAL CONFIG
            config = _jcopy(initialConfig); // RESTORE IT!
            // RESET = CREATE, CONFIGURE, INIT, & UPDATE
            model.reset()
            // UPDATE MENU //
            _objF(ui.menu,"select");
        };
        document.body.appendChild(resetDOM);
        self.update = function () {
            // Move that reset button
            if (config.sandboxsave) {
                var addsome = config.arena_size - 300
                resetDOM.style.top = (470 + addsome) + "px";
                resetDOM.style.left = "235px";
            } else {
                resetDOM.style.top = "340px";
                resetDOM.style.left = "245px";
            }
        }
        self.dom = resetDOM
    }

    //////////////////////////////////
    /////// SAVE & SHARE, YO! ////////
    //////////////////////////////////

    ui.arena.desc = new function() { // Create a description up top
        var self = this
        var descDOM = document.createElement("div");
        descDOM.id = "description_container";
        var refNode = document.getElementById("left");
        document.body.insertBefore(descDOM, refNode);
        var descText = document.createElement("textarea");
        descText.id = "description_text";
        descDOM.appendChild(descText);
		// yay.
		self.init_sandbox = function() {
			descText.value = initialConfig.description;
		}
        self.update = function () {
            
            if (config.sandboxsave) {

                addsome = config.arena_size - 300

                document.getElementById("center").style.height = (320 + addsome) + "px"
                document.getElementById("center").style.width = (320 + addsome) + "px"

                // #description_container
                document.getElementById("description_container").style.width = (800 + addsome) + "px"

                // #description_container textarea
                document.getElementById("description_text").style.width = (778 + addsome) + "px"

                descDOM.hidden = false
                descText.hidden = false
            } else {
                descDOM.hidden = true
                descText.hidden = true
            }
            if (! config.sandboxsave) { 
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
            var description = document.getElementById("description_text") || {value:""};
            config.description = description.value;
            // UPDATE MAIN //
            initialConfig = _jcopy(config); // now the reset button will restore these saved settings
            // UPDATE SAVE URL //
            _writeURL(config);
            // CONSOLE OUTPUT //
            console_out(1,config)  // updates config with positions and gives a log of settings to copy and paste
            

        };
        document.body.appendChild(saveDOM);
        self.update = function () {
            if (config.sandboxsave) {
                var addsome = config.arena_size - 300
                saveDOM.style.top = (470 + addsome) + "px";
                saveDOM.style.left = "350px";
            } else {
                saveDOM.style.top = "340px";
                saveDOM.style.left = "350px";
            }
        }
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
        document.body.appendChild(linkText);
        self.update = function () {
            if (config.sandboxsave) {
                linkText.style.width = (82 + addsome) + "px"	
                linkText.style.top = (471 + addsome) + "px";
            } else {
                linkText.style.position = "absolute";
                linkText.style.top = "340px";
                linkText.style.left = "460px";
                linkText.style.height = "30px";
                linkText.style.width = "90px";
            }

        }
        self.dom = linkText
    }

    ///////////////////////////
    ////// SAVE POSITION //////
    ///////////////////////////

    savePositions = function(log){ 
        // The positions of voters and candidates are not held in config.
        // So, we need to save them occasionally.

        // Candidate positions
        var positions = [];
        for(var i=0; i<model.candidates.length; i++){
            var candidate = model.candidates[i];
            positions.push([
                Math.round(candidate.x),
                Math.round(candidate.y)
            ]);
        }
        if(log) console.log("candidatePositions: "+JSON.stringify(positions));
        var candidatePositions = positions;

        // Voter positions
        positions = [];
        for(var i=0; i<model.voters.length; i++){
            var voter = model.voters[i];
            positions.push([
                Math.round(voter.x),
                Math.round(voter.y)
            ]);
        }
        if(log) console.log("voterPositions: "+JSON.stringify(positions));
        var voterPositions = positions;

        // positions!
        return {
            candidatePositions: candidatePositions,
            voterPositions: voterPositions
        };

    };

    var console_out = function (log,config){
        // helper function to output the config to the console.
        var logtext = ''
        for (i in config) {
                logtext += i + ": " +JSON.stringify(config[i]) + ',\n'
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
        var uri = encodeURIComponent(JSON.stringify(config));
        
        // Put it in the save link box!
        
        // make link string
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host; //http://ncase.me/ballot
        var restofurl = getUrl.pathname.split('/')
        for (var i=1; i < restofurl.length - 2; i++) {baseUrl += "/" + restofurl[i];}
        var link = baseUrl + "/sandbox/?m="+uri;
        
        var savelink = document.getElementById("savelink");
        savelink.value = "saving...";
        setTimeout(function(){
            savelink.value = link;
        },750);

    };

    self.update = function(){
        // UPDATE
        _objF(ui.arena,"update")
        _objF(ui.menu,"select");
        model.start(); 
    };

    self.assets = [
        
        // the peeps
        "img/voter_face.png",
        "img/square.png",
        "img/triangle.png",
        "img/hexagon.png",
        "img/pentagon.png",
        "img/bob.png",

        // Ballot instructions
        "img/ballot5_fptp.png",
        "img/ballot5_ranked.png",
        "img/ballot5_approval.png",
        "img/ballot5_range.png",

        // The boxes
        "img/ballot5_box.png",
        "img/ballot_rate.png",
        "img/ballot_three.png"

    ];

    //if(config.sandboxsave) resetDOM.onclick();

    // SAVE & PARSE
    // ?m={s:[system], v:[voterPositions], c:[candidatePositions], d:[description]}
}