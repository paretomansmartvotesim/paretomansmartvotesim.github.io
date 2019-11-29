
function Yee(model) {
	var self = this

	self.calculate = function(){
		var ctx = model.arena.ctx
		// model.pixelsize= 30.0;
		var pixelsize = model.pixelsize;
		var WIDTH = ctx.canvas.width;
		var HEIGHT = ctx.canvas.height;
		var doArrayWay = model.computeMethod != "ez"
		var doB = (model.dimensions == "1D+B" && model.yeeobject.isCandidate)
		var winners
		if (doArrayWay) { // note that voterCenter is not yet implemented in the array way.  Only if "ez" is selected will the yee diagram work
			// Also note that the broadness representation hasn't been added to this method yet.

			// put candidate information into arrays
			var canAid = [], xc = [], yc = [], fillc = [] //, canA = [], revCan = {} // candidates
			var f=[] // , fA = [], fAid = [], xf = [], yf = [], fillf = [] // frontrunners
			var movethisidx, whichtypetomove
			var i = 0
			for (var can in model.candidatesById) {
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
			for (var vidx in model.voters) {
				var v = model.voters[vidx]
				av.push(v)
				xvcenter.push(v.x*2)
				yvcenter.push(v.y*2)
				if (model.yeeobject == v){
					movethisidx = i
					whichtypetomove = "voter"
				}
				for (var j in v.points) {
					var p = v.points[j]
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
			
			var lv = xv.length
			var lc = xc.length
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
			var recompileyee = !arraysEqual(model.fastyeesettings,model.oldfastyeesettings)
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
		if (doB) {
			saveo.b = model.yeeobject.b;
		} else {
			saveo.y = model.yeeobject.y;
		}
		if (model.yeeobject == model.voterCenter) {
			var voterso = []
			for(var i=0; i<model.voters.length; i++){
				voterso[i] = {}
				voterso[i].x = model.voters[i].x
				voterso[i].y = model.voters[i].y
			}
		}

		// model.hexgrid
		// make grid

		if (model.theme == "Bees") {
			model.grid = "hexagon"
		} else if (model.dimensions == "1D") {
			model.grid = "linear"
		} else {
			model.grid = "square"
		}
		if (model.grid == "square") { // square grid
			for(var x=.5*pixelsize ; x<=WIDTH; x+= pixelsize) {
				for(var y=.5*pixelsize; y<=HEIGHT; y+= pixelsize) {
					model.gridx.push(x);
					model.gridy.push(y);
				}
			}
		} else if (model.grid == "linear") {
			var y=.5*pixelsize
			for(var x=.5*pixelsize ; x<=WIDTH; x+= pixelsize) {
				model.gridx.push(x);
				model.gridy.push(y);
			}
		} else { // hex grid
			model.gridType = "horizontal hexagon"
			if (model.gridType == "horizontal") {
				var grids = hexgrid(pixelsize, HEIGHT, WIDTH)
				model.gridx = grids.w
				model.gridy = grids.h
			}
			 else if (model.gridType == "vertical") {
				var grids = hexgrid(pixelsize, WIDTH, HEIGHT)
				model.gridx = grids.h
				model.gridy = grids.w
			} else if (model.gridType == "horizontal hexagon") {
				var grids = hexagon_hexgrid(pixelsize, HEIGHT, WIDTH)
				model.gridx = grids.w
				model.gridy = grids.h
			}
			 else if (model.gridType == "vertical hexagon") {
				var grids = hexagon_hexgrid(pixelsize, WIDTH, HEIGHT)
				model.gridx = grids.h
				model.gridy = grids.w
			}
			function hexgrid(pixelsize, HEIGHT, WIDTH) {
				var w = []
				var h = []
				var hexHeight = pixelsize
				var hexWidth = pixelsize * 2/Math.sqrt(3)
				var hexSide = pixelsize * .5
				var row = 0
				for( var y = hexHeight * .5; y + hexHeight <= HEIGHT; y += hexHeight / 2, row++) {
					if (row % 2 == 1) {  
					var offset = (hexWidth - hexSide)/2 + hexSide
					var col = 1
					}  else {
						var offset = 0.0
						var col = 0
					}
					for ( var x=offset + hexWidth*.5; x+hexWidth <= WIDTH; x += hexWidth + hexSide, col += 2) {
						w.push(x);
						h.push(y);
					}
				}
				return {w:w, h:h}
			}
			function hexagon_hexgrid(pixelsize, HEIGHT, WIDTH) {
				var w = []
				var h = []
				var hexHeight = pixelsize
				var hexWidth = pixelsize * 2/Math.sqrt(3)
				var hexSide = pixelsize * .5

				// default is horizontal flat-top Hexagons

				// how many rings of hexagons fit into the total width?
				var numWidth = Math.floor( (WIDTH - hexWidth) / (hexWidth + hexSide) )
				// how many rings of hexagons fit into the total height?
				var numHeight = Math.floor( (HEIGHT - hexHeight) / (2*hexHeight) )

				// how many rings should we make?
				var n = Math.min(numWidth,numHeight)

				var centerX = Math.floor(WIDTH/2)
				var centerY = Math.floor(HEIGHT/2)
				for (var i = -n; i <= n; i++) {
					var iPos = Math.abs(i)
					for (var j = -(2*n-iPos); j <= (2*n-iPos); j+=2) {
						var x = j * hexHeight/2 + centerX
						var y = i * (hexWidth+hexSide) / 2 + centerY
						w.push(x);
						h.push(y);
					}
				}
				return {w:w, h:h}
			}
		}


		// get winners
		for (var i=0; i < model.gridx.length; i++) {
			var x = model.gridx[i]
			var y = model.gridy[i]
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
					for (w in wl) {colorlist.push(model.candidatesById[canAid[wl[w]] || "square"].fill)}
					model.gridb[i] = colorlist
					var a = "#ccc" // grey is actually a code for "look for more colors"
				} else {
					var a = model.candidatesById[canAid[winner] || "square"].fill
				}
				// if (a == "#ccc") {a = "#ddd"} // hack for now, but will deal with ties later
				model.gridl.push(a);
				continue;
			}
			model.yeeobject.x = x * .5;
			if (doB) {
				model.yeeobject.b = model.arena.bFromY(y * .5)
			} else {
				model.yeeobject.y = y * .5;
			}
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
			if (model.nDistricts > 1) {


				// put all the results together
				result = {
					colors: []
				}
				for (var k = 0; k < model.nDistricts; k++) {
					if (model.district[k].candidates.length > 0) {
						result_k = model.election( model.district[k], model, model.optionsForElection );
						result.colors = [].concat(result.colors , result_k.colors)
					}

				}
				if (result.colors.length > 1) {
					result.color = "#ccc"
				} else {
					result.color = result.colors[0]
				}
			} else {
				var result = model.election(model.district[0], model, {sidebar:false});
			}


			model.gridl.push(result.color);
			model.gridb.push(result.colors)
			// model.caption.innerHTML = "Calculating " + Math.round(x/WIDTH*100) + "%"; // doesn't work yet 
		}
		model.yeeobject.x = saveo.x;
		if (doB) {
			model.yeeobject.b = saveo.b;
		} else {
			model.yeeobject.y = saveo.y;
		}
		if (model.yeeobject == model.voterCenter) {
			for(var i=0; i<model.voters.length; i++){
				model.voters[i].x = voterso[i].x
				model.voters[i].y = voterso[i].y
			}
		}
	}
	
	self.winSeek = function(can) {

		// this function will find the closest point where a candidate wins.

		var temp = {o: model.yeeobject,
			b:model.gridb,
			x:model.gridx,
			y:model.gridy,
			l:model.gridl
		}
		var xMe = can.x
		var yMe = can.y

		// do calculations
		model.yeeobject = can
		self.calculate()
		
		// find closest winning point
		var colorMe = can.fill
		var dist
		var minDist = Infinity
		var kGoal
		for(var k=0;k<model.gridl.length;k++) {
			var ca = model.gridl[k]
			var check = false
			if (ca=="#ccc") { // make stripes instead of gray
				var cb = model.gridb[k]
				if (cb.includes(colorMe)) {
					check = true
				}
			} else {
				if (colorMe == ca)
					check = true
			}
			if (check) {
				dist = d2(model.gridx[k]-xMe, model.gridy[k]-yMe)
				if (dist < minDist) {
					minDist = dist
					kGoal = k
				}
			}
		}
		function d2(x,y) {
			return x**2 + y**2
		}

		if(kGoal != undefined) {
			var goal = {
				x:model.gridx[kGoal],
				y:model.gridy[kGoal]
			}
		} else {
			var goal = undefined
		}


		model.yeeobject = temp.o
		model.gridb=temp.b
		model.gridx=temp.x
		model.gridy=temp.y
		model.gridl=temp.l

		return goal
	}

	self.drawBackground = function() {
		var arena = model.arena
		var ctx = arena.ctx
		
		if(model.yeeon){
			var temp = ctx.globalAlpha
			ctx.globalAlpha = 1
			ctx.fillStyle = "#fff"
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)  // draw a white background
			ctx.fill()
			ctx.globalAlpha = .9
			var pixelsize = model.pixelsize;

			var can_filter_yee = []
			for(var id in model.yeefilter) {
				if (model.yeefilter[id]) {
					can_filter_yee.push(id)
				}
			}
			var method_1 = (Election.stv == model.election) || (Election.rrv == model.election)  // two methods for filtering colors in the yee diagram
			if (method_1) {
				color_filter_yee = can_filter_yee.map(x => model.candidatesById[x].fill)
			} else {
				translate = {}
				for(can in model.candidatesById) {
					var colorcan = model.candidatesById[can].fill
					translate[colorcan] = can_filter_yee.includes(can) ? colorcan : 'white'
				}
			}
			var HEIGHT = ctx.canvas.height
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
					var numstripes = pixelsize/hh
					if (model.grid == "linear") numstripes = HEIGHT / hh
					for (var j=0; j< numstripes; j++) {
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
					if (model.grid == "square") {
						ctx.fillRect(model.gridx[k]-pixelsize*.5, model.gridy[k]-pixelsize*.5, pixelsize, pixelsize);
					} else if (model.grid == "linear") {
						ctx.fillRect(model.gridx[k]-pixelsize*.5, 0, pixelsize, HEIGHT);
					} else {
						// var size = pixelsize / Math.sqrt(3)
						var size = pixelsize / 2
						var x = model.gridx[k]
						var y = model.gridy[k]
						self.drawHexagon(x,y,size,ctx)
					}
				}
			}
			ctx.globalAlpha = temp
			// Draw axes
			//var background = new Image();
			//background.src = "../play/img/axis.png";
			// ctx.drawImage(background,0,0);  // eh, I don't like the axis.
		}

	}

	self.drawHexagon = function(x,y,size,ctx) {
		ctx.beginPath();
		ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

		for (var side = 0.5; side < 7.5; side++) {
			ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
		}
		// ctx.fillStyle = fill;
		ctx.fill();
	}

	self.drawYeeGuyBackground = function(x,y,ctx){
		
		// put circle behind yee candidate
		if(model.yeeon){
			ctx.beginPath();
			ctx.arc(x, y, 60, 0, Math.TAU, true);
			ctx.strokeStyle = "white";
			ctx.lineWidth = 8;
			ctx.fillStyle = 'white';
			var temp = ctx.globalAlpha
			ctx.globalAlpha = 0.3
			ctx.fill();
			ctx.stroke();
			ctx.globalAlpha = temp
		}
	}
	
	self.drawYeeAnnotation = function(x,y,ctx) {
		
		// make the candidate that is moving say "yee-yee!"
		if(model.yeeon){
			ctx.textAlign = "center";
			var temp = ctx.globalAlpha
			ctx.globalAlpha = 0.9
			_drawStroked("yee-yee!",x,y+50,40,ctx);
			var dot = 3
			ctx.fillStyle = "#000"
			ctx.fillRect(x-dot-1,y-dot-1,dot*2+2,dot*2+2);
			ctx.fillStyle = "#fff"
			ctx.fillRect(x-dot,y-dot,dot*2,dot*2);
			ctx.globalAlpha = temp
		}
	}
}