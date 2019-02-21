function Draggable(config){
	// sanity rules: Draggable class creation code cannot read attributes from model.

	var self = this;

	// Passed properties
	self.x = config.x;
	self.y = config.y;
	self.model = config.model;
	self.radius = config.radius || 30;

	self.hitTest = function(x,y){
		var dx = x-self.x;
		var dy = y-self.y;
		var r = self.radius;
		return((dx*dx+dy*dy) < r*r);
	};

	self.moveTo = function(x,y){
		self.x = x+self.offX;
		self.y = y+self.offY;
	};

	self.offX = 0;
	self.offY = 0;
	self.startDrag = function(){
		self.offX = self.x-Mouse.x;
		self.offY = self.y-Mouse.y;
	};

	self.update = function(){
		// TO IMPLEMENT
	};

	self.draw = function(ctx){
		// TO IMPLEMENT
	};

}

function DraggableManager(model){

	var self = this;
	self.model = model;

	// Helper: is Over anything?
	self.isOver = function(){
		if (model.yeeon && model.yeeobject) { // Choose the yee object as a priority
			if(model.yeeobject.hitTest(Mouse.x, Mouse.y)){
				return model.yeeobject;
			}
		}
		for(var i=model.draggables.length-1; i>=0; i--){ // top DOWN.
			var d = model.draggables[i];
			if(d.hitTest(Mouse.x, Mouse.y)){
				return d;
			}
		}
		return null;
	}

	// INTERFACING WITH THE *MOUSE*
	subscribe(model.id+"-mousemove", function(){
		if(Mouse.pressed){
			model.update();
		}else if(self.isOver()){
			// If over anything, grab cursor!
			model.canvas.setAttribute("cursor", "grab");
			// also, highlight one object
			// set all objects to not highlight
			for(var i=model.draggables.length-1; i>=0; i--){ // top DOWN.
				var d = model.draggables[i];
				d.highlight = false
			}
			var flashydude = self.isOver()
			if (flashydude) flashydude.highlight = true
			model.draw()
			self.lastwas = "hovering"
		}else{
			// Otherwise no cursor
			model.canvas.setAttribute("cursor", "");
			if ( self.lastwas == "hovering"){
				for(var i=model.draggables.length-1; i>=0; i--){ // top DOWN.
					var d = model.draggables[i];
					d.highlight = false
				}
				model.draw()	
			}
			self.lastwas = "nothovering"
		}
	});
	subscribe(model.id+"-mousedown", function(){

		// Didja grab anything? null if nothing.
		Mouse.dragging = self.isOver();

		// If so...
		if(Mouse.dragging){
			Mouse.dragging.startDrag();
			model.update();

			// GrabBING cursor!
			model.canvas.setAttribute("cursor", "grabbing");

		}

	});
	subscribe(model.id+"-mouseup", function(){
		Mouse.dragging = null;
	});

}