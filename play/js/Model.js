/***************************

A MODEL:
- Draggable candidates & voter(s)
- Has to draw & up 'em up & down appropriately.

***************************/

function Model(modelName){

	var self = this;


	// CREATE DATA STRUCTURE
	self.voters = [];
	self.candidates = [];
	self.dom = document.createElement("div");
	self.id = modelName

	
	// CONFIGURE DEFAULTS
	// helper
	var all_candidate_names = Object.keys(Candidate.graphics["Default"])
	Object.assign(self,{
		// values used in init
		id:"model",
		size:300,
		scale:1,
		border:10,
		optionsForElection:{sidebar:true},
	// values used later
	// defaults that are also in main_sandbox.js in the cleanConfig function
		system: "FPTP",
		rbsystem: "Tideman",
		numOfCandidates: 3,
		numVoterGroups: 1,
		spread_factor_voters: 1,
		arena_size: 300,
		median_mean: 1,
		utility_shape: "linear",
		arena_border: 2,
		preFrontrunnerIds: ["square","triangle"],
		autoPoll: "Manual",
		// primaries: "No",
		firstStrategy: "zero strategy. judge on an absolute scale.", // maybe should be for voter, not model
		secondStrategy: "zero strategy. judge on an absolute scale.", // maybe should be for voter, not model
		doTwoStrategies: true,// maybe should be for voter, not model
		yeefilter: all_candidate_names,
		computeMethod: "ez",
		pixelsize: 60,
		//
		nVoterGroupsRealName: "Single Voter",
		yeeobject: undefined,
		yeeon: false,
		//
		voterType: PluralityVoter,
		election: Election.plurality,
		ballotType: PluralityBallot,
		rbelection: rbvote.calctide
	})
	
	self.yee = new Yee(self);
	
	self.initDOM = function() {
		// RETINA canvas, whatever.
		self.canvas = document.createElement("canvas");
		self.canvas.setAttribute("class", "interactive");
		self.canvas.width = self.canvas.height = self.size*2; // retina!
		self.canvas.style.width = self.canvas.style.height = self.size+"px";
		self.canvas.style.borderWidth = self.border+"px";
		//self.canvas.style.margin = (2-self.border)+"px"; // use margin instead of border
		self.ctx = self.canvas.getContext("2d");
		

		// My DOM: title + canvas + caption
		self.dom = document.createElement("div");
		self.dom.setAttribute("class", "model");
		self.dom.style.width = (self.size+2*self.border)+"px"; // size+2*borders!
		self.title = document.createElement("div");
		self.title.id = "title";
		self.caption = document.createElement("div");
		self.caption.id = "caption";
		self.caption.style.width = self.dom.style.width;
		self.dom.appendChild(self.title);
		self.dom.appendChild(self.canvas);
		self.dom.appendChild(self.caption);

		// MAH MOUSE
		self.mouse = new Mouse(self.id, self.canvas);	
	}

	self.resize = function() {
		self.canvas.width = self.canvas.height = self.size*2; // retina!
		self.canvas.style.width = self.canvas.style.height = self.size+"px";
		// self.dom.style.width = (self.size+2*self.border)+"px"; // size+2*borders! // not sure why this is here
		self.dom.style.width = self.canvas.style.width;
		self.caption.style.width = self.dom.style.width;
	}


	self.initMODEL = function() {
		// Draggables
		self.draggables = [];
		self.draggableManager = new DraggableManager(self);

		// Candidates & Voter(s)
		self.candidatesById = {};
		for (var i=0; i<self.candidates.length; i++) {
			var c = self.candidates[i]
			self.candidatesById[c.id] = c;
			self.draggables.push(c);
		}
		for (var i=0; i<self.voters.length; i++) {
			var v = self.voters[i]
			self.draggables.push(v);
		}
		if(self.voterCenter) self.draggables.push(self.voterCenter)
		
		var expYeeObject = function() {
			// Yee diagram
			if (self.kindayee == "can") {
				return self.candidatesById[self.keyyee]
			} else if (self.kindayee=="voter") {
				return self.voters[self.keyyee]
			} else if (self.kindayee=="off") {
				return undefined
			} else if (self.kindayee=="center") { 
				return self.voterCenter
			} else { // if yeeobject is not defined
				return undefined
			}
		}
		self.yeeobject = expYeeObject()
		self.yeeon = (self.yeeobject != undefined) ? true : false
	}
	self.election = function(self,options){};

	// Init!
	self.start = function(){  // TO IMPLEMENT FURTHER IN CALLER
		self.update();
	};

	// Reset!
	self.reset = function(){
		// RE-CREATE DATA STRUCTURE
		self.candidates = [];
		self.voters = [];
		// START - combination of CREATE, CONFIGURE, INIT, UPDATE
		self.start();
	};

	// Update!
	self.onUpdate = function(){}; // TO IMPLEMENT
	self.update = function(){

		// Move the one that's being dragged, if any
		if(self.mouse.dragging){
			self.mouse.dragging.moveTo(self.mouse.x, self.mouse.y);
		}
		
		// get the ballots
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			voter.update();
		}
		for(var i=0; i<self.candidates.length; i++){
			var c = self.candidates[i];
			c.update();
		}

		self.result = self.election(self,self.optionsForElection);

		// do the center voter thing
		if (typeof self.voterCenter !== 'undefined') { // does the voterCenter exist?  If so then calculate it.
			self.voterCenter.update()
		}
		
		// calculate yee if its turned on and we haven't already calculated it ( we aren't dragging the yee object)
		if (self.yeeon && self.mouse.dragging != self.yeeobject) self.yee.calculate()
		
		self.draw()

		// Update!
		self.onUpdate();
		publish(self.id+"-update");

	};


	self.onDraw = function(){}; // TO IMPLEMENT
	self.draw = function() {
		
		// Clear it all!
		self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);

		if (self.result) _drawResult(self)

		// DRAW 'EM ALL.
		// Draw voters' BG first, then candidates, then voters.

		// Draw axes
		//var background = new Image();
		//background.src = "../play/img/axis.png";
		//self.ctx.drawImage(background,0,0);
		self.yee.drawBackground()
		
		// reset annotations
		for(var i=0; i<self.draggables.length; i++){
			var draggable = self.draggables[i];
			draggable.drawAnnotation = (function(){});
			draggable.drawBackAnnotation = (function(){});
		}

		if(self.yeeobject) self.yeeobject.drawBackAnnotation = self.yee.drawYeeGuyBackground
		if(self.yeeobject) self.yeeobject.drawAnnotation = self.yee.drawYeeAnnotation
		
		//set annotations

		
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			voter.draw(self.ctx);
		}
		for(var i=0; i<self.candidates.length; i++){
			var c = self.candidates[i];
			c.draw(self.ctx);
		}

		//voterCenter.update()
		if ((typeof self.voterCenter !== 'undefined') && self.getTotalVoters() != 1) {
			self.voterCenter.draw(self.ctx)
		}

		// draw the Yee object last so it is easy to see.
		if (self.yeeon && self.yeeobject) self.yeeobject.draw(self.ctx)
		
		// draw text next to the winners
		if(self.result && self.result.winners) {
			var objWinners = self.result.winners.map(x => self.candidatesById[x])
			if (objWinners.length > 1) {
				for (i in objWinners) {
					objWinners[i].drawTie(self.ctx)
				}
			} else {
				objWinners[0].drawWin(self.ctx)
			}
		}
		self.onDraw();

	}

	// HELPERS:
	self.getBallots = function(){
		var ballots = [];
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			ballots = ballots.concat(voter.ballots);
		}
		return ballots;
	};
	self.getTotalVoters = function(){
		var count = 0;
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			count += voter.points.length;
		}
		return count;
	};

};

