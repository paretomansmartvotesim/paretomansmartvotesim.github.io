
function Yee(model) {
	var self = this
	var ctx = model.ctx
	var canvas = model.canvas

	self.calculate = function(){
		// model.pixelsize= 30.0;
		var pixelsize = model.pixelsize;
		WIDTH = ctx.canvas.width;
		HEIGHT = ctx.canvas.height;
		doArrayWay = model.computeMethod != "ez"
		var winners
		if (doArrayWay) { // note that voterCenter is not yet implemented in the array way.  Only if "ez" is selected will the yee diagram work
			// put candidate information into arrays
			var canAid = [], xc = [], yc = [], fillc = [] //, canA = [], revCan = {} // candidates
			var f=[] // , fA = [], fAid = [], xf = [], yf = [], fillf = [] // frontrunners
			var movethisidx, whichtypetomove
			var i = 0
			for (can in model.candidatesById) {
				var c = model.candidatesById[can]
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
				if (model.yeeobject == c){
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
			for (vidx in model.voters) {
				v = model.voters[vidx]
				av.push(v)
				xvcenter.push(v.x*2)
				yvcenter.push(v.y*2)
				if (model.yeeobject == v){
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

			if (model.yeeobject == model.voterCenter) { // this is just a workaround until I get around to implementing this in the gpu and js methods of computing the yee diagram
				movethisidx = 0
				whichtypetomove = "voter"
			}

			// now we have xv,yv,
			// we might not need av

			// need to compile yee and decide when to recompile
			// basically the only reason to recompile is when the number of voters or candidates changes
			
			lv = xv.length
			lc = xc.length
			model.fastyeesettings = [lc,lv,WIDTH,HEIGHT,pixelsize]
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
			recompileyee = !arraysEqual(model.fastyeesettings,model.oldfastyeesettings)
			//(model.fastyeesettings || 0) != (model.oldfastyeesettings || 0))
			model.oldfastyeesettings = model.fastyeesettings
			if (recompileyee) {
				fastyee = createKernelYee(lc,lv,WIDTH,HEIGHT,pixelsize)
			}
			//method = "gpu"
			//method = "js"
			method = model.computeMethod
			winners = fastyee(xc,yc,f,xv,yv,vg,xvcenter,yvcenter,movethisidx,whichtypetomove,method)
			
		}
		model.gridx = [];
		model.gridy = [];
		model.gridl = []; 
		model.gridb = []; 
		saveo = {}


		saveo.x = model.yeeobject.x;
		saveo.y = model.yeeobject.y;
		if (model.yeeobject == model.voterCenter) {
			var voterso = []
			for(var i=0; i<model.voters.length; i++){
				voterso[i] = {}
				voterso[i].x = model.voters[i].x
				voterso[i].y = model.voters[i].y
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
						model.gridb[i] = colorlist
						var a = "#ccc" // grey is actually a code for "look for more colors"
					} else {
						var a = Candidate.graphics[canAid[winner] || "square"].fill
					}
					// if (a == "#ccc") {a = "#ddd"} // hack for now, but will deal with ties later
					model.gridx.push(x);
					model.gridy.push(y);
					model.gridl.push(a);
					i++;
					continue;
				}
				model.yeeobject.x = x * .5;
				model.yeeobject.y = y * .5;
				// update positions of all the voters if the voterCenter is the yee object
				if (model.yeeobject == model.voterCenter) {
					var changecenter = {
						x:model.yeeobject.x - saveo.x, 
						y:model.yeeobject.y - saveo.y
					}
					for(var j=0; j<model.voters.length; j++){
						model.voters[j].x = voterso[j].x + changecenter.x
						model.voters[j].y = voterso[j].y + changecenter.y
					}
				}
				
				for(var j=0; j<model.voters.length; j++){
					model.voters[j].update();
				}
				var result = model.election(model, {sidebar:false});


				var a = result.color; // updated color
				if (a == "#ccc") {model.gridb[i] = result.colors;}
				model.gridx.push(x);
				model.gridy.push(y);
				model.gridl.push(a);
				// model.caption.innerHTML = "Calculating " + Math.round(x/WIDTH*100) + "%"; // doesn't work yet 
				i++
			}
		}
		model.yeeobject.x = saveo.x;
		model.yeeobject.y = saveo.y;
		if (model.yeeobject == model.voterCenter) {
			for(var i=0; i<model.voters.length; i++){
				model.voters[i].x = voterso[i].x
				model.voters[i].y = voterso[i].y
			}
		}

		// reload the original ballots
		for(var j=0; j<model.voters.length; j++){
			model.voters[j].update();
		}
	}
	
	self.drawBackground = function() {
		
		if(model.yeeon){
			ctx.globalAlpha = 1
			ctx.fillStyle = "#fff"
			ctx.fillRect(0,0,canvas.width,canvas.height)  // draw a white background
			ctx.fill()
			ctx.globalAlpha = .9
			var pixelsize = model.pixelsize;

			var can_filter_yee = model.yeefilter
			var method_1 = (Election.stv == model.election) || (Election.rrv == model.election)  // two methods for filtering colors in the yee diagram
			if (method_1) {
				color_filter_yee = can_filter_yee.map(x => Candidate.graphics[x].fill)
			} else {
				translate = {}
				for(can in Candidate.graphics) {
					var colorcan = Candidate.graphics[can].fill
					translate[colorcan] = can_filter_yee.includes(can) ? colorcan : 'white'
				}
			}

			for(var k=0;k<model.gridx.length;k++) {
				var ca = model.gridl[k]
				
				if (ca=="#ccc") { // make stripes instead of gray
					var cb = model.gridb[k]
					if (method_1) {
						cb = cb.filter(function(x) {return color_filter_yee.includes(x)} )// filter the colors so that only the selected colors are displayed
						if (cb.length == 0) cb = ['white']
					} else {
						cb = cb.map(x => translate[x])
					}
					var xb = model.gridx[k]-pixelsize*.5
					var yb = model.gridy[k]-pixelsize*.5
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
					ctx.fillRect(model.gridx[k]-pixelsize*.5, model.gridy[k]-pixelsize*.5, pixelsize, pixelsize);
				}
			}
			ctx.globalAlpha = 1
			// Draw axes
			//var background = new Image();
			//background.src = "../play/img/axis.png";
			// ctx.drawImage(background,0,0);  // eh, I don't like the axis.
		}

	}
	self.drawYeeGuyBackground = function(x,y,ctx){
		
		// put circle behind yee candidate
		if(model.yeeon){
			ctx.beginPath();
			ctx.arc(x, y, 60, 0, Math.TAU, true);
			ctx.strokeStyle = "white";
			ctx.lineWidth = 8;
			ctx.fillStyle = 'white';
			ctx.globalAlpha = 0.3
			ctx.fill();
			ctx.stroke();
			ctx.globalAlpha = 1
		}
	}
	
	self.drawYeeAnnotation = function(x,y,ctx) {
		
		// make the candidate that is moving say "yee-yee!"
		if(model.yeeon){
			ctx.textAlign = "center";
			ctx.globalAlpha = 0.9
			_drawStroked("yee-yee!",x,y+50,ctx);
			var dot = 3
			ctx.fillStyle = "#000"
			ctx.fillRect(x-dot-1,y-dot-1,dot*2+2,dot*2+2);
			ctx.fillStyle = "#fff"
			ctx.fillRect(x-dot,y-dot,dot*2,dot*2);
			ctx.globalAlpha = 1
		}
	}
}