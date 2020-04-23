
function main_ballot(ui){
	// See sandbox.js for documentation
	// main_ballot is a little different because there is no save button
	// Some variables in config cannot be changed by the user.
	// So, if we were going to save, then it would be good to not keep those in config.

	// The config is basically a text version of the model.
	// The model should store all its variables
	// and the model should always make decisions based on its own variables
	// because maybe those variables could change without updating the config
	// because some things happen internally in the model.

	// The only way the model can hook back into the ui is by providing a callback in main_ballot.
	// Otherwise, it is a one way street.
	// The config updates the model.
	// The model does not update the config.

	// The reason why some things are in start and others are not is that some need assets and others do not.
	// So, the ui.start function could include more or less things before it, depending on how we want to laoad assets.
	// For instance, we could lazy load all the assets when they become required to draw on a button.

    // handle input
    if (ui == undefined) ui = {}
    var a = new Attach(ui)
    a.handleInputMain()

	var model = new Model(ui.idModel)
	a.attachDOM(model)

    var config = {}
    var initialConfig = {}
	configBallot(ui,config,initialConfig)

	bindBallotModel(ui,model,config)
	
	
    ui.start = function(assets){  // this line of code could go up or down, depending on whether we really need to load assets
		// INIT
		model.assets = assets

		// CREATE the divs
		createBallotDOM(ui,model,config)  // createballotDOM might use assets for the buttons... so we'll keep this here
		makeBallotMenu(ui,model,config)
		uiBallotArena(ui,model,config,initialConfig)

		// run some extra stuff specified by the preset
		if (ui.preset.update) {
			ui.preset.update()
		}

		model.initDOM() // initDOM is the first item that can make use of the assets
		// UPDATE
		model.start();
		ui.selectMENU();
    }; 

	var l = new Loader()
	l.onload = ui.start
	l.load(main_ballot.assets);




}

function configBallot(ui,config,initialConfig){

	_copyAttributes(config, ui.preset.config)

	var nameBallot = config.system;
	var translate = {
		Plurality:"FPTP",
		Ranked:"IRV",
		Approval:"Approval",
		Score:"Score"
	}
	config.method = config.method || translate[nameBallot]
	config.firstStrategy = config.firstStrategy || "zero strategy. judge on an absolute scale.";
	config.preFrontrunnerIds = config.preFrontrunnerIds || ["square","triangle"];
	config.showChoiceOfStrategy = config.showChoiceOfStrategy || false
	config.showChoiceOfFrontrunners = config.showChoiceOfFrontrunners || false
	config.doStarStrategy = config.doStarStrategy || false
	config.theme = config.theme || "Default"
	config.dimensions = config.dimensions || "2D"
	config.namelist = ""
	config.customNames = "No"
	config.newWay = config.newWay || false

	// grandfather name for firstStrategy used only for main_ballot
	if (config.strategy != undefined) config.firstStrategy = config.strategy

	// make a copy of the config
	_copyAttributes(initialConfig,config)

	// CONFIGURE
	ui.VoterType = window[nameBallot+"Voter"];
	ui.BallotType = window[nameBallot+"Ballot"];


}

function createBallotDOM(ui,model,config) {

	// CREATE div stuff
	model.createDOM()

	ui.dom.left = newDivOnBase("b-left")
	ui.dom.right = newDivOnBase("b-right")
	function newDivOnBase(name) {
		var a = document.createElement("div");
		a.setAttribute("id", name);
		ui.dom.basediv.appendChild(a);
		return a
	}

	ui.dom.left.appendChild(model.dom);
	
	// CREATE A BALLOT
	ui.way1 = true
	// unusual use of config
	if (config.newWay) {
		if (ui.way1) {
			ui.dom.caption = document.createElement("div");
			ui.dom.caption.id = "caption";
			ui.dom.right.appendChild(ui.dom.caption)
		}
	} else {
		ui.dom.ballot = new ui.BallotType(model);
		ui.dom.right.appendChild(ui.dom.ballot.dom)
	}


}

function bindBallotModel(ui,model,config) {

	// CONFIGURE
	model.size = 250
	model.border = 2
	model.voterType = ui.VoterType
	model.system = config.method
	model.newWay = config.newWay

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
		Object.assign( model.voters[0],    {x: 81, y: 92, type: new ui.VoterType(model),
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

	model.onUpdate = function(){
		if (model.voters.length == 0) return
		if (model.voters[0].voterGroupType == "GaussianVoters") return
		if (model.newWay) {
			// onDraw
		} else {
			ui.dom.ballot.update(model.voters[0].ballot);
		}
	};

	model.onDraw = function(){	
		if(model.showChoiceOfFrontrunners) {
			ui.menu.chooseFrun.buttonConfigs = frunMakelist()
			ui.menu.chooseFrun.init()
		}

		if (model.voters.length == 0) return
		if (model.voters[0].voterGroupType == "GaussianVoters") return
		if (model.newWay) {
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
			if (ui.way1) {
				ui.dom.caption.innerHTML = text
			} else {
				ui.dom.right.innerHTML = text
			}
		}
	}

}


function makeBallotMenu(ui,model,config) {

	ui.menu = {}

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
		ui.menu.chooseVoterStrategyOn = new ButtonGroup({
			label: "which strategy?",
			width: 42,
			data: strategyOn,
			onChoose: onChooseVoterStrategyOn
		});
		ui.dom.left.appendChild(ui.menu.chooseVoterStrategyOn.dom);
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
		ui.menu.chooseFrun = new ButtonGroup({
			label: "who are the frontrunners?",
			width: 42,
			data: frun,
			onChoose: onChooseFrun,
			isCheckbox: true
		});
		ui.dom.left.appendChild(ui.menu.chooseFrun.dom);
	}

	ui.selectMENU = function(){
		if(ui.menu.chooseVoterStrategyOn) ui.menu.chooseVoterStrategyOn.highlight("realname", model.voters[0].firstStrategy);
		if(ui.menu.chooseFrun) ui.menu.chooseFrun.highlight("realname", model.preFrontrunnerIds);
	};



}


function uiBallotArena(ui,model,config,initialConfig) {
	//////////////////////////
	//////// RESET... ////////
	//////////////////////////

	// CREATE A RESET BUTTON
	var resetDOM = document.createElement("div");
	resetDOM.id = "reset";
	resetDOM.innerHTML = "reset";
	resetDOM.onclick = function(){
		// LOAD
		_copyAttributes(config, initialConfig)
		// CREATE, CONFIGURE, INIT, UPDATE
		model.reset()
		// UPDATE
		ui.selectMENU()
	};
	ui.dom.left.appendChild(resetDOM);
}

main_ballot.assets = [
	
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