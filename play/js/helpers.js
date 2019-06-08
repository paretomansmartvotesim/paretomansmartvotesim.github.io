// YES, TAU.
Math.TAU = Math.PI*2;


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

function _fillInDefaultsByAddress(to,from) {
	from = from || {}
	to = to || {} // maybe don't need this line?
	for (var name in from) {
		if(to[name] == undefined) to[name] = from[name];
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

function _objF(obj,f) { // run function if it exists for each item of an object
	for(var item in obj ) {
		if (obj[item][f]) obj[item][f]()
	} 
	// for example: run ui.menu.systems.configure(), ui.menu.nCandidates.configure(), et al.
}


function _convertImageToDataURLviaCanvas(img, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	canvas.height = img.height;
	canvas.width = img.width;
	ctx.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL();
	canvas = null; 
	return dataURL
}

function _convertSVGToDataURLviaCanvas(img, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	canvas.height = img.height;
	canvas.width = img.width;
	ctx.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL(outputFormat);
	canvas = null; 
	return dataURL
}