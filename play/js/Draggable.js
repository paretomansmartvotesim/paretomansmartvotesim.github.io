function Draggable(model){ // Voter and Candidate classes are extended to make them draggable objects in an arena.
	// sanity rules: Draggable class creation code cannot read attributes from model.

	var self = this;
	// CONFIGURE DEFAULTS
	self.x = 0
	self.y = 0
	self.radius = 25
	
	self.init = function () {
		self.offX = 0;
		self.offY = 0;
	}

	self.hitTest = function(x,y,arena){
		var a = arena.modelToArena(self)
		var dx = x-a.x;
		var dy = y-a.y;
		var r = self.radius;
		return((dx*dx+dy*dy) < r*r);
	};

	self.moveTo = function(x,y,arena){
		var a = {}
		a.x = x+self.offX
		a.y = y+self.offY
		var p = arena.arenaToModel(a,self);
		self.x = p.x
		self.y = p.y
		// self.x = x+self.offX;
		// self.y = y+self.offY;
	};

	self.offX = 0;
	self.offY = 0;
	self.startDrag = function(arena){
		var a = arena.modelToArena(self)
		self.offX = a.x-arena.mouse.x;
		self.offY = a.y-arena.mouse.y;
		// self.offX = self.x-arena.mouse.x;
		// self.offY = self.y-arena.mouse.y;
	};

	self.update = function(){
		// TO IMPLEMENT
	};

	self.draw = function(ctx){
		// TO IMPLEMENT
	};

}

function DraggableManager(arena,model){

	var self = this;

	// Helper: is Over anything?
	self.isOver = function(){
		if (model.yeeon && model.yeeobject) { // Choose the yee object as a priority
			if(model.yeeobject.hitTest(arena.mouse.x, arena.mouse.y,arena)){
				return model.yeeobject;
			}
		}
		for(var i=arena.draggables.length-1; i>=0; i--){ // top DOWN.
			var d = arena.draggables[i];
			if(d.hitTest(arena.mouse.x, arena.mouse.y,arena)){
				return d;
			}
		}
		return null;
	}

	// INTERFACING WITH THE *MOUSE*
	subscribe(arena.id+"-mousemove", function(){
		if(arena.mouse.pressed){
			model.update();
		}else if(self.isOver()){
			// If over anything, grab cursor!
			arena.canvas.setAttribute("cursor", "grab");
			// also, highlight one object
			// set all objects to not highlight
			for(var i=arena.draggables.length-1; i>=0; i--){ // top DOWN.
				var d = arena.draggables[i];
				d.highlight = false
			}
			var flashydude = self.isOver()
			if (flashydude) flashydude.highlight = true
			model.draw()
			self.lastwas = "hovering"
		}else{
			// Otherwise no cursor
			arena.canvas.setAttribute("cursor", "");
			if ( self.lastwas == "hovering"){
				for(var i=arena.draggables.length-1; i>=0; i--){ // top DOWN.
					var d = arena.draggables[i];
					d.highlight = false
				}
				model.draw()	
			}
			self.lastwas = "nothovering"
		}
	});
	subscribe(arena.id+"-mousedown", function(){

		// Didja grab anything? null if nothing.
		arena.mouse.dragging = self.isOver();

		// If so...
		if(arena.mouse.dragging){
			arena.mouse.dragging.startDrag(arena);
			if (arena.mouse.ctrlclick) { // we toggled this guy as a winner
				arena.mouse.dragging.selected = ! arena.mouse.dragging.selected
			}
			model.update();

			// GrabBING cursor!
			arena.canvas.setAttribute("cursor", "grabbing");

		}

	});
	subscribe(arena.id+"-mouseup", function(){
		if (arena.mouse.dragging) {
			model.onDrop()
		}
		arena.mouse.dragging = null;
		model.update();
	});

}