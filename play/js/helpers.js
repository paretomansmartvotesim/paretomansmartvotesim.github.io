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
