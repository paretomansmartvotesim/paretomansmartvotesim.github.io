function Candidate(model){

	var self = this;
	Draggable.call(self, model);

	// CONFIGURE DEFAULTS
	self.id = 'square'
	self.size = 40;

	self.init = function () {

		// GRAPHICS
		var _graphics = Candidate.graphics[self.id];
		self.fill = _graphics.fill;
		self.img = new Image();
		self.img.src = _graphics.img;
	}
	self.drawBackAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.drawTie = function(ctx) {
		_drawStroked("TIE",self.x*2,self.y*2-35,40,ctx);
	}	
	self.drawWin = function(ctx) {
		_drawStroked("WIN",self.x*2,self.y*2-35,40,ctx);
	}	
	self.draw = function(ctx){

		// RETINA
		var x = self.x*2;
		var y = self.y*2;
		var size = self.size*2;

		// Draw image instead!
		//if(self.highlight) ctx.filter = "brightness(150%)"
		if(self.highlight) var temp = ctx.globalAlpha
		if(self.highlight) ctx.globalAlpha = 0.8
		self.drawBackAnnotation(x,y,ctx)
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
		self.drawAnnotation(x,y,ctx)
		if(self.highlight) ctx.globalAlpha = temp
		//if(self.highlight) ctx.filter = "brightness(100%)"

	};

}

// CONSTANTS: the GRAPHICS!
// id => img & fill
Candidate.graphics = {
	square: {
		img: "play/img/square.png",
		fill: "hsl(240,80%,70%)"
	},
	triangle: {
		img: "play/img/triangle.png",
		fill: "hsl(45,80%,70%)"
	},
	hexagon: {
		img: "play/img/hexagon.png",
		fill: "hsl(0,80%,70%)"
	},
	pentagon: {
		img: "play/img/pentagon.png",
		fill: "hsl(90,80%,70%)"
	},
	bob: {
		img: "play/img/bob.png",
		fill: "hsl(30,80%,70%)"
	}
};