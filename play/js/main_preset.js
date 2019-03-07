main_preset()

function main_preset() {
	var url = window.location.pathname;
	var htmlname = url.substring(url.lastIndexOf('/') + 1);
	var modelName = htmlname.slice(0,htmlname.length-5)
	var preset = loadpreset(modelName)
	main(preset)
}
