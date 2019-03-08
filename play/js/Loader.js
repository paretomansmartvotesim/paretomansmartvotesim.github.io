// Each main() makes a new Loader.  The Loader is configured with an .onload and updated with .load.
// Then all the Loaders call the LoaderManager to say what files they need and to give a countdown function _onAssetLoad
// LoaderManager calls the countdown for each Loader each time an image loads.
// When the countdown reaches 0, the .onload's run


var LoaderManager = new function() {
	var self = this;
	var alreadyLoaded = []
	var alreadyRequested = []
	var onloads = {} // list of callbacks to do once the image loads
	
	self.request = function(src,f) {
		if (alreadyLoaded.includes(src)) {
			f() // do the call back now
		} else if (alreadyRequested.includes(src)) {
			onloads[src].push(f)  // do the callback later
		} else {
			alreadyRequested.push(src)
			var img = new Image();
			img.src = src;
			img.onload = function() {loaded(src)} // send the network request for the image.
			onloads[src] = []
			onloads[src].push(f) // do the callback later
		}
		
	}
	function loaded(src) {
		alreadyLoaded.push(src)
		for (var i=0; i < onloads[src].length; i++) {
			onloads[src][i]() // do the callback
		}
	}
}


function Loader() {
	var self = this;

	self.load = function(imagePaths){
	
		// When all images loaded, call dat callback
		var assetsToLoad = imagePaths.length;
		var ONLY_ONCE = false;
		var _onAssetLoad = function(){
			assetsToLoad--;
			if(assetsToLoad==0){
				// ONCE.
				if(ONLY_ONCE) return;
				ONLY_ONCE=true;
				self.onload();
			}
		};
	
		// Load 'em all
		for(var i=0;i<imagePaths.length;i++){
			// send a request to LoaderManager to get an image and call back when it's done
			LoaderManager.request(imagePaths[i], _onAssetLoad)
		}
	
	};

}
