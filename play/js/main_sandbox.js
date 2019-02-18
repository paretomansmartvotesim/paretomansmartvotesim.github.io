window.FULL_SANDBOX = window.FULL_SANDBOX || false;
window.HACK_BIG_RANGE = true;

window.ONLY_ONCE = false;

function main(config){

	// ONCE.
	if(ONLY_ONCE) return;
	ONLY_ONCE=true;

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

	// Initialize variables
	var initialConfig
	var allnames = ["systems","rbvote","voters","custom_number_voters","group_count","group_spread","candidates","strategy","second strategy","percentstrategy","unstrategic","frontrunners","autoPoll","poll","yee","yeefilter","choose_pixel_size"] // ,"primaries"
	var doms = {}  // for hiding menus, later
	var stratsliders = [] // for hiding sliders, later
	var groupsliders = [] // for hiding sliders, later
	var x_voter_sliders = [] // for hiding sliders, later
	var spreadsliders = [] // for hiding sliders, later
	
	// workaround
	var maxVoters = 10 // there is a bug where the real max is one less than this

	
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
					case 2: return ["systems","voters"]
					case 3: return ["systems","voters","candidates"]
					case 4: 
						config.sandboxsave = true
						return ["systems","voters","candidates"] 	}	}	}
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

		// helper
		var all_candidate_names = Object.keys(Candidate.graphics)

		// DEFAULTS
		
		_fillInDefaults(config, {
			configversion:1,
			system: "FPTP",
			rbsystem: "Tideman",
			numOfCandidates: 3,
			numVoterGroups: 1,
			snowman: false,
			x_voters: false,
			spread_factor_voters: 1,
			arena_size: 300,
			median_mean: 1,
			utility_shape: "linear",
			arena_border: 2,
			oneVoter: false,
			// votersRealName: "Single Voter",
			sandboxsave: false,
			featurelist: ["systems"],
			hidegearconfig: false,
			preFrontrunnerIds: ["square","triangle"],
			autoPoll: "Manual",
			// primaries: "No",
			description: "",
			unstrategic: "zero strategy. judge on an absolute scale.",
			strategic: "zero strategy. judge on an absolute scale.",
			second_strategy: true,
			keyyee: "off",
			yeefilter: all_candidate_names,
			computeMethod: "ez",
			pixelsize: 60
		})



	}
	cleanConfig(config)
	initialConfig = _jcopy(config);

	Loader.onload = function(){

		////////////////////////
		// THE FRIGGIN' MODEL //
		////////////////////////

		// the only use of the model config so far: sandboxsave
		var model_config = {size: config.arena_size, border: config.arena_border}
		window.model = new Model(model_config);
		document.querySelector("#center").appendChild(model.dom);
		model.dom.removeChild(model.caption);
		document.querySelector("#right").appendChild(model.caption);
		model.caption.style.width = "";

		
		model.election = Election.plurality;
		model.optionsForElection = {sidebar:true}


		// INIT!
		model.onInit = function(){


			// model //
			// Based on config... what should be what?
			_copySomeAttributes(model,config,  // This set of attributes is copied from config to model
				["system",
				"numOfCandidates",
				"numVoterGroups",
				"rbsystem",
				"preFrontrunnerIds",
				"autoPoll",
				// "primaries",
				"computeMethod",
				"pixelsize",
				"spread_factor_voters",
				"arena_size",
				"median_mean",
				"utility_shape",
				"arena_border",
				"yeefilter"
			])
			model.votersRealName = exp_votersRealName(config) // this set of attributes is calculated based on config
			model.voterType = expVotingSystem(config).voter
			model.election = expVotingSystem(config).election
			model.ballotType = window[expVotingSystem(config).ballot];
			model.rbelection = expRbVotingSystem(config).rbelection
			exp_addVoters(config).map(x => model.addVoters(x))
			model.addVoterCenter()
			exp_addCandidates(config).map(x => model.addCandidate(x))
			model.yeeobject = expYeeObject(config,model)
			model.yeeon = (model.yeeobject != undefined) ? true : false
			
			// UI //
			// Make the UI look correct.  The UI is not part of the "model".
			for (i in stratsliders) stratsliders[i].setAttribute("style",(i<config.voters) ?  "display:inline": "display:none")
			for (i in groupsliders) groupsliders[i].setAttribute("style",(i<config.voters) ?  "display:inline": "display:none")
			for (i in spreadsliders) spreadsliders[i].setAttribute("style",(i<config.voters) ?  "display:inline": "display:none")
			// hide some menus
			for (i in allnames) if(config.featurelist.includes(allnames[i])) {doms[allnames[i]].hidden = false} else {doms[allnames[i]].hidden = true}
			
			// helpers //
			function exp_addVoters(config) { // Give configuration to each voter group.
				var addVoters = expVoterPositionsAndDistributions(config) // Attributes set by the "how many groups of voters" menu. e.g. Positions and Distributions
				for(var i=0; i<config.numVoterGroups; i++){
					var voterConfig = { // This set of attributes requires further computing
						type: expVotingSystem(config).voter,
						strategy: config.voterStrategies[i],
						percentStrategy: config.voterPercentStrategy[i],
						group_count: config.voter_group_count[i],
						group_spread: config.voter_group_spread[i]
					}
					_copySomeAttributes(voterConfig,config,[ // This set of attributes is just copied over
						"second_strategy",
						"preFrontrunnerIds",
						"unstrategic",
						"spread_factor_voters",
						"arena_size",
						"arena_border"
					])
					Object.assign(addVoters[i], voterConfig)
				}
				return addVoters
			}

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

		
		//////////////////////////////////
		// BUTTONS - WHAT VOTING SYSTEM //
		//////////////////////////////////


		// Which voting system?
		var votingSystems = [
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
		function expVotingSystem(config) {
			var votingSystem = votingSystems.filter(function(system){
				return(system.name==config.system);
			})[0];
			return votingSystem;
		}
		var onChooseSystem = function(data){

			// update config...
			config.system = data.name;

			// update gui
			var turnOnRBVote = (data.name == "RBVote")
			var xlist = ["rbvote"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if ( turnOnRBVote) {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)

			// no reset...
			model.system = config.system
			model.voterType = data.voter;
			model.ballotType = window[data.ballot];
			
			for(var i=0;i<model.voters.length;i++){
				model.voters[i].setType(data.voter);
			}
			model.election = data.election;
			model.pollResults = undefined
			model.update();

		};
		window.chooseSystem = new ButtonGroup({
			label: "what voting system?",
			width: 108,
			data: votingSystems,
			onChoose: onChooseSystem
		});
		document.querySelector("#left").appendChild(chooseSystem.dom);
		doms["systems"] = chooseSystem.dom


		// Which RB voting system?
		var rbVotingSystems = [
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
		function expRbVotingSystem(config) {
			var votingSystem = rbVotingSystems.filter(function(system){
				return(system.name==config.rbsystem);
			})[0];
			return votingSystem;
		}
		var onChooseRBSystem = function(data){

			// update config...
			config.rbsystem = data.name;
			model.rbsystem = data.name;
			model.rbelection = data.rbelection

			model.pollResults = undefined
			model.update();

		};
		window.chooseRBSystem = new ButtonGroup({
			label: "which RB voting system?",
			width: 108,
			data: rbVotingSystems,
			onChoose: onChooseRBSystem
		});
		document.querySelector("#left").appendChild(chooseRBSystem.dom);
		chooseRBSystem.dom.hidden = true
		doms["rbvote"] = chooseRBSystem.dom









		// How many voters?
		var numVoterGroups = [
			{realname: "Single Voter", name:"&#50883;", num:1, margin:6, oneVoter:true},
			{realname: "One Group", name:"1", num:1, margin:5},
			{realname: "Two Groups", name:"2", num:2, margin:5},
			{realname: "Three Groups", name:"3", num:3, margin:6},
			{realname: "Different Sized Groups (like a snowman)", name:"&#x2603;", num:3, snowman:true, margin:6},
			{realname: "Custom Number of Voters and Sizes and Spreads", name:"X", num:4, x_voters:true},
		];
		function exp_votersRealName(config) { // when we load from a config
			if (config.x_voters) {
				return numVoterGroups.filter( function(x){return x.x_voters || false})[0].realname
			} else if (config.snowman) {
				return numVoterGroups.filter( function(x){return x.snowman || false})[0].realname	
			} else if (config.oneVoter) {
				return numVoterGroups.filter( function(x){return x.oneVoter || false})[0].realname	
			} else {
				return numVoterGroups.filter( function(x){return x.num==config.numVoterGroups && (x.oneVoter || false) == false && (x.snowman || false) == false})[0].realname	
			}
		}
		function expVoterPositionsAndDistributions(config) {
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
			var addVoters = []
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
					x:pos[0] * model.arena_size / 300 , //+ (model.arena_size - 300) * .5
					y:pos[1] * model.arena_size / 300 //+ (model.arena_size - 300) * .5
				}
				_copySomeAttributes(voterConfig,config,[
					"snowman",
					"x_voters"
				])
				addVoters.push(voterConfig);
			
			}
			return addVoters
		}
		var onChooseVoters = function(data){

			// update config...
			config.numVoterGroups = data.num;
			//model.numVoterGroups = data.num;
			
			config.snowman = data.snowman || false;
			config.x_voters = data.x_voters || false;
			config.oneVoter = data.oneVoter || false;
			model.votersRealName = data.realname;
			// save candidates before switching!
			config.candidatePositions = save().candidatePositions;

			// reset!
			config.voterPositions = null;
			model.reset();
			setInPosition();
			
			for (i in stratsliders) stratsliders[i].setAttribute("style",(i<data.num) ?  "display:inline": "display:none")
			for (i in groupsliders) groupsliders[i].setAttribute("style",(i<data.num) ?  "display:inline": "display:none")
			for (i in spreadsliders) spreadsliders[i].setAttribute("style",(i<data.num) ?  "display:inline": "display:none")

			// add the configuration for the voter groups when "X" is chosen
			var xlist = ["group_count","group_spread","custom_number_voters"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if (data.x_voters) {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)

			// gui 
			for(var i=0;i<(maxVoters-1);i++) {
				if (i < data.num) {
					chooseyeeobject.dom.childNodes[8+i].hidden=false
				} else {
					chooseyeeobject.dom.childNodes[8+i].hidden=true
				}
			}
		};
		window.chooseVoters = new ButtonGroup({
			label: "how many groups of voters?",
			width: 32,
			data: numVoterGroups,
			onChoose: onChooseVoters
		});
		document.querySelector("#left").appendChild(chooseVoters.dom);
		doms["voters"] = chooseVoters.dom
		



		// if the last option X is selected, we need a selection for number of voters

		var button_group_3 = document.createElement('div')
		button_group_3.className = "button-group"
		document.querySelector("#left").appendChild(button_group_3)
		// var button_group_3_label = document.createElement('div')
		// button_group_3_label.className = "button-group-label"
		// button_group_3_label.innerHTML = "how spread out is the group?";
		// button_group_3.appendChild(button_group_3_label)
		var makeslider3 = function(chtext,chid,chfn,containchecks,n) {
			var slider = document.createElement("input");
			slider.type = "range";
			slider.max = maxVoters-1;
			slider.min = "1";
			slider.value = "4";
			//slider.setAttribute("width","20px");
			slider.id = chid;
			slider.class = "slider";
			slider.addEventListener('input', function() {chfn(slider,n)}, true);
			var label = document.createElement('label')
			label.htmlFor = chid;
			label.appendChild(document.createTextNode(chtext));
			containchecks.appendChild(slider);
			//containchecks.appendChild(label);
			slider.innerHTML = chtext;
			return slider
		} // https://stackoverflow.com/a/866249/8210071

		var containchecks3 = button_group_3.appendChild(document.createElement('div'));
		containchecks3.id="containsliders"
		var slfn = function(slider,n) {
			config.voters = slider.value;
			config.candidatePositions = save().candidatePositions;

			// reset!
			config.voterPositions = null;
			model.reset();
			setInPosition();
			for (i in stratsliders) stratsliders[i].setAttribute("style",(i<slider.value) ?  "display:inline": "display:none")
			for (i in groupsliders) groupsliders[i].setAttribute("style",(i<slider.value) ?  "display:inline": "display:none")
			for (i in spreadsliders) spreadsliders[i].setAttribute("style",(i<slider.value) ?  "display:inline": "display:none")
			
			// gui 
			for(var i=0;i<maxVoters-1;i++) {
				if (i < slider.value) {
					chooseyeeobject.dom.childNodes[8+i].hidden=false
				} else {
					chooseyeeobject.dom.childNodes[8+i].hidden=true
				}
			}
		}
		x_voter_sliders[0] = makeslider3("","choose number of voter groups",slfn,containchecks3,i)
		doms["custom_number_voters"] = button_group_3
		







		
		// group count
		
		var button_group = document.createElement('div')
		button_group.className = "button-group"
		document.querySelector("#left").appendChild(button_group)
		var button_group_label = document.createElement('div')
		button_group_label.className = "button-group-label"
		button_group_label.innerHTML = "what # voters in each group?";
		button_group.appendChild(button_group_label)

		var makeslider1 = function(chtext,chid,chfn,containchecks,n) {
			var slider = document.createElement("input");
			slider.type = "range";
			slider.max = "200";
			slider.min = "0";
			slider.value = "50";
			//slider.setAttribute("width","20px");
			slider.id = chid;
			slider.class = "slider";
			slider.addEventListener('input', function() {chfn(slider,n)}, true);
			var label = document.createElement('label')
			label.htmlFor = chid;
			label.appendChild(document.createTextNode(chtext));
			containchecks.appendChild(slider);
			//containchecks.appendChild(label);
			slider.innerHTML = chtext;
			return slider
		} // https://stackoverflow.com/a/866249/8210071

		var containchecks1 = button_group.appendChild(document.createElement('div'));
		containchecks1.id="containsliders"
		var slfn = function(slider,n) {
			// update config...
				config.voter_group_count[n] = slider.value;
				if (n<model.numVoterGroups) {
					model.voters[n].group_count = config.voter_group_count[n]
				}
				config.candidatePositions = save().candidatePositions;

				// reset!
				config.voterPositions = save().voterPositions;
				model.reset();
				setInPosition();
		}
		for (var i = 0; i < maxVoters; i++) {
			groupsliders.push(makeslider1("","choose number",slfn,containchecks1,i))
		}
		doms["group_count"] = button_group









		
		// group spread
		
		var button_group_2 = document.createElement('div')
		button_group_2.className = "button-group"
		document.querySelector("#left").appendChild(button_group_2)
		var button_group_2_label = document.createElement('div')
		button_group_2_label.className = "button-group-label"
		button_group_2_label.innerHTML = "how spread out is the group?";
		button_group_2.appendChild(button_group_2_label)

		var makeslider2 = function(chtext,chid,chfn,containchecks,n) {
			var slider = document.createElement("input");
			slider.type = "range";
			slider.max = "500";
			slider.min = "10";
			slider.value = "250";
			//slider.setAttribute("width","20px");
			slider.id = chid;
			slider.class = "slider";
			slider.addEventListener('input', function() {chfn(slider,n)}, true);
			var label = document.createElement('label')
			label.htmlFor = chid;
			label.appendChild(document.createTextNode(chtext));
			containchecks.appendChild(slider);
			//containchecks.appendChild(label);
			slider.innerHTML = chtext;
			return slider
		} // https://stackoverflow.com/a/866249/8210071

		var containchecks2 = button_group_2.appendChild(document.createElement('div'));
		containchecks2.id="containsliders"
		var slfn = function(slider,n) {
			// update config...
				config.voter_group_spread[n] = slider.value;
				if (n<model.numVoterGroups) {
					model.voters[n].group_spread = config.voter_group_spread[n]
				}
				config.candidatePositions = save().candidatePositions;

				// reset!
				config.voterPositions = save().voterPositions;
				model.reset();
				setInPosition();
		}
		for (var i = 0; i < maxVoters; i++) {
			spreadsliders.push(makeslider2("","choose width in pixels",slfn,containchecks2,i))
		}
		doms["group_spread"] = button_group_2













		
		
		var candidates = [
			{name:"two", num:2, margin:4},
			{name:"three", num:3, margin:4},
			{name:"four", num:4, margin:4},
			{name:"five", num:5}
		];
		function exp_addCandidates(config) { // expanding upon what the button means for the model
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
		var onChooseCandidates = function(data){

			// update config...
			config.numOfCandidates = data.num;

			// save voters before switching!
			config.voterPositions = save().voterPositions;

			// reset!
			config.candidatePositions = null;
			model.reset();
			setInPosition();

		};
		window.chooseCandidates = new ButtonGroup({
			label: "how many candidates?",
			width: 52,
			data: candidates,
			onChoose: onChooseCandidates
		});
		document.querySelector("#left").appendChild(chooseCandidates.dom);
		doms["candidates"] = chooseCandidates.dom
		

		

		// unstrategic

		var strategyOff = [
			{name:"O", realname:"zero strategy. judge on an absolute scale.", margin:5},
			{name:"N", realname:"normalize", margin:5},
			{name:"F", realname:"normalize frontrunners only", margin:5},
			{name:"F+", realname:"best frontrunner", margin:5},
			{name:"F-", realname:"not the worst frontrunner"}
		];
		// old ones
		// {name:"FL", realname:"justfirstandlast", margin:5},
		// {name:"T", realname:"threshold"},
		// {name:"SNTF", realname:"starnormfrontrunners"}
		var onChooseVoterStrategyOff = function(data){

			// update config...
			// only the middle percent (for the yellow triangle)

			// no reset...
			config.unstrategic = data.realname; 
			for(var i=0;i<model.voters.length;i++){
				model.voters[i].unstrategic = config.unstrategic
			}
			model.update();

			// gui update
			var not_f = ["zero strategy. judge on an absolute scale.","normalize"]
			var turnOffFrontrunnerControls =  not_f.includes(config.unstrategic)
			for(var i=0;i<model.voters.length;i++){
				if (! not_f.includes(config.voterStrategies[i])) turnOffFrontrunnerControls = false
			}   //not_f.includes(config.unstrategic) && not_f.includes(config.strategic)
			var xlist = ["frontrunners","autoPoll","poll"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if ( ! turnOffFrontrunnerControls) {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			if (config.autoPoll == "Auto") {
				var xlist = ["frontrunners","poll"]
				for (var i in xlist){
					var xi = xlist[i]
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)


		};
		window.chooseVoterStrategyOff = new ButtonGroup({
			label: "what's voters' strategy?",
			width: 40,
			data: strategyOff,
			onChoose: onChooseVoterStrategyOff
		});
		document.querySelector("#left").appendChild(chooseVoterStrategyOff.dom);
		doms["unstrategic"] = chooseVoterStrategyOff.dom
		




		// Is there a 2nd strategy?
		var second_strategy = [
			{realname: "opton for 2nd strategy", name:"2"}
		];
		var onChoose_second_strategy = function(data){

			// update config and model
			var b = data.isOn
			config.second_strategy = b
			model.second_strategy = b
			for(var i=0;i<model.voters.length;i++){
				model.voters[i].second_strategy = b
			}
			model.update();


			// update gui
			var xlist = ["strategy","percentstrategy"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if (data.isOn) {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)



		};
		window.choose_second_strategy = new ButtonGroup({
			label: "",
			width: 40,
			data: second_strategy,
			onChoose: onChoose_second_strategy,
			isCheckbox: true
		});
		document.querySelector("#left").appendChild(choose_second_strategy.dom);
		doms["second strategy"] = choose_second_strategy.dom
		
		


		
		// strategy
		
		var strategyOn = [
			{name:"O", realname:"zero strategy. judge on an absolute scale.", margin:5},
			{name:"N", realname:"normalize", margin:5},
			{name:"F", realname:"normalize frontrunners only", margin:5},
			{name:"F+", realname:"best frontrunner", margin:5},
			{name:"F-", realname:"not the worst frontrunner"}
		];
		// old ones
		// {name:"FL", realname:"justfirstandlast", margin:5},
		// {name:"T", realname:"threshold"},
		// {name:"SNTF", realname:"starnormfrontrunners"}
			
		
		var onChooseVoterStrategyOn = function(data){

			// update config...
			// only the middle percent (for the yellow triangle)

			// no reset...
			for (var i = 0; i < maxVoters; i++) {
				config.voterStrategies[i] = data.realname
			}
			for(var i=0;i<model.voters.length;i++){
				model.voters[i].strategy = config.voterStrategies[i]
			}
			model.update();


			// gui update
			var not_f = ["zero strategy. judge on an absolute scale.","normalize"]
			var turnOffFrontrunnerControls =  not_f.includes(config.unstrategic)
			for(var i=0;i<model.voters.length;i++){
				if (! not_f.includes(config.voterStrategies[i])) turnOffFrontrunnerControls = false
			}   //not_f.includes(config.unstrategic) && not_f.includes(config.strategic)
			
			var xlist = ["frontrunners","autoPoll","poll"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if ( ! turnOffFrontrunnerControls) {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)
			
		};
		window.chooseVoterStrategyOn = new ButtonGroup({
			label: "what's voters' 2nd strategy?",
			width: 40,
			data: strategyOn,
			onChoose: onChooseVoterStrategyOn
		});
		document.querySelector("#left").appendChild(chooseVoterStrategyOn.dom);
		doms["strategy"] = chooseVoterStrategyOn.dom

		if(0){

			var strategyPercent = [
				{name:"0", num:0, margin:4},
				{name:"50", num:50, margin:4},
				{name:"80", num:80, margin:4},
				{name:"100", num:100}
			];
			var onChoosePercentStrategy = function(data){

				// update config...
				config.voterPercentStrategy[0] = data.num;

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
		
		
		
		// percentstrategy
		
		var aba = document.createElement('div')
		aba.className = "button-group"
		document.querySelector("#left").appendChild(aba)
		var aba2 = document.createElement('div')
		aba2.className = "button-group-label"
		aba2.innerHTML = "what % use this 2nd strategy?";
		aba.appendChild(aba2)

		var makeslider0 = function(chtext,chid,chfn,containchecks,n) {
			var slider = document.createElement("input");
			slider.type = "range";
			slider.max = "100";
			slider.min = "0";
			slider.value = "50";
			//slider.setAttribute("width","20px");
			slider.id = chid;
			slider.class = "slider";
			slider.addEventListener('input', function() {chfn(slider,n)}, true);
			var label = document.createElement('label')
			label.htmlFor = chid;
			label.appendChild(document.createTextNode(chtext));
			containchecks.appendChild(slider);
			//containchecks.appendChild(label);
			slider.innerHTML = chtext;
			return slider
		} // https://stackoverflow.com/a/866249/8210071

		var containchecks0 = aba.appendChild(document.createElement('div'));
		containchecks0.id="containsliders"
		var slfn = function(slider,n) {
			// update config...
				config.voterPercentStrategy[n] = slider.value;
				if (n<model.numVoterGroups) {
					model.voters[n].percentStrategy = config.voterPercentStrategy[n]
					model.update();
				}
		}
		for (var i = 0; i < maxVoters; i++) {
			stratsliders.push(makeslider0("","choosepercent",slfn,containchecks0,i))
		}
		doms["percentstrategy"] = aba


		// // are there primaries?
		
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
		


		// do a poll to find frontrunner
		
		var autoPoll = [
			{name:"Auto",realname:"Choose frontrunners automatically.", margin:5},
			{name:"Manual",realname:"Press the poll button to find the frontrunners once."}
		];
		var onChooseAutoPoll = function(data){
			config.autoPoll = data.name
			model.autoPoll = data.name
			model.update()

			// gui
			var xlist = ["poll","frontrunners"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if (data.name == "Manual") {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)

		};
		window.chooseAutoPoll = new ButtonGroup({
			label: "AutoPoll to find new frontrunner:",
			width: 72,
			data: autoPoll,
			onChoose: onChooseAutoPoll
		});
		document.querySelector("#left").appendChild(chooseAutoPoll.dom);
		doms["autoPoll"] = chooseAutoPoll.dom
		
		
		
		// frontrunners
		
		var h1 = function(x) {return "<span class='buttonshape'>"+_icon(x)+"</span>"}
		var frun = [
			{name:h1("square"),realname:"square",margin:5},
			{name:h1("triangle"),realname:"triangle",margin:5},
			{name:h1("hexagon"),realname:"hexagon",margin:5},
			{name:h1("pentagon"),realname:"pentagon",margin:5},
			{name:h1("bob"),realname:"bob"}
		];
		var onChooseFrun = function(data){

			// update config...
			// no reset...
			var preFrontrunnerSet = new Set(config.preFrontrunnerIds)
			if (data.isOn) {
				preFrontrunnerSet.add(data.realname)
			} else {
				preFrontrunnerSet.delete(data.realname)
			}
			config.preFrontrunnerIds = Array.from(preFrontrunnerSet)
			model.preFrontrunnerIds = config.preFrontrunnerIds
			model.update();

		};
		window.chooseFrun = new ButtonGroup({
			label: "who are the frontrunners?",
			width: 40,
			data: frun,
			onChoose: onChooseFrun,
			isCheckbox: true
		});
		document.querySelector("#left").appendChild(chooseFrun.dom);
		doms["frontrunners"] = chooseFrun.dom
		
		
		
		// do a poll to find frontrunner
		
		var poll = [
			{name:"Poll",margin:5},
			{name:"Poll 2",realname:"Find the top 2 frontrunners."}
		];
		var onChoosePoll = function(data){
			if (data.name == "Poll") {
				var won = model.result.winners
				config.preFrontrunnerIds = won
			} else {
				model.dotop2 = true // not yet implemented
				model.update()
				model.dotop2 = false
				config.preFrontrunnerIds = model.top2
				model.top2 = []
			}
			
			model.preFrontrunnerIds = config.preFrontrunnerIds
			if(window.chooseFrun) chooseFrun.highlight("realname", model.preFrontrunnerIds);
			model.update();

		};
		window.choosePoll = new ButtonGroup({
			label: "Poll to find new frontrunner:",
			width: 52,
			data: poll,
			onChoose: onChoosePoll,
			justButton: true
		});
		document.querySelector("#left").appendChild(choosePoll.dom);
		doms["poll"] = choosePoll.dom



		
		
		// yee

		var h1 = function(x) {return "<span class='buttonshape'>"+_icon(x)+"</span>"}
		var yeeobject = [
			{name:h1("square"),realname:"square",keyyee:"square",kindayee:"can",margin:4},
			{name:h1("triangle"),realname:"triangle",keyyee:"triangle",kindayee:"can",margin:4},
			{name:h1("hexagon"),realname:"hexagon",keyyee:"hexagon",kindayee:"can",margin:4},
			{name:h1("pentagon"),realname:"pentagon",keyyee:"pentagon",kindayee:"can",margin:4},
			{name:h1("bob"),realname:"bob",keyyee:"bob",kindayee:"can",margin:28},
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
		
		function expYeeObject(config,model) {
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
		var onChooseyeeobject = function(data){

			config.kindayee = data.kindayee
			config.keyyee = data.keyyee
			model.yeeobject = expYeeObject(config,model)
			model.yeeon = (model.yeeobject != undefined) ? true : false
			model.update();

			// gui
			var xlist = ["choose_pixel_size","yeefilter"]
			var featureset = new Set(config.featurelist)
			for (var i in xlist){
				var xi = xlist[i]
				if (model.yeeobject) {
					featureset.add(xi)
					doms[xi].hidden = false
				} else {
					featureset.delete(xi)
					doms[xi].hidden = true
				}
			}
			config.featurelist = Array.from(featureset)
			
		};
		window.chooseyeeobject = new ButtonGroup({
			label: "which object for yee map?",
			width: 20,
			data: yeeobject,
			onChoose: onChooseyeeobject
		});
		chooseyeeobject.dom.childNodes[6].style.width = "68px"
		chooseyeeobject.dom.setAttribute("id","yee")
		document.querySelector("#left").appendChild(chooseyeeobject.dom);
		doms["yee"] = chooseyeeobject.dom
		
		
		
		
		// yee filter

		var h1 = function(x) {return "<span class='buttonshape'>"+_icon(x)+"</span>"}
		var yeefilter = [
			{name:h1("square"),realname:"square",keyyee:"square",margin:4},
			{name:h1("triangle"),realname:"triangle",keyyee:"triangle",margin:4},
			{name:h1("hexagon"),realname:"hexagon",keyyee:"hexagon",margin:4},
			{name:h1("pentagon"),realname:"pentagon",keyyee:"pentagon",margin:4},
			{name:h1("bob"),realname:"bob",keyyee:"bob"}
		];
		var onChooseyeefilter = function(data){
			
			var yeefilterset = new Set(config.yeefilter)
			if (data.isOn) {
				yeefilterset.add(data.realname)
			} else {
				yeefilterset.delete(data.realname)
			}
			config.yeefilter = Array.from(yeefilterset)
			model.yeefilter = config.yeefilter
			model.update();

		};
		window.chooseyeefilter = new ButtonGroup({
			label: "filter yee map?",
			width: 20,
			data: yeefilter,
			onChoose: onChooseyeefilter,
			isCheckbox: true
		});
		chooseyeefilter.dom.setAttribute("id","yeefilter")
		document.querySelector("#left").appendChild(chooseyeefilter.dom);
		doms["yeefilter"] = chooseyeefilter.dom
		
		
		
		
		// gear config - decide which menu items to do

		// var allnames = ["systems","voters","candidates","strategy","percentstrategy","unstrategic","frontrunners","poll","yee"] // not "save"
		var gearconfig = []
		for (i in allnames) gearconfig.push({name:i,realname:allnames[i],margin:1})

		var onChoosegearconfig = function(data){
			var featureset = new Set(config.featurelist)
			if (data.isOn) {
				featureset.add(data.realname)
				doms[data.realname].hidden = false
			} else {
				featureset.delete(data.realname)
				doms[data.realname].hidden = true
			}
			config.featurelist = Array.from(featureset)

		};
		window.choosegearconfig = new ButtonGroup({
			label: "which menu options are displayed?",
			width: 18,
			data: gearconfig,
			onChoose: onChoosegearconfig,
			isCheckbox: true
		});
		choosegearconfig.dom.hidden = true
		document.querySelector("#left").insertBefore(choosegearconfig.dom,doms["systems"]);

		// get current filename, in order to go back to the original intended preset


		// var presetnames = ["O","SA"]
		// var presethtmlnames = [config.filename,"sandbox.html"]
		// var presetdescription = ["original intended preset","sandbox"]

		var presetnames = ["S"]
		var presethtmlnames = ["sandbox.html"]
		var presetdescription = ["sandbox"]

		// and fill in the rest
		for (var i=1;i<=14;i++) {presetnames.push("e"+i) ; presethtmlnames.push("election"+i+".html") ; presetdescription.push("election"+i+".html")}
		presetnames.push("O") ; presethtmlnames.push(filename) ; presetdescription.push("original intended preset")
		// TODO
		for (var i=1;i<=12;i++) {presetnames.push("b"+i) ; presethtmlnames.push("ballot"+i+".html") ; presetdescription.push("ballot"+i+".html")}
		


		var presetconfig = []
		for (i in presetnames) presetconfig.push({name:presetnames[i],realname:presetdescription[i],htmlname:presethtmlnames[i],margin:4})

		var onChoosepresetconfig = function(data){
			if (data.isOn) {
				var firstletter = data.htmlname[0]
				if (firstletter == 'e' || firstletter == 's') {
					config = loadpreset(data.htmlname)
					cleanConfig(config)
					initialConfig = _jcopy(config);
					set_layout_wrt_arena(config.arena_size)
					model.size = config.arena_size
					model.resize()
					model.reset(true);
					model.onInit();
					setInPosition();
					selectUI();
				} else if (firstletter == 'b') {
					//document.location.replace(data.htmlname);
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
					initialConfig = _jcopy(config);
					set_layout_wrt_arena(config.arena_size)
					model.size = config.arena_size
					model.resize()
					model.reset(true);
					model.onInit();
					setInPosition();
					selectUI();
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
		// only do this once.  Otherwise it would be in SelectUI


		var pixelsize = [{name:"60",val:60,margin:4},{name:"30",val:30,margin:4},{name:"12",val:12,margin:4},{name:"6",val:6}]
		var onChoosePixelsize = function(data){
			config.pixelsize = data.val
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
			config.computeMethod = data.name
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
			config.spread_factor_voters = data.val
			model.spread_factor_voters = data.val

			// // save candidates before switching!
			config.candidatePositions = save().candidatePositions; // not sure if needed

			// // reset!
			config.voterPositions = null; // not sure if needed
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
			model_config.size = data.val
			model.size = data.val
			config.arena_size = data.val
			
			if ("300" == data.val) config.spread_factor_voters = 1
			if ("600" == data.val) config.spread_factor_voters = 2
			model.spread_factor_voters = config.spread_factor_voters
			
			//window.model = new Model(model_config);

			config.voterPositions = save().voterPositions;
			config.candidatePositions = save().candidatePositions;

			// model.reset();
			// setInPosition();
			cleanConfig(config)
			initialConfig = _jcopy(config);
			set_layout_wrt_arena(config.arena_size)
			model.size = config.arena_size
			model.resize()
			model.reset(true);
			model.onInit();
			setInPosition();
			selectUI();
			
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
			config.median_mean = data.val
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
			config.utility_shape = data.name
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
			if (data.isOn) {
				choosegearconfig.dom.hidden = false
				choosepresetconfig.dom.hidden = false
				chooseComputeMethod.dom.hidden = false
				choose_spread_factor_voters.dom.hidden = false
				choose_arena_size.dom.hidden = false
				choose_median_mean.dom.hidden = false
				choose_utility_shape.dom.hidden = false
			} else {
				choosegearconfig.dom.hidden = true
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
		document.querySelector("#left").insertBefore(choosegearicon.dom,choosegearconfig.dom);
		
		if(config.hidegearconfig) choosegearicon.dom.hidden = true
		
		
		///////////////////////
		//////// INIT! ////////
		///////////////////////

		model.onInit(); // NOT init, coz don't update yet...
		setInPosition();

		// Select the UI!
		var selectUI = function(){
			if(window.chooseSystem) chooseSystem.highlight("name", model.system);
			if(window.chooseRBSystem) chooseRBSystem.highlight("name", model.rbsystem);
			if(window.chooseCandidates) chooseCandidates.highlight("num", model.numOfCandidates);
			if(window.chooseVoters) chooseVoters.highlight("realname", model.votersRealName);
			if(groupsliders) {
				for (i in groupsliders) {
					groupsliders[i].value = config.voter_group_count[i]
				}
			}
			if(x_voter_sliders) {
				x_voter_sliders[0].value = config.voters
			}
			if(spreadsliders) {
				for (i in spreadsliders) {
					spreadsliders[i].value = config.voter_group_spread[i]
				}
			}
			if(window.choosePercentStrategy) choosePercentStrategy.highlight("num", model.voters[0].percentStrategy);
			if(window.chooseVoterStrategyOn) {
				if (model.voters[0].strategy != "starnormfrontrunners") { // kind of a hack for now, but I don't really want another button
					chooseVoterStrategyOn.highlight("realname", model.voters[0].strategy);
				}
			}
			if(window.chooseVoterStrategyOff) chooseVoterStrategyOff.highlight("realname", model.voters[0].unstrategic);
			if(window.choose_second_strategy) {
				if (config.second_strategy) {
					choose_second_strategy.highlight("name", "2");
				}
			}
			
			if(window.chooseFrun) chooseFrun.highlight("realname", model.preFrontrunnerIds);
			if(stratsliders) {
				for (i in stratsliders) {
					stratsliders[i].value = config.voterPercentStrategy[i]
				}
			}
			if(window.chooseAutoPoll) chooseAutoPoll.highlight("name", config.autoPoll)
			// if(window.choosePrimaries) choosePrimaries.highlight("name", config.primaries)

			if(window.chooseyeeobject) chooseyeeobject.highlight("keyyee", config.keyyee);
			if(window.chooseyeefilter) chooseyeefilter.highlight("realname", config.yeefilter);
			
			// gui 
			if(window.chooseyeeobject){
				for(var i=0;i<maxVoters-1;i++) {
					if (i < config.voters) {
						window.chooseyeeobject.dom.childNodes[8+i].hidden=false
					} else {
						window.chooseyeeobject.dom.childNodes[8+i].hidden=true
					}
				}
			}
			
			if(window.choosegearconfig) choosegearconfig.highlight("realname", config.featurelist);
			if(window.chooseComputeMethod) chooseComputeMethod.highlight("name", config.computeMethod);
			if(window.choosePixelsize) choosePixelsize.highlight("name", config.pixelsize);
			if(window.choose_spread_factor_voters) choose_spread_factor_voters.highlight("name", config.spread_factor_voters);
			if(window.choose_arena_size) choose_arena_size.highlight("name", config.arena_size);
			if(window.choose_median_mean) choose_median_mean.highlight("val", config.median_mean);
			if(window.choose_utility_shape) choose_utility_shape.highlight("name", config.utility_shape);
			
		};
		selectUI();
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

			config = JSON.parse(JSON.stringify(initialConfig)); // RESTORE IT!
			// Reset manually, coz update LATER.
			model.reset(true);
			model.onInit();
			setInPosition();

			// Back to ol' UI
			selectUI();

		};
		document.body.appendChild(resetDOM);


		///////////////////////////
		////// SAVE POSITION //////
		///////////////////////////

		window.save = function(log){

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

		window.jsave = function(log){
			var sofar = window.save()
			
			// Description
			var description = document.getElementById("description_text") || {value:""};
			config.description = description.value;
			
			var logtext = ''
			for (i in sofar) logtext += i + ": " +JSON.stringify(sofar[i]) + ',\n'
			for (i in config) {
				if (i == "candidatePositions" || i == "voterPositions") {
					// skip
				} else {
					logtext += i + ": " +JSON.stringify(config[i]) + ',\n'
				}
			}
			var aloc = window.location.pathname.split('/')
			//logtext += "\n\npaste this JSON into" + aloc[aloc.length-2] + "/" + aloc[aloc.length-1]
			logtext += "\n\npaste this JSON into /play/js/Presets.js under option " + aloc[aloc.length-1]
			console.log(logtext)
			if (log==2) console.log(JSON.stringify(config))
			
			for (i in sofar) config[i] = sofar[i]  // for some weird reason config doesn't have the correct positions, hope i'm not introducing a bug
			return config
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
				resetDOM.style.top = (470 - 300 + model_config.size) + "px";
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
				saveDOM.style.top = (470 - 300 + model_config.size) + "px";
				saveDOM.style.left = "350px";
			} else {
				saveDOM.style.top = "340px";
				saveDOM.style.left = "350px";
			}
			saveDOM.onclick = function(){
				config.sandboxsave = true // this seems to fix a bug
				_saveModel();
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
	
	
	var _saveModel = function(){

		jsave(1)  // updates config with positions and gives a log of settings to copy and paste
		
		// URI ENCODE!
		var uri = encodeURIComponent(JSON.stringify(config));

		// ALSO TURN IT INTO INITIAL CONFIG. _parseModel
		
		initialConfig = JSON.parse(JSON.stringify(config)); // RESTORE IT!
		
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
