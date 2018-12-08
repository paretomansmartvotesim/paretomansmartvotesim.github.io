/****************************

SINGLETON CLASS on how to COUNT UP THE BALLOTS
and RENDER IT INTO THE CAPTION

*****************************/

var Election = {};


Election.score = function(model, options){

	if ("Auto" == model.autoPoll) polltext = doPollAndUpdateBallots(model,options,"score")

	// Tally the approvals & get winner!
	var tally = _tally(model, function(tally, ballot){
		for(var candidate in ballot){
			tally[candidate] += ballot[candidate];
		}
	});



	var winners = _countWinner(tally);
	var color = _colorWinner(model, winners);

	if (options.sidebar) {

		// Caption
		var winner = winners[0];
		var text = "";
		text += "<span class='small'>";
		if ("Auto" == model.autoPoll) text += polltext;
		text += "<b>score as % of max possible: </b><br>";
		for(var i=0; i<model.candidates.length; i++){
			var c = model.candidates[i].id;
			text += _icon(c)+"'s score: "+_percentFormat(model, tally[c] / 5)+"<br>";
		}
		if(!winner | winners.length>=2){
			// NO WINNER?! OR TIE?!?!
			text += _tietext(winners);
			text = "<b>TIE</b> <br> <br>" + text;
		} else {
			text += "<br>";
			text += _icon(winner)+" has the highest score, so...<br>";
			text += "</span>";
			text += "<br>";
			text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
			text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
		}

		model.caption.innerHTML = text;
	}
	
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
};

Election.star = function(model, options){

	if ("Auto" == model.autoPoll) polltext = doPollAndUpdateBallots(model,options,"score")

	// Tally the approvals & get winner!
	var tally = _tally(model, function(tally, ballot){
		for(var candidate in ballot){
			tally[candidate] += ballot[candidate];
		}
	});
	var frontrunners = [];

	for (var i in tally) {
	   frontrunners.push(i);
	}
	frontrunners.sort(function(a,b){return tally[b]-tally[a]})

	var ballots = model.getBallots();
	var aWins = 0;
	var bWins = 0;
	for(var k=0; k<ballots.length; k++){
		var ballot = ballots[k];
		if(ballot[frontrunners[0]]>ballot[frontrunners[1]]){
			aWins++; // a wins!
		} else if(ballot[frontrunners[0]]<ballot[frontrunners[1]]){
			bWins++; // b wins!
		}
	}

	var winner = frontrunners[0]
	if (bWins > aWins) {
		winner = frontrunners[1]
	}
	var color = _colorWinner(model, [winner]);

	if (model.dotop2) model.top2 = frontrunners.slice(0,2)

	if (!options.sidebar) return

	// NO WINNER?! OR TIE?!?!
	if(!winner){

		var text = "<b>NOBODY WINS</b>";
		model.caption.innerHTML = text;

	}else{

		// Caption
		var text = "";
		text += "<span class='small'>";
		if ("Auto" == model.autoPoll) text += polltext;
		text += "<b>pairwise winner of two highest average scores wins</b><br>";
		for(var i=0; i<model.candidates.length; i++){
			var c = model.candidates[i].id;
			text += _icon(c)+":"+_percentFormat(model, tally[c] / 5)+"<br>";
		}
		text += "<br>";
		text += "<b>Final Round between the top two:<br></b>";
		text += _icon(frontrunners[0])+_percentFormat(model, aWins)+". "+_icon(frontrunners[1]) +_percentFormat(model, bWins) + "<br>";
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
		model.caption.innerHTML = text;

	}

};

Election.three21 = function(model, options){

	var ballots = model.getBallots();

	if ("Auto" == model.autoPoll) polltext = doPollAndUpdateBallots(model,options,"score")
	
	// Tally the approvals & get winner!
	var tallies = _tallies(model, 3);

	var semifinalists = [];

	for (var i in model.candidatesById) {
	   semifinalists.push(i);
	}
	semifinalists.sort(function(a,b){return tallies[2][b]-tallies[2][a]})

	var finalists = semifinalists.slice(0,3);
	finalists.sort(function(a,b){return tallies[0][a]-tallies[0][b]})

	var ballots = model.getBallots();
	var aWins = 0;
	var bWins = 0;
	for(var k=0; k<ballots.length; k++){
		var ballot = ballots[k];
		if(ballot[finalists[0]]>ballot[finalists[1]]){
			aWins++; // a wins!
		} else if(ballot[finalists[0]]<ballot[finalists[1]]){
			bWins++; // b wins!
		}
	}

	var winner = finalists[0]
	if (bWins > aWins) {
		winner = finalists[1]
	}
	var color = _colorWinner(model, [winner]);
	
	if (model.dotop2) model.top2 = finalists.slice(0,2)

	if (!options.sidebar) return

	// NO WINNER?! OR TIE?!?!
	if(!winner){

		var text = "<b>NOBODY WINS</b>";
		model.caption.innerHTML = text;

	}else{

		// Caption
		var text = "";
		text += "<span class='small'>";
		if ("Auto" == model.autoPoll) text += polltext;
		text += "<b>Semifinalists: 3 most good. Finalists: 2 least bad. Winner: more preferred.</b><br>";
		text += "<b>Semifinalists:</b><br>";
		for(var i=0; i<semifinalists.length; i++){
			var c = semifinalists[i];
			text += _icon(c)+"'s 'good': "+ _percentFormat(model, tallies[2][c]) +"<br>";
			
		}
		text += "<b>Finalists:</b><br>";
		for(var i=0; i<finalists.length; i++){
			var c = finalists[i];
			text += _icon(c)+"'s 'bad': "+_percentFormat(model, tallies[0][c])+"<br>";
		}
		text += "<b>Winner:</b><br>";

		text += _icon(finalists[0])+": "+_percentFormat(model, aWins)+"; "+_icon(finalists[1]) +": "+_percentFormat(model, bWins)+", so...<br>";
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
		model.caption.innerHTML = text;

	}

};

Election.approval = function(model, options){

	if ("Auto" == model.autoPoll) polltext = doPollAndUpdateBallots(model,options,"approval")

	// Tally the approvals & get winner!
	var tally = _tally(model, function(tally, ballot){
		var approved = ballot.approved;
		for(var i=0; i<approved.length; i++) tally[approved[i]]++;
	});

	var winners = _countWinner(tally);

	var color = _colorWinner(model, winners);
	
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)

	

	if (!options.sidebar) return

	// Caption
	var winner = winners[0];
	var text = "";
	text += "<span class='small'>";
	if ("Auto" == model.autoPoll) text += polltext;
	text += "<b>most approvals wins (%)</b><br>";
	for(var i=0; i<model.candidates.length; i++){
		var c = model.candidates[i].id;
		text += _icon(c)+" got "+_percentFormat(model, tally[c])+"<br>";
	}
	if(!winner | winners.length>=2){
		// NO WINNER?! OR TIE?!?!
		text += _tietext(winners);
		text = "<b>TIE</b> <br> <br>" + text;
	} else {
		text += "<br>";
		text += _icon(winner)+" is most approved, so...<br>";
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
	}
	model.caption.innerHTML = text;
};

Election.condorcet = function(model, options){

	var text = "";
	text += "<span class='small'>";
	text += "<b>who wins each one-on-one?</b><br>";

	var ballots = model.getBallots();

	// Create the WIN tally
	var tally = {};
	for(var candidateID in model.candidatesById) tally[candidateID] = 0;

	// For each combination... who's the better ranking?
	for(var i=0; i<model.candidates.length-1; i++){
		var a = model.candidates[i];
		for(var j=i+1; j<model.candidates.length; j++){
			var b = model.candidates[j];

			// Actually figure out who won.
			var aWins = 0;
			var bWins = 0;
			for(var k=0; k<ballots.length; k++){
				var rank = ballots[k].rank;
				if(rank.indexOf(a.id)<rank.indexOf(b.id)){
					aWins++; // a wins!
				}else{
					bWins++; // b wins!
				}
			}

			// WINNER?
			var winner = (aWins>bWins) ? a : b;
			if (aWins != bWins) {
				tally[winner.id]++;

				// Text.
				var by,to;
				if(winner==a){
					by = aWins;
					to = bWins;
				}else{
					by = bWins;
					to = aWins;
				}
				text += _icon(a.id)+" vs "+_icon(b.id)+": "+_icon(winner.id)+" wins, "+_percentFormat(model, by)+" to "+_percentFormat(model, to)+"<br>";
			} else { //tie
				tally[a.id]++;
				tally[b.id]++;
				text += _icon(a.id)+" vs "+_icon(b.id)+": "+"TIE"+"<br>";
			}
		}
	}

	// Was there one who won all????
	var topWinners = [];
	
	for(var id in tally){
		if(tally[id]==model.candidates.length-1){
			topWinners.push(id);
		}
	}
	// probably it would be better to find the smith set but this is okay for now
	topWinners = _countWinner(tally);
	var color = _colorWinner(model, topWinners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return
	
	var topWinner = topWinners[0];
	// Winner... or NOT!!!!
	text += "<br>";
	if (topWinners.length == 1) {
		text += _icon(topWinner)+" beats all other candidates in one-on-one races.<br>";
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS <br> <br>" + text;
	}else if (topWinners.length >= 2) {
		for(var i=0; i<model.candidates.length; i++){
			var c = model.candidates[i].id;
			text += _icon(c)+" got "+tally[c]+" wins<br>";
		}
		text += _tietext(topWinners);
		text = "<b>TIE</b> <br> <br>" + text;
	} else {
		text += "NOBODY beats everyone else in one-on-one races.<br>";
		text += "</span>";
		text += "<br>";
		text += "THERE'S NO WINNER.<br>";
		text += "<b id='ohno'>OH NO.</b>";
	}

	// what's the loop?

	model.caption.innerHTML = text;

};

// PairElimination
Election.schulze = function(model, options){ // Pairs of candidates are sorted by their win margin.  Then we eliminate the weakest wins until there is a Condorcet winner.  A condorcet winner has 0 losses.

	var reverseExplanation = true

	var text = "";
	text += "<span class='small'>";
	if (reverseExplanation) {
		text += "<b>who lost the least, one-on-one?</b><br>";
	} else {
		text += "<b>who had the strongest wins, one-on-one?</b><br>";
	}

	var ballots = model.getBallots();

	// Create the WIN tally
	var tally = {};
	var losses = {};
	for(var candidateID in model.candidatesById) tally[candidateID] = 0;
	for(var candidateID in model.candidatesById) losses[candidateID] = 0;

	// For each combination... who's the better ranking?
	pairs = []
	for(var i=0; i<model.candidates.length-1; i++){
		var a = model.candidates[i];
		for(var j=i+1; j<model.candidates.length; j++){
			var b = model.candidates[j];

			// Actually figure out who won.
			var aWins = 0;
			var bWins = 0;
			for(var k=0; k<ballots.length; k++){
				var rank = ballots[k].rank;
				if(rank.indexOf(a.id)<rank.indexOf(b.id)){
					aWins++; // a wins!
				}else{
					bWins++; // b wins!
				}
			}

			// WINNER?
			var winner = (aWins>bWins) ? a : b;
			var loser = (aWins>bWins) ? b : a;
			if (aWins != bWins) {
				tally[winner.id]++;
				losses[loser.id]++;

				// Text.
				var by,to;
				if(winner==a){
					by = aWins;
					to = bWins;
					pairs.push({winI:i,loseI:j,winN:aWins,loseN:bWins,margin:aWins-bWins,tie:false})
				}else{
					by = bWins;
					to = aWins;
					pairs.push({winI:j,loseI:i,winN:bWins,loseN:aWins,margin:bWins-aWins,tie:false})
				}
				//text += _icon(a.id)+" vs "+_icon(b.id)+": "+_icon(winner.id)+" wins by "+by+" to "+to+"<br>";
			} else { //tie
				tally[a.id]++;
				tally[b.id]++;
				pairs.push({winI:i,loseI:j,winN:aWins,loseN:bWins,margin:aWins-bWins,tie:true})
				//text += _icon(a.id)+" vs "+_icon(b.id)+": "+"TIE"+"<br>";
			}
		}
	}

	// Was there one who won all????
	var topWinners = [];
	
	for(var id in tally){
		if(tally[id]==model.candidates.length-1){
			topWinners.push(id);
		}
	}
	var unanimousWin = topWinners.length == 1
	

	pairs = pairs.sort(function(x,y) {return y.margin - x.margin}) // sort in descending order
		

	// if there was a tie, then try to break the tie
	if (! unanimousWin) {

		// switch to indexing the candidates by numbers instead of names
		var lossesI=[]
		for (var j = 0; j < model.candidates.length; j++) {
			//lossesI[j] = losses[model.candidates[j]]
			lossesI.push(losses[model.candidates[j].id])
		}

		// find the Schwartz set
		schwartz = []

		// find the lowest loss candidates and add them to the schwarz set

		max3 = model.candidates.length
		for(var j = 0; j < model.candidates.length; j++){ // see who wins 
			if(lossesI[j]<max3){
				max3 = lossesI[j]
				schwartz = []
				schwartz.push(j)
			} else if (lossesI[j]==max3){
				schwartz.push(j)
			}
		}
		// add anybody that beat them (not tied)
		var jp
		for (var j = 0; j < pairs.length; j++) {
			jp = pairs[j]
			if ( schwartz.includes(jp.loseI) && ! jp.tie && ! schwartz.includes(jp.winI) ) {
				schwartz.push(jp.winI)
				j = -1 // restart loop
			}
		}
		schwartzFirst =  (Array.from(schwartz)).map(x => model.candidates[x].id)
		



		var tieBreakerWinners = []
		for (var i = pairs.length - 1; i > 0; i--) { // i represents the strongest pair to be eliminated
			

			if (! pairs[i].tie) {
				losses[model.candidates[pairs[i].loseI].id] -- // eliminate loss
				lossesI[pairs[i].loseI] -- // eliminate loss
			}
			if (i > 0 && pairs[i].margin == pairs[i-1].margin) { // check if there is a tie for weakest win
				continue
			}


			// find the Schwartz set
			schwartz = []

			// find the lowest loss candidates and add them to the schwarz set

			max3 = model.candidates.length
			for(var j = 0; j < model.candidates.length; j++){ // see who wins 
				if(lossesI[j]<max3){
					max3 = lossesI[j]
					schwartz = []
					schwartz.push(j)
				} else if (lossesI[j]==max3){
					schwartz.push(j)
				}
			}
			// add anybody that beat them (not tied)
			var jp
			for (var j = 0; j < i; j++) { // don't look at pairs that are already eliminated
				jp = pairs[j]
				if ( schwartz.includes(jp.loseI) && ! jp.tie && ! schwartz.includes(jp.winI) ) {
					schwartz.push(jp.winI)
					j = -1 // restart loop
				}
			}
			
			// store schwartz set to display later
			pairs[i].schwartz = (Array.from(schwartz)).map(x => model.candidates[x].id)

			// count losses

			var schwartzlosses = []
			for(var j = 0; j < model.candidates.length; j++){ 
				schwartzlosses[j] = 0
			} 
		
			
			for (var j = 0; j < pairs.length; j++) { 
				jp = pairs[j]
				if ( schwartz.includes(jp.loseI) && ! jp.tie && schwartz.includes(jp.winI) ) {
					schwartzlosses[jp.loseI]++
				}
			}
			
			//////////////////////// doesn't work yet
			


			// finda winner in the Schwartz set

			for(var j in schwartz){ // see who wins 
				var guy = schwartz[j]
				if(lossesI[guy]==0){
					tieBreakerWinners.push(model.candidates[guy].id);
				}
			}
			if (tieBreakerWinners.length > 0) break; // stop if someone won

		}
		topWinners = tieBreakerWinners
		var strongestElimination = i
	}




	var color = _colorWinner(model, topWinners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return
		
	if (unanimousWin) {
		text += _icon(topWinners[0])+" beats all other candidates in one-on-one races.<br>";
	} else {
		schwartztext = ""
		for (var j in model.candidatesById) { // go through the candidate names in order and display the ones that are in the schwartz set.
			if( schwartzFirst.includes(j)) {
				schwartztext = schwartztext + _icon(j)	
			}
		}
		schwartztext += " is Schwartz set.<br>"
		text += schwartztext
	}

	// add text
	for (var i in pairs) {
		if (reverseExplanation) i = pairs.length - i - 1
		var a = model.candidates[pairs[i].winI]
		var b = model.candidates[pairs[i].loseI]
		
		if (i >= strongestElimination) {
			var begintext = "<del>"
			var endtext = "</del><br>"
		} else {
			var begintext = ""
			var endtext = "<br>"
		}


		if (! unanimousWin) {
			schwartztext = ""
			if (pairs[i].hasOwnProperty("schwartz")) {
				for (var j in model.candidatesById) { // go through the candidate names in order and display the ones that are in the schwartz set.
					if( pairs[i].schwartz.includes(j)) {
						schwartztext = schwartztext + _icon(j)	
					}
				}
				var extraspace = model.candidates.length - pairs[i].schwartz.length
				var spaces = Math.round(extraspace * 3.4 + 0)
				for (var j = 0; j < spaces; j++) {
					schwartztext = schwartztext + "&nbsp;"
				}
				schwartztext += "&larr;"
			} else {
				var spacelength = Math.round(model.candidates.length * 3.4 + 4)
				for (var j = 0; j < spacelength; j++) {
					schwartztext = schwartztext + "&nbsp;"
				}
			}
			begintext = schwartztext + begintext
		}

		if (pairs[i].tie) {
			if(reverseExplanation) {
				text += begintext + _icon(a.id)+"&"+_icon(b.id) + " tie" + endtext	
			} else {
				text += begintext + "Tie for " + _icon(a.id)+"&"+_icon(b.id) + endtext
				//text += _icon(b.id)+" ties  "+_icon(a.id) + endtext
			}
		} else {
			if(reverseExplanation) {
				text += begintext + _icon(b.id)+" lost to "+_icon(a.id)+" by " + _percentFormat(model, pairs[i].margin) + endtext
			} else {
				text += begintext + _icon(a.id)+" beats "+_icon(b.id)+" by " + _percentFormat(model, pairs[i].margin) + endtext	
			}
		}
		
	}

	// sort losses
	var sortedlosses = []
	for(var i = 0; i < model.candidates.length; i++) sortedlosses.push({name:model.candidates[i].id,losses:losses[model.candidates[i].id]})
	sortedlosses.sort(function(a,b) {return a.losses - b.losses})

	text += "<br>";
	if (topWinners.length >= 2) {
		text += "<b>Eliminate the weakest losses until someone in the Schwartz set has 0 losses.</b><br>"
		for(var i=0; i<sortedlosses.length; i++){
			var c = sortedlosses[i].name;
			text += _icon(c)+" got "+losses[c]+" strong losses<br>";
		}
		text += _tietext(topWinners);
		text = "<b>TIE</b> <br> <br>" + text;
	} else {
		topWinner = topWinners[0]
		if (unanimousWin) {
			
		} else {
			text += "<b>Eliminate the weakest wins until someone in the Schwartz set has 0 losses.<br>"
			for(var i=0; i<sortedlosses.length; i++){
				var c = sortedlosses[i].name;
				text += _icon(c)+" got "+losses[c]+" strong losses<br>";
			}
		}
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS <br> <br>" + text;	
	}
	
	// what's the loop?

	model.caption.innerHTML = text;

};

// PairElimination
Election.minimax = function(model, options){ // Pairs of candidates are sorted by their win margin.  Then we eliminate the weakest wins until there is a Condorcet winner.  A condorcet winner has 0 losses.

	var reverseExplanation = true

	var text = "";
	text += "<span class='small'>";
	if (reverseExplanation) {
		text += "<b>who lost the least, one-on-one?</b><br>";
	} else {
		text += "<b>who had the strongest wins, one-on-one?</b><br>";
	}

	var ballots = model.getBallots();

	// Create the WIN tally
	var tally = {};
	var losses = {};
	for(var candidateID in model.candidatesById) tally[candidateID] = 0;
	for(var candidateID in model.candidatesById) losses[candidateID] = 0;

	// For each combination... who's the better ranking?
	pairs = []
	for(var i=0; i<model.candidates.length-1; i++){
		var a = model.candidates[i];
		for(var j=i+1; j<model.candidates.length; j++){
			var b = model.candidates[j];

			// Actually figure out who won.
			var aWins = 0;
			var bWins = 0;
			for(var k=0; k<ballots.length; k++){
				var rank = ballots[k].rank;
				if(rank.indexOf(a.id)<rank.indexOf(b.id)){
					aWins++; // a wins!
				}else{
					bWins++; // b wins!
				}
			}

			// WINNER?
			var winner = (aWins>bWins) ? a : b;
			var loser = (aWins>bWins) ? b : a;
			if (aWins != bWins) {
				tally[winner.id]++;
				losses[loser.id]++;

				// Text.
				var by,to;
				if(winner==a){
					by = aWins;
					to = bWins;
					pairs.push({winI:i,loseI:j,winN:aWins,loseN:bWins,margin:aWins-bWins,tie:false})
				}else{
					by = bWins;
					to = aWins;
					pairs.push({winI:j,loseI:i,winN:bWins,loseN:aWins,margin:bWins-aWins,tie:false})
				}
				//text += _icon(a.id)+" vs "+_icon(b.id)+": "+_icon(winner.id)+" wins by "+by+" to "+to+"<br>";
			} else { //tie
				tally[a.id]++;
				tally[b.id]++;
				pairs.push({winI:i,loseI:j,winN:aWins,loseN:bWins,margin:aWins-bWins,tie:true})
				//text += _icon(a.id)+" vs "+_icon(b.id)+": "+"TIE"+"<br>";
			}
		}
	}

	// Was there one who won all????
	var topWinners = [];
	
	for(var id in tally){
		if(tally[id]==model.candidates.length-1){
			topWinners.push(id);
		}
	}
	var unanimousWin = topWinners.length == 1
	

	pairs = pairs.sort(function(x,y) {return y.margin - x.margin}) // sort in descending order
		

	// if there was a tie, then try to break the tie
	if (! unanimousWin) {
		var tieBreakerWinners = []
		for (var i = pairs.length - 1; i >= 0; i--) { // i represents the strongest pair to be eliminated
			
			if (! pairs[i].tie) {
				losses[model.candidates[pairs[i].loseI].id] -- // eliminate loss
			}
			
			if (i > 0 && pairs[i].margin == pairs[i-1].margin) { // check if there is a tie for weakest win
				continue
			}
			
			for(var id in tally){ // see who wins
				if(losses[id]==0){
					tieBreakerWinners.push(id);
				}
			}
			if (tieBreakerWinners.length > 0) break; // stop if someone won
		}
		topWinners = tieBreakerWinners
		var strongestElimination = i
	}




	var color = _colorWinner(model, topWinners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return
		
	if (unanimousWin) {
		text += _icon(topWinners[0])+" beats all other candidates in one-on-one races.<br>";
	}

	// add text
	for (var i in pairs) {
		if (reverseExplanation) i = pairs.length - i - 1
		var a = model.candidates[pairs[i].winI]
		var b = model.candidates[pairs[i].loseI]
		
		if (i >= strongestElimination) {
			var begintext = "<del>"
			var endtext = "</del> . weak<br>"
		} else {
			var begintext = ""
			var endtext = "<br>"
		}

		if (pairs[i].tie) {
			if(reverseExplanation) {
				text += begintext + _icon(a.id)+"&"+_icon(b.id) + " tie" + endtext	
			} else {
				text += begintext + "Tie for " + _icon(a.id)+"&"+_icon(b.id) + endtext
				//text += _icon(b.id)+" ties  "+_icon(a.id) + endtext
			}
		} else {
			if(reverseExplanation) {
				text += begintext + _icon(b.id)+" lost to "+_icon(a.id)+" by " + _percentFormat(model, pairs[i].margin) + endtext
			} else {
				text += begintext + _icon(a.id)+" beats "+_icon(b.id)+" by " + _percentFormat(model, pairs[i].margin) + endtext	
			}
		}
		
	}

	// sort losses
	var sortedlosses = []
	for(var i = 0; i < model.candidates.length; i++) sortedlosses.push({name:model.candidates[i].id,losses:losses[model.candidates[i].id]})
	sortedlosses.sort(function(a,b) {return a.losses - b.losses})

	text += "<br>";
	if (topWinners.length >= 2) {
		text += "<b>Eliminate the weakest losses until someone has 0 losses.</b><br>"
		for(var i=0; i<sortedlosses.length; i++){
			var c = sortedlosses[i].name;
			text += _icon(c)+" got "+losses[c]+" strong losses<br>";
		}
		text += _tietext(topWinners);
		text = "<b>TIE</b> <br> <br>" + text;
	} else {
		topWinner = topWinners[0]
		if (unanimousWin) {
			
		} else {
			text += "<b>Eliminate the weakest wins until someone has 0 losses.<br>"
			for(var i=0; i<sortedlosses.length; i++){
				var c = sortedlosses[i].name;
				text += _icon(c)+" got "+losses[c]+" strong losses<br>";
			}
		}
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS <br> <br>" + text;	
	}
	
	// what's the loop?

	model.caption.innerHTML = text;

};

// PairElimination
Election.rankedPairs = function(model, options){ // Pairs of candidates are sorted by their win margin.  Then we eliminate the weakest wins until there is a Condorcet winner.  A condorcet winner has 0 losses.

	var reverseExplanation = false

	var text = "";
	text += "<span class='small'>";
	if (reverseExplanation) {
		text += "<b>who lost the least, one-on-one?</b><br>";
	} else {
		text += "<b>who had the strongest wins, one-on-one?</b><br>";
	}

	var ballots = model.getBallots();

	// Create the WIN tally
	var tally = {};
	var losses = {};
	for(var candidateID in model.candidatesById) tally[candidateID] = 0;
	for(var candidateID in model.candidatesById) losses[candidateID] = 0;

	// For each combination... who's the better ranking?
	pairs = []
	for(var i=0; i<model.candidates.length-1; i++){
		var a = model.candidates[i];
		for(var j=i+1; j<model.candidates.length; j++){
			var b = model.candidates[j];

			// Actually figure out who won.
			var aWins = 0;
			var bWins = 0;
			for(var k=0; k<ballots.length; k++){
				var rank = ballots[k].rank;
				if(rank.indexOf(a.id)<rank.indexOf(b.id)){
					aWins++; // a wins!
				}else{
					bWins++; // b wins!
				}
			}

			// WINNER?
			var winner = (aWins>bWins) ? a : b;
			var loser = (aWins>bWins) ? b : a;
			if (aWins != bWins) {
				tally[winner.id]++;
				losses[loser.id]++;

				// Text.
				var by,to;
				if(winner==a){
					by = aWins;
					to = bWins;
					pairs.push({winI:i,loseI:j,winN:aWins,loseN:bWins,margin:aWins-bWins,tie:false})
				}else{
					by = bWins;
					to = aWins;
					pairs.push({winI:j,loseI:i,winN:bWins,loseN:aWins,margin:bWins-aWins,tie:false})
				}
				//text += _icon(a.id)+" vs "+_icon(b.id)+": "+_icon(winner.id)+" wins by "+by+" to "+to+"<br>";
			} else { //tie
				tally[a.id]++;
				tally[b.id]++;
				pairs.push({winI:i,loseI:j,winN:aWins,loseN:bWins,margin:aWins-bWins,tie:true})
				//text += _icon(a.id)+" vs "+_icon(b.id)+": "+"TIE"+"<br>";
			}
		}
	}

	// Was there one who won all????
	var topWinners = [];
	
	for(var id in tally){
		if(tally[id]==model.candidates.length-1){
			topWinners.push(id);
		}
	}
	var unanimousWin = topWinners.length == 1
	

	pairs = pairs.sort(function(x,y) {return y.margin - x.margin}) // sort in descending order
		

	// if there was a tie, then try to break the tie
	if (! unanimousWin) {
		var showdead = true // option: should we show the dead candidates?
		var tieBreakerWinners = []
		var hadawin = new Set()
		var dead = new Set()
		var surviving = new Set()
		var survivedq = function (w3) {
			if (! dead.has(w3)) { // this guy hasn't lost yet, so make sure he's in the survivor list
				surviving.add(w3)
			}
			return
		}
		for (var i = 0; i < pairs.length; i++) { // i represents the strongest pair to be eliminated
			var w3 = pairs[i].winI
			var l3 = pairs[i].loseI
			if (pairs[i].tie) {
				survivedq(w3)
				survivedq(l3)
			} else if (surviving.size == 1 && surviving.has(l3) && dead.has(w3)) { 
				// check if there is a conflict 
				// if we're about to remove our last survivor, don't do it
				pairs[i].conflict = true
			} else {
				dead.add(l3)
				surviving.delete(l3)
				survivedq(w3)
			}
			pairs[i].survivors = (Array.from(surviving)).map(x => model.candidates[x].id)
			if (showdead) pairs[i].dead = (Array.from(dead)).map(x => model.candidates[x].id)
		}
		topWinners = (Array.from(surviving)).map(x => model.candidates[x].id)
	}




	var color = _colorWinner(model, topWinners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)

	if (!options.sidebar) return
		
	if (unanimousWin) {
		text += _icon(topWinners[0])+" beats all other candidates in one-on-one races.<br>";
	}

	// add text

	if (! unanimousWin) {
		text += "(also, cross out the conflicts)<br>";
		text += "(left list: had a win & no loss)<br>"
		var keepShowingSurvivors = true
	}
	for (var i in pairs) {
		if (reverseExplanation) i = pairs.length - i - 1
		var a = model.candidates[pairs[i].winI]
		var b = model.candidates[pairs[i].loseI]
		
		if (pairs[i].conflict) {
			var begintext = "<del>"
			var endtext = "</del><br>" // "conflict"
		} else {
			var begintext = ""
			var endtext = "<br>"
		}
		if (! unanimousWin) { // this is the block that shows the survivors
			survivorstext = ""
			if (keepShowingSurvivors) {
				for (var ic in pairs[i].survivors) {
					var c = pairs[i].survivors[ic]
					survivorstext = survivorstext + _icon(c)
				}
				if (showdead) {
					survivorstext = survivorstext + ">"
					var deadtext = ""
					for (var ic in pairs[i].dead) {
						var c = pairs[i].dead[ic]
						deadtext = _icon(c) + deadtext
					}
					survivorstext = survivorstext + deadtext
					var extraspace = model.candidates.length - pairs[i].survivors.length - pairs[i].dead.length
					survivorstext = survivorstext + "&nbsp;&nbsp;&nbsp;"
				} else {
					var extraspace = model.candidates.length - pairs[i].survivors.length
				}
				if (pairs[i].survivors.length == 1 && pairs[i].dead.length + 1 == model.candidates.length) keepShowingSurvivors = false
				
				var spaces = Math.round(extraspace * 3.4 + 0)
				for (var j = 0; j < spaces; j++) {
					survivorstext = survivorstext + "&nbsp;"
				}
			} else {
				var spacelength = Math.round(model.candidates.length * 3.4 + 6)
				for (var j = 0; j < spacelength; j++) {
					survivorstext = survivorstext + "&nbsp;"
				}
			}
			begintext = survivorstext + begintext
		}
		
		if (pairs[i].tie) {
			if(reverseExplanation) {
				text += begintext + _icon(a.id)+"&"+_icon(b.id) + " tie" + endtext	
			} else {
				text += begintext + "Tie for " + _icon(a.id)+"&"+_icon(b.id) + endtext
				//text += _icon(b.id)+" ties  "+_icon(a.id) + endtext
			}
		} else {
			if(reverseExplanation) {
				text += begintext + _icon(b.id)+" lost to "+_icon(a.id)+" by " + _percentFormat(model, pairs[i].margin) + endtext
			} else {
				text += begintext + _icon(a.id)+" beats "+_icon(b.id)+" by " + _percentFormat(model, pairs[i].margin) + endtext	
			}
		}
		
	}

	text += "<br>";
	if (topWinners.length >= 2) {
		text += _tietext(topWinners);
		text = "<b>TIE</b> <br> <br>" + text;
	} else {
		topWinner = topWinners[0]
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS <br> <br>" + text;	
	}
	
	// what's the loop?

	model.caption.innerHTML = text;

};

Election.rbvote = function(model, options){ // Use the RBVote from Rob Legrand

	var reverseExplanation = false

	var text = "<span>";

	var ballots = model.getBallots();

	rbvote.setreturnstring() // tell rbvote that we might want return strings (unless we're not doing the sidebar)
	rbvote.readballots(ballots)
	result = model.rbelection(options.sidebar) // e.g. result = rbvote.calctide() // having a sidebar display means we want to construct explanation strings
	


	topWinners = [result.winner]


	var color = _colorWinner(model, topWinners);

	if (!options.sidebar) return
	
	// replace some of the html in the output of rbvote to make it match the style of betterballot
	var rbvote_string = (result.str).replace("style.css","../play/css/rbvote.css").replace()
	var intext = Object.keys(model.candidatesById)
	var outtext = Object.keys(model.candidatesById).map(x => _icon(x))
	for (var i in intext) {
		rbvote_string = rbvote_string.replace(new RegExp(intext[i],"g"),outtext[i])
	}
	rbvote_string = rbvote_string.replace('<th rowspan="5">for</th>',)

	text += rbvote_string
	topWinner = topWinners[0]
	text += "</span>";
	text += "<br>";
	text += "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS";
	text = "<b style='color:"+color+"'>"+topWinner.toUpperCase()+"</b> WINS <br> <br>" + text;	

	model.caption.innerHTML = text;

};

Election.rrv = function(model, options){

	var numreps = 3
	var maxscore = 5
	var invmaxscore = 1/maxscore
	var ballots = model.getBallots();
	var ballotweight = []
	var ballotsum = []
	for(var i=0; i<ballots.length; i++){
		ballotweight[i] = 1
		ballotsum[i] = 0
	}
	var resolved = false
	var tallies = []
	var winnerslist = []
	
	var candidates = [];
	for(var i=0; i<model.candidates.length; i++){
		candidates.push(model.candidates[i].id);
	}
	
	for(var j=0; j<numreps;j++) {
		// Tally the approvals & get winner!
		var tally = _tally_i(model, function(tally, ballot, i){
			for(var j=0; j<candidates.length; j++){
				var candidate = candidates[j];
				tally[candidate] += ballot[candidate] * ballotweight[i]
			}
		})
		tallies.push(tally)
		
		var winners = _countWinner(tally);
		var winner = winners[0] // really we should have a tree of scenarios form here because a whole different group can be chosen from a tiebreaker TODO
		winnerslist.push(winner)
		

		//reweight
		for(var i=0; i<ballots.length; i++){
			var ballot = ballots[i]
			var votetotal = tally[winner]
			ballotsum[i] += ballot[winner] 
			ballotweight[i] = 1/(1+ballotsum[i]*invmaxscore)
		}
		
		// remove winner from candidates
		candidates.splice(candidates.indexOf(winner),1)
	}

	if (options.sidebar) {

		// Caption
		var text = "";
		for(j=0; j<winnerslist.length;j++){
			text += "<span class='small'>";
			var tally = tallies[j]
			var winner = winnerslist[j];
			if (j>0) text += "<br><b>After votes go to winner,</b>"
			text += "<br><b>score as %:</b><br>";
			for(var i=0; i<model.candidates.length; i++){
				var c = model.candidates[i].id;
				//text += _icon(c)+"'s score: "+((tally[c]/model.getTotalVoters()).toFixed(2))+" out of 5.00<br>";
				text += _icon(c)+": "+_percentFormat(model, tally[c] / 5)
				if (winner == c) text += " &larr;"//" <--"
				text += "<br>";
			}
			var color = _colorWinner(model, [winner]);
			text += "";
			//text += _icon(winner)+" has the highest score, so...";
			text += "</span>";
			text += "";
			text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br>";
			text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br>" + text;
		}

		model.caption.innerHTML = text;
	}
	var color = _colorWinner(model, winnerslist.concat().sort());
	
	// if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)  
	if (model.dotop2) model.top2 = winnerslist.slice(0,2)  /// TODO: see if this actually works 
};

Election.borda = function(model, options){

	// Tally the approvals & get winner!
	var numcan = model.candidates.length
	var tally = _tally(model, function(tally, ballot){
		for(var i=0; i<numcan; i++){
			var candidate = ballot.rank[i];
			tally[candidate] += numcan - i - 1; // reverse the rank and subtract 1 because nobody's going to rank their least favorite.
		}
	});
	var winners = _countWinner(tally);
	var color = _colorWinner(model, winners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return

	// Caption
	var text = "";
	text += "<span class='small'>";
	text += "<b>higher score is better</b><br>";
	for(var i=0; i<model.candidates.length; i++){
		var c = model.candidates[i].id;
		text += _icon(c)+"'s total score: "+tally[c]+" = "+_percentFormat(model, tally[c] / (numcan-1))+"%<br>";
	}
	if(winners.length>=2){
		// NO WINNER?! OR TIE?!?!
		text += _tietext(winners);
		text = "<b>TIE</b> <br> <br>" + text;
	}else{
		var winner = winners[0];
		text += "<br>";
		text += _icon(winner)+" has the <i>highest</i> score, so...<br>";
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
	}
	model.caption.innerHTML = text;
};

Election.irv = function(model, options){

	var dopoll = "Auto" == model.autoPoll
	if (options.dontpoll) dopoll = false
	if (dopoll) polltext = doPollAndUpdateBallots(model,options,"irv")


	var text = "";
	if (options.sidebar) text += "<span class='small'>";

	if (dopoll) text += polltext;
	var resolved = null;
	var roundNum = 1;

	var candidates = [];
	for(var i=0; i<model.candidates.length; i++){
		candidates.push(model.candidates[i].id);
	}
	var loserslist = []
	while(!resolved){

		if (options.sidebar) text += "<b>round "+roundNum+":</b><br>";
		if (options.sidebar) text += "who's voters' #1 choice?<br>";

		// Tally the approvals & get winner!
		var pre_tally = _tally(model, function(tally, ballot){
			var first = ballot.rank[0]; // just count #1
			tally[first]++;
		});

		// ONLY tally the remaining candidates...
		var tally = {};
		for(var i=0; i<candidates.length; i++){
			var cID = candidates[i];
			tally[cID] = pre_tally[cID];
		}

		// Say 'em...
		if (options.sidebar) {
			for(var i=0; i<candidates.length; i++){
				var c = candidates[i];
				text += _icon(c)+":"+_percentFormat(model, tally[c])
				if(i<candidates.length-1) text+=", ";
			}
			text += "<br>";
		}

		// Do they have more than 50%?
		var winners = _countWinner(tally);
		var winner = winners[0];
		var ratio = tally[winner]/model.getTotalVoters();
		if(ratio>0.5){
			if (winners.length >= 2) {	// won't happen bc ratio > .5	
				resolved = "tie"; 
				break;
			}
			resolved = "done";
			if (options.sidebar) text += _icon(winner)+" has more than 50%<br>";
			break;
		}

		// Otherwise... runoff...
		var losers = _countLoser(tally);
		var loser = losers[0];
		if (losers.length >= candidates.length) {
			resolved = "tie"; 
			break;
		}
		loserslist = loserslist.concat(losers)

		// ACTUALLY ELIMINATE
		
		//text += "nobody's more than 50%. ";
		for (var li = 0; li < losers.length ; li++ ) {
			loser = losers[li];
			if (options.sidebar) text += "eliminate loser, "+_icon(loser)+".<br>";
			candidates.splice(candidates.indexOf(loser), 1); // remove from candidates...
			var ballots = model.getBallots();
			for(var i=0; i<ballots.length; i++){
				var rank = ballots[i].rank;
				rank.splice(rank.indexOf(loser), 1); // REMOVE THE LOSER
			}
			// And repeat!
			roundNum++;
		}
		if (options.sidebar) text += "<br>"
	
	}
	if (model.dotop2) {
		loserslist = loserslist.concat(_sortTallyRev(tally))
		var ll = loserslist.length
		model.top2 = loserslist.slice(ll-1,ll).concat(loserslist.slice(ll-2,ll-1))
	}
	
	
	var color = _colorWinner(model, winners);

	if (!options.sidebar) return

	if (resolved == "tie") {
		text += _tietext(winners);
		text = "<b>TIE</b> <br> <br>" + text;
	} else {
		// END!
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;	
	}

	model.caption.innerHTML = text;

};

Election.stv = function(model, options){

	var numreps = 3
	var quota = 1/(numreps+1)
	var quotapercent = Math.round(quota * 100)
	var text = "";
	text += "<span class='small'>";
	text += "Find " + numreps + " winners.<br>"
	text += "Set quota at 1/(1+" + numreps + ") = " + quotapercent + "%.<br><br>"
	var resolved = null;
	var roundNum = 1;

	var candidates = [];
	for(var i=0; i<model.candidates.length; i++){
		candidates.push(model.candidates[i].id);
	}
	var loserslist = []
	var winnerslist = []
	var ballots = model.getBallots();	
	var ballotweight = []
	for(var i=0; i<ballots.length; i++){
		ballotweight[i] = 1
	}
	while(!resolved){

		text += "<b>round "+roundNum+":</b><br>";
		text += "who's voters' #1 choice?<br>";

		// Tally the approvals & get winner!
		var pre_tally = _tally_i(model, function(tally, ballot, i){
			var first = ballot.rank[0]; // just count #1
			tally[first] += ballotweight[i];
		});

		// ONLY tally the remaining candidates...
		var tally = {};
		for(var i=0; i<candidates.length; i++){
			var cID = candidates[i];
			tally[cID] = pre_tally[cID];
		}

		// Say 'em...
		for(var i=0; i<candidates.length; i++){
			var c = candidates[i];
			text += _icon(c)+":"+Math.round(tally[c]);
			if(i<candidates.length-1) text+=", ";
		}
		text += "<br>";

		// Do they have more than 50%?
		var winners = _countWinner(tally);
		var winner = winners[0];  // there needs to be a better tiebreaker here. TODO
		var ratio = tally[winner]/model.getTotalVoters();
		if(ratio>quota){
			// if (winners.length >= 2) {	// won't happen bc ratio > .5	
			// 	resolved = "tie"; 
			// 	break;
			// }
			reweight = 1-quota/ratio
			text += _icon(winner)+" has more than " + quotapercent + "%<br>";
			winnerslist.push(winner)
			
			text += "select winner, "+_icon(winner)+".<br><br>";
			
			candidates.splice(candidates.indexOf(winner), 1); // remove from candidates...
			var ballots = model.getBallots();
			for(var i=0; i<ballots.length; i++){
				var rank = ballots[i].rank;
				if (0 == rank.indexOf(winner)) {
					ballotweight[i] *= reweight
				}
				rank.splice(rank.indexOf(winner), 1); // REMOVE THE winner
			}
			// And repeat!
			roundNum++;
			if (winnerslist.length == numreps) {
				resolved = "done"
				break
			}
			continue
		}

		// Otherwise... runoff...
		var losers = _countLoser(tally);
		var loser = losers[0];
		if (losers.length >= candidates.length) {
			resolved = "tie"; 
			winnerslist = winnerslist.concat(losers)
			var tiedlosers = losers
			break;
		}
		loserslist = loserslist.concat(losers)

		// ACTUALLY ELIMINATE
		
		//text += "nobody's more than 50%. ";
		for (var li = 0; li < losers.length ; li++ ) {
			loser = losers[li];
			text += "eliminate loser, "+_icon(loser)+".<br>";
			candidates.splice(candidates.indexOf(loser), 1); // remove from candidates...
			var ballots = model.getBallots();
			for(var i=0; i<ballots.length; i++){
				var rank = ballots[i].rank;
				rank.splice(rank.indexOf(loser), 1); // REMOVE THE LOSER
			}
			// And repeat!
			roundNum++;
		}
		text += "<br>"
	
	}
	winners = winnerslist.sort() 

	if (model.dotop2) { /// TODO: see if this actually works
		loserslist = loserslist.concat(_sortTallyRev(tally))
		var ll = loserslist.length
		model.top2 = loserslist.slice(ll-1,ll).concat(loserslist.slice(ll-2,ll-1))
	}
	
	
	var color = _colorWinner(model, winners);

	if (!options.sidebar) return

	if (resolved == "tie") {
		text += _tietext(tiedlosers);
		text = "<b>TIE</b> <br> <br>" + text;
	} 
	text = "<br>" + text
	for (var i in winners) {
		var winner = winners[i]
		var color = _colorWinner(model, [winner]);
		// END!
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br>" + text;	
	}

	model.caption.innerHTML = text;

	// we messed around with the rankings, so lets put them back
	for(var j=0; j<model.voters.length; j++){
		model.voters[j].update();
	}
};

Election.toptwo = function(model, options){ // not to be confused with finding the top2 in a poll, which I already made as a variable

	options = options || {};

	if ("Auto" == model.autoPoll) polltext = doPollAndUpdateBallots(model,options,"plurality")

	// Tally the approvals & get winner!
	var tally1 = _tally(model, function(tally, ballot){
		tally[ballot.vote]++;
	});
	var sortedtally = _sortTally(tally1)
	var toptwo = sortedtally.slice(0,2)
	
	// ties.  Who matched the scores of the top two? (I'm not sure of the official way to break ties.)
	var winningscores = toptwo.map(x => tally1[x])
	toptwo = sortedtally.filter(x => winningscores.includes(tally1[x]))
	

	// only do 2 candidates
	var oldcandidates = model.candidates
	model.candidates = model.candidates.filter( x => toptwo.includes(x.id)) 
	for(var j=0; j<model.voters.length; j++){
		model.voters[j].update();
	}
	var tally = _tally(model, function(tally, ballot){
		tally[ballot.vote]++;
	});
	model.candidates = oldcandidates

	var winners = _countWinner(tally);
	var color = _colorWinner(model, winners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return

	// Caption
	var winner = winners[0];
	var text = "";
	text += "<span class='small'>";
	if ("Auto" == model.autoPoll) text += polltext;
	text += "<b>top two move to 2nd round</b><br>";
	for(var i=0; i<model.candidates.length; i++){
		var c = model.candidates[i].id;
		text += _icon(c)+" got "+_percentFormat(model, tally1[c])+"<br>";
	}
	text += "<br><b>2nd round</b><br>";
	for(var i=0; i<model.candidates.length; i++){
		var c = model.candidates[i].id;
		if (toptwo.includes(c)) text += _icon(c)+" got "+_percentFormat(model, tally[c])+"<br>";
	}
	// Caption text for winner, or tie
	if (winners.length == 1) {
		if(options.sidebar){
			text += "<br>";
			text += _icon(winner)+" has most votes, so...<br>";
		}
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
	} else {
		text += _tietext(winners);
		text = "<b>TIE</b> <br> <br>" + text;
	}
	model.caption.innerHTML = text;
};

Election.pluralityWithPrimary = function(model, options){
	options = options || {};

	// Tally the approvals & get winner!
	var ptallies = _tally_primary(model, function(tally, ballot){
		tally[ballot.vote]++;
	});
	// if ("we gotta problem" == ptallies) {
	// 	model.colors = ["#aaa"]
	// 	return
	// }

	pwinners = []
	for (var i in ptallies) {
		var tally = ptallies[i]
		pwinners = pwinners.concat(_countWinner(tally))
	}

	// only do 2 candidates
	var oldcandidates = model.candidates
	model.candidates = model.candidates.filter( x => pwinners.includes(x.id)) 
	for(var j=0; j<model.voters.length; j++){
		model.voters[j].update();
	}
	var tally = _tally(model, function(tally, ballot){
		tally[ballot.vote]++;
	});
	model.candidates = oldcandidates

	var winners = _countWinner(tally);
	var color = _colorWinner(model, winners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return

	// Caption
	var winner = winners[0];
	var text = "";
	text += "<span class='small'>";
	for (var i in ptallies) {
		var tally1 = ptallies[i]
		var ip1 = i*1+1
		text += "<b>primary for group " + ip1 + ":</b><br>";
		var pwin = _countWinner(tally1)
		for(var i=0; i<model.candidates.length; i++){
			var c = model.candidates[i].id;
			text += _icon(c)+" got "+_percentFormat(model, tally1[c]);
			if (pwin.includes(c)) text += " &larr;"
			text += "<br>"
		}
		text += "<br>"
	}
	text += "<b>general election:</b><br>";
	for(var i=0; i<model.candidates.length; i++){
		var c = model.candidates[i].id;
		if (pwinners.includes(c)) text += _icon(c)+" got "+_percentFormat(model, tally[c])+"<br>";
	}
	// Caption text for winner, or tie
	if (winners.length == 1) {
		if(options.sidebar){
			text += "<br>";
			text += _icon(winner)+" has most votes, so...<br>";
		}
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
	} else {
		text += _tietext(winners);
		text = "<b>TIE</b> <br> <br>" + text;
	}
	model.caption.innerHTML = text;

}


Election.plurality = function(model, options){

	// if (model.primaries == "Yes"){
	// 	Election.pluralityWithPrimary(model, options)
	// 	return
	// }
	options = options || {};

	
	if ("Auto" == model.autoPoll) polltext = doPollAndUpdateBallots(model,options,"plurality")

	// Tally the approvals & get winner!
	var tally = _tally(model, function(tally, ballot){
		tally[ballot.vote]++;
	});
	var winners = _countWinner(tally);
	var color = _colorWinner(model, winners);
	if (model.dotop2) model.top2 = _sortTally(tally).slice(0,2)
	if (!options.sidebar) return

	// Caption
	var winner = winners[0];
	var text = "";
	text += "<span class='small'>";
	if ("Auto" == model.autoPoll) text += polltext;
	text += "<b>most votes wins</b><br>";
	for(var i=0; i<model.candidates.length; i++){
		var c = model.candidates[i].id;
		text += _icon(c)+" got "+_percentFormat(model, tally[c])+"<br>";
	}
	// Caption text for winner, or tie
	if (winners.length == 1) {
		if(options.sidebar){
			text += "<br>";
			text += _icon(winner)+" has most votes, so...<br>";
		}
		text += "</span>";
		text += "<br>";
		text += "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS";
		text = "<b style='color:"+color+"'>"+winner.toUpperCase()+"</b> WINS <br> <br>" + text;
	} else {
		text += _tietext(winners);
		text = "<b>TIE</b> <br> <br>" + text;
	}
	model.caption.innerHTML = text;
};

var doPollAndUpdateBallots = function(model,options,electiontype){

	// check to see if there is a need for checking frontrunners

	var not_f = ["zero strategy. judge on an absolute scale.","normalize"]
	var skipthis =  true
	for(var i=0;i<model.voters.length;i++){
		if (! not_f.includes(model.voters[i].unstrategic)) skipthis = false
		if (! not_f.includes(model.voters[i].strategy)) skipthis = false
	}   //not_f.includes(config.unstrategic) && not_f.includes(config.strategic)
	if (skipthis) return ""

	// just sets the frontrunners and reruns the ballots, then sets the frontrunners back to normal, but keeps the altered ballots.

	polltext = ""
	var oldkeep = model.preFrontrunnerIds // only a temporary change
	model.preFrontrunnerIds = []
	model.pollResults = undefined
	if (options.sidebar) {
		if (electiontype=="irv") {
			polltext += "A low-risk strategy in IRV is to look at who wins and make a compromise if you're not winning.  Voters look down their ballot and pick the first one that defeats the current winner head to head. <br> <br>"
			polltext += "<b>Polling first preferences: </b></br>"
			// this strategy could be further refined by voting for people who will be eliminated but who we like better
		} else {
			polltext += "<b>polling for viable candidates: </b><br>";
			//polltext += "<b>(score > " + (100*threshold/model.getTotalVoters()).toFixed(0) + " = half max)</b><br>"
		}
	}
	for (var k=0;k<5;k++) { // do the polling many times
			
		// get the ballots (hold the poll)
		for(var i=0; i<model.voters.length; i++){
			var voter = model.voters[i];
			voter.update();
		}

		// count the votes in the poll

		if (electiontype == "score") {
			// Tally
			var tally = _tally(model, function(tally, ballot){
				for(var candidate in ballot){
					tally[candidate] += ballot[candidate];
				}
			});
		} else if (electiontype=="approval"){ 
			// Tally the approvals & get winner!
			var tally = _tally(model, function(tally, ballot){
				var approved = ballot.approved;
				for(var i=0; i<approved.length; i++) tally[approved[i]]++;
			});
		} else if (electiontype=="plurality"){
			var tally = _tally(model, function(tally, ballot){
				tally[ballot.vote]++;
			});
		} else if (electiontype=="irv"){

			// for the report, get the first preferences
			var pre_tally = _tally(model, function(tally, ballot){
				var first = ballot.rank[0]; // just count #1
				tally[first]++;
			});

			var options2 = {dontpoll:true, sidebar:true}
			Election.irv(model,options2) // do an IRV election to find out who wins
			
			/// Get really good polling results.
			temp1 = model.pollResults // doing a poll without strategy.  not sure if this would work
			model.pollResults = undefined
			for(var i=0; i<model.voters.length; i++){
				var voter = model.voters[i];
				voter.update();
			}
			var ballots = model.getBallots() // kinda double effort here but okay
			head2head = {}
			// For each combination... who's the better ranking?
			for(var i=0; i<model.candidates.length; i++){
				var a = model.candidates[i];
				head2head[a.id] = {}
				for(var j=0; j<model.candidates.length; j++){
					var b = model.candidates[j];
					// How many votes did A get?
					var aWins = 0;
					for(var m=0; m<ballots.length; m++){
						var rank = ballots[m].rank;
						if(rank.indexOf(a.id)<rank.indexOf(b.id)){
							aWins++; // a wins!
						}
					}
					head2head[a.id][b.id] = aWins
				}
			}
			model.pollResults = temp1

			tally = {head2head:head2head, firstpicks:pre_tally}
		}
		
		model.pollResults = tally

		// decide who the frontrunners are
		if (0) { // 0 - let the voters have individual thresholds
			var factor = .5
			var max1 = 0
			for (var can in tally) {
				if (tally[can] > max1) max1 = tally[can]
			}
			var threshold = max1 * factor
			var viable = []
			for (var can in tally) {
				if (tally[can] > threshold) viable.push(can)
			}

			model.preFrontrunnerIds = viable
		}

		if(options.sidebar) {
			
			for(var i=0; i<model.candidates.length; i++){
				var c = model.candidates[i].id;
				if (electiontype == "irv"){
					polltext += _icon(c)+""+_padAfter(3,_percentFormat(model, tally.firstpicks[c]) + ". ") + " "
				} else {
					polltext += _icon(c)+""+ _padAfter(3,_percentFormat(model, tally[c]/model.voters[0].type.maxscore) + ".") + " "
					//if (tally[c] > threshold) polltext += " &larr;"//" <--"
					//polltext += "<br>"
				}
			}
			polltext += "<br>"
		}
		// end of one poll
	}		
	if (electiontype == "irv") polltext += "<br>"
	// get the ballots
	for(var i=0; i<model.voters.length; i++){
		var voter = model.voters[i];
		voter.update();
	}
	if (options.sidebar){
		model.draw()
	}
	if (1) {
		model.preFrontrunnerIds = oldkeep // something interesting happens when you turn this off.
	}

	return polltext
}


var _tally = function(model, tallyFunc){

	// Create the tally
	var tally = {};
	for(var candidateID in model.candidatesById) tally[candidateID] = 0;

	// Count 'em up
	var ballots = model.getBallots();
	for(var i=0; i<ballots.length; i++){
		tallyFunc(tally, ballots[i]);
	}

	// Return it.
	return tally;

}


var _tally_primary = function(model, tallyFunc){

	var primaries_tallies = []
	var oldcandidates = model.candidates // temporary change
	caninprimary = []
	for ( var j = 0; j < model.voters.length; j++){
		caninprimary.push([])
	}
	
	for (var c in model.candidates){
		var can = model.candidates[c]
		var maxdist2 = Infinity
		var votebelong = 0
		for ( var j = 0; j < model.voters.length; j++){
			var dx = model.voters[j].x - can.x
			var dy = model.voters[j].y - can.y
			var dist2 = dx*dx + dy*dy
			if (dist2 < maxdist2) {
				votebelong = j
				maxdist2 = dist2
			}
		}
		caninprimary[votebelong].push(model.candidates[c])
	}

	// make sure there are candidates in each primary
	// problem = false
	// for ( var j in caninprimary){
	// 	if (caninprimary[j].length == 0) problem = true
	// }
	// if (problem) return "we gotta problem"

	for ( var j = 0; j < model.voters.length; j++){
		
		// Create the tally
		var tally = {};
		for(var candidateID in model.candidatesById) tally[candidateID] = 0;

		// Count 'em up
		model.candidates = caninprimary[j]	
		if (model.candidates.length == 0) model.candidates = oldcandidates // workaround
		model.voters[j].update()
		var ballots = model.voters[j].ballots
		for(var i=0; i<ballots.length; i++){
			tallyFunc(tally, ballots[i]);
		}
		primaries_tallies.push(tally)
	}
	model.candidates = oldcandidates // reset
	// Return it.
	model.draw()
	return primaries_tallies;

}


var _tally_i = function(model, tallyFunc){

	// Create the tally
	var tally = {};
	for(var candidateID in model.candidatesById) tally[candidateID] = 0;

	// Count 'em up
	var ballots = model.getBallots();
	for(var i=0; i<ballots.length; i++){
		tallyFunc(tally, ballots[i], i);
	}

	// Return it.
	return tally;

}

var _tallies = function(model, levels){

	// Create the tally
	var tallies = [];
	for (var level=0; level<levels; level++) {
		var tally = {};
		for(var candidateID in model.candidatesById) tally[candidateID] = 0;
		tallies.push(tally)
	}

	// Count 'em up
	var ballots = model.getBallots();
	for(var i=0; i<ballots.length; i++){
		var ballot = ballots[i]
		for(var candidate in ballot){
			tallies[ballot[candidate]][candidate] += 1;
		}
	}

	// Return it.
	return tallies;

}

var _countWinner = function(tally){

	// TO DO: TIES as an array?!?! // attempted

	var highScore = -1;
	var winners = [];

	for(var candidate in tally){
		var score = tally[candidate];
		if(score>highScore) {
			winners = [];
		}
		if(score>=highScore){
			highScore = score;
			winners.push(candidate);
		}
	}

	return winners;

}

var _sortTally = function(tally){
	
	var frontrunners = [];

	for (var i in tally) {
	   frontrunners.push(i);
	}
	frontrunners.sort(function(a,b){return tally[b]-tally[a]})
	
	return frontrunners
}

var _sortTallyRev = function(tally){
	
	var frontrunners = [];

	for (var i in tally) {
	   frontrunners.push(i);
	}
	frontrunners.sort(function(a,b){return -tally[b]+tally[a]})
	
	return frontrunners
}

var _countLoser = function(tally){

	// TO DO: TIES as an array?!?!

	var lowScore = Infinity;
	var winner = null;

	for(var candidate in tally){
		var score = tally[candidate];
		if(score<lowScore) {
			winners = [];
		}
		if(score<=lowScore){
			lowScore = score;
			winners.push(candidate);
		}
	}
	return winners;
}

var _colorWinner = function(model, winners){
	if (winners.length > 1) {
		var color = "#ccc"; // grey
		var colors = []
		for (i in winners) {
			var c1 = (winners[i]) ? Candidate.graphics[winners[i]].fill : "";
			colors.push(c1)
		}
		model.colors = colors;
	} else {
		var color = (winners[0]) ? Candidate.graphics[winners[0]].fill : "";
	}
	model.canvas.style.borderColor = color;
	if (model.yeeon) model.canvas.style.borderColor = "#fff"
	model.winners = winners;
	model.color = color;
	return color;
}

function _tietext(winners) {
	text = "";
	for ( var i=0; i < winners.length; i++) {
		if(i) {
			text += " and ";
		} 
		text += _icon(winners[i]); 
	}
	text += " tie<br>";
	text += "</span>";
	text += "<br>";	
	text += "<b>TIE</b>";
	return text;
}

function _percentFormat(model,count) {
	var a = "" + (100*count/(model.getTotalVoters())).toFixed(0)
	var dopadding = false
	if (dopadding) {
		for (var i = a.length; i < 2; i ++) {
			a = "&nbsp;&nbsp;" + a
		}	
	}
	return a
}

function _padBefore(padding,a){
	for (var i = a.length; i < padding; i ++) {
		a = "&nbsp;&nbsp;" + a
	}	
	return a
}
function _padAfter(padding,a){
	for (var i = a.length; i < padding; i ++) {
		a = a + "&nbsp;&nbsp;"
	}	
	return a
}