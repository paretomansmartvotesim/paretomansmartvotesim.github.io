main_preset()

function main_preset() {
	var url = window.location.pathname;
	var htmlname = url.substring(url.lastIndexOf('/') + 1);
	var preset = loadpreset(htmlname)
	main(preset)
}
