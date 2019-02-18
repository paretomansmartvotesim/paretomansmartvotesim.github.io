/***************************

A MODEL:
- Draggable candidates & voter(s)
- Has to draw & up 'em up & down appropriately.

***************************/

function Model(config){

	var self = this;

	// Properties
	_fillInDefaults(self,config)
	_fillInDefaults(self,{
		id:"model",
		size:300,
		scale:1,
		border:10,
		optionsForElection:{sidebar:true}
	})


	// RETINA canvas, whatever.
	var canvas = document.createElement("canvas");
	canvas.setAttribute("class", "interactive");
	canvas.width = canvas.height = self.size*2; // retina!
	canvas.style.width = canvas.style.height = self.size+"px";
	canvas.style.borderWidth = self.border+"px";
	//canvas.style.margin = (2-self.border)+"px"; // use margin instead of border
	var ctx = canvas.getContext("2d");
	self.canvas = canvas;
	self.ctx = ctx;

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

	self.resize = function() {
		canvas.width = canvas.height = self.size*2; // retina!
		canvas.style.width = canvas.style.height = self.size+"px";
		self.dom.style.width = (self.size+2*self.border)+"px"; // size+2*borders!
		self.caption.style.width = self.dom.style.width;
	}

	// MAH MOUSE
	self.mouse = new Mouse(self.id, self.canvas);

	// Draggables
	self.draggables = [];
	self.draggableManager = new DraggableManager(self);

	// Candidates & Voter(s)
	self.candidates = [];
	self.candidatesById = {};
	self.voters = [];
	self.addCandidate = function(c){
		var candidate = new Candidate({
			model: self,
			id:c.id, x:c.x, y:c.y
		});
		self.candidates.push(candidate);
		self.draggables.push(candidate);
		self.candidatesById[c.id] = candidate;
	};
	self.addVoters = function(config){
		config.model = self;
		var DistClass = config.dist;
		var voters = new DistClass(config);
		self.voters.push(voters);
		self.draggables.push(voters);
	};
	self.addVoterCenter = function(id){
		var voterCenter = new VoterCenter({
			model: self,
			id:id
		});
		self.voterCenter = voterCenter
		self.draggables.push(voterCenter);
	};
	self.election = function(model,options){};
	self.yee = new Yee(self);

	// Init!
	self.onInit = function(){}; // TO IMPLEMENT
	self.init = function(){
		self.onInit();
		self.update();
	};

	// Reset!
	self.reset = function(noInit){
		self.candidates = [];
		self.candidatesById = {};
		self.voters = [];
		self.draggables = [];
		if(!noInit) self.init();
	};

	// Update!
	self.onUpdate = function(){}; // TO IMPLEMENT
	
	

	self.update = function(){

		// Move the one that's being dragged, if any
		if(Mouse.dragging){
			Mouse.dragging.moveTo(Mouse.x, Mouse.y);
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

		model.result = self.election(self,self.optionsForElection);

		// do the center voter thing
		if (typeof self.voterCenter !== 'undefined') { // does the voterCenter exist?  If so then calculate it.
			self.voterCenter.update()
		}
		
		// calculate yee if its turned on and we haven't already calculated it ( we aren't dragging the yee object)
		if (self.yeeon && Mouse.dragging != self.yeeobject) self.yee.calculate()
		
		self.draw()

		// Update!
		self.onUpdate();
		publish(self.id+"-update");

	};


	self.onDraw = function(){}; // TO IMPLEMENT
	self.draw = function() {
		
		// Clear it all!
		ctx.clearRect(0,0,canvas.width,canvas.height);

		if (model.result) _drawResult(model)

		// DRAW 'EM ALL.
		// Draw voters' BG first, then candidates, then voters.

		// Draw axes
		//var background = new Image();
		//background.src = "../play/img/axis.png";
		//ctx.drawImage(background,0,0);
		self.yee.drawBackground()
		
		// reset annotations
		for(var i=0; i<self.draggables.length; i++){
			var draggable = self.draggables[i];
			draggable.drawAnnotation = (function(){});
			draggable.drawBackAnnotation = (function(){});
		}

		if(model.yeeobject) model.yeeobject.drawBackAnnotation = self.yee.drawYeeGuyBackground
		if(model.yeeobject) model.yeeobject.drawAnnotation = self.yee.drawYeeAnnotation
		
		//set annotations

		
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			voter.draw(ctx);
		}
		for(var i=0; i<self.candidates.length; i++){
			var c = self.candidates[i];
			c.draw(ctx);
		}

		//voterCenter.update()
		if ((typeof self.voterCenter !== 'undefined') && model.getTotalVoters() != 1) {
			self.voterCenter.draw(ctx)
		}

		// draw the Yee object last so it is easy to see.
		if (self.yeeon && self.yeeobject) self.yeeobject.draw(ctx)
		
		// draw text next to the winners
		if(model.result && model.result.winners) {
			var objWinners = model.result.winners.map(x => model.candidatesById[x])
			if (objWinners.length > 1) {
				for (i in objWinners) {
					objWinners[i].drawTie(ctx)
				}
			} else {
				objWinners[0].drawWin(ctx)
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

