
function main_ballot(preset){
	var config = preset.config

	var l = new Loader()

	ballotType = config.system;
	config.firstStrategy = config.firstStrategy || "zero strategy. judge on an absolute scale.";
	config.preFrontrunnerIds = config.preFrontrunnerIds || ["square","triangle"];
	config.showChoiceOfStrategy = config.showChoiceOfStrategy || false
	config.showChoiceOfFrontrunners = config.showChoiceOfFrontrunners || false
	config.doStarStrategy = config.doStarStrategy || false
	config.theme = config.theme || "Default"

	// grandfather name for firstStrategy used only for main_ballot
	if (config.strategy != undefined) config.firstStrategy = config.strategy

	// make a copy of the config
	var initialConfig = JSON.parse(JSON.stringify(config));

	// CONFIGURE
	var VoterType = window[ballotType+"Voter"];
	var BallotType = window[ballotType+"Ballot"];

	// INIT
	l.onload = function(){

		// CREATE
		var model = new Model();
        model.createDOM()

		// CONFIGURE
		model.size = 250
		model.border = 2

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
			// CONFIGURE
			Object.assign( model.candidates[0],{x: 41, y: 50, id:"square"} )
			Object.assign( model.candidates[1],{x:153, y: 95, id:"triangle"} )
			Object.assign( model.candidates[2],{x:216, y:216, id:"hexagon"} )
			Object.assign( model.voters[0],    {x: 81, y: 92, type: new VoterType(model),
				firstStrategy: config.firstStrategy,
				preFrontrunnerIds: config.preFrontrunnerIds} )
			model.preFrontrunnerIds = config.preFrontrunnerIds;
			model.doStarStrategy = config.doStarStrategy;
			model.theme = config.theme
			// INIT
			model.initMODEL()
			model.voters[0].init()
			model.candidates[0].init()
			model.candidates[1].init()
			model.candidates[2].init()
			// UPDATE
			model.update()
		};


		// CREATE A BALLOT
		var ballot = new BallotType(model);
		basediv.querySelector("#b-right").appendChild(ballot.dom)
		model.onUpdate = function(){
			ballot.update(model.voters[0].ballot);
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

			var h1 = function(x) {return "<span class='buttonshape'>"+_icon(x)+"</span>";};
			var frun = [
				{name:h1("square"),realname:"square",margin:4},
				{name:h1("triangle"),realname:"triangle",margin:4},
				{name:h1("hexagon"),realname:"hexagon",margin:4},
				//{name:h1("pentagon"),realname:"pentagon",margin:4},
				//{name:h1("bob"),realname:"bob"}
			];
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
