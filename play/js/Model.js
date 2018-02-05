/***************************

A MODEL:
- Draggable candidates & voter(s)
- Has to draw & up 'em up & down appropriately.

***************************/

function Model(config){

	var self = this;

	// Properties
	config = config || {};
	self.id = config.id || "model";
	self.size = config.size || 300;
	self.scale = config.scale || 1; // TO DO: actually USE this.
	
	if (config.border === undefined) config.border = 2
	self.border = config.border; // used to be 10, then I got rid of the border.

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
	self.addCandidate = function(id, x, y){
		var candidate = new Candidate({
			model: self,
			id:id, x:x, y:y
		});
		self.candidates.push(candidate);
		self.draggables.push(candidate);
		self.candidatesById[id] = candidate;
	};
	self.addVoters = function(config){
		config.model = self;
		var DistClass = config.dist;
		var voters = new DistClass(config);
		self.voters.push(voters);
		self.draggables.push(voters);
	};
	self.addVoterCenter = function(id, x, y){
		var voterCenter = new VoterCenter({
			model: self,
			id:id, x:x, y:y
		});
		self.draggables.push(voterCenter);
		self.voterCenter = voterCenter
	};

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
	
	self.calculateYee = function(){
		// self.pixelsize= 30.0;
		var pixelsize = self.pixelsize;
		WIDTH = ctx.canvas.width;
		HEIGHT = ctx.canvas.height;
		doArrayWay = self.computeMethod != "ez"
		var winners
		if (doArrayWay) { // note that voterCenter is not yet implemented in the array way.  Only if "ez" is selected will the yee diagram work
			// put candidate information into arrays
			var canAid = [], xc = [], yc = [], fillc = [] //, canA = [], revCan = {} // candidates
			var f=[] // , fA = [], fAid = [], xf = [], yf = [], fillf = [] // frontrunners
			var movethisidx, whichtypetomove
			var i = 0
			for (can in self.candidatesById) {
				var c = self.candidatesById[can]
				canAid.push(can)
				// canA.push(c)
				// revCan[c] = i
				xc.push(c.x*2) // remember the 2
				yc.push(c.y*2)
				fillc.push(c.fill)
				if (model.preFrontrunnerIds.includes(c.id)) {
					// fAid.push(can)
					// fA.push(c)
					f.push(i)
					// xf.push(c.x*2)
					// yf.push(c.y*2)
					// fillf.push(c.fill) // maybe don't need
				}
				if (self.yeeobject == c){
					movethisidx = i
					whichtypetomove = "candidate"
				}
				i++
			}
			// now we have xc,yc,fillc,xf,yf
			// maybe we don't need fillf, fA, canA, canAid, fAid, but they might help

			// put voter information into arrays
			var av = [], xv = [], yv = [] , vg = [] , xvcenter = [] , yvcenter = []// candidates
			var movethisidx, whichtypetomove
			var i = 0
			for (vidx in self.voters) {
				v = self.voters[vidx]
				av.push(v)
				xvcenter.push(v.x*2)
				yvcenter.push(v.y*2)
				if (self.yeeobject == v){
					movethisidx = i
					whichtypetomove = "voter"
				}
				for (j in v.points) {
					p = v.points[j]
					xv.push((p[0] + v.x)*2)
					yv.push((p[1] + v.y)*2)
					vg.push(i)
				}
				i++
			}

			if (self.yeeobject == self.voterCenter) { // this is just a workaround until I get around to implementing this in the gpu and js methods of computing the yee diagram
				movethisidx = 0
				whichtypetomove = "voter"
			}

			// now we have xv,yv,
			// we might not need av

			// need to compile yee and decide when to recompile
			// basically the only reason to recompile is when the number of voters or candidates changes
			
			lv = xv.length
			lc = xc.length
			self.fastyeesettings = [lc,lv,WIDTH,HEIGHT,pixelsize]
			function arraysEqual(arr1, arr2) {
				arr1 = arr1 || [0]
				arr2 = arr2 || [0]
				if(arr1.length !== arr2.length)
					return false;
				for(var i = arr1.length; i--;) {
					if(arr1[i] !== arr2[i])
						return false;
				}

				return true;
			}
			recompileyee = !arraysEqual(self.fastyeesettings,self.oldfastyeesettings)
			//(self.fastyeesettings || 0) != (self.oldfastyeesettings || 0))
			self.oldfastyeesettings = self.fastyeesettings
			if (recompileyee) {
				fastyee = createKernelYee(lc,lv,WIDTH,HEIGHT,pixelsize)
			}
			//method = "gpu"
			//method = "js"
			method = self.computeMethod
			winners = fastyee(xc,yc,f,xv,yv,vg,xvcenter,yvcenter,movethisidx,whichtypetomove,method)
			
		}
		self.gridx = [];
		self.gridy = [];
		self.gridl = []; 
		self.gridb = []; 
		saveo = {}


		saveo.x = self.yeeobject.x;
		saveo.y = self.yeeobject.y;
		if (self.yeeobject == self.voterCenter) {
			var voterso = []
			for(var i=0; i<self.voters.length; i++){
				voterso[i] = {}
				voterso[i].x = self.voters[i].x
				voterso[i].y = self.voters[i].y
			}
		}
		var i=0
		for(var x=.5*pixelsize, cx=0; x<=WIDTH; x+= pixelsize, cx++) {
			for(var y=.5*pixelsize, cy=0; y<=HEIGHT; y+= pixelsize, cy++) {
				if (doArrayWay) {
					var winner = Math.round(winners[i])
					if (winner > lc) { // we have a set of winners to decode
						//winner = 3 + lc* (2+lc*(4))
						//var decode = function (winner) {
							wl = []
							for (var s = 0; s < lc; s++) {
								if (winner <= lc) {break}
								wl.push(winner % lc)
								winner = Math.floor(winner / lc)
							}
							wl.push(winner)
						//	return wl
						//}
						colorlist = []
						for (w in wl) {colorlist.push(Candidate.graphics[canAid[wl[w]] || "square"].fill)}
						self.gridb[i] = colorlist
						var a = "#ccc" // grey is actually a code for "look for more colors"
					} else {
						var a = Candidate.graphics[canAid[winner] || "square"].fill
					}
					// if (a == "#ccc") {a = "#ddd"} // hack for now, but will deal with ties later
					self.gridx.push(x);
					self.gridy.push(y);
					self.gridl.push(a);
					i++;
					continue;
				}
				self.yeeobject.x = x * .5;
				self.yeeobject.y = y * .5;
				// update positions of all the voters if the voterCenter is the yee object
				if (self.yeeobject == self.voterCenter) {
					var changecenter = {
						x:self.yeeobject.x - saveo.x, 
						y:self.yeeobject.y - saveo.y
					}
					for(var j=0; j<self.voters.length; j++){
						self.voters[j].x = voterso[j].x + changecenter.x
						self.voters[j].y = voterso[j].y + changecenter.y
					}
				}
				
				for(var j=0; j<self.voters.length; j++){
					self.voters[j].update();
				}
				self.election(self, {sidebar:false});

				var a = self.color; // updated color
				if (a == "#ccc") {self.gridb[i] = self.colors;}
				self.gridx.push(x);
				self.gridy.push(y);
				self.gridl.push(a);
				// model.caption.innerHTML = "Calculating " + Math.round(x/WIDTH*100) + "%"; // doesn't work yet 
				i++
			}
		}
		self.yeeobject.x = saveo.x;
		self.yeeobject.y = saveo.y;
		if (self.yeeobject == self.voterCenter) {
			for(var i=0; i<self.voters.length; i++){
				self.voters[i].x = voterso[i].x
				self.voters[i].y = voterso[i].y
			}
		}
	}
	
	self.findVoterCenter = function(){ // calculate the center of the voter groups
		var x = 0
		var y = 0
		var totalnumbervoters = 0
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i]
			var numbervoters = voter.ballots.length
			x += voter.x * numbervoters
			y += voter.y * numbervoters
			totalnumbervoters += numbervoters
		}
		x/=totalnumbervoters
		y/=totalnumbervoters
		

		var method = 2 // 1,2,3
		// 1 is the mean
		// 2 is the geometric median
		// 3 is a 1-d median along 4 projections
		// 4 is a 1-d median along 2 projections
		// 5 is 2 medians using the usual median method

		if (method == 5) {
			var median = function(values) {

				values.sort( function(a,b) {return a - b;} );
			
				var half = Math.floor(values.length/2);
			
				if(values.length % 2)
					return values[half];
				else
					return (values[half-1] + values[half]) / 2.0;
			}
			xvals = []
			yvals = []
			for(i=0; i<self.voters.length; i++){
				voter = self.voters[i]
				for(m=0; m<voter.points.length; m++) {
					point = voter.points[m]
					xvals.push(point[0]+voter.x)
					yvals.push(point[1]+voter.y)
				}
			}
			x = median(xvals)
			y = median(yvals)
		} else if (method != 1) { // try to find geometric median ... still thinking about whether this is a good idea.
			// first for centers
			var d, voter, yv,xv,xd,yd,itnv,moved,xt,yt,j,i,dg,m,point
			
			if (method == 2) {
				var distancemeasure = function(xd,yd) {
					return Math.sqrt(xd*xd+yd*yd)
				}
			} else if (method == 3) {
				var distancemeasure = function(xd,yd) {
					return Math.abs(xd) + Math.abs(yd) + Math.abs(xd+yd) + Math.abs(xd-yd)
				}
			} else if (method == 4) {
				var distancemeasure = function(xd,yd) {
					return Math.abs(xd) + Math.abs(yd)// + Math.abs(xd+yd) + Math.abs(xd-yd)
				}
			}

			d = 0
			for(i=0; i<self.voters.length; i++){
				voter = self.voters[i]
				xv = voter.x
				yv = voter.y
				xd = xv - x
				yd = yv - y
				d += distancemeasure(xd,yd) * voter.ballots.length // d is total distance, not average
			}
			if (1) {
				for (var a = 200; a > .1; ) {
					xt = [x-a,x+a,x-a,x+a] // try these points
					yt = [y-a,y-a,y+a,y+a]
					moved = false
					for (j in xt) {
						xg = xt[j] // the guess
						yg = yt[j]
						// calculate distance
						dg=0
						for(i=0; i<self.voters.length; i++){
							voter = self.voters[i]
							xv = voter.x
							yv = voter.y
							xd = xv - xg
							yd = yv - yg
							dg += distancemeasure(xd,yd) * voter.ballots.length
						}
						if (dg < d) { // we found a better point
							d=dg * 1
							x=xg * 1
							y=yg * 1
							moved = true
						}
					}
					if(!moved) a*=.5
				}
			}
			// now we do it again for all the individual points within the voter group
			
			d=0
			for(i=0; i<self.voters.length; i++){
				
				voter = self.voters[i]
				for(m=0; m<voter.points.length; m++) {
					point = voter.points[m]
					xv = point[0]+voter.x
					yv = point[1]+voter.y
					xd = xv - x
					yd = yv - y
					d += distancemeasure(xd,yd)
				}
			}
			for (var a = 200; a > .1; ) {
				xt = [x-a,x+a,x-a,x+a] // try these points
				yt = [y-a,y-a,y+a,y+a]
				moved = false
				for (j in xt) {
					xg = xt[j] // the guess
					yg = yt[j]
					// calculate distance
					dg=0
					for(i=0; i<self.voters.length; i++){
						voter = self.voters[i]
						for(m=0; m<voter.points.length; m++) {
							point = voter.points[m]
							xv = point[0]+voter.x
							yv = point[1]+voter.y
							xd = xv - xg
							yd = yv - yg
							dg += distancemeasure(xd,yd)
						}
					}
					if (dg < d) { // we found a better point
						d=dg * 1
						x=xg * 1
						y=yg * 1
						moved = true
					}
				}
				if(!moved) a*=.5
			}
		} 
		return {x:x,y:y}
	}

	self.update = function(){
		// calculate yee if its turned on and we haven't already calculated it ( we aren't dragging the yee object)
		if (self.yeeon && Mouse.dragging != self.yeeobject) self.calculateYee()
		
		
		// Clear it all!
		ctx.clearRect(0,0,canvas.width,canvas.height);

		// Move the one that's being dragged, if any
		if(Mouse.dragging){
			Mouse.dragging.moveTo(Mouse.x, Mouse.y);
		}

		// do the center voter thing
		doCenterVoter = (typeof self.voterCenter !== 'undefined') // does the voterCenter exist?  If so then calculate it.
		if (doCenterVoter) {
			if(Mouse.dragging == self.voterCenter) {
				var oldcenter = self.findVoterCenter()
				var changecenter = {x:self.voterCenter.x - oldcenter.x, y:self.voterCenter.y - oldcenter.y}
				for(var i=0; i<self.voters.length; i++){
					self.voters[i].x += changecenter.x
					self.voters[i].y += changecenter.y
				}
			} else {
				var recenter = self.findVoterCenter()
				self.voterCenter.x = recenter.x
				self.voterCenter.y = recenter.y
			}	
		}
		
		// DRAW 'EM ALL.
		// Draw voters' BG first, then candidates, then voters.

		// Draw axes
		//var background = new Image();
		//background.src = "../play/img/axis.png";
		//ctx.drawImage(background,0,0);
		
		if(self.yeeon){
			ctx.globalAlpha = 1
			ctx.fillStyle = "#fff"
			ctx.fillRect(0,0,canvas.width,canvas.height)  // draw a white background
			ctx.fill()
			ctx.globalAlpha = .9
			var pixelsize = self.pixelsize;

			var can_filter_yee = self.yeefilter
			var method_1 = (Election.stv == self.election) || (Election.rrv == self.election)  // two methods for filtering colors in the yee diagram
			if (method_1) {
				color_filter_yee = can_filter_yee.map(x => Candidate.graphics[x].fill)
			} else {
				translate = {}
				for(can in Candidate.graphics) {
					var colorcan = Candidate.graphics[can].fill
					translate[colorcan] = can_filter_yee.includes(can) ? colorcan : 'white'
				}
			}

			for(var k=0;k<self.gridx.length;k++) {
				var ca = self.gridl[k]
				
				if (ca=="#ccc") { // make stripes instead of gray
					var cb = self.gridb[k]
					if (method_1) {
						cb = cb.filter(function(x) {return color_filter_yee.includes(x)} )// filter the colors so that only the selected colors are displayed
						if (cb.length == 0) cb = ['white']
					} else {
						cb = cb.map(x => translate[x])
					}
					var xb = self.gridx[k]-pixelsize*.5
					var yb = self.gridy[k]-pixelsize*.5
					var wb = pixelsize
					var hb = pixelsize
					var hh = pixelsize / 6; // height of stripe // used to be 5
					for (var j=0; j< pixelsize/hh; j++) {
						ctx.fillStyle = cb[j % cb.length]
						ctx.fillRect(xb,yb+j*hh,wb,hh);
					}
				} else {
					if (method_1) {
						if (color_filter_yee.includes(ca)) {
							ctx.fillStyle = ca;
						} else {
							ctx.fillStyle = 'white';
						}	
					} else {
						ctx.fillStyle = translate[ca]
					}
					ctx.fillRect(self.gridx[k]-pixelsize*.5, self.gridy[k]-pixelsize*.5, pixelsize, pixelsize);
				}
			}
			ctx.globalAlpha = 1
			// Draw axes
			//var background = new Image();
			//background.src = "../play/img/axis.png";
			// ctx.drawImage(background,0,0);  // eh, I don't like the axis.
		}

		// make the candidate that is moving say "yee-yee!"
		if(self.yeeon){
			var x = self.yeeobject.x;
			var y = self.yeeobject.y;
			ctx.beginPath();
			ctx.arc(x*2, y*2, 60, 0, Math.TAU, true);
			ctx.strokeStyle = "white";
			ctx.lineWidth = 8;
			ctx.fillStyle = 'white';
			ctx.globalAlpha = 0.3
			ctx.fill();
			ctx.stroke();
			ctx.globalAlpha = 1
		}
		
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			voter.update();
			voter.draw(ctx);
		}
		for(var i=0; i<self.candidates.length; i++){
			var c = self.candidates[i];
			c.update();
			c.draw(ctx);
		}

		//voterCenter.update()
		if (doCenterVoter && model.getTotalVoters() != 1) {
			self.voterCenter.draw(ctx)
		}

		if(self.yeeon){
			function drawStroked(text, x, y) {
				ctx.font = "40px Sans-serif"
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 4;
				ctx.strokeText(text, x, y);
				ctx.fillStyle = 'white';
				ctx.fillText(text, x, y);
			}
			ctx.textAlign = "center";
			ctx.globalAlpha = 0.9
			drawStroked("yee-yee!",x*2,y*2+50);
			var dot = 3
			ctx.fillStyle = "#000"
			ctx.fillRect(x*2-dot-1,y*2-dot-1,dot*2+2,dot*2+2);
			ctx.fillStyle = "#fff"
			ctx.fillRect(x*2-dot,y*2-dot,dot*2,dot*2);
			ctx.globalAlpha = 1
		}

		// Update!
		self.onUpdate();
		publish(self.id+"-update");

	};

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
