function main(config){
	// First we load the config,
	// Then we update the model and menu.
	// Then wait for mouse events.


		// DEFAULTS

		// helper
		var all_candidate_names = Object.keys(Candidate.graphics)
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
			howManyVoterGroupsRealName: "One Group",
			spread_factor_voters: 1,
			arena_size: 300,
			median_mean: 1,
			utility_shape: "linear",
			arena_border: 2,
			preFrontrunnerIds: ["square","triangle"],
			autoPoll: "Manual",
			// primaries: "No",
			unstrategic: "zero strategy. judge on an absolute scale.",
			strategic: "zero strategy. judge on an absolute scale.",
			second_strategy: true,
			yeefilter: all_candidate_names,
			computeMethod: "ez",
			pixelsize: 60,
			optionsForElection: {sidebar:true} // sandboxes have this default

		}

	// READ URL
	// Look at the URL and see if we are loading a saved model
	// Use "config" for the data.
	var modelData = _getParameterByName("m");
	function _getParameterByName(name){
		var url = window.top.location.href;
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

	var maxVoters = 10  // workaround  // there is a bug where the real max is one less than this

	function cleanConfig(config) {
		// Load the defaults.  This runs at the start and after loading a preset.


		// FILENAME
		var url = window.location.pathname;
		var filename = url.substring(url.lastIndexOf('/')+1);
		config.filename = filename
		config.presethtmlname = filename;


		// GRANDFATHER
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
		// Feature List...
		// config.features: 1-basic, 2-voters, 3-candidates, 4-save
		if ( config.featurelist == undefined) {
			config.featurelist = fl()
			function fl() {
				switch(config.features){
					case 1: return ["systems"]
					case 2: return ["systems","howManyVoterGroups"]
					case 3: return ["systems","howManyVoterGroups","howManyCandidates"]
					case 4: 
						config.sandboxsave = true
						return ["systems","howManyVoterGroups","howManyCandidates"] 	}	}	}
		if (config.doPercentFirst) config.featurelist = config.featurelist.concat(["percentstrategy"]);
		if (config.doFullStrategyConfig) config.featurelist = config.featurelist.concat(["unstrategic","second strategy","yee"])
		// clear the grandfathered config settings
		delete config.doPercentFirst
		delete config.features
		delete config.doFullStrategyConfig
		

		// VOTER DEFAULTS
		// we want individual strategies to be loaded in, if they are there
		// if we have a blank slate, then we want to fill in with the variable "strategic"
		if (config.strategic && config.voterStrategies === undefined) {
			config.voterStrategies = []
			for (var i = 0; i < maxVoters; i++) {
				config.voterStrategies[i] = config.strategic
			}	
		}
		config.voterStrategies = config.voterStrategies || []
		config.voterPercentStrategy = config.voterPercentStrategy || []
		config.voter_group_count = config.voter_group_count || []
		config.voter_group_spread = config.voter_group_spread || []
		for (var i = 0; i < maxVoters; i++) {
			config.voterStrategies[i] = config.voterStrategies[i] || "zero strategy. judge on an absolute scale."
			if(config.voterPercentStrategy[i] == undefined) config.voterPercentStrategy[i] = 0
			config.voter_group_count[i] = config.voter_group_count[i] || 50
			config.voter_group_spread[i] = config.voter_group_spread[i] || 190
		}


		_fillInDefaults(config, defaults)



	}
	cleanConfig(config)
	var initialConfig = _jcopy(config);

	Loader.onload = function(){

		////////////////////////
		// THE FRIGGIN' MODEL //
		////////////////////////

		var init_model_config = {size: config.arena_size, border: config.arena_border}
		window.model = new Model(init_model_config);
		document.querySelector("#center").appendChild(model.dom);
		model.dom.removeChild(model.caption);
		document.querySelector("#right").appendChild(model.caption);
		model.caption.style.width = "";

		// INIT!
		model.onInit = function(){

			// configure the model and the menu
			// Based on config... what should be what?
			_configureMM()
			_copySomeAttributes(model,config,  // This set of attributes is copied from config to model
				[
				// "primaries",
				"computeMethod",
				"pixelsize",
				"spread_factor_voters",
				"arena_size",
				"median_mean",
				"utility_shape",
				"arena_border",
				"yeefilter",
				"optionsForElection"
			])			
			
			// init model
			_reincarnateDraggables() // configure and initialize voterSet, candidateSet, and voterCenter

			// update VoterSet
			//_updateVoterSet() // dont need this

			// update model
			model.update()

			// update Menu
			_showHideMenus()

		};
		model.onDraw = function(){
			
			// CREATE A BALLOT
			var myNode = document.querySelector("#right");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}  // remove old one, if there was one
			// document.querySelector("#ballot").remove()	
			if (config.oneVoter) {
				window.ballot = new model.ballotType();
				document.querySelector("#right").appendChild(ballot.dom);
			}
			document.querySelector("#right").appendChild(model.caption);
			
			if (config.oneVoter) {
				ballot.update(model.voters[0].ballot);
				model.caption.innerHTML = "<br />" + model.voters[0].type.toText(model.voters[0].ballot,model.system,model.rbsystem);
			}
		};

		function _configureMM() {
			items.map(x=> {
				if(x.configureMM != undefined) x.configureMM(model,config) // init writes to model and reads from config.  Sanity rule: init does not read from model.
			})
		}
		function _showHideMenus() {
			for (i in allnames) if(config.featurelist.includes(allnames[i])) {doms[allnames[i]].hidden = false} else {doms[allnames[i]].hidden = true}
		}
		// function _updateVoterSet() {
		// 	items.map(i=> {
		// 		if(i.updateVoterSet != undefined) i.updateVoterSet(model,config) 
		// 	})
		// }

		function _reincarnateDraggables() { // configure and initialize voterSet, candidateSet, and voterCenter.  And 
			
			// save current positions to config ... we might overwrite these with 
			// config.candidatePositions = save().candidatePositions;
			// config.voterPositions = save().voterPositions;
			
			model.reset(true) // just zero out draggables, voters, and candidates
			configureVoterSet(config).map(x => 	// configure voterSet
				model.addVoters(x)				// init voters
			)
			howManyCandidates.configureCS(config).map(x =>  // configure candidateSet
				model.addCandidate(x) 	// init candidates
			)
			model.addVoterCenter() // init voterCenter
		}
		function configureVoterSet(config) {
			// Give configuration to each voter group.
				
			voterSetConfig = [] // create empty voter group config
			for ( var i=0; i < config.numVoterGroups; i++) voterSetConfig[i]={}
			
			items.map(x=>{ // configure each voter group
				if(x.configureVoterSet) x.configureVoterSet(voterSetConfig,config)
			})
			for(var i=0; i<config.numVoterGroups; i++){
				var voterConfig = {}
				_copySomeAttributes(voterConfig,config,[ // This set of attributes is just copied over
					"spread_factor_voters"
				])
				Object.assign(voterSetConfig[i], voterConfig)
				items.map(x=>{ // configure each voter group
					if(x.configureVG) x.configureVG(voterSetConfig[i],config,i)
				})
			}
			return voterSetConfig
		}
		// In Position!
		var setInPosition = function(){ // runs when we change the config for number of voters  or candidates

			var positions;

			// CANDIDATE POSITIONS
			positions = config.candidatePositions;
			if(positions){
				for(var i=0; i<positions.length; i++){
					var position = positions[i];
					var candidate = model.candidates[i];
					candidate.x = position[0] //+ (model.arena_size - 300) * .5;
					candidate.y = position[1] //+ (model.arena_size - 300) * .5;
				}
			}

			// VOTER POSITION
			positions = config.voterPositions;
			if(positions){
				for(var i=0; i<positions.length; i++){
					var position = positions[i];
					var voter = model.voters[i];
					voter.x = position[0] //+ (model.arena_size - 300) * .5;
					voter.y = position[1] //+ (model.arena_size - 300) * .5;
				}
			}

			// update!
			model.update();

		};

		
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

		// Initialize variables
		var items = []
		var allnames = ["systems","rbsystems","howManyVoterGroups","xHowManyVoterGroups","group_count","group_spread","howManyCandidates","strategy","second strategy","percentstrategy","unstrategic","frontrunners","autoPoll","poll","yee","yeefilter","choose_pixel_size"] // ,"primaries"
		var doms = {}  // for hiding menus, later
	
		var systems = new function() { // Which voting system?
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
			self.listByName = function(config) {
				var votingSystem = self.list.filter(function(system){
					return(system.name==config.system);
				})[0];
				return votingSystem;
			}
			self.onChoose = function(data){

				// UPDATE MENU //
				var turnOnRBVote = (data.name == "RBVote")
				var xlist = ["rbsystems"]
				var featureset = new Set(config.featurelist)
				for (var i in xlist){
					var xi = xlist[i]
					if ( turnOnRBVote) {
						featureset.add(xi)
					} else {
						featureset.delete(xi)
					}
				}

				// UPDATE CONFIG //
				config.system = data.name;
				config.featurelist = Array.from(featureset)

				// UPDATE MODEL //
				self.configureMM(model,config)
				_showHideMenus()
				model.update();

			};
			self.choose = new ButtonGroup({
				label: "what voting system?",
				width: 108,
				data: self.list,
				onChoose: self.onChoose
			});
			self.configureMM= function(model,config) {
				var s = self.listByName(config)
				model.election = s.election
				model.system = config.system;
				model.voterType = s.voter
				model.ballotType = window[s.ballot];
				model.voters.map(v=>{
					v.setType( s.voter ); // calls "new VoterType(model)"
				}) // this only matters to model.onInit if the number of voters doesn't change
				model.pollResults = undefined
			}
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.type = self.listByName(config).voter
			}
			self.select = function(config) {
				self.choose.highlight("name", config.system)
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var rbsystems = new function() { // Which RB voting system?
			var self = this
			self.name = "rbsystems"
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
			self.listByName = function(config) {
				var votingSystem = self.list.filter(function(system){
					return(system.name==config.rbsystem);
				})[0];
				return votingSystem;
			}
			self.onChoose = function(data){

				// UPDATE CONFIG //
				config.rbsystem = data.name;

				// UPDATE MODEL //
				self.configureMM(model,config)
				model.update();

			};
			self.choose = new ButtonGroup({
				label: "which RB voting system?",
				width: 108,
				data: self.list,
				onChoose: self.onChoose
			});
			self.configureMM= function(model,config) {
				model.rbsystem = config.rbsystem
				model.rbelection = self.listByName(config).rbelection
				model.pollResults = undefined
			}
			self.select = function(config) {
				self.choose.highlight("name", config.rbsystem)
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			self.choose.dom.hidden = true
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var howManyVoterGroups = new function() { // How many voters?
			var self = this
			self.name = "howManyVoterGroups"

			self.list = [
				{realname: "Single Voter", name:"&#50883;", num:1, margin:6, oneVoter:true},
				{realname: "One Group", name:"1", num:1, margin:5},
				{realname: "Two Groups", name:"2", num:2, margin:5},
				{realname: "Three Groups", name:"3", num:3, margin:6},
				{realname: "Different Sized Groups (like a snowman)", name:"&#x2603;", num:3, snowman:true, margin:6},
				{realname: "Custom Number of Voters and Sizes and Spreads", name:"X", num:4, x_voters:true},
			];
			self.listByName = function(config) { // when we load from a config
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

				
				// // UPDATE MENU //
				// for (i in percentstrategy.choose.sliders) stratsliders[i].setAttribute("style",(i<data.num) ?  "display:inline": "display:none")
				// for (i in group_count.choose.sliders) group_count.choose.sliders[i].setAttribute("style",(i<data.num) ?  "display:inline": "display:none")
				// for (i in group_spread.choose.sliders) group_spread.choose.sliders[i].setAttribute("style",(i<data.num) ?  "display:inline": "display:none")

				// UPDATE CONFIG //
				// add the configuration for the voter groups when "X" is chosen
				var xlist = ["group_count","group_spread","xHowManyVoterGroups"]
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
				config.howManyVoterGroupsRealName = data.realname // this set of attributes is calculated based on config
				config.snowman = data.snowman || false;
				config.x_voters = data.x_voters || false;
				config.oneVoter = data.oneVoter || false;
				// save candidates before switching!
				config.candidatePositions = save().candidatePositions;
				// reset!
				config.voterPositions = null;


				// UPDATE MENU AND MODEL//
				self.configureMM(model,config)
				_reincarnateDraggables()
				model.update()
				// model.reset();
				setInPosition();

			};
			self.choose = new ButtonGroup({
				label: "how many groups of voters?",
				width: 32,
				data: self.list,
				onChoose: self.onChoose
			});
			self.configureMM = function(model,config) {

				// UPDATE MENU //
				// Make the MENU look correct.  The MENU is not part of the "model".
				for (i in percentstrategy.choose.sliders) percentstrategy.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
				for (i in group_count.choose.sliders) group_count.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
				for (i in group_spread.choose.sliders) group_spread.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")

				// hide some menus
				_showHideMenus()

				// reflect the number of voters
				for(var i=0;i<(maxVoters-1);i++) {
					if (i < config.numVoterGroups) {
						yeeobject.choose.dom.childNodes[8+i].hidden=false
					} else {
						yeeobject.choose.dom.childNodes[8+i].hidden=true
					}
				}
				
				// xHowManyVoterGroups.choose.sliders[0].value = config.numVoterGroups
				
				// MODEL //
				model.numVoterGroups = config.numVoterGroups
				model.howManyVoterGroupsRealName = config.howManyVoterGroupsRealName
			}
			self.configureVoterSet = function(voterSetConfig,config) {
				 // Attributes set by the "how many groups of voters" menu. e.g. Positions and Distributions
				var num = config.numVoterGroups;
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
					if (config.oneVoter) {
						var dist = SingleVoter
					} else {
						var dist = GaussianVoters
					}
					var voterConfig = {
						dist: dist,
						vid: i,
						num:(4-num),
						x:pos[0] * config.arena_size / 300 , //+ (config.arena_size - 300) * .5
						y:pos[1] * config.arena_size / 300 //+ (config.arena_size - 300) * .5
					}
					_copySomeAttributes(voterConfig,config,[
						"snowman",
						"x_voters"
					])
					Object.assign(voterSetConfig[i],voterConfig)				
				}
			}
			self.select = function(config) {
				self.choose.highlight("realname", config.howManyVoterGroupsRealName);
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var xHowManyVoterGroups = new function() { // if the last option X is selected, we need a selection for number of voters
			var self = this
			self.name = "xHowManyVoterGroups"
			self.onChoose = function(slider,n) {

	
				// UPDATE CONFIG //
				config.xNumVoterGroups = slider.value;
				config.numVoterGroups = slider.value;
				config.candidatePositions = save().candidatePositions;
				config.voterPositions = null;
	
				// UPDATE MODEL //
				self.configureMM(model,config)
				// reset!
				_reincarnateDraggables()
				model.update();
				setInPosition();
			}		
			self.configureMM= function(model,config) {
				// UPDATE MENU //
				for (i in percentstrategy.choose.sliders) percentstrategy.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
				for (i in group_count.choose.sliders) group_count.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
				for (i in group_spread.choose.sliders) group_spread.choose.sliders[i].setAttribute("style",(i<config.numVoterGroups) ?  "display:inline": "display:none")
				for(var i=0;i<maxVoters-1;i++) {
					if (i < config.numVoterGroups) {
						yeeobject.choose.dom.childNodes[8+i].hidden=false
					} else {
						yeeobject.choose.dom.childNodes[8+i].hidden=true
					}
				}
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
			doms[self.name] = self.choose.dom
			self.select = function(config) {
				self.choose.sliders[0].value = config.xNumVoterGroups // TODO: load x_voters config somehow
			}
			items.push(self)
		}
		
		var group_count = new function() {  // group count
			var self = this
			self.name = "group_count"

			self.onChoose = function(slider,n) {
				// UPDATE CONFIG //
				config.voter_group_count[n] = slider.value;
				config.candidatePositions = save().candidatePositions; 
				config.voterPositions = save().voterPositions;
				// UPDATE MODEL //
				_reincarnateDraggables()
				model.reset()
				model.update();
				setInPosition();
			}		
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.group_count = config.voter_group_count[i]
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
			doms[self.name] = self.choose.dom
			self.select = function(config) {
				for (i in self.choose.sliders) {
					self.choose.sliders[i].value = config.voter_group_count[i]
				}
			}
			items.push(self)
		}

		var group_spread = new function() {  // group count
			var self = this
			self.name = "group_spread"

			self.onChoose = function(slider,n) {
				// UPDATE CONFIG //
				config.voter_group_spread[n] = slider.value;
				config.candidatePositions = save().candidatePositions; 
				config.voterPositions = save().voterPositions;
				// UPDATE MODEL //
				_reincarnateDraggables()
				model.reset()
				model.update();
				setInPosition();
			}
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.group_spread = config.voter_group_spread[i]
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
			doms[self.name] = self.choose.dom
			self.select = function(config) {
				for (i in self.choose.sliders) {
					self.choose.sliders[i].value = config.voter_group_spread[i]
				}
			}
			items.push(self)
		}

		var howManyCandidates = new function() { // how many candidates?
			var self = this
			self.name = "howManyCandidates"
			self.list = [
				{name:"two", num:2, margin:4},
				{name:"three", num:3, margin:4},
				{name:"four", num:4, margin:4},
				{name:"five", num:5}
			];
			self.configureCS = function(config) { // expanding upon what the button means for the model
				addCandidates = []
				// Candidates, in a circle around the center.
				var _candidateIDs = ["square","triangle","hexagon","pentagon","bob"];
				var angle = 0;
				var num = config.numOfCandidates;
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
					addCandidates.push({id:id, x:x, y:y});
					angle += Math.TAU/num;
				}
				return addCandidates
			}
			self.onChoose = function(data){

				// UPDATE CONFIG //
				config.numOfCandidates = data.num;
				// save voters before switching!
				config.voterPositions = save().voterPositions;
				config.candidatePositions = null;

				// UPDATE MODEL //
				self.configureMM(model,config)
				_reincarnateDraggables()
				model.update()
				// model.reset();
				setInPosition();

			};
			self.choose = new ButtonGroup({
				label: "how many candidates?",
				width: 52,
				data: self.list,
				onChoose: self.onChoose
			});
			self.configureMM= function(model,config) {
				model.numOfCandidates = config.numOfCandidates
			}
			self.select = function(config) {
				self.choose.highlight("num", config.numOfCandidates);
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var strategy1 = new function() { // strategy 1 AKA unstrategic voters' strategy
			var self = this
			self.name = "unstrategic"
			self.list = [
				{name:"O", realname:"zero strategy. judge on an absolute scale.", margin:5},
				{name:"N", realname:"normalize", margin:5},
				{name:"F", realname:"normalize frontrunners only", margin:5},
				{name:"F+", realname:"best frontrunner", margin:5},
				{name:"F-", realname:"not the worst frontrunner"}
			];
			self.onChoose = function(data){
				// LOAD CONFIG //
				config.unstrategic = data.realname;
				_loadConfigForStrategyButtons(config)
				// CONFIGURE MM //
				self.configureMM(model,config)
				// UPDATE //
				for(var i=0;i<model.voters.length;i++){
					model.voters[i].unstrategic = config.unstrategic
				}
				_showHideMenus()
				model.update();
			};
			self.choose = new ButtonGroup({
				label: "what's voters' strategy?",
				width: 40,
				data: self.list,
				onChoose: self.onChoose
			});
			self.configureMM = function(model,config){
				model.unstrategic = config.unstrategic
			}
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.unstrategic = config.unstrategic
			}
			self.select = function(config) {
				self.choose.highlight("realname", config.unstrategic);
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		function _loadConfigForStrategyButtons(config) {			
			var not_f = ["zero strategy. judge on an absolute scale.","normalize"]
			var turnOffFrontrunnerControls =  not_f.includes(config.unstrategic)
			if (config.second_strategy) {
				for(var i=0;i<config.voterStrategies.length;i++){
					if (! not_f.includes(config.voterStrategies[i])){
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

		var enableStrategy2 = new function() { // Is there a 2nd strategy?
			var self = this
			self.name = "second strategy"
			self.list = [
				{realname: "opton for 2nd strategy", name:"2"}
			];
			self.onChoose = function(data){
				// LOAD CONFIG //
				var xlist = ["strategy","percentstrategy"]
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
				config.second_strategy = data.isOn
				_loadConfigForStrategyButtons(config)
				
				self.configureMM(model,config)
				// CONFIGURE MM
				_showHideMenus()
				// UPDATE
				for(var i=0;i<model.voters.length;i++){
					model.voters[i].second_strategy = config.second_strategy
				}
				model.update();
			};
			self.choose = new ButtonGroup({
				label: "",
				width: 40,
				data: self.list,
				onChoose: self.onChoose,
				isCheckbox: true
			});
			self.configureMM = function(model,config){
				model.second_strategy = config.second_strategy
			}
			// self.configureVG = function(voterConfig,config,i) { // maybe not needed
			// 	voterConfig.second_strategy = config.second_strategy
			// }
			self.select = function(config) {
				if (config.second_strategy) {
					self.choose.highlight("name", "2");
				}
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var strategy2 = new function() { // strategy 2 AKA strategic voters' strategy
			var self = this
			self.name = "strategy"
			self.list = [
				{name:"O", realname:"zero strategy. judge on an absolute scale.", margin:5},
				{name:"N", realname:"normalize", margin:5},
				{name:"F", realname:"normalize frontrunners only", margin:5},
				{name:"F+", realname:"best frontrunner", margin:5},
				{name:"F-", realname:"not the worst frontrunner"}
			];
			self.onChoose = function(data){
				// UPDATE CONFIG //
				config.strategic = data.realname
				for (var i = 0; i < maxVoters; i++) {
					config.voterStrategies[i] = data.realname
				}
				_loadConfigForStrategyButtons(config)

				// UPDATE MODEL //
				self.configureMM(model,config)
				for(var i=0;i<model.voters.length;i++){
					model.voters[i].strategy = config.voterStrategies[i]
				}
				_showHideMenus()
				model.update();
			};
			self.choose = new ButtonGroup({
				label: "what's voters' 2nd strategy?",
				width: 40,
				data: self.list,
				onChoose: self.onChoose
			});
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.strategy = config.voterStrategies[i]
			}
			self.configureMM = function(model,config){
				model.strategic = config.strategic
			}
			self.select = function(config) {
				self.choose.highlight("realname", config.strategic);
				// if (config.voterStrategies[0] != "starnormfrontrunners") { // kind of a hack for now, but I don't really want another button
				// 	self.choose.highlight("realname", config.voterStrategies[0]);
				// }
			}
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		if(0){

			var strategyPercent = [
				{name:"0", num:0, margin:4},
				{name:"50", num:50, margin:4},
				{name:"80", num:80, margin:4},
				{name:"100", num:100}
			];
			var onChoosePercentStrategy = function(data){

				// UPDATE CONFIG //
				config.voterPercentStrategy[0] = data.num;

				// UPDATE MODEL //
				// no reset...
				for(var i=0;i<model.voters.length;i++){
					model.voters[i].percentStrategy = config.voterPercentStrategy[i]
				}
				model.update();

			};
			window.choosePercentStrategy = new ButtonGroup({
				label: "how many strategize? %",
				width: 52,
				data: strategyPercent,
				onChoose: onChoosePercentStrategy
			});
			document.querySelector("#left").appendChild(choosePercentStrategy.dom);

		}
		
		var percentstrategy = new function() {  // group count
			var self = this
			self.name = "percentstrategy"

			self.onChoose = function(slider,n) {
				// LOAD CONFIG //
				config.voterPercentStrategy[n] = slider.value;
				// _loadConfigForStrategyButtons(config) // not necessary
				// UPDATE MODEL //
				model.voters[n].percentStrategy = config.voterPercentStrategy[n]
				model.update();
			}		
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.percentStrategy = config.voterPercentStrategy[i]
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
			doms[self.name] = self.choose.dom
			self.select = function(config) {
				for (i in self.choose.sliders) {
					self.choose.sliders[i].value = config.voterPercentStrategy[i]
				}
			}
			items.push(self)
		}	

		if (0) { // are there primaries?
			// 
			
			// var primaries = [
			// 	{name:"Yes",realname:"Yes", margin:5},
			// 	{name:"No",realname:"No"}
			// ];
			// var onChoosePrimaries = function(data){
			// 	config.primaries = data.name
			// 	model.primaries = data.name
			// 	model.update()

			// };
			// window.choosePrimaries = new ButtonGroup({
			// 	label: "Primaries?",
			// 	width: 72,
			// 	data: primaries,
			// 	onChoose: onChoosePrimaries
			// });
			// document.querySelector("#left").appendChild(choosePrimaries.dom);
			// doms["primaries"] = choosePrimaries.dom
		}

		var autoPoll = new function() { // do a poll to find frontrunner
			var self = this
			self.name = "autoPoll"
			self.list = [
				{name:"Auto",realname:"Choose frontrunners automatically.", margin:5},
				{name:"Manual",realname:"Press the poll button to find the frontrunners once."}
			];
			self.onChoose = function(data){
				// LOAD CONFIG //
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
				// CONFIGURE AND UPDATE MODEL AND MENUS//
				self.configureMM(model,config)
				_showHideMenus()
				model.update();
			};
			self.configureMM = function(model,config){
				model.autoPoll = config.autoPoll
			}
			self.select = function(config) {
				self.choose.highlight("name", config.autoPoll)
			}
			self.choose = new ButtonGroup({
				label: "AutoPoll to find new frontrunner:",
				width: 72,
				data: self.list,
				onChoose: self.onChoose
			});
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}
		
		function _iconButton(x) {return "<span class='buttonshape'>"+_icon(x)+"</span>"}

		var frun = new function() { // frontrunners
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
				// LOAD CONFIG //
				var preFrontrunnerSet = new Set(config.preFrontrunnerIds)
				if (data.isOn) {
					preFrontrunnerSet.add(data.realname)
				} else {
					preFrontrunnerSet.delete(data.realname)
				}
				config.preFrontrunnerIds = Array.from(preFrontrunnerSet)
				// CONFIGURE AND UPDATE MODEL //
				self.configureMM(model,config)
				model.update();
			};
			self.configureMM = function(model,config){
				model.preFrontrunnerIds = config.preFrontrunnerIds
			}
			self.configureVG = function(voterConfig,config,i) {
				voterConfig.preFrontrunnerIds = config.preFrontrunnerIds
			}
			self.select = function(config) {
				self.choose.highlight("realname", model.preFrontrunnerIds);
			}
			self.choose = new ButtonGroup({
				label: "who are the frontrunners?",
				width: 40,
				data: self.list,
				onChoose: self.onChoose,
				isCheckbox: true
			});
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var poll = new function() { // do a poll to find frontrunner
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
				frun.choose.highlight("realname", won);
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
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var yeeobject = new function() { // yee
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
			self.expYeeObject = function(config,model) {
				// Yee diagram
				if (config.kindayee == "can") {
					return model.candidatesById[config.keyyee]
				} else if (config.kindayee=="voter") {
					return model.voters[config.keyyee]
				} else if (config.kindayee=="off") {
					return undefined
				} else if (config.kindayee=="center") { 
					return model.voterCenter
				} else { // if yeeobject is not defined
					return undefined
				}
			}
			self.onChoose = function(data){
				// LOAD CONFIG //
				config.kindayee = data.kindayee
				config.keyyee = data.keyyee
				var yeeob = self.expYeeObject(config,model)
				var xlist = ["choose_pixel_size","yeefilter"]
				var featureset = new Set(config.featurelist)
				for (var i in xlist){
					var xi = xlist[i]
					if (yeeob) {
						featureset.add(xi)
					} else {
						featureset.delete(xi)
					}
				}
				config.featurelist = Array.from(featureset)

				// CONFIGURE AND UPDATE MODEL AND MENUS //
				self.configureMM(model,config)
				_showHideMenus()
				model.update();
			};
			self.configureMM = function(model,config){
				model.yeeobject = self.expYeeObject(config,model)
				model.yeeon = (model.yeeobject != undefined) ? true : false
			}
			self.select = function(config) {
				self.choose.highlight("keyyee", config.keyyee);
			}
			self.choose = new ButtonGroup({
				label: "which object for yee map?",
				width: 20,
				data: self.list,
				onChoose: self.onChoose
			});
			self.choose.dom.childNodes[6].style.width = "68px"
			self.choose.dom.setAttribute("id","yee")
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var yeefilter = new function() { 	// yee filter
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
				// CONFIGURE AND UPDATE MODEL //
				self.configureMM(model,config)
				model.update();
			};
			self.configureMM = function(model,config){
				model.yeefilter = config.yeefilter
			}
			self.select = function(config) {
				self.choose.highlight("realname", config.yeefilter);
			}
			self.choose = new ButtonGroup({
				label: "filter yee map?",
				width: 20,
				data: self.list,
				onChoose: self.onChoose,
				isCheckbox: true
			});
			self.choose.dom.setAttribute("id","yeefilter")
			document.querySelector("#left").appendChild(self.choose.dom);
			doms[self.name] = self.choose.dom
			items.push(self)
		}

		var gearconfig = new function() { 	// gear config - decide which menu items to do
			var self = this
			// self.name = "gearconfig"
			self.list = []
			for (i in allnames) self.list.push({name:i,realname:allnames[i],margin:1})
			self.onChoose = function(data){
				// LOAD CONFIG //
				var featureset = new Set(config.featurelist)
				if (data.isOn) {
					featureset.add(data.realname)
					doms[data.realname].hidden = false
				} else {
					featureset.delete(data.realname)
					doms[data.realname].hidden = true
				}
				config.featurelist = Array.from(featureset)
				// CONFIGURE AND UPDATE MENU //
				_showHideMenus()
			};
			self.select = function(config) {
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
			document.querySelector("#left").insertBefore(self.choose.dom,doms["systems"]);
			// doms[self.name] = self.choose.dom
			items.push(self)
		}

		




		// get current filename, in order to go back to the original intended preset

		var presetconfig = _buildPresetConfig({nElection:14,nBallot:12})
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

		var onChoosepresetconfig = function(data){
			if (data.isOn) {
				var firstletter = data.htmlname[0]
				if (firstletter == 'e' || firstletter == 's') {
					// UPDATE CONFIG //
					config = loadpreset(data.htmlname)
					cleanConfig(config)
					// UPDATE MAIN //
					initialConfig = _jcopy(config);
					set_layout_wrt_arena(config.arena_size)
					// UPDATE MODEL //
					model.size = config.arena_size
					model.resize()
					model.reset(true);
					model.onInit();
					setInPosition();
					// UPDATE MENU //
					selectMENU();
				} else if (firstletter == 'b') {
					// UPDATE MAIN //
					//document.location.replace(data.htmlname);
					// UPDATE CONFIG //
					ballotconfig = loadpreset(data.htmlname)
					var systemTranslator = {Plurality:"FPTP",Ranked:"Condorcet",Approval:"Approval",Score:"Score",Three:"3-2-1"}
					config = {}
					config.system = systemTranslator[ballotconfig.system]
					var s = ballotconfig.strategy || "zero strategy. judge on an absolute scale."
					config.voterStrategies = [s,s,s]
					config.preFrontrunnerIds = ballotconfig.preFrontrunnerIds
					config.featurelist = []
					if (ballotconfig.showChoiceOfFrontrunners) {config.featurelist.push("frontrunners")}
					if (ballotconfig.showChoiceOfStrategy) {config.featurelist.push("strategy")}
					config.oneVoter = true
					config.arena_size = 300
					cleanConfig(config)
					// UPDATE MAIN //
					initialConfig = _jcopy(config);
					set_layout_wrt_arena(config.arena_size)
					// UPDATE MODEL //
					model.size = config.arena_size
					model.resize()
					model.reset(true);
					model.onInit();
					setInPosition();
					// UPDATE MENU //
					selectMENU();
				}
			}
		};
		window.choosepresetconfig = new ButtonGroup({
			label: "pick a preset:",
			width: 38,
			data: presetconfig,
			onChoose: onChoosepresetconfig
		});
		choosepresetconfig.dom.hidden = true
		document.querySelector("#left").insertBefore(choosepresetconfig.dom,doms["systems"]);
		
		if(window.choosepresetconfig) choosepresetconfig.highlight("htmlname", config.presethtmlname);
		// only do this once.  Otherwise it would be in SelectMENU


		var pixelsize = [{name:"60",val:60,margin:4},{name:"30",val:30,margin:4},{name:"12",val:12,margin:4},{name:"6",val:6}]
		var onChoosePixelsize = function(data){
			// UPDATE CONFIG //
			config.pixelsize = data.val
			// UPDATE MODEL //
			model.pixelsize = data.val
			model.update()
		};
		window.choosePixelsize = new ButtonGroup({
			label: "size of pixels in yee diagram:",
			width: 38,
			data: pixelsize,
			onChoose: onChoosePixelsize
		});
		document.querySelector("#left").appendChild(choosePixelsize.dom);
		choosePixelsize.dom.hidden = true
		doms["choose_pixel_size"] = choosePixelsize.dom
		

		var computeMethod = [{name:"gpu",margin:4},{name:"js",margin:4},{name:"ez"}]
		var onChooseComputeMethod = function(data){
			// UPDATE CONFIG //
			config.computeMethod = data.name
			// UPDATE MODEL //
			model.computeMethod = data.name
			model.update()
		};
		window.chooseComputeMethod = new ButtonGroup({
			label: "method of computing yee diagram:",
			width: 38,
			data: computeMethod,
			onChoose: onChooseComputeMethod
		});
		chooseComputeMethod.dom.hidden = true
		document.querySelector("#left").insertBefore(chooseComputeMethod.dom,doms["systems"]);
		
		var spread_factor_voters = [{name:"1",val:1,margin:4},{name:"2",val:2,margin:4},{name:"5",val:5}]
		var onChoose_spread_factor_voters = function(data){
			// UPDATE CONFIG //
			config.spread_factor_voters = data.val
			// // save candidates before switching!
			config.candidatePositions = save().candidatePositions; // not sure if needed
			// // reset!
			config.voterPositions = null; // not sure if needed
			// UPDATE MODEL //
			model.spread_factor_voters = data.val
			model.reset();
			setInPosition();
		};
		window.choose_spread_factor_voters = new ButtonGroup({
			label: "Voter Spread:",
			width: 38,
			data: spread_factor_voters,
			onChoose: onChoose_spread_factor_voters
		});
		choose_spread_factor_voters.dom.hidden = true
		document.querySelector("#left").insertBefore(choose_spread_factor_voters.dom,doms["systems"]);
		
		var arena_size = [{name:"300",val:300,margin:4},{name:"600",val:600}]

		var set_layout_wrt_arena = function(a_size) {
			addsome = a_size - 300

			// document.querySelector("#sandbox").style.width = 802 + addsome
			// document.querySelector("#sandbox_iframe").style.width = 802 + addsome

			// select all elements in class .sim-sandbox
			// document.querySelector("#sandbox").style.width = 800 + addsome

			// #center
			document.getElementById("center").style.height = (320 + addsome) + "px"
			document.getElementById("center").style.width = (320 + addsome) + "px"

			// #description_container
			document.getElementById("description_container").style.width = (800 + addsome) + "px"

			// #description_container textarea
			document.getElementById("description_text").style.width = (778 + addsome) + "px"

			// #savelink
			document.getElementById("savelink").style.top = (471 + addsome) + "px"
			document.getElementById("savelink").style.width = (82 + addsome) + "px"


			document.getElementById("save").style.top = (470 + addsome) + "px"
			document.getElementById("reset").style.top = (470 + addsome) + "px"
		}
		var onChoose_arena_size = function(data){
			// UPDATE CONFIG //
			config.arena_size = data.val
			if ("300" == data.val) config.spread_factor_voters = 1
			if ("600" == data.val) config.spread_factor_voters = 2
			config.voterPositions = save().voterPositions;
			config.candidatePositions = save().candidatePositions;
			cleanConfig(config)
			// UPDATE MAIN //
			initialConfig = _jcopy(config);
			set_layout_wrt_arena(config.arena_size)
			// init_model_config.size = data.val
			// window.model = new Model(init_model_config);
			// UPDATE MODEL //
			model.size = data.val			
			model.spread_factor_voters = config.spread_factor_voters
			// model.reset();
			// setInPosition();
			model.size = config.arena_size
			model.resize()
			model.reset(true);
			model.onInit();
			setInPosition();
			// UPDATE MENU //
			selectMENU();
			
		};
		window.choose_arena_size = new ButtonGroup({
			label: "Arena size:",
			width: 38,
			data: arena_size,
			onChoose: onChoose_arena_size
		});
		choose_arena_size.dom.hidden = true
		document.querySelector("#left").insertBefore(choose_arena_size.dom,doms["systems"]);
		

		var median_mean = [{name:"median",val:2,margin:4},{name:"mean",val:1}]

		var onChoose_median_mean = function(data){
			// UPDATE CONFIG //
			config.median_mean = data.val
			// UPDATE MODEL //
			model.median_mean = data.val
			model.update()
		};
		window.choose_median_mean = new ButtonGroup({
			label: "Median or Mean:",
			width: 68,
			data: median_mean,
			onChoose: onChoose_median_mean
		});
		choose_median_mean.dom.hidden = true
		document.querySelector("#left").insertBefore(choose_median_mean.dom,doms["systems"]);



		var utility_shape = [	
			{name:"linear",margin:4},
			{name:"quadratic",margin:4},
			{name:"log"}]

		var onChoose_utility_shape = function(data){
			// UPDATE CONFIG //
			config.utility_shape = data.name
			// UPDATE MODEL //
			model.utility_shape = data.name
			model.update()
		};
		window.choose_utility_shape = new ButtonGroup({
			label: "Utility Shape:",
			width: 68,
			data: utility_shape,
			onChoose: onChoose_utility_shape
		});
		choose_utility_shape.dom.hidden = true
		document.querySelector("#left").insertBefore(choose_utility_shape.dom,doms["systems"]);



		// gear button (combines with above)
		
		var gearicon = [{name:"config"}]
		var onChoosegearicon = function(data){
			// UPDATE MENU //
			if (data.isOn) {
				gearconfig.choose.dom.hidden = false
				choosepresetconfig.dom.hidden = false
				chooseComputeMethod.dom.hidden = false
				choose_spread_factor_voters.dom.hidden = false
				choose_arena_size.dom.hidden = false
				choose_median_mean.dom.hidden = false
				choose_utility_shape.dom.hidden = false
			} else {
				gearconfig.choose.dom.hidden = true
				choosepresetconfig.dom.hidden = true
				chooseComputeMethod.dom.hidden = true
				choose_spread_factor_voters.dom.hidden = true
				choose_arena_size.dom.hidden = true
				choose_median_mean.dom.hidden = true
				choose_utility_shape.dom.hidden = true
			}
		};
		window.choosegearicon = new ButtonGroup({
			label: "",
			width: 60,
			data: gearicon,
			onChoose: onChoosegearicon,
			isCheckbox: true
		});
		document.querySelector("#left").insertBefore(choosegearicon.dom,gearconfig.choose.dom);
		
		if(config.hidegearconfig) choosegearicon.dom.hidden = true
		
		
		///////////////////////
		//////// INIT! ////////
		///////////////////////

		model.onInit(); // NOT init, coz don't update yet...
		setInPosition();











		// seems that we update the MENU based on the model sometimes and the config other times.
		// Select the MENU!
		var selectMENU = function(){
			items.map(x=> {
				if(x.select) x.select(config)
			})
			// if(window.choosePrimaries) choosePrimaries.highlight("name", config.primaries)
			if(window.chooseComputeMethod) chooseComputeMethod.highlight("name", config.computeMethod);
			if(window.choosePixelsize) choosePixelsize.highlight("name", config.pixelsize);
			if(window.choose_spread_factor_voters) choose_spread_factor_voters.highlight("name", config.spread_factor_voters);
			if(window.choose_arena_size) choose_arena_size.highlight("name", config.arena_size);
			if(window.choose_median_mean) choose_median_mean.highlight("val", config.median_mean);
			if(window.choose_utility_shape) choose_utility_shape.highlight("name", config.utility_shape);
			
		};
		selectMENU();
		//onChoose_arena_size({val: config.arena_size})


		//////////////////////////
		//////// RESET... ////////
		//////////////////////////

		// CREATE A RESET BUTTON
		var resetDOM = document.createElement("div");
		resetDOM.id = "reset";
		resetDOM.innerHTML = "reset";
		resetDOM.style.top = "340px";
		resetDOM.style.left = "350px";
		resetDOM.onclick = function(){

			// UPDATE CONFIG //
			config = JSON.parse(JSON.stringify(initialConfig)); // RESTORE IT!

			// UPDATE MODEL //
			// Reset manually, coz update LATER.
			model.reset(true);
			model.onInit();
			setInPosition();

			// UPDATE MENU //
			// Back to ol' MENU
			selectMENU();

		};
		document.body.appendChild(resetDOM);


		///////////////////////////
		////// SAVE POSITION //////
		///////////////////////////

		window.save = function(log){ 
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

		window.console_out = function(log,config){
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
			var pos = window.save()  // saves the candidate and voter positions in the config.
			for (i in pos) config[i] = pos[i] 
			console_out(1,config)
		}

		//////////////////////////////////
		/////// SAVE & SHARE, YO! ////////
		//////////////////////////////////

		var descText, linkText;
		if(1){ // SAVE & SHARE as feature.

			
			if (config.sandboxsave) {
				// Create a description up top
				var descDOM = document.createElement("div");
				descDOM.id = "description_container";
				var refNode = document.getElementById("left");
				document.body.insertBefore(descDOM, refNode);
				descText = document.createElement("textarea");
				descText.id = "description_text";
				descDOM.appendChild(descText);

				// yay.
				descText.value = initialConfig.description;
			}
			// Move that reset button
			if (config.sandboxsave) {
				resetDOM.style.top = (470 - 300 + config.arena_size) + "px";
				resetDOM.style.left = "235px";
			} else {
				resetDOM.style.top = "340px";
				resetDOM.style.left = "245px";
			}


			
			// Create a "save" button
			var saveDOM = document.createElement("div");
			saveDOM.id = "save";
			saveDOM.innerHTML = "save:";
			if (config.sandboxsave) {
				saveDOM.style.top = (470 - 300 + config.arena_size) + "px";
				saveDOM.style.left = "350px";
			} else {
				saveDOM.style.top = "340px";
				saveDOM.style.left = "350px";
			}
			saveDOM.onclick = function(){
				// UPDATE CONFIG //
				config.sandboxsave = true // this seems to fix a bug
				var pos = window.save()  // saves the candidate and voter positions in the config.
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



			// The share link textbox
			linkText = document.createElement("input");
			linkText.id = "savelink";
			linkText.placeholder = "[when you save your model, a link you can copy will show up here]";
			linkText.setAttribute("readonly", true);
			linkText.onclick = function(){
				linkText.select();
			};
			if (config.sandboxsave) {
				//skip

				addsome = model.size - 300

				document.getElementById("center").style.height = (320 + addsome) + "px"
				document.getElementById("center").style.width = (320 + addsome) + "px"
	
				// #description_container
				document.getElementById("description_container").style.width = (800 + addsome) + "px"
	
				// #description_container textarea
				document.getElementById("description_text").style.width = (778 + addsome) + "px"

				// #savelink
				linkText.style.width = (82 + addsome) + "px"	
				linkText.style.top = (471 + addsome) + "px";
			} else {
				linkText.style.position = "absolute";
				linkText.style.top = "340px";
				linkText.style.left = "460px";
				linkText.style.height = "30px";
				linkText.style.width = "90px";
			}
			document.body.appendChild(linkText);

			// Create a URL... (later, PARSE!)
			// save... ?d={s:[system], v:[voterPositions], c:[candidatePositions], d:[description]}

		}

	};

	Loader.load([
		
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

	]);

	//if(config.sandboxsave) resetDOM.onclick();
	
	// SAVE & PARSE
	// ?m={s:[system], v:[voterPositions], c:[candidatePositions], d:[description]}
	
	
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

};
