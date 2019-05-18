function Candidate(model){

	var self = this;
	Draggable.call(self, model);
	

	// CONFIGURE DEFAULTS
	self.isCandidate = true
	self.id = 'square'
	self.size = 40;
	self.selected = false

	self.init = function () {

		// GRAPHICS
		if (model.theme == undefined) model.theme = "Default"
		var _graphics = Candidate.graphics[model.theme][self.id];
		self.fill = _graphics.fill;
		self.img = new Image();
		self.img.src = _graphics.img;
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
	Default: {
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
	},	
	Nicky: {
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
	},
	Bees: {
		square: {
			img: "play/img/blue_bee.png",
			fill: "hsl(240,80%,70%)"
		},
		triangle: {
			img: "play/img/yellow_bee.png",
			fill: "hsl(45,80%,70%)"
		},
		hexagon: {
			img: "play/img/red_bee.png",
			fill: "hsl(0,80%,70%)"
		},
		pentagon: {
			img: "play/img/green_bee.png",
			fill: "hsl(90,80%,70%)"
		},
		bob: {
			img: "play/img/orange_bee.png",
			fill: "hsl(30,80%,70%)"
		}
	}
};