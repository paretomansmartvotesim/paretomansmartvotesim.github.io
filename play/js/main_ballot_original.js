window.ONLY_ONCE = false;
function main(ballotType){

	// ONCE.
	if(ONLY_ONCE) return;
	ONLY_ONCE=true;

	var VoterType = window[ballotType+"Voter"];
	var BallotType = window[ballotType+"Ballot"];

	Loader.onload = function(){

		// CREATE
		window.model = new Model();

		// CONFIGURE
		model.size = 250
		model.border = 2

		// INIT
		model.initDOM()
		document.body.appendChild(model.dom);
		model.start = function(){
			// CREATE
			model.voters.push(new SingleVoter(model))
			model.candidates.push(new Candidate(model))
			model.candidates.push(new Candidate(model))
			model.candidates.push(new Candidate(model))
			// CONFIGURE
			Object.assign( model.voters[0],    {x: 81, y: 92, type: new VoterType(model), 
				firstStrategy: "zero strategy. judge on an absolute scale."} )
			Object.assign( model.candidates[0],{x: 41, y: 50, id:"square"} )
			Object.assign( model.candidates[1],{x:153, y: 95, id:"triangle"} )
			Object.assign( model.candidates[2],{x:216, y:216, id:"hexagon"} )
			model.voters[0].firstStrategy = "zero strategy. judge on an absolute scale.";
			// INIT
			model.initMODEL()
			model.voters[0].init()
			model.candidates[0].init()
			model.candidates[1].init()
			model.candidates[2].init()
			// UPDATE
			model.update()
		};


		// CREATE A BALLOT
		window.ballot = new BallotType();
		document.body.appendChild(ballot.dom);
		model.onUpdate = function(){
			ballot.update(model.voters[0].ballot);
		};

		// UPDATE
		model.start();

	};

	Loader.load([
		
		// the peeps
		"img/voter_face.png",
		"img/square.png",
		"img/triangle.png",
		"img/hexagon.png",
		
		// Ballot instructions
		"img/ballot_fptp.png",
		"img/ballot_ranked.png",
		"img/ballot_approval.png",
		"img/ballot_range_original.png",

		// The boxes
		"img/ballot_box.png",
		"img/ballot_rate_original.png"

	]);

}