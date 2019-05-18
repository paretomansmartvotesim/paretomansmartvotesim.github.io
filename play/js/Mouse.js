function Mouse(id, target){

	var self = this;

	// Properties
	self.id = id;
	self.target = target;
	self.x = 0;
	self.y = 0;
	self.pressed = false;
	self.ctrlclick = false

	// Events!
	var _onmousedown = function(event){
		_onmousemove(event);
		self.pressed = true;
		if (event.ctrlKey) self.ctrlclick = true
		publish(self.id+"-mousedown");
	};
	var _onmousemove = function(event){
		self.x = event.offsetX;
		self.y = event.offsetY;
		publish(self.id+"-mousemove");
	};
	var _onmouseup = function(){
		self.pressed = false;
		self.ctrlclick = false
		publish(self.id+"-mouseup");
	};

	// Add events!
	target.onmousedown = _onmousedown;
	target.onmousemove = _onmousemove;
	var temp = document.onmouseup // this might seem recursive, but it really we're adding another function to call in addition to those already being called.
	document.onmouseup = function() {
		if(temp) temp()
		_onmouseup();
	}

	// TOUCH.
	var _onTouchMove;
	target.addEventListener("touchstart",function(event){
		_onTouchMove(event);
		self.pressed = true;
		if (event.ctrlKey) self.ctrlclick = true
		publish(self.id+"-mousedown");
	},false);
	target.addEventListener("touchmove", _onTouchMove=function(event){

		var rect = target.getBoundingClientRect()
		self.x = event.changedTouches[0].clientX - rect.left
		self.y = event.changedTouches[0].clientY - rect.top
		// self.x = event.changedTouches[0].clientX - target.offsetLeft;
		// self.y = event.changedTouches[0].clientY - target.offsetTop;
		if(self.x<0) self.x=0;
		if(self.y<0) self.y=0;
		if(self.x>target.clientWidth) self.x=target.clientWidth;
		if(self.y>target.clientHeight) self.y=target.clientHeight;
		//console.log(target);
		publish(self.id+"-mousemove");
		event.preventDefault();
		
	},false);
	document.body.addEventListener("touchend",function(event){
		self.pressed = false;
		self.ctrlclick = false
		publish(self.id+"-mouseup");
	},false);

};