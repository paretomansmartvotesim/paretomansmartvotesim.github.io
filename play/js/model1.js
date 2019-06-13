var l = new Loader()
l.onload = function(assets){

  // CREATE
  var modelName = "model1"
  var model = new Model(modelName);
  model.assets = assets
  model.createDOM()
  // CONFIGURE
  model.border = 2
  // INIT
  model.initDOM()

  var basediv = document.querySelector("#" + modelName)
  basediv.appendChild(model.dom);

  model.start = function(){
    // CREATE
    model.voters.push(new SingleVoter(model))
    model.candidates.push(new Candidate(model))
    model.candidates.push(new Candidate(model))
    // CONFIGURE
    Object.assign( model.voters[0],    {x:125, y:200, type: new PluralityVoter(model)} )
    Object.assign( model.candidates[0],{x: 50, y:125, icon:"square"} )
    Object.assign( model.candidates[1],{x:250, y:125, icon:"triangle"} )
    // INIT
    model.candidates[0].init()
    model.candidates[1].init()
    model.initMODEL()
    model.voters[0].init()
    // UPDATE
    model.update()
  };
  model.onUpdate = function(){
    if (model.voters.length == 0) return
    if (model.voters[0].voterGroupType == "GaussianVoters") return
    var id = model.voters[0].ballot.vote;
    var color = model.candidatesById[id].fill;
    var text = "VOTES FOR <b style='color:"+color+"'>"+id.toUpperCase()+"</b>";
    model.caption.innerHTML = text;
  };

  // UPDATE
  model.start();

};
l.load([
"play/img/voter_face.png",
"play/img/square.png",
"play/img/triangle.png",
"play/img/hexagon.png",
"play/img/square.svg",
"play/img/triangle.svg",
"play/img/hexagon.svg",
"play/img/pentagon.svg",
"play/img/bob.svg"
]);
