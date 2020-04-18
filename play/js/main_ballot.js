
function main_ballot(preset){
	var config = preset.config

	var l = new Loader()

	var nameBallot = config.system;
	var translate = {
		Plurality:"FPTP",
		Ranked:"IRV",
		Approval:"Approval",
		Score:"Score"
	}
	var method = config.method || translate[nameBallot]
	config.firstStrategy = config.firstStrategy || "zero strategy. judge on an absolute scale.";
	config.preFrontrunnerIds = config.preFrontrunnerIds || ["square","triangle"];
	config.showChoiceOfStrategy = config.showChoiceOfStrategy || false
	config.showChoiceOfFrontrunners = config.showChoiceOfFrontrunners || false
	config.doStarStrategy = config.doStarStrategy || false
	config.theme = config.theme || "Default"
	config.dimensions = config.dimensions || "2D"
	config.namelist = ""
	config.customNames = "No"

	// grandfather name for firstStrategy used only for main_ballot
	if (config.strategy != undefined) config.firstStrategy = config.strategy

	// make a copy of the config
	var initialConfig = JSON.parse(JSON.stringify(config));

	// CONFIGURE
	var VoterType = window[nameBallot+"Voter"];
	var BallotType = window[nameBallot+"Ballot"];

	// INIT
	l.onload = function(assets){

		// CREATE
		var model = new Model(preset.modelName);
        model.createDOM()
		// CONFIGURE
		model.assets = assets
		model.size = 250
		model.border = 2
		model.voterType = VoterType
		model.system = method

		// INIT
		model.initDOM()

		var basediv = document.querySelector("#" + preset.modelName)

			
		// CREATE div stuff
		function newDivOnBase(name) {
			var a = document.createElement("div");
			a.setAttribute("id", name);
			basediv.appendChild(a);
		}
		newDivOnBase("b-left")
		newDivOnBase("b-right")

		basediv.querySelector("#b-left").appendChild(model.dom);
		model.start = function(){
			// CREATE
			model.voters.push(new SingleVoter(model))
			model.candidates.push(new Candidate(model))
			model.candidates.push(new Candidate(model))
			model.candidates.push(new Candidate(model))
			model.voterCenter = new VoterCenter(model)
			// CONFIGURE
			Object.assign( model.candidates[0],{x: 41, y: 50, icon:"square"} )
			Object.assign( model.candidates[1],{x:153, y: 95, icon:"triangle"} )
			Object.assign( model.candidates[2],{x:216, y:216, icon:"hexagon"} )
			Object.assign( model.voters[0],    {x: 81, y: 92, type: new VoterType(model),
				firstStrategy: config.firstStrategy,
				preFrontrunnerIds: config.preFrontrunnerIds} )
			model.preFrontrunnerIds = config.preFrontrunnerIds;
			model.firstStrategy = config.firstStrategy
			model.doStarStrategy = config.doStarStrategy;
			model.theme = config.theme
			model.dimensions = config.dimensions
			model.customNames = config.customNames
			model.namelist = config.namelist.split("\n")
			// INIT
			model.candidates[0].init()
			model.candidates[1].init()
			model.candidates[2].init()
			model.initMODEL()
			model.voters[0].init()
			model.arena.redistrict()
			// UPDATE
			model.update()
		};


		// CREATE A BALLOT
		var way1 = true
		if (config.newWay) {
			if (way1) {
				var caption = document.createElement("div");
				caption.id = "caption";
				basediv.querySelector("#b-right").appendChild(caption)
			} else {
				var bRight = basediv.querySelector("#b-right")
			}
		} else {
			var ballot = new BallotType(model);
			basediv.querySelector("#b-right").appendChild(ballot.dom)
		}
		model.onUpdate = function(){
			if (model.voters.length == 0) return
			if (model.voters[0].voterGroupType == "GaussianVoters") return
			if (config.newWay) {
				// onDraw
			} else {
				ballot.update(model.voters[0].ballot);
			}
		};

		// UPDATE
		model.start();

		if(config.showChoiceOfStrategy) {

			var strategyOn = [
				{name:"O", realname:"zero strategy. judge on an absolute scale.", margin:4},
				{name:"N", realname:"normalize", margin:4},
				{name:"F", realname:"normalize frontrunners only", margin:4},
				{name:"F+", realname:"best frontrunner", margin:4},
				{name:"F-", realname:"not the worst frontrunner"}
			];
			// old ones
			// {name:"FL", realname:"justfirstandlast", margin:4},
			// {name:"T", realname:"threshold"},
			// {name:"SNTF", realname:"starnormfrontrunners"}
			var onChooseVoterStrategyOn = function(data){
				config.firstStrategy = data.realname;
				model.firstStrategy = config.firstStrategy
				model.voters[0].firstStrategy = config.firstStrategy;
				model.update();

			};
			var chooseVoterStrategyOn = new ButtonGroup({
				label: "which strategy?",
				width: 42,
				data: strategyOn,
				onChoose: onChooseVoterStrategyOn
			});
			basediv.querySelector("#b-left").appendChild(chooseVoterStrategyOn.dom);
		}

		if(config.showChoiceOfFrontrunners) {

			function _iconButton(id) {
				return "<span class='buttonshape'>"+model.icon(id)+"</span>"
			}
			frun = [];
			function frunMakelist() {
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
			
			var onChooseFrun = function(data){

				// update config...
				// no reset...
				if (data.isOn) {
					if (!config.preFrontrunnerIds.includes(data.realname) ) {config.preFrontrunnerIds.push(data.realname)}
				} else {
					var index = config.preFrontrunnerIds.indexOf(data.realname);
					if (index > -1) {
						config.preFrontrunnerIds.splice(index, 1);
					}
				}
				model.preFrontrunnerIds = config.preFrontrunnerIds
				model.update();

			};
			var chooseFrun = new ButtonGroup({
				label: "who are the frontrunners?",
				width: 42,
				data: frun,
				onChoose: onChooseFrun,
				isCheckbox: true
			});
			basediv.querySelector("#b-left").appendChild(chooseFrun.dom);
		}


		model.onDraw = function(){	
			if(config.showChoiceOfFrontrunners) {
				chooseFrun.buttonConfigs = frunMakelist()
				chooseFrun.init()
			}

			if (model.voters.length == 0) return
			if (model.voters[0].voterGroupType == "GaussianVoters") return
			if (config.newWay) {
				var text = model.voters[0].type.toTextH(model.voters[0].ballot);
				if (model.placeHolding) {
					if (model.nLoading > 0) {
						// will do on next draw
						return
					} else {
						// ready to replace
						text = text.replace(/\^Placeholder{(.*?)}/g, (match, $1) => {
							return model.icon($1)
						});  // https://stackoverflow.com/a/49262416
					}
				}
				if (way1) {
					caption.innerHTML = text
				} else {
					bRight.innerHTML = text
				}
			}
		}

		var selectMENU = function(){
			if(chooseVoterStrategyOn) chooseVoterStrategyOn.highlight("realname", model.voters[0].firstStrategy);
			if(chooseFrun) chooseFrun.highlight("realname", model.preFrontrunnerIds);
		};
		selectMENU();

		//////////////////////////
		//////// RESET... ////////
		//////////////////////////

		// CREATE A RESET BUTTON
		var resetDOM = document.createElement("div");
		resetDOM.id = "reset";
		resetDOM.innerHTML = "reset";
		resetDOM.onclick = function(){
			// LOAD
			config = JSON.parse(JSON.stringify(initialConfig));
			// CREATE, CONFIGURE, INIT, UPDATE
			model.reset()
			// UPDATE
			selectMENU()
		};
		basediv.querySelector("#b-left").appendChild(resetDOM);

	};

	// UPDATE
	l.load([

		// the peeps
		"play/img/voter_face.png",
		"play/img/square.png",
		"play/img/triangle.png",
		"play/img/hexagon.png",

		"play/img/square.svg",
		"play/img/triangle.svg",
		"play/img/hexagon.svg",

		"play/img/pentagon.svg",
		"play/img/bob.svg",

        // plus
        "play/img/plusCandidate.png",
        "play/img/plusOneVoter.png",
        "play/img/plusVoterGroup.png",

		// Ballot instructions
		"play/img/ballot_fptp.png",
		"play/img/ballot_ranked.png",
		"play/img/ballot_approval.png",
		"play/img/ballot_range.png",

		// The boxes
		"play/img/ballot_box.png",
		"play/img/ballot_rate.png"

	]);

}
