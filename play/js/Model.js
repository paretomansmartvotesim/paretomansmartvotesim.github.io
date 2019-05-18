/***************************

A MODEL:
- Draggable candidates & voter(s)
- Has to draw & up 'em up & down appropriately.

***************************/

function Model(modelName){

	var self = this;

	// CONSTANTS
	
	self.yDimOne = 100
	self.yDimBuffer = 10

	// CREATE DATA STRUCTURE
	self.voters = [];
	self.candidates = [];
	self.dom = document.createElement("div");
	self.id = modelName
	self.arena = new Arena("arena",self)
	self.tarena = new Arena("tarena",self)
	
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
	
	self.createDOM = function() {
		self.arena.createDOM()
		self.tarena.createDOM()
		self.tarena.canvas.hidden = true

		// My DOM: title + canvas + caption
		self.dom = document.createElement("div");
		self.dom.setAttribute("class", "model");
		self.title = document.createElement("div");
		self.title.id = "title";
		self.caption = document.createElement("div");
		self.caption.id = "caption";

		self.dom.appendChild(self.title);
		self.dom.appendChild(self.arena.canvas);
		self.dom.appendChild(self.tarena.canvas);
		self.dom.appendChild(self.caption);
	}

	self.initDOM = function() {
		self.arena.initDOM()
		self.tarena.initDOM()
		
		self.dom.style.width = (self.size+2*self.border)+"px"; // size+2*borders!
		self.caption.style.width = self.dom.style.width;
	}

	self.initMODEL = function() {

		self.arena.initARENA()
		self.tarena.initARENA()
		
		self.candidatesById = {};
		for (var i=0; i<self.candidates.length; i++) {
			var c = self.candidates[i]
			self.candidatesById[c.id] = c;
			c.i = i
		}

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
		self.arena.update();
		self.tarena.update();
		
		// get the ballots
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			voter.update();
		}
		// helper for later
		var v = _getVoterArray(self)
		self.sortedVoters = v.sort(function(a,b){return a.x - b.x})

		for(var i=0; i<self.candidates.length; i++){
			var c = self.candidates[i];
			c.update();
		}

		var selected = {}
		selected.winners = []
		selected.colors = []
		for (var i=0; i < self.candidates.length; i++) {
			var c = self.candidates[i]
			if (c.selected) {
				selected.winners.push(c.id)
				selected.colors.push(c.fill)
			}
		}
		if (selected.winners.length == 1) {
			selected.winner = selected.winners[0]
			selected.color = selected.colors[0]
		} else if (selected.winners.length > 1) {
			selected.winner = selected.winners[0]
			selected.color = "#ccc"
		}
		if (selected.winners.length > 0) {
			self.result = selected
		} else {
			self.result = self.election(self,self.optionsForElection);
		}

		// do the center voter thing
		if (typeof self.voterCenter !== 'undefined') { // does the voterCenter exist?  If so then calculate it.
			self.voterCenter.update()
		}
		
		// calculate yee if its turned on and we haven't already calculated it ( we aren't dragging the yee object)
		if (self.yeeon && self.arena.mouse.dragging != self.yeeobject && self.tarena.mouse.dragging != self.yeeobject) self.yee.calculate()
		
		self.draw()

		// Update!
		self.onUpdate();
		publish(self.id+"-update");

	};


	self.onDraw = function(){}; // TO IMPLEMENT
	self.draw = function() {
		
		self.arena.clear()
		self.tarena.clear()

		// Draw axes
		//var background = new Image();
		//background.src = "../play/img/axis.png";
		//self.ctx.drawImage(background,0,0);
		self.yee.drawBackground()
		
		_drawBars(self.tarena,self,self.round)

		if (self.dimensions == "1D+B") self.arena.drawHorizontal()

		self.arena.draw()
		self.tarena.draw()

		
		if (self.result) {
			if(self.result.text) {
				if (self.result.dontredocaption != true) {
					self.caption.innerHTML = self.result.text;
				}
			}
		}
		
		self.onDraw();

	}


	var finding = false
	var seed = 1
	var goal = []
	var bounce = undefined
	self.buzz = function() {

		var motion = "bounce"
		
		if (motion=="goal") {
			//find goal
			if (!finding) {
				finding = true
				for(var i=0; i<self.candidates.length; i++){
					var can = self.candidates[i]
					goal[i] = self.yee.winSeek(can)
				}
				finding = false
			}
				
			// move toward goal or center
			for(var i=0; i<self.candidates.length; i++){
				var c = self.candidates[i];
				if (self.result) {
					if (self.result.winners.includes(c.id))
					{
						continue // skip this guy because he's winning
					}
				}
				if (goal[i]) {
					var g = goal[i]
				} else {
					if (1) {
						continue // skip this guy
					} else {
						// move toward center
						var g = {
							x: self.canvas.width * .5,
							y: self.canvas.height * .5
						}
					}
				}
				var diff = {
					x: g.x * .5 - c.x,
					y: g.y * .5 - c.y
				}
				lenDiff = Math.sqrt(diff.x**2 + diff.y**2)
				var unit = {
					x: diff.x / lenDiff,
					y: diff.y / lenDiff
				}
				var speed = 5
				c.moveTo( c.x + unit.x * speed, c.y + unit.y * speed);
			}
	
			// random movement
			seed++
			Math.seedrandom(seed);
			var stepsize = 1
			for(var i=0; i<self.candidates.length; i++){
				var c = self.candidates[i];
				c.moveTo( c.x + Math.round((Math.random()*2-1)*stepsize), c.y + Math.round((Math.random()*2-1)*stepsize) );
			}
		} else if (motion == "bounce") {
			// bouncing
	
			if (bounce == undefined) {
				bounce = []
			
				for(var i=0; i<self.candidates.length; i++){
					var c = self.candidates[i];
					var x = c.x - self.arena.canvas.width * .25
					var y = c.y - self.arena.canvas.height * .25
			
					var lenC = Math.sqrt(x**2 + y**2)
					bounce[i] = {
						x: y / lenC,
						y: -x / lenC
					}
				}
			}
			var speed = 10
			for(var i=0; i<self.candidates.length; i++){
				var c = self.candidates[i];
				c.moveTo( c.x + bounce[i].x * speed, c.y + bounce[i].y * speed,self.arena)
				// r = Math.sqrt(c.x**2 + c.y**2)
				// if (r > modelName.size * .5) {
				// 	// reverse the radial component of the bounce
				// 	theta_approx = c.y/c.x
				// 	c.x = r * theta_approx
				// 	c.y = r * 
				// }
				if (c.x < 0 || c.x > self.arena.canvas.width * .5) bounce[i].x = - bounce[i].x
				if (c.y < 0 || c.y > self.arena.canvas.height * .5) bounce[i].y = - bounce[i].y
			}
			// radial
		
		}
	}
};

function Arena(arenaName, model) {
	var self = this
	self.id = arenaName
	
	self.createDOM = function() {
		self.canvas = document.createElement("canvas");
		self.canvas.setAttribute("class", "interactive");
		self.ctx = self.canvas.getContext("2d");
		self.mouse = new Mouse(self.id, self.canvas);	// MAH MOUSE
		// if (arenaName == "arena") self.draggableManager = new DraggableManager(self,model); // only allow dragging for the main arena... for now.. TODO
		self.draggableManager = new DraggableManager(self,model); 
	}
	self.initDOM = function() {
		// RETINA canvas, whatever.
		self.canvas.width = self.canvas.height = model.size*2; // retina!
		self.canvas.style.width = self.canvas.style.height = model.size+"px";
		self.canvas.style.borderWidth = model.border+"px";
		//self.canvas.style.margin = (2-self.border)+"px"; // use margin instead of border
	}

	self.initARENA = function() {

		// Draggable candidates and voters
		self.draggables = [];
		for (var i=0; i<model.candidates.length; i++) {
			var c = model.candidates[i]
			self.draggables.push(c);
		}
		for (var i=0; i<model.voters.length; i++) {
			var v = model.voters[i]
			self.draggables.push(v);
		}
		if(model.voterCenter) self.draggables.push(model.voterCenter)
	}

		
	self.modelToArena = function(d) {
		if (arenaName == "tarena") {
			var xP = _xToPercentile(d.x,model) / 100 * (self.canvas.width/2)
			// return {x:xP,y:15*d.i+7} // each candidate has his own track
			return {x:xP,y:15+20+d.i*0}
		}
		return d
	}

	self.arenaToModel = function(d,s) { // d is the new coordinate and s is the old model object
		if (arenaName == "tarena") {
			var percentile = d.x/(self.canvas.width/2) * 100
			percentile = Math.min(100,percentile)
			percentile = Math.max(0,percentile) // TODO: figure out why I would get a mouse at a negative x
			var x = _percentileToX(percentile, model)
			return {x:x,y:s.y}
		}
		return d
	}

	self.update = function(){
		// Move the one that's being dragged, if any
		if (arenaName == "arena") {
			if(self.mouse.dragging){
				self.mouse.dragging.moveTo(self.mouse.x,self.mouse.y,self);
				if (model.dimensions == "1D+B") {
					// apply limits to movement
					var p = self.arenaToModel(self.mouse,self.mouse.dragging)
					var yMove = p.y	
					var offY = self.mouse.dragging.offY
					var newY = yMove + offY
					var limYc = model.yDimOne + model.yDimBuffer
					var limYv = model.yDimOne
					if (self.mouse.dragging.isCandidate) { // move candidate in the candidate region
						if (newY < limYc){
							self.mouse.dragging.y = limYc
						}
					} else { // This is a voter
						// self.mouse.dragging.y = Math.min(50,yMove)
						if (1 || newY > limYv){
							self.mouse.dragging.y = limYv
						}
					}
				}
			}
		} else {
			// Move the one that's being dragged, if any
			if(self.mouse.dragging){
	
				// find percentile that the mouse is in

				var p = self.arenaToModel(self.mouse,self.mouse.dragging)
				self.mouse.dragging.x = p.x

				// var percentile = self.mouse.dragging.x / self.canvas.width * 100
	
				// // find a position in space that represents that percentile
				// if (model.ballotType.name != "ApprovalBallot") return
				// var xNew = _percentileToX(percentile,model)
	
				// // set the dragging candidate to this x
				// self.mouse.dragging.x = xNew
			}
		}
	}


	self.clear = function(){
		// Clear it all!
		self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
	}

	self.drawHorizontal = function() {
		// draw line through middle
		var yLine = model.yDimOne + model.yDimBuffer
		var c = self.ctx
		c.beginPath();
		c.moveTo(0,yLine*2);
		c.lineTo(c.canvas.width,yLine*2);
		c.lineWidth = 2;
		c.strokeStyle = "#888";
		c.stroke();
	}

	self.draw = function(){

		// DRAW 'EM ALL.
		// Draw voters' BG first, then candidates, then voters.


		//set annotations
		if (self.id == "arena") {
			// reset annotations
			for(var i=0; i<self.draggables.length; i++){
				var draggable = self.draggables[i];
				draggable.drawAnnotation = (function(){});
				draggable.drawBackAnnotation = (function(){});
			}
	
			if(model.yeeobject) model.yeeobject.drawBackAnnotation = model.yee.drawYeeGuyBackground
			if(model.yeeobject) model.yeeobject.drawAnnotation = model.yee.drawYeeAnnotation
			
			for(var i=0; i<model.voters.length; i++){
				var voter = model.voters[i];
				voter.draw(self.ctx);
			}
		}
		
		
		for(var i=0; i<model.candidates.length; i++){
			var c = model.candidates[i];
			c.draw(self.ctx,self);
		}

		
		if (self.id == "arena") {
			//voterCenter.update()
			if ((typeof model.voterCenter !== 'undefined') && ! (model.voters.length == 1 && model.voters[0].length == 1)) {
				model.voterCenter.draw(self.ctx)
			}

			// draw the Yee object last so it is easy to see.
			if (model.yeeon && model.yeeobject) model.yeeobject.draw(self.ctx,self)
		}
		
		
		// draw text next to the winners
		if(model.result && model.result.winners) {
			var objWinners = model.result.winners.map(x => model.candidatesById[x])
			if (objWinners.length > 1) {
				for (i in objWinners) {
					objWinners[i].drawTie(self.ctx,self)
				}
			} else {
				objWinners[0].drawWin(self.ctx,self)
			}
		}
		
		if (model.result) {
			self.canvas.style.borderColor = model.result.color;
			if (model.yeeon) self.canvas.style.borderColor = "#fff"
		}
	}

}