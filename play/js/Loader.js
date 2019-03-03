window.Loader = {};
Loader.load = function(imagePaths){

	// When all images loaded, call dat callback
	var assetsToLoad = imagePaths.length;
	var ONLY_ONCE = false;
	var _onAssetLoad = function(){
		assetsToLoad--;
		if(assetsToLoad==0){
			// ONCE.
			if(ONLY_ONCE) return;
			ONLY_ONCE=true;
			Loader.onload();
		}
	};

	// Load 'em all
	for(var i=0;i<imagePaths.length;i++){
		var img = new Image();
		img.onload = _onAssetLoad;
		img.src = imagePaths[i];
	}

};