// YES, TAU.
Math.TAU = Math.PI*2;

// For the election sandbox code
function _icon(name){
	return "<img src='img/icon/"+name+".png'/>";
}


function _drawStroked(text, x, y, textsize, ctx) {
	ctx.font = textsize + "px Sans-serif"
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;
	ctx.strokeText(text, x, y);
	ctx.fillStyle = 'white';
	ctx.fillText(text, x, y);
}

function _fillInDefaults(to,from) {
	// create copy of 'from'
	from = from || {}
	to = to || {} // maybe don't need this line?
	var copy = _jcopy(from);
	for (var name in copy) {
		if(to[name] == undefined) to[name] = copy[name];
	}
}

function _fillInSomeDefaults(to,from,names) {
	from = from || {}
	for (var i in names) {
		if(from[names[i]] == undefined) continue
		if(to[names[i]] == undefined) to[names[i]] = _jcopy(from[names[i]]);
	}
}

function _copySomeAttributes_old(to,from,names) {
	// create copy of 'from'
	var copy = _jcopy(from); // this ran into problems with self.model being a circular reference
	to = to || {}
	for (var i in names) {
		to[names[i]] = copy[names[i]];
	}
}
function _copySomeAttributes(to,from,names) {
	// create copy of 'from'
	to = to || {}
	for (var i in names) {
		if(from[names[i]] == undefined) continue
		to[names[i]] = _jcopy(from[names[i]]);
	}
}

function _jcopy(a) {
	return JSON.parse(JSON.stringify(a))
}