var l = new Loader()
l.onload = function(){

	// CREATE

	window.model = new Model();

	// INIT
	model.initDOM()
  var modelName = "model3"
  var basediv = document.querySelector("#" + modelName)
  basediv.appendChild(model.dom);

	model.start = function(){
		// CREATE
		model.voters.push(new GaussianVoters(model))
		model.candidates.push(new Candidate(model))
		model.candidates.push(new Candidate(model))
		model.candidates.push(new Candidate(model))
		// CONFIGURE
		Object.assign( model.voters[0],    {x:155, y:125, type: new PluralityVoter(model)} )
		Object.assign( model.candidates[0],{x: 50, y:125, id:"square"} )
		Object.assign( model.candidates[1],{x:250, y:125, id:"triangle"} )
		Object.assign( model.candidates[2],{x:280, y:280, id:"hexagon"} )
		// INIT
		model.initMODEL()
		model.voters[0].init()
		model.candidates[0].init()
		model.candidates[1].init()
		model.candidates[2].init()
		model.election = Election.plurality;
		model.optionsForElection =  {sidebar:true, original:true}
		// UPDATE
		model.update()
	};
	model.onUpdate = function(){
		Election.plurality(model);
	};

	var resetDOM = document.createElement("div");
	basediv.appendChild(resetDOM);
	resetDOM.id = "reset";
	resetDOM.innerHTML = "reset";
	resetDOM.style.top = "415px";
	resetDOM.style.left = "110px";
	resetDOM.onclick = function(){
		model.reset();
	};

	// UPDATE
	model.start();
};
l.load([
	"img/voter_face.png",
	"img/square.png",
	"img/triangle.png",
	"img/hexagon.png"
]);
