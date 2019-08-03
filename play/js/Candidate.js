function Candidate(model){

	var self = this;
	Draggable.call(self);
	

	// CONFIGURE DEFAULTS
	self.isCandidate = true
	// it would be better to have a serial number, but for now, use icon and instance
	self.icon = 'square'
	self.instance = 1
	self.size = 40;
	self.b = 1
	self.selected = false

	self.init = function () {
		// GRAPHICS
		self.size = self.sizeFromB(self.b)
		// Defaults
		if (model.theme == undefined) model.theme = "Default" // comment: this should already be handled in model.js
		if (model.colorChooser == undefined) model.colorChooser = "pick and generate"
		if (model.colorSpace == undefined) model.colorSpace = "hsluv with dark"

		// compose an id
		if (self.instance > 1) {
			self.id = self.icon + self.instance
		} else {
			self.id = self.icon
		}

		// what order are we at
		var chars = Candidate.graphics[model.theme]
		var char = Candidate.graphicsByIcon[model.theme][self.icon]
		var charIndex = char.i
		var serial = charIndex + (self.instance - 1) * chars.length
		self.serial = serial
		self.url = char.url
		// var _graphics = Candidate.graphics[model.theme][self.icon];
		// self.url = _graphics.img
		
		// are we using an svg or an img?
		// if the model doesn't have assets, then load the files the old way
		if (model.assets) {
			if (model.assets[self.url]) {
				var asset = model.assets[self.url]
			} else {
				if (Loader) {
					if (Loader.assets[self.url]) {
						var asset = Loader.assets[self.url]
					}
				}
			}
		}

		// png or svg?
		var ext = char.url.split('.').pop();
		self.ext = ext
		if (ext != "svg") {
			// if we are using png's then we have to repeat the fill // TODO: fix
			self.fill = char.fill
		} else if (model.colorChooser == "pick and generate") {
			if (self.instance > 1) {
				// change fill for further rounds
				self.fill = Color.generate(serial)
			} else {
				self.fill = char.fill
				// self.fill = _graphics.fill;
			}
		} else if (model.colorChooser == "pick and repeat w/ offset") {
			if (self.instance > 1) {
				// change fill for further rounds
				var fillIndex = (charIndex + self.instance - 1) % chars.length
				self.fill = chars[fillIndex].fill
			} else {
				self.fill = char.fill
				// self.fill = _graphics.fill;
			}
		} else if (model.colorChooser == "generate all") {
			self.fill = Color.generate(serial)
		} else { // "pick and repeat"
			self.fill = char.fill
		}
		


		// make an img for canvas
		// make an embeddable text string for html
		// This should be the last thing in this function because there are callbacks here.
		if (asset) {
			if (ext == "svg") {
				processSVG(asset)
				model.nLoading++
				makeImg()
			} else { 
				// png asset
				// the img is already made
				self.img = asset

				self.texticon = "<img src='"+self.url+"'/>"
			}
		} else { 
			// no asset, so load the img from a file
			if (ext == "svg") {
				model.nLoading++
				downloadSVGandMakeImg( function() { 
					// callback
					self.texticon = self.svg
					model.update() // draw the UI.. maybe we don't need a whole bunch
				})
			} else { 
				self.srcImg = self.url
				model.nLoading++
				makeImg()

				self.texticon = "<img src='"+self.url+"'/>"
			}
		}

		function processSVG(asset) {
			// make self.srcImg and self.svg from asset

			// svg processing
			// create own class: replace cls-1 with cls-id
			self.svg = asset
			self.svg = self.svg.replace(/cls-1/g,"cls-"+self.id)
			// set style color
			var stylechange = "<style>.cls-" + self.id + "{fill:" + self.fill + ";}</style>"
			// add style to svg
			self.svg  = self.svg.replace("</svg>", stylechange + "</svg>")
			// auto | optimizeSpeed | crispEdges | geometricPrecision
			// shapeRender = 'shape-rendering="auto"'
			// self.svg  = self.svg.replace("<svg", '<svg ' + shapeRender)
			// self.svg  = self.svg.replace("<rect", '<rect ' + shapeRender)
			// self.svg  = self.svg.replace("<polygon", '<polygon ' + shapeRender)
			// self.svg = self.svg.replace("<svg",'<svg width="800" height="800"')

			
			// deal with tooltext
			var doToolText = false
			if (doToolText) { // replace name in tooltext
				self.svg  = self.svg.replace(/<title>[^<]*<\/title>/, "<title>" + self.id + "</title>")
			} else { // no tooltext
				self.svg  = self.svg.replace(/<title>[^<]*<\/title>/, "")
			}

			// parse svg
			var parser = new DOMParser();
			self.svgDoc = parser.parseFromString(self.svg, "text/xml");

			// edit svg Doc
			var root = self.svgDoc.getElementsByTagName("svg")[0]
			root.setAttribute("width", "800");
			root.setAttribute("height", "800");

			// serialize
			var s = new XMLSerializer();
 			self.svg = s.serializeToString(self.svgDoc);

			// make the image source
			if (1) { // just trying different methods
				self.srcImg = "data:image/svg+xml;base64," + btoa(self.svg);
			} else {
				var svgblob = new Blob([self.svg], {type: 'image/svg+xml'});
				self.srcImg = URL.createObjectURL(svgblob); 
			}
			self.texticon = self.svg
		}
		
		function downloadSVGandMakeImg(cb) {
			// save svg as text
			var svgText
			var request = new XMLHttpRequest();
			request.open("GET", self.url);
			request.setRequestHeader("Content-Type", "image/svg+xml");
			request.onload = function(event) { // onload ... not load
				svgText = event.target.responseText
				processSVG(svgText)
				makeImg()
				cb()
			}
			// request.addEventListener("load", function(event) { // onload ... not load
			// 	svgText = event.target.responseText
			// 	loaded(src,svgText)
			// });
			request.send();

		}

		function makeImg() {
			self.img = new Image()
			self.img.src = self.srcImg
			self.img.onload = function () {
				// self.datimg = _convertImageToDataURLviaCanvas(self.img, outputFormat)
				model.nLoading--
				if (model.nLoading == 0) {
					model.draw()
				}
			}
		}
		
	}
	
	self.convertColor = function() {
		var coloredSvgXml = svgXml.replace(/#3080d0/g,'#e05030');
		img.src = "data:image/svg+xml;charset=utf-8,"+coloredSvgXml;
	}
	self.sizeFromB = function(b) {
		return b * 40
	}
	self.bFromSize = function(b) {
		return b / 40
	}

	self.drawBackAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.drawTie = function(ctx,arena) {
		ctx.textAlign = "center";
		var p = arena.modelToArena(self)
		_drawStroked("TIE",p.x*2,p.y*2-35,40,ctx);
	}	
	self.drawWin = function(ctx,arena) {
		ctx.textAlign = "center";
		var p = arena.modelToArena(self)
		_drawStroked("WIN",p.x*2,p.y*2-35,40,ctx);
	}	
	self.drawText = function(text,ctx,arena) {
		ctx.textAlign = "center";
		var p = arena.modelToArena(self)
		_drawStroked(text,p.x*2,p.y*2-35,40,ctx);
	}	
	self.draw = function(ctx,arena){

		// RETINA
		var p = arena.modelToArena(self)
		var x = p.x*2;
		var y = p.y*2;
		var size = self.size*2;

		// Draw image instead!
		//if(self.highlight) ctx.filter = "brightness(150%)"
		if(self.highlight) var temp = ctx.globalAlpha
		if(self.highlight) ctx.globalAlpha = 0.8
		self.drawBackAnnotation(x,y,ctx)
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
		self.drawAnnotation(x,y,ctx)
		if (self.selected) {
			_drawStroked("SELECTED",x,y-5,40,ctx);			
		}
		if(self.highlight) ctx.globalAlpha = temp
		//if(self.highlight) ctx.filter = "brightness(100%)"

	};

}

// CONSTANTS: the GRAPHICS!
// id => img & fill

Candidate.graphics = {
	Default: [
		{
			icon: "square",
			url: "play/img/square.svg",
			fill: "hsl(240,80%,70%)"
		},
		{
			icon: "triangle",
			url: "play/img/triangle.svg",
			fill: "hsl(45,80%,70%)"
		},
		{
			icon: "hexagon",
			url: "play/img/hexagon.svg",
			fill: "hsl(0,80%,70%)"
		},
		{
			icon: "pentagon",
			url: "play/img/pentagon.svg",
			fill: "hsl(90,80%,70%)"
		},
		{
			icon: "bob",
			url: "play/img/bob.svg",
			fill: "hsl(30,80%,70%)"
		}
	],
	Nicky: [
		{
			icon: "square",
			url: "play/img/square.png",
			fill: "hsl(240,80%,70%)"
		},
		{
			icon: "triangle",
			url: "play/img/triangle.png",
			fill: "hsl(45,80%,70%)"
		},
		{
			icon: "hexagon",
			url: "play/img/hexagon.png",
			fill: "hsl(0,80%,70%)"
		},
		{
			icon: "pentagon",
			url: "play/img/pentagon.png",
			fill: "hsl(90,80%,70%)"
		},
		{
			icon: "bob",
			url: "play/img/bob.png",
			fill: "hsl(30,80%,70%)"
		}
	],
	Bees: [
		{
			icon: "square",
			url: "play/img/blue_bee.png",
			fill: "hsl(240,80%,70%)"
		},
		{
			icon: "triangle",
			url: "play/img/yellow_bee.png",
			fill: "hsl(45,80%,70%)"
		},
		{
			icon: "hexagon",
			url: "play/img/red_bee.png",
			fill: "hsl(0,80%,70%)"
		},
		{
			icon: "pentagon",
			url: "play/img/green_bee.png",
			fill: "hsl(90,80%,70%)"
		},
		{
			icon: "bob",
			url: "play/img/orange_bee.png",
			fill: "hsl(30,80%,70%)"
		}
	]
};

// index by icon, as well, and have index stored and ready
Candidate.graphicsByIcon = {}
for (var themename in Candidate.graphics) {
	var theme = Candidate.graphics[themename]
	Candidate.graphicsByIcon[themename] = {}
	for (var k = 0; k < theme.length; k++) {
		var char = theme[k]
		char.i = k
		Candidate.graphicsByIcon[themename][char.icon] = char
	}
}

Candidate.idFromSerial = function (serial,theme) {
	var chars = Candidate.graphics[theme]
	var icon = serial % chars.length
	var instance = (serial - icon) / chars.length +1
	if (instance == 1) instance = ''
	var id = chars[icon].icon + instance
	return id
}
