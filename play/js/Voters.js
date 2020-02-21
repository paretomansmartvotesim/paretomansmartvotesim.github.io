
/////////////////////////////////////
///////// TYPES OF VOTER ////////////
/////////////////////////////////////

// sanity rules: class creation code cannot read attributes from model.

function ScoreVoter(model){

	var self = this;
	GeneralVoter.call(self,model)

	self.maxscore = 5;
	self.minscore = 0;
	self.defaultMax = model.HACK_BIG_RANGE ? 61 * 4 : 25 * 4; // step: x<25, 25<x<50, 50<x<75, 75<x<100, 100<x
	if (model.doOriginal) {
		self.filledCircles = false
	} else {
		self.filledCircles = true // display scores with filled transparent circles rather than unfilled circles.
	}
	

	self.getBallot = function(x, y, strategy, iDistrict){

		doStar =  (model.election == Election.star  &&  strategy != "zero strategy. judge on an absolute scale.") || model.doStarStrategy
		if (model.autoPoll == "Auto" && model.pollResults) {
			tally = model.pollResults

			var factor = self.poll_threshold_factor
			var max1 = 0
			for (var can in tally) {
				if (tally[can] > max1) max1 = tally[can]
			}
			var threshold = max1 * factor
			var viable = []
			for (var can in tally) {
				if (tally[can] > threshold) viable.push(can)
			}
		} else {
			viable = model.district[iDistrict].preFrontrunnerIds
		}
		var cans = model.district[iDistrict].candidates
		var scoresfirstlast = dostrategy(model,x,y,self.minscore,self.maxscore,strategy,viable,cans,self.defaultMax,doStar,model.utility_shape)
		
		self.radiusFirst = scoresfirstlast.radiusFirst
		self.radiusLast = scoresfirstlast.radiusLast
		self.dottedCircle = scoresfirstlast.dottedCircle
		var scores = scoresfirstlast.scores
		return scores
		
	};

	self.drawBG = function(ctx, x, y, ballot){

		// RETINA
		x = x*2;
		y = y*2;
		var scorange = self.maxscore - self.minscore
		var step = (self.radiusLast - self.radiusFirst)/scorange;

		// Draw big ol' circles.
		var f = utility_function(model.utility_shape)
		var finv = inverse_utility_function(model.utility_shape)
		for(var i=0;i<scorange;i++){
			//var dist = step*(i+.5) + self.radiusFirst

			var frac = (1-(i+.5)/scorange)
			var worst = f(1)
			var best = f(self.radiusFirst/self.radiusLast)
			var x1 = finv(frac*(worst-best)+best)
			var dist = x1 * self.radiusLast
			
			ctx.lineWidth = (i+5-scorange)*2 + 2;
			ctx.beginPath();
			ctx.arc(x, y, dist*2, 0, Math.TAU, false);
			if (self.filledCircles) {
				ctx.fillStyle = '#000'
				ctx.strokeStyle = "#000";
			} else {
				ctx.strokeStyle = "#888"
			}
			ctx.setLineDash([]);
			if (self.dottedCircle) ctx.setLineDash([5, 15]);
			if (self.filledCircles) {
				var temp = ctx.globalAlpha
				ctx.globalAlpha = .01
				// ctx.stroke();
				// ctx.globalAlpha = .1
				ctx.globalAlpha = .2 / self.maxscore
				ctx.fill()
				ctx.globalAlpha = temp
			} else {
				ctx.stroke()
			}
			if (self.dottedCircle) ctx.setLineDash([]);
		}
	}

	self.drawCircle = function(ctx, x, y, size, ballot){

		// There are #Candidates*5 slices
		// Fill 'em in in order -- and the rest is gray.
		var totalSlices = model.candidates.length*(self.maxscore-self.minscore);
		var leftover = totalSlices;
		var slices = [];
		totalScore = 0;
		for(var i=0; i<model.candidates.length; i++){
			var c = model.candidates[i];
			var cID = c.id;
			if (ballot[cID] == undefined) continue
			var score = ballot[cID] - self.minscore;
			leftover -= score;
			slices.push({
				num: score,
				fill: c.fill
			});
			totalScore += score
		}
		totalSlices = totalScore
		// Leftover is gray
		// slices.push({
		// 	num: leftover,
		// 	fill: "#bbb"
		// });
		// FILL 'EM IN

		if(totalScore==0){
			_drawBlank(model, ctx, x, y, size);
			return;
		}

		_drawSlices(model, ctx, x, y, size, slices, totalSlices);

	};

	self.textBallot = function(ballot){

		var text = ""
		var scoreByCandidate = []
		for(var i = 0; i < model.candidates.length; i++) {
			scoreByCandidate[i] = ballot[model.candidates[i].id]
		}

		var rTitle = `
		<em>Give EACH candidate a score<br>
		<span class="small">from 0 (hate 'em) to 5 (love 'em)</span></em>
		`
		text += htmlBallot(model,rTitle,scoreByCandidate)
		return text
	}
	self.textTally = function(ballot){
		var system = model.system
		
		// todo: star preferences
		var text = ""

		if (self.say) text += "<span class='small' style> Vote: </span> <br />" 
		cIDs = Object.keys(ballot).sort(function(a,b){return -(ballot[a]-ballot[b])}) // sort descending

		if (0){
			for(var i=0; i < cIDs.length; i++){
				cID = cIDs[i]
				var score = ballot[cID]
				text += model.icon(cID) + ":" + score
				text += "<br />"
			}
		}
		if (1){
			for(var i=0; i < cIDs.length; i++){
				cID = cIDs[i]
				var score = ballot[cID]
				for (var j=0; j < score; j++) {
					text += model.icon(cID) + " "
				}
				text += "<br />"
			}
		}
		if (system == "STAR") {
			
			text += "<span class='small'>"
			text += " Pair Preferences:  <br />"
			text += "<pre>" 
			for(var i=1; i<cIDs.length; i++){
				text += ""
				for(var j=0; j<i; j++){
					if (j>0) text += "  "
					text += model.icon(cIDs[j])
					if (ballot[cIDs[j]] > ballot[cIDs[i]]) {
						text += ">"
					} else text += "="
					text += model.icon(cIDs[i])
				} 
				// 01  
				// 02  12
				// 03  13  23
				text += "</span>"
				text += "<br />"
				text += "<br />"
			}
			text += "</pre>"
		}
		return text
	}
}
// helper functions for strategies

function utility_function(utility_shape) {
	if (utility_shape == "quadratic") {
		var f = x => x**2
	} else if (utility_shape == "log") {
		var f = x => Math.log(x+.1)
	} else { // "linear"
		var f = x => x // f is a function defined between 0 and 1 and increasing.
	}
	return f
}

function inverse_utility_function(utility_shape) {
	if (utility_shape == "quadratic") {
		var finv = x => Math.sqrt(x)
	} else if (utility_shape == "log") {
		var finv = x => Math.exp(x) - .1
	} else { // "linear"
		var finv = x => x
	}
	return finv
}


function distF(model,v,c) {
	return Math.sqrt(distF2(model,v,c))
}

function distF2(model,v,c) { // voter and candidate should be in order
	if (model.dimensions == "1D+B") {
		var dx = v.x - c.x
		if (1) {
			if (c.b == 0) return 2^30
			var f = 1/c.b * 2 * .5 ** c.b
			return dx*dx * f*f
		} else {
			// these are old
			var dy = c.y - (model.yDimOne + model.yDimBuffer)
			var a=9
			switch (a) {
				case 1: return Math.abs(dx*dy)
				case 2: return Math.abs(dx*dy*.1)
				case 3: return Math.abs(dx*dy*dy*.001)
				case 4:
					var adx = Math.abs(dx)
					var ady = Math.abs(dy)
					if (adx < 10 || ady < 10) return 0
					return (adx + ady)*2
				case 5:
					var adx = Math.abs(dx)
					var ady = Math.abs(dy)
					if (adx < 10 || ady < 10) {
						var balance = min(adx,ady) / 10
						return balance * (adx + ady)*2
					} 
					return (adx + ady)*2
				case 6:
					var adx = Math.abs(dx)
					var ady = Math.abs(dy)
					return (1/(1/adx+1/ady))**2 /// hmm forgot this square while making this function... so things are weird
				case 7:
					return (1/(1/(dx*dx)+100/(dy*dy))) ** 2
				case 8:
					var adx = Math.abs(dx)
					var ady = Math.abs(dy)
					return (11 / ( 1/adx + 10/ady )) ** 2
				case 9:
					var f = .2 * 2 ** (dy/30)
					return (Math.abs(dx) * f)**2 
				case 10:
					var adx = Math.abs(dx)
					var ady = Math.abs(dy)
					var bInv = ady/30
					return (adx * bInv)**2 
			}
		}
	} else if (model.dimensions == "1D") {
		var dx = v.x - c.x
		var f = 1/c.b * 2 * .5 ** c.b
		return dx*dx * f*f
	} else {
		var dx = v.x - c.x
		var dy = v.y - c.y
		var f = 1/c.b * 2 * .5 ** c.b 
		// f = 1 when c.b = 1
		// var f = .5 * 2 ** (1/c.b)
		return (dx*dx + dy*dy) * f*f
	}
}



function dostrategy(model,x,y,minscore,maxscore,strategy,preFrontrunnerIds,candidates,defaultMax,doStar,utility_shape) {
	
	// reference
	// {name:"O", realname:"zero strategy. judge on an absolute scale.", margin:4},
	// {name:"N", realname:"normalize", margin:4},
	// {name:"F", realname:"normalize frontrunners only", margin:4},
	// {name:"F+", realname:"best frontrunner", margin:4},
	// {name:"F-", realname:"not the worst frontrunner"}
	
	var lc = candidates.length
	var dottedCircle = false

	
	// find distances and ids //
	dista = []
	canAid = []
	for(var i=0; i<lc; i++){
		var c = candidates[i];
		var dist = distF(model,{x:x,y:y},c)
		dista.push(dist)
		canAid.push(c.id)
	}

	
	// find m and n (max and min) //
	
	
	if (strategy == "zero strategy. judge on an absolute scale.") {
		
		m = defaultMax
		n = 0

	} else {

		var lf = preFrontrunnerIds.length

		// identify important set
		var shortlist = []
		var ls
		if (strategy == "normalize" || lf == 0) { // exception for no frontrunners
			ls = lc
			for (var i = 0; i < lc; i++) {
				shortlist.push(i)
			}
		} else {
			ls = lf
			for (var i = 0; i < ls; i++) {
				var index = canAid.indexOf(preFrontrunnerIds[i])
				if (index > -1) {shortlist.push(index)}
			}	
		}

		// find min and max of shortlist
		var m=-1
		var n=Infinity
		var mi=null
		var ni=null
		for (var i_short = 0; i_short < ls; i_short++) {
			var i = shortlist[i_short]	
			var d1 = dista[i]
			if (d1 > m) {
				m = d1 // max
				mi = i
			}
			if (d1 < n) {
				n = d1 //min
				ni = i
			}
		}
	}

	if (strategy == "best frontrunner"){
		m=n
	} else if (strategy == "not the worst frontrunner") {
		n=m
		dottedCircle = true;
	}

	// assign scores //
	scores = {}
	if (utility_shape != "linear") {
		var f = utility_function(utility_shape)
		var m_inv = 1/m
		f_n = f(n*m_inv)
		f_m = f(1)
	}
	for(var i=0; i<lc; i++){
		var d1 = dista[i]
		if (d1 < n) {
			score = maxscore
		} else if (d1 >= m){ // in the case that the voter likes the frontrunner candidates equally, he just votes for everyone better
			score = minscore
		} else { // putting this last avoids m==n giving division by 0
			if (utility_shape == "linear") {
				frac = ( d1 - n ) / ( m - n )
			} else {
				frac = ( f(d1*m_inv) - f_n ) / ( f_m - f_n )
			}
			score = Math.floor(.5+minscore+(maxscore-minscore)*(1-frac))
		}
		scores[canAid[i]] = score
	}
	

	// adjust scores if necessary //

	if (strategy == "zero strategy. judge on an absolute scale.") {
		return {scores:scores, radiusFirst:n , radiusLast:m, dottedCircle:false}
	}
	

	// boundary condition correction
	// scores[canAid[mi]] = minscore
	scores[canAid[ni]] = maxscore

	// if there's just one frontrunner than set him last 
	// unless he's the closest to you
	if (lf==1 && strategy != "normalize") { 
		var n1 = n
		var n1i = ni
		for (var i = 0; i < lc; i++) {	
			var d1 = dista[i]
			if (d1 < n1) {
				n1 = d1 //min
				n1i = i
			}
		}
		if (shortlist[0] == n1i) {
			// he's closest
			dottedCircle = false
		} else {
			scores[canAid[shortlist[0]]] = minscore
			dottedCircle = true
		}
	}


	// star exception
	//if (strategy == "starnormfrontrunners") {
	if(doStar) {
		// find best candidate and make sure that only he gets the best score
		var n1 = n
		var n1i = ni
		for (var i = 0; i < lc; i++) {	
			var d1 = dista[i]
			if (d1 < n1) {
				n1 = d1 //min
				n1i = i
			}
		}
		for (var i = 0; i < lc; i++) {	
			var c = canAid[i]
			if (scores[c]==maxscore && i!=n1i) {
				scores[c]=maxscore-1;
	}}}

	return {scores:scores, radiusFirst:n , radiusLast:m, dottedCircle:dottedCircle}
}

function ThreeVoter(model){

	var self = this;

	ScoreVoter.call(self,model)

	self.maxscore = 2

	var tempTextBallot = self.textBallot
	self.textBallot = function(ballot){
		return tempTextBallot(ballot).replace("5 (love 'em)","2 (love 'em)")
	}
	self.textTally = function(ballot){
		var text = ""
		cIDs = Object.keys(ballot).sort(function(a,b){return -(ballot[a]-ballot[b])}) // sort descending
		if (0){
			if (self.say) text += "<span class='small' style> Vote: </span> <br />" 
			for(var i in cIDs){
				cID = cIDs[i]
				var score = ballot[cID]
				text += model.icon(cID) + ":" + score
				text += "<br />"
			}
		}
		groups = [[],[],[]]
		for (cID in ballot) {
			var score = ballot[cID]
			groups[score].push(cID)
		}
		text +=  "<pre><span class='small' style>   Good:</span>" 
		var good = groups[2]
		for (i in good) {
			text += model.icon(good[i])
		}
		text +=  "<br />"
		text +=  "<br />"
		text += "<span class='small' style>Not Bad:</span>" 
		for (i in good) {
			text += model.icon(good[i])
		}
		var okay = groups[1]
		for (i in okay) {
			text += model.icon(okay[i])
		}
		text += "</pre>"
		if(0) {
			text += "<br /> preferences:<br />"
			for(var i = 2; i > -1; i--){
				if (i<2) text += ">"
				for(j in groups[i]){
					text += model.icon(groups[i][j])
				}
			}
		}
		
		text += "<span class='small'>"
		text += " Pair Preferences:  <br />"
		text += "<pre>" 
		for(var i=1; i<cIDs.length; i++){
			text += ""
			for(var j=0; j<i; j++){
				if (j>0) text += "  "
				text += model.icon(cIDs[j])
				if (ballot[cIDs[j]] > ballot[cIDs[i]]) {
					text += ">"
				} else text += "="
				text += model.icon(cIDs[i])
			} 
			// 01  
			// 02  12
			// 03  13  23
			text += "</span>"
			text += "<br />"
			text += "<br />"
		}
		text += "</pre>"
		return text
	}

}

function ApprovalVoter(model){

	var self = this;
	GeneralVoter.call(self,model)
	ScoreVoter.call(self,model)
	self.maxscore = 1
	self.defaultMax = 200 // step: x<25, 25<x<50, 50<x<75, 75<x<100, 100<x

	self.subGetBallot = self.getBallot
	self.getBallot = function(x, y, strategy, iDistrict){
		
		var scores = self.subGetBallot(x,y,strategy, iDistrict)

		// Anyone close enough. If anyone.
		var approved = [];
		var cans = model.district[iDistrict].candidates
		for(var j=0;j<cans.length;j++){
			var c = cans[j];
			if(scores[c.id] == 1){
				approved.push(c.id);
			}
		}

		// Vote for the CLOSEST
		return { approved: approved };

	};
	
	self.drawCircle = function(ctx, x, y, size, ballot){

		// If none, whatever.
		var slices = [];
		if(ballot.approved.length==0){
			_drawBlank(model, ctx, x, y, size);
			return;
		}

		// Draw 'em slices
		for(var i=0; i<ballot.approved.length; i++){
			var candidate = model.candidatesById[ballot.approved[i]];
			slices.push({ num:1, fill:candidate.fill });
		}
		_drawSlices(model, ctx, x, y, size, slices, ballot.approved.length);

	};
	self.textBallot = function(ballot) {
		var text = ""

		var approvedByCandidate = []
		for(var i = 0; i < model.candidates.length; i++) {
			approvedByCandidate.push("&#x2800;")
		}
		for(var i=0; i<ballot.approved.length; i++){
			var approved = ballot.approved[i];
			var c = model.candidatesById[approved];
			approvedByCandidate[c.i] = "&#x2714;"
		}

		var rTitle = `
		<em>Who do you approve of?<br>
		<span class="small">(pick as MANY as you like)</span></em>
		`
		text += htmlBallot(model,rTitle,approvedByCandidate)
		return text
	}
	self.textTally = function(ballot){
		var text = ""
		if (self.say) text += "<span class='small' style> Approved </span> <br />" 
		
		for(var i=0; i<ballot.approved.length; i++){
			// if (i>0) text += ">"
			var candidate = ballot.approved[i];
			text += model.icon(candidate)
			text += "<br />"
		}
		return text
	}
}

function GeneralVoter() {
	var self = this
	self.say = false
	self.toTextV = function(ballot) {
		if (0) {
			return `<div id="paper">` + self.textBallot(ballot) + "</div>" + self.textTally(ballot) 
		} else {
			return self.toText(ballot,"V")
		}

	}
	self.toTextH = function(ballot) {
		return self.toText(ballot,"H")
	}
	self.toText = function(ballot,direction) {
		var tablewrap = false
		var text = ''
		var part1 = self.textBallot(ballot)
		var part2 = `
		<table class="main2" border="1">
		<tbody>
		<tr>
		<th>Tally<br>
		<em><span class="small">(how your vote counts)</span></em></th>
		</tr>
		<tr>
		<td>#2</td>
		</tr>
		</tbody>
		</table>`.replace("#2",self.textTally(ballot))

		if (tablewrap) {
			text += `<table id="paper">
			<tbody>
			<tr>
			`
			text += `<td valign="top">`
			text += part1
			text += `</td>`
			if (direction=="V") {
				text += '</tr><tr>'
			}
			text += `<td valign="top">`
			text += part2
			text += `</td>`
			text += `
			</tr>
			</tbody>
			</table>`
		} else {
			text += `
			<div id="paper">
			<div>
			` + part1 + `
			</div>
			<div>
			` + part2 + `
			</div>
			</div>`
		}
		return text
	}
}

function htmlBallot(model,rTitle,textByCandidate) {
	var text = ""
	var tTitle = `
	<table class="main" border="1">
	<tbody>
	<tr>
	<th class="main">
	#title
	</th>
	</tr>
	<tr>
	<td class="main">
	<table border="0">
	<tbody>
	`
	text += tTitle.replace("#title",rTitle)

	tRow = `
	<tr>
	<td>
	<table class="num">
	<tbody>
	<tr>
	<td class="num">#num</td>
	</tr>
	</tbody>
	</table>
	</td>
	<td>#name</td>
	</tr>
	`		
	for(var i=0; i < model.candidates.length; i++) {
		var c = model.candidates[i]
		var num = textByCandidate[i]
		var name = model.icon(c.id) + " <b style='color:"+c.fill+"'>" + c.id.toUpperCase() + "</b>"
		text += tRow.replace("#num",num).replace("#name",name)	
	}
	text += `
	</tbody>
	</table>
	</td>
	</tr>
	</tbody>
	</table>
	`
	return text
}

function RankedVoter(model){

	var self = this;
	GeneralVoter.call(self,model)
	
	self.getBallot = function(x, y, strategy, iDistrict){

		// Rank the peeps I'm closest to...
		var rank = [];
		var cans = model.district[iDistrict].candidates
		for(var j=0;j<cans.length;j++){
			var c = cans[j];
			rank.push(c.id);
		}
		rank = rank.sort(function(a,b){

			var c1 = model.candidatesById[a];
			// var x1 = c1.x-x;
			// var y1 = c1.y-y;
			// var d1 = x1*x1+y1*y1;
			var d1 = distF2(model,{x:x,y:y},c1)

			var c2 = model.candidatesById[b];
			// var x2 = c2.x-x;
			// var y2 = c2.y-y;
			// var d2 = x2*x2+y2*y2;
			var d2 = distF2(model,{x:x,y:y},c2)
			
			return d1-d2;

		});

		var considerFrontrunners =  (strategy != "normalize"  &&  strategy != "zero strategy. judge on an absolute scale.")
		if (considerFrontrunners && model.election == Election.irv && model.autoPoll == "Auto" && model.pollResults) {
			// we can do an irv strategy here

			// so first figure out if our candidate is winning
			// should figure out how close we are to winning
			
			// who do we have first?
			var ourFirst = rank[0]
			// who was first?
			var weLost = ! model.result.winners.includes(ourFirst)

			if ( weLost ) {
				// find out if our second choice could win head to head
				var tally = model.pollResults
				for (var i in rank) {
					var ourguy = rank[i]
					if (ourguy == winguy) {
						break // there is no better candidate, so let's just keep the same strategy
					}
					var ourguyWins = true
					for (var iwinguy in model.result.winners) {
						var winguy = model.result.winners[iwinguy]
						var ours = tally.head2head[ourguy][winguy]
						var theirs = tally.head2head[winguy][ourguy]
						if (theirs > ours) ourguyWins = false
					}
					if (ourguyWins) {
						// okay, we should vote for him first
						// probably, this could be improved to vote for more than just this guy first
						
						// bump ourguy into first on our ballot
						for (var j = i; j > 0; j--) {
							rank[j] = rank[j-1]
						}
						rank[0] = ourguy
						break
					}
				}
				// done changing rank
			}
		}

		// Ballot!
		return { rank:rank };

	};

	self.drawBG = function(ctx, x, y, ballot){

		if (model.doOriginal) {
			// RETINA
			x = x*2;
			y = y*2;
			// DRAW 'EM LINES
			for(var i=0; i<ballot.rank.length; i++){
	
				// Line width
				var lineWidth = ((ballot.rank.length-i)/ballot.rank.length)*8;
	
				// To which candidate...
				var rank = ballot.rank[i];
				var c = model.candidatesById[rank];
				var cc = model.arena.modelToArena(c)
				var cx = cc.x*2; // RETINA
				var cy = cc.y*2; // RETINA
	
				// Draw
				ctx.beginPath();
				ctx.moveTo(x,y);
				ctx.lineTo(cx,cy);
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = "#888";
				ctx.stroke();
	
			}
	
		} else if (model.system == "IRV") {
			var old = {}
			old.x = x
			old.y = y
			// DRAW 'EM LINES
			for(var i=0; i<ballot.rank.length; i++){
	
				// Line width
				var lineWidth = ((ballot.rank.length-i)/ballot.rank.length)*8;
	
				// To which candidate...
				var rank = ballot.rank[i];
				var c = model.candidatesById[rank];
				var cc = model.arena.modelToArena(c)
				var next = {}
				next.x = cc.x;
				next.y = cc.y;
	
				// Draw
				ctx.beginPath();
				ctx.moveTo(old.x*2,old.y*2);
				ctx.lineTo(next.x*2,next.y*2);
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = "#888";
				ctx.stroke();
				old = next
				ctx.setLineDash([5, 15]);
			}
			ctx.setLineDash([]);
	
		} else if (model.system == "Borda") {
			
			me = {x:x, y:y}
			var meArena = model.arena.modelToArena(me)

			var temp = ctx.globalAlpha
			for(var i=0; i<ballot.rank.length; i++){
	
				// Line width
				var lineWidth = ((ballot.rank.length-i)/ballot.rank.length)*8;
	
				// To which candidate...
				var rank = ballot.rank[i];
				var c = model.candidatesById[rank];
				var cc = model.arena.modelToArena(c)

				dist = Math.sqrt((meArena.x - cc.x) ** 2 + (meArena.y - cc.y) ** 2 )
				

				ctx.beginPath();
				ctx.arc(x*2, y*2, dist*2, 0, Math.TAU, false);
				var invert = false
				if (invert) {
					ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height)
					ctx.closePath()
				}

				var doColors = false
				if (doColors) {
					ctx.fillStyle = c.fill
				} else {
					ctx.fillStyle = '#000'
				}
				ctx.strokeStyle = "#000";
				
				// ctx.setLineDash([]);

				var doLines = true
				if (doLines) {
					ctx.globalAlpha = .01
					ctx.stroke()
				}
				var doColors = true
				if (doColors) {
					ctx.globalAlpha = 1 / ballot.rank.length / model.voters.length
				} else {
					ctx.globalAlpha = .4 / ballot.rank.length / model.voters.length
				}
				if (invert) {
					ctx.fill("evenodd")
				} else {
					ctx.fill()
				}
			}
			ctx.globalAlpha = temp
		} else {
			// customization
			var lineWidth = 1
			var connectWidth = 1
			var sizeCircle = 15
			var connectCandidates = false
			var minimap = true
			var bimetalLine = (true && !minimap) || true
			var regularLine = false

			var rankByCandidate = []
			var cans = []
			for(var i=0; i<ballot.rank.length; i++){
				var rank = ballot.rank[i];
				var c = model.candidatesById[rank];
				cans.push(c)
				rankByCandidate[c.i] = i
			}
			for(var i = 0; i < cans.length; i++) {
				for (var k = 0; k < i; k++) {
					var c1 = model.arena.modelToArena(cans[i])
					c1.fill = cans[i].fill
					var c2 = model.arena.modelToArena(cans[k])
					c2.fill = cans[k].fill
					var win = rankByCandidate[cans[k].i] > rankByCandidate[cans[i].i]
						
					if (connectCandidates) {
						ctx.setLineDash([5, 45]);
						ctx.beginPath();
						ctx.moveTo(c1.x*2,c1.y*2);
						ctx.lineTo(c2.x*2,c2.y*2);
						ctx.lineWidth = connectWidth;
						ctx.strokeStyle = "#888";
						ctx.stroke();
						ctx.setLineDash([]);
					}
					// draw halfway line
					var length = 10
					mid = {}
					mid.x = (c1.x + c2.x)*.5
					mid.y = (c1.y + c2.y)*.5
					var mag = Math.sqrt((c1.y-c2.y) **2 + (c1.x-c2.x)**2)
					unit = {}
					unit.x = (c1.x - c2.x) / mag
					unit.y = (c1.y - c2.y) / mag
					var start = {}
					start.x = mid.x + unit.y * length
					start.y = mid.y - unit.x * length
					var stop = {}
					stop.x = mid.x - unit.y * length
					stop.y = mid.y + unit.x * length
					if (bimetalLine) {
						ctx.beginPath();
						ctx.moveTo((start.x+lineWidth*unit.x)*2,(start.y+lineWidth*unit.y)*2);
						ctx.lineTo((stop.x+lineWidth*unit.x)*2,(stop.y+lineWidth*unit.y)*2);
						ctx.lineWidth = lineWidth*5;
						ctx.strokeStyle = c1.fill;
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo((start.x-lineWidth*unit.x)*2,(start.y-lineWidth*unit.y)*2);
						ctx.lineTo((stop.x-lineWidth*unit.x)*2,(stop.y-lineWidth*unit.y)*2);
						ctx.lineWidth = lineWidth*5;
						ctx.strokeStyle = c2.fill;
						ctx.stroke();
					}
					if (regularLine) {
						ctx.beginPath();
						ctx.moveTo(start.x*2,start.y*2);
						ctx.lineTo(stop.x*2,stop.y*2);
						ctx.lineWidth = lineWidth;
						ctx.strokeStyle = "#888";
						ctx.stroke();
					}

					if (minimap) {
						if (win) {
							var fill = c1.fill
						} else {
							var fill = c2.fill
						}
						var factor = 7
						var miniSize = 8
						var circle = {}
						circle.x = (mid.x * factor + x) / (factor + 1)
						circle.y = (mid.y * factor + y) / (factor + 1)
						
						var temp = ctx.globalAlpha
						ctx.globalAlpha = temp * .8
						ctx.fillStyle = fill
						ctx.moveTo(circle.x*2,circle.y*2);
						ctx.beginPath();
						ctx.arc(circle.x*2, circle.y*2, miniSize, 0, Math.TAU, false);
						// ctx.lineTo(circle.x*2,circle.y*2);
						ctx.closePath();
						ctx.fill();
						ctx.lineWidth = lineWidth;
						ctx.strokeStyle = "#888";
						ctx.stroke();
						ctx.globalAlpha = temp
					} else {
						if (win) {
							var offset = 1
						} else {
							var offset = -1
						}
						var circle = {}
						circle.x = mid.x + unit.x * offset * sizeCircle * .5
						circle.y = mid.y + unit.y * offset * sizeCircle * .5
						
						var temp = ctx.globalAlpha
						ctx.globalAlpha = temp * .3
						ctx.fillStyle = "#000";
						ctx.beginPath();
						ctx.moveTo(circle.x*2,circle.y*2);
						ctx.arc(circle.x*2, circle.y*2, sizeCircle, 0, Math.TAU, false);
						ctx.lineTo(circle.x*2,circle.y*2);
						ctx.closePath();
						ctx.fill();
						ctx.globalAlpha = temp
					}
				}
			}
		}

	};

	self.drawCircle = function(ctx, x, y, size, ballot, weight){

		if (typeof weight === 'undefined') weight = 1
		var slices = [];
		var n = ballot.rank.length;
		if (n==0) {
			var totalSlices = 1
			slices.push({ num:1, fill:"#bbb" })
		} else if(n==2) {
			var totalSlices = 1
			var rank = ballot.rank[0];
			var candidate = model.candidatesById[rank];
			slices.push({ num:1, fill:candidate.fill })
		} else {

			var totalSlices = (n*(n+1))/2; // num of slices!
	
			for(var i=0; i<ballot.rank.length; i++){
				var rank = ballot.rank[i];
				var candidate = model.candidatesById[rank];
				slices.push({ num:(n-i), fill:candidate.fill });
			}
	
		}
		if (0) {
			_drawSlices(model, ctx, x, y, size * Math.sqrt(weight), slices, totalSlices);
		} else {
			_drawSlices(model, ctx, x, y, size, slices, totalSlices * 1/Math.max(weight,.000001));
		}

	};

	self.textBallot = function(ballot) {
		var text = ""

		var rankByCandidate = []
		for(var i=0; i<ballot.rank.length; i++){
			var rank = ballot.rank[i];
			var c = model.candidatesById[rank];
			rankByCandidate[c.i] = i + 1
		}

		var rTitle = `
		<em>Rank in order of your choice:<br>
		<span class="small">(1=1st choice, 2=2nd choice, etc...)</span></em>
		`
		text += htmlBallot(model,rTitle,rankByCandidate)
		return text
	}
	self.textTally = function(ballot){
		var system = model.system
		var rbsystem = model.rbsystem
		// todo: star preferences
		var text = ""

		// var onlyPoints = ["Borda"]
		// var onlyPointsRB = ["Baldwin","Borda"]
		// var noPreferenceChainRB = ["Black"]
		// var onlyPreferenceChain = ["IRV","STV"]
		// var onlyPreferenceChainRB = ["Bucklin","Carey","Coombs","Hare"]
		// var onlyPairsRB = ["Copeland","Dodgson",]
		regular = {
			"IRV": 			{doChain:true , doPairs:false, doPoints:false, message:"Only tally the top choice during elimination rounds."},
			"Borda": 		{doChain:false, doPairs:false, doPoints:true , message:""},
			"Minimax": 		{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Schulze": 		{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"RankedPair":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Condorcet":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"STV": 			{doChain:true , doPairs:false, doPoints:false, message:"Only tally the top choice during elimination rounds."}
		}
			
		rb = {
			"Baldwin":	{doChain:true , doPairs:false, doPoints:true , message:"Points are assigned in each elimination round.  In round 1, they are as follows:"},
			"Black":	{doChain:true , doPairs:true , doPoints:true , message:"These preferences are tallied by pairs. <br /><br /> If there is no Condorcet winner, then borda points are used."},
			"Borda":	{doChain:false, doPairs:false, doPoints:true , message:""},
			"Bucklin":	{doChain:false, doPairs:false, doPoints:false, message:"Round 1: only count 1's.  <br /> Round 2: include 1's and 2's.  <br /> Keep including more until approval gets above 50%."},
			"Carey":	{doChain:true , doPairs:false, doPoints:false, message:"Only tally the top choice during elimination rounds."},
			"Coombs":	{doChain:true , doPairs:false, doPoints:false, message:"Only tally the bottom choice during elimination rounds."},
			"Copeland":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Dodgson":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Hare":		{doChain:true , doPairs:false, doPoints:false, message:"Only tally the top choice during elimination rounds."},
			"Nanson":	{doChain:true , doPairs:false, doPoints:true , message:"Points are assigned in each elimination round.  In round 1, they are as follows:"},
			"Raynaud":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Schulze":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Simpson":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Small":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."},
			"Tideman":	{doChain:false, doPairs:true , doPoints:false, message:"These preferences are tallied by pairs."}
		}
		if (system=="RBVote") {
			var pick = rb[rbsystem]
		} else {
			var pick = regular[system]
		}

		if(system=="RBVote" && rbsystem=="Bucklin") {
			// put a 1 in each ranking
			text += "<pre>"
			// text += "    1 2 3 4 5"
			text += "   "
			for(var i=0; i<ballot.rank.length; i++) {
				text += " " + (i+1)
			}
			text += "<br />"
			text += "<br />"
			for(var i=0; i<ballot.rank.length; i++) {
				text += model.icon(ballot.rank[i])
				text += "  "
				for(var j=0; j<ballot.rank.length; j++) {
					if (j>0) text += " "
					if (i==j) {
						text += "1"
					} else {
						text += "0"
					}
				}
				text += "<br />"
			}
			text += "</pre>"		
		}

		if (pick.doChain || pick.doPairs) {
			text += "<span class='small' style> Preferences: </span> <br />" 
			for(var i=0; i<ballot.rank.length; i++){
				if (i>0) text += ">"
				var candidate = ballot.rank[i];
				text += model.icon(candidate)
			}
			text += "<br />"
			text += "<br />"
		}

		if (pick.message != "") {
			text += "<span class='small' style>"
			text += pick.message
			text += "</span>"
			text += "<br />"
			text += "<br />"
		}	

		if (pick.doPairs) {
			if(0){
				text += "<span class='small'>"
				// text += "Pair Preferences:  <br />" 
				for(var i=1; i<ballot.rank.length; i++){
					text += "<span style='float:left'>"
					for(var j=0; j<ballot.rank.length-i; j++){
						if (j>0) text += "&nbsp;&nbsp;&nbsp;&nbsp;"
						text += model.icon(ballot.rank[j]) + ">"
						text += model.icon(ballot.rank[j+i])
					} 
					// 01  12
					// 02  13
					text += "</span>"
					text += "<br />"
				}
				text += "</span>"
			}
			if (0) {
				text += "<span class='small'> Pair Preferences:  <br /><pre>" 
				for(var i=1; i<ballot.rank.length; i++){
					text += "<span style='float:left'>"
					for(var j=1; j<i; j++){
						text += "   "
					}
					for(var j=0; j<ballot.rank.length-i; j++){
						if (j>0) text += " "
						text += model.icon(ballot.rank[j]) + ">"
						text += model.icon(ballot.rank[j+i])
					} 
					// 01  12
					// 02  13
					text += "</span>"
					text += "<br />"
					text += "<br />"
				}
				text += "</pre></span>"
			}
			if(1){
				text += "<span class='small'>"
				// text += " Pair Preferences:  <br />"
				text += "<pre>" 
				for(var i=1; i<ballot.rank.length; i++){
					text += ""
					for(var j=0; j<i; j++){
						if (j>0) text += "  "
						text += model.icon(ballot.rank[j]) + ">"
						text += model.icon(ballot.rank[i])
					} 
					// 01  
					// 02  12
					// 03  13  23
					text += "</span>"
					text += "<br />"
					text += "<br />"
				}
				text += "</pre>"
			}
		}

		if (pick.doPoints) {
			if (self.say) text += "<span class='small' style> Points: </span><br />" 
			var numCandidates = ballot.rank.length
			for(var i=0; i<ballot.rank.length; i++){
				var candidate = ballot.rank[i];
				var score = numCandidates - i
				for (var j=0; j < score; j++) {
					text += model.icon(candidate) 
				}
				text += "<br />"
			}
		}

		return text
	}
}

function PluralityVoter(model){

	var self = this;
	GeneralVoter.call(self,model)

	self.maxscore = 1; // just for autopoll

	self.getBallot = function(x, y, strategy, iDistrict){

		if (model.autoPoll == "Auto" && model.pollResults) {
			// if (model.autoPoll == "Auto" && (typeof model.pollResults !== 'undefined')) {
			tally = model.pollResults

			var factor = self.poll_threshold_factor
			var max1 = 0
			for (var can in tally) {
				if (tally[can] > max1) max1 = tally[can]
			}
			var threshold = max1 * factor
			var viable = []
			for (var can in tally) {
				if (tally[can] > threshold) viable.push(can)
			}
		} else {
			viable = model.district[iDistrict].preFrontrunnerIds
		}

		// Who am I closest to? Use their fill
		var checkOnlyFrontrunners = (strategy!="zero strategy. judge on an absolute scale." && viable.length > 1 && strategy!="normalize")
		
		if (model.election == Election.pluralityWithPrimary) checkOnlyFrontrunners = false // workaround
		
		var closest = {id:null};
		var closestDistance = Infinity;
		var cans = model.district[iDistrict].candidates
		for(var j=0;j<cans.length;j++){
			var c = cans[j];
			if(checkOnlyFrontrunners && ! viable.includes(c.id)  ) {
				continue // skip this candidate because he isn't one of the 2 or more frontrunners, so we can't vote for him
			}
			var dist = distF2(model,{x:x,y:y},c)
			if(dist<closestDistance){
				closestDistance = dist;
				closest = c;
			}
		}
		// Vote for the CLOSEST
		return { vote:closest.id };

	};

	self.drawBG = function(ctx, x, y, ballot){

		var candidate = model.candidatesById[ballot.vote];

		// RETINA
		x = x*2;
		y = y*2;
		var cc = model.arena.modelToArena(candidate)
		var tx = cc.x*2;
		var ty = cc.y*2;

		// DRAW - Line
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(tx,ty);
		ctx.lineWidth = 8;
		ctx.strokeStyle = "#888";
		ctx.stroke();

	};

	self.drawCircle = function(ctx, x, y, size, ballot){

		// RETINA
		x = x*2;
		y = y*2;

		// What fill?
		if (ballot.vote == null) {
			var fill = '#bbb'
			// return
		} else {
			var fill = model.candidatesById[ballot.vote].fill;
		}
		ctx.fillStyle = fill;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1; // border

		// Just draw a circle.
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.TAU, true);
		ctx.fill();
		if (model.yeeon) {ctx.stroke();}

	};

	self.textBallot = function(ballot) {
		var text = ""
		var onePickByCandidate = []
		for(var i = 0; i < model.candidates.length; i++) {
			onePickByCandidate.push("&#x2800;")
		}
		var c = model.candidatesById[ballot.vote];
		onePickByCandidate[c.i] = "&#x2714;"

		var rTitle = `
		<em>Who's your favorite candidate?<br>
		<span class="small">(pick ONLY one)</span></em>
		`
		text += htmlBallot(model,rTitle,onePickByCandidate)
		return text
	}
	self.textTally = function(ballot){
		var text = ""
		if (self.say) text += "<span class='small' style> One vote for </span> " 
		return text + model.icon(ballot.vote)
	}

}

// helper method...
var _drawSlices = function(model, ctx, x, y, size, slices, totalSlices){

	// RETINA
	x = x*2;
	y = y*2;
	//size = size*2;

	// GO AROUND THE CLOCK...
	var startingAngle = -Math.TAU/4;
	var endingAngle = 0;
	for(var i=0; i<slices.length; i++){

		slice = slices[i];

		// Angle!
		var sliceAngle = slice.num * (Math.TAU/totalSlices);
		endingAngle = startingAngle+sliceAngle;

		// Just draw an arc, clockwise.
		ctx.fillStyle = slice.fill;
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.arc(x, y, size, startingAngle, endingAngle, false);
		ctx.lineTo(x,y);
		ctx.closePath();
		ctx.fill();

		// For next time...
		startingAngle = endingAngle;

	}
	
	if (model.yeeon) {
		// Just draw a circle.	
		_drawRing(ctx,x/2,y/2,size)	
	}

};

var _drawRing = function (ctx, x, y, size) {

		// RETINA
		x = x*2;
		y = y*2;
		// Just draw a circle.		
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1; // border
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.TAU, true);
		ctx.closePath();
		ctx.stroke();
}

var _drawBlank = function(model, ctx, x, y, size){
	var slices = [{ num:1, fill:"#bbb" }];
	_drawSlices(model, ctx, x, y, size, slices, 1);
};


var  _erfinv  = function(x){ // from https://stackoverflow.com/a/12556710
	var z;
	var a  = 0.147;                                                   
	var the_sign_of_x;
	if(0==x) {
		the_sign_of_x = 0;
	} else if(x>0){
		the_sign_of_x = 1;
	} else {
		the_sign_of_x = -1;
	}

	if(0 != x) {
		var ln_1minus_x_sqrd = Math.log(1-x*x);
		var ln_1minusxx_by_a = ln_1minus_x_sqrd / a;
		var ln_1minusxx_by_2 = ln_1minus_x_sqrd / 2;
		var ln_etc_by2_plus2 = ln_1minusxx_by_2 + (2/(Math.PI * a));
		var first_sqrt = Math.sqrt((ln_etc_by2_plus2*ln_etc_by2_plus2)-ln_1minusxx_by_a);
		var second_sqrt = Math.sqrt(first_sqrt - ln_etc_by2_plus2);
		z = second_sqrt * the_sign_of_x;
	} else { // x is zero
		z = 0;
	}
	return z;
}

function _erf(x) {
	var z;
	const ERF_A = 0.147; 
	var the_sign_of_x;
	if(0==x) {
		the_sign_of_x = 0;
		return 0;
	} else if(x>0){
		the_sign_of_x = 1;
	} else {
		the_sign_of_x = -1;
	}

	var one_plus_axsqrd = 1 + ERF_A * x * x;
	var four_ovr_pi_etc = 4/Math.PI + ERF_A * x * x;
	var ratio = four_ovr_pi_etc / one_plus_axsqrd;
	ratio *= x * -x;
	var expofun = Math.exp(ratio);
	var radical = Math.sqrt(1-expofun);
	z = radical * the_sign_of_x;
	return z;
}

/////////////////////////////////////////
///////// SINGLE OR GAUSSIAN ////////////
/////////////////////////////////////////

// sanity rules: class creation code cannot read attributes from model.

function GaussianVoters(model){ // this config comes from addVoters in main_sandbox

	var self = this;
	Draggable.call(self);
	self.isGaussianVoters = true
	self.voterGroupType = "GaussianVoters"
	self.size = 30
	var config = {}
	
	// CONFIGURE DEFAULTS
	_fillVoterDefaults(self)
	self.type = new PluralityVoter(model)

	
	self.init = function () {
				
		// HACK: larger grab area
		// self.radius = 50;
		if (!self.x_voters) {
			// SPACINGS, dependent on NUM
			var spacings = [0, 12, 12, 12, 12, 20, 30, 50, 100];
			if (self.snowman) {
				if (self.vid == 0) {
					spacings.splice(3)
				} else if (self.vid == 1) {
					spacings = [0,12,12,12]
				} else if (self.vid == 2) {
					spacings.splice(4)
				}
				//spacings.splice(2+self.vid)
			} else if(self.disk==1){
				spacings.splice(4);
			} else if(self.disk==2){
				spacings.splice(5);
			} else if (self.disk==3){
				spacings = [0, 10, 11, 12, 15, 20, 30, 50, 100];
			}
			
			// Create 100+ points, in a Gaussian-ish distribution!
			var points = [[0,0]];
			self.points = points;
			var _radius = 0,
				_RINGS = spacings.length;
			for(var i=1; i<_RINGS; i++){

				var spacing = spacings[i];
				_radius += spacing;

				var circum = Math.TAU*_radius;
				var num = Math.floor(circum/(spacing-1));
				if (self.snowman && self.vid == 1 && i==3){
					num = 10
				}

				// HACK TO MAKE IT PRIME - 137 VOTERS
				//if(i==_RINGS-1) num += 3;

				var err = 0.01; // yeah whatever
				for(var angle=0; angle<Math.TAU-err; angle+=Math.TAU/num){
					var x = Math.cos(angle)*_radius  * self.spread_factor_voters;
					var y = Math.sin(angle)*_radius  * self.spread_factor_voters;
					points.push([x,y]);
				}

			}
		} else {
			var points = [];
			self.points = points;
			var angle = 0;
			var _radius = 0;
			var _radius_norm = 0;
			var _spread_factor = 2 * Math.exp(.01*self.group_spread) * Math.sqrt(self.group_count/20) // so the slider is exponential
			self.stdev = _spread_factor * 1.38
			var theta = Math.TAU * .5 * (3 - Math.sqrt(5))
			for (var count = 0; count < self.group_count; count++) {
				angle = theta * count
				if (0) {
					_radius_norm = Math.sqrt(1-(count+.5)/self.group_count)
					_radius = _erfinv(_radius_norm) * _spread_factor
					self.stdev = _spread_factor
				} else {
					_radius_norm = 1-(count+.5)/self.group_count
					_radius = Math.sqrt(-2*Math.log(1-_radius_norm)) * self.stdev * .482
				}
				var x = Math.cos(angle)*_radius  * self.spread_factor_voters;
				var y = Math.sin(angle)*_radius  * self.spread_factor_voters;
				points.push([x,y]);
			}
			self.points = points
		}
		if (0 && (model.dimensions == "1D+B" || model.dimensions == "1D")) {

			var build1 = false
			var forward = true
			if (build1) { // cool method doesn't work
				for (var i = 0; i < self.points.length; i++) {
				// for (var i = self.points.length - 1; i >= 0; i--) {
					points[i][0] = self.points[i][0]
					points[i][1] = 0
					var diameter2 = 30
					var yNewUp, yNewDown
					var yMax = 0
					var yMin = 10000
					var noneighbors = true
					// for (var k = self.points.length - 1; k > i; k--) {
					for (var k = 0; k < i; k++) {
						xDiff2 = (points[k][0] - points[i][0])**2
						if (xDiff2 < diameter2) {
							noneighbors = false
							yDiff = Math.sqrt(diameter2-xDiff2)
							yNewUp = yDiff + points[k][1]
							yNewDown = - yDiff + points[k][1]
							if (yNewUp > yMax) {
								yMax = yNewUp
							}
							if (yNewDown < yMin) {
								yMin = yNewDown
							}
						}
					}
					if (noneighbors) {
						yChoose = 0
					} else if (yMin > 0) {
						var yChoose = yMin
					} else {
						var yChoose = yMax
					}
					points[i][1] = yChoose
				}
				
				for (var i = 0; i < points.length; i++) {
					points[i][1] = -points[i][1]
				}
				self.points = points
			} else {
				var betweenDist = 5
				var stackDist = 5
				var added = []
				var todo = []
				if (forward) {
					for (var i = 0 ; i < self.points.length; i++) {
						todo.push(i)
					}
				} else {
					for (var i = self.points.length - 1 ; i >= 0; i--) {
						todo.push(i)
					}
				}
				var level = 1
				while (todo.length > 0) {
					for (var c = 0; c < todo.length; c++) {
						var i = todo[c]
						// look for collisions
						var collided = false
						for (var d = 0; d < added.length; d++) {
							var k = added[d]
							xDiff = Math.abs(self.points[k][0] - self.points[i][0])
							if (xDiff < betweenDist) {
								collided = true
								break
							}
						}
						if (! collided) {
							self.points[i][2] = (level-1) * -stackDist
							added.push(i)
							todo.splice(c,1)
							c--
						}
					}
					level++
					var added = []
				}

			}
		}

		
	}

	self.setType = function(newType){
		self.type = new newType(model);
	};

	self.img = new Image();  // use the face
	self.img.src = "play/img/voter_face.png";

	// UPDATE! Get all ballots.
	self.ballots = [];
	self.weights = []
	self.update = function(){
		self.ballots = [];
		self.weights = [];
		
		//randomly assign voter strategy based on percentages, but using the same seed each time
		// from http://davidbau.com/encode/seedrandom.js
		Math.seedrandom('hi');
		
		for(var i=0; i<self.points.length; i++){
			var p = self.points[i];
			var x = self.x + p[0];
			var y = self.y + p[1];
			
			if (0) { // two ways to choose which voters use secondStrategy
				var r1 = Math.random() * 99.8 + .1;
			} else {
				if (!self.x_voters) {
					var r1 = (1861*i) % 100 + .5;
				} else {
					var r1 = (34*i) % 100 + .5;
				}
			}	
			if (r1 < self.percentSecondStrategy && self.doTwoStrategies) { 
				var strategy = self.secondStrategy // yes
			} else {
				var strategy = self.firstStrategy; // no e.g. 
			}
			
			// choose the threshold of voters for polls
			var r_11 = Math.random() * 2 - 1 
			self.type.poll_threshold_factor = _erfinv(r_11) * .2 + .5
			var iDistrict = self.district[i]
			var ballot = self.type.getBallot(x, y, strategy, iDistrict);
			self.ballots.push(ballot);
			self.weights.push(1);
		}
	};

	// DRAW!
	self.drawBackAnnotation = function(x,y,ctx) {}
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.draw1 = function(ctx){

		if (model.showVoters != undefined && model.showVoters == false) {
			var drawVoters = false
		} else {
			var drawVoters = true
		}
		if (drawVoters) {
			// DRAW ALL THE points
			var circlesize = 10
			for(var i=0; i<self.points.length; i++){
				var p = self.points[i];
				var s = model.arena.modelToArena(self)
				var x = s.x + p[0];
				if (model.dimensions == "2D") {
					var y = s.y + p[1];
				} else {
					var y = s.y + p[2];
					circlesize = 6
				}
				var ballot = self.ballots[i];
				var weight = self.weights[i]
				self.type.drawCircle(ctx, x, y, circlesize, ballot, weight);
			}
		}
	}
	self.draw2 = function(ctx){

		 // Don't draw a individual group under a votercenter, which looks weird.
		if(model.voterCenter && model.voters.length == 1) return

		// Circle!
		var size = self.size;
		
		var s = model.arena.modelToArena(self)
		var x = s.x*2;
		var y = s.y*2;
		//self.type.drawCircle(ctx, self.x, self.y, size, ballot);
		if(self.highlight) var temp = ctx.globalAlpha
		if(self.highlight) ctx.globalAlpha = 0.8
		self.drawBackAnnotation(x,y,ctx)
		_drawBlank(model, ctx, s.x, s.y, size)
		_drawRing(ctx,s.x,s.y,self.size)
		
		// Face!
		size = size*2;
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);

		// Number ID
		var textsize = 20
		ctx.textAlign = "center";
		
		if(model.voters.length != 1) {
			_drawStroked(self.vid+1,x+0*textsize,y+0*textsize,textsize,ctx);
		}

		self.drawAnnotation(x,y,ctx)
		if(self.highlight) ctx.globalAlpha = temp
	};
	self.draw = function(ctx){
		self.draw1(ctx)
		self.draw2(ctx)
	};

}

function _fillVoterDefaults(self) {
	// a helper for configuring 

	_fillInDefaults(self,{ 
		// FIRST group in expVoterPositionsAndDistributions
		disk: 3,
		vid: 0,
		snowman: false,
		x_voters: false,
		// SECOND group in "exp_addVoters"
		// same for all voter groups in model
		firstStrategy:"zero strategy. judge on an absolute scale.",
		preFrontrunnerIds:["square","triangle"],
		doTwoStrategies: false,
		spread_factor_voters: 1,
		// could vary between voters
		secondStrategy: "zero strategy. judge on an absolute scale.",
		percentSecondStrategy: 0,
		group_count: 50,
		group_spread: 190,
		isVoter: true
	})
}

function SingleVoter(model){

	var self = this;
	Draggable.call(self);
	self.isSingleVoter = true
	self.voterGroupType = "SingleVoter"
	self.size = 20
	
	// CONFIGURE DEFAULTS
	_fillVoterDefaults(self)
	self.type = new PluralityVoter(model);

	self.setType = function(newType){
		self.type = new newType(model);
	};

	self.init = function () {

		// Image!
		self.img = new Image();
		self.img.src = "play/img/voter_face.png";

		
		self.points = [[0,0]];

		// UPDATE!
		self.ballot = null;
		self.ballots = [];
		
	}
	self.update = function(){
		self.type.poll_threshold_factor = .6
		self.ballot = self.type.getBallot(self.x, self.y, self.firstStrategy, self.district);
		self.ballots = [self.ballot]
	};

	// DRAW!
	self.drawBackAnnotation = function(x,y,ctx) {}
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.draw = function(ctx){
		self.draw1(ctx)
		self.draw2(ctx)
	};
	self.draw1 = function(ctx) {
		var s = model.arena.modelToArena(self)
		var x = s.x*2;
		var y = s.y*2;
		if(self.highlight) var temp = ctx.globalAlpha
		if(self.highlight) ctx.globalAlpha = 0.8
		// Background, for showing HOW the decision works...
		self.drawBackAnnotation(x,y,ctx)
		self.type.drawBG(ctx, s.x, s.y, self.ballot);
		if(self.highlight) ctx.globalAlpha = temp
	}

	
	self.draw2 = function(ctx){
		
		var s = model.arena.modelToArena(self)
		var x = s.x*2;
		var y = s.y*2;

		if(self.highlight) var temp = ctx.globalAlpha
		if(self.highlight) ctx.globalAlpha = 0.8
		// Circle!
		var size = self.size;
		self.type.drawCircle(ctx, s.x, s.y, size, self.ballot);
		_drawRing(ctx,s.x,s.y,self.size)

		// Face!
		size = size*2;
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
		
		self.drawAnnotation(x,y,ctx)
		if(self.highlight) ctx.globalAlpha = temp
	}

}

function VoterCenter(model){

	var self = this;
	Draggable.call(self);
	
	// LOAD
	self.id = "voterCenter";
	self.isVoterCenter = true;
	self.size = 30;
	self.points = [[0,0]];
	self.img = new Image();  // use the face
	var oldway
	if (oldway) {
		self.img.src = "play/img/voter_face.png";
	} else {
		self.img.src = "play/img/center.png";
	}
	self.findVoterCenter = function(){ // calculate the center of the voter groups
		// UPDATE
		var x = 0
		var y = 0
		var totalnumbervoters = 0
		for(var i=0; i<model.voters.length; i++){
			var voter = model.voters[i]
			var numbervoters = voter.points.length
			x += voter.x * numbervoters
			y += voter.y * numbervoters
			totalnumbervoters += numbervoters
		}
		x/=totalnumbervoters
		y/=totalnumbervoters
		

		var method = model.median_mean // 1,2,3
		// 1 is the mean
		// 2 is the geometric median
		// 3 is a 1-d median along 4 projections
		// 4 is a 1-d median along 2 projections
		// 5 is 2 medians using the usual median method

		if (method == 5) {
			var median = function(values) {

				values.sort( function(a,b) {return a - b;} );
			
				var half = Math.floor(values.length/2);
			
				if(values.length % 2)
					return values[half];
				else
					return (values[half-1] + values[half]) / 2.0;
			}
			xvals = []
			yvals = []
			for(i=0; i<model.voters.length; i++){
				voter = model.voters[i]
				for(m=0; m<voter.points.length; m++) {
					point = voter.points[m]
					xvals.push(point[0]+voter.x)
					yvals.push(point[1]+voter.y)
				}
			}
			x = median(xvals)
			y = median(yvals)
		} else if (method != 1) { // try to find geometric median ... still thinking about whether this is a good idea.
			// first for centers
			var d, voter, yv,xv,xd,yd,itnv,moved,xt,yt,j,i,dg,m,point
			
			if (method == 2) {
				var distancemeasure = function(xd,yd) {
					return Math.sqrt(xd*xd+yd*yd)
				}
			} else if (method == 3) {
				var distancemeasure = function(xd,yd) {
					return Math.abs(xd) + Math.abs(yd) + Math.abs(xd+yd) + Math.abs(xd-yd)
				}
			} else if (method == 4) {
				var distancemeasure = function(xd,yd) {
					return Math.abs(xd) + Math.abs(yd)// + Math.abs(xd+yd) + Math.abs(xd-yd)
				}
			}

			d = 0
			for(i=0; i<model.voters.length; i++){
				voter = model.voters[i]
				xv = voter.x
				yv = voter.y
				xd = xv - x
				yd = yv - y
				d += distancemeasure(xd,yd) * voter.ballots.length // d is total distance, not average
			}
			if (1) {
				for (var a = 200; a > .1; ) {
					xt = [x-a,x+a,x-a,x+a] // try these points
					yt = [y-a,y-a,y+a,y+a]
					moved = false
					for (j in xt) {
						xg = xt[j] // the guess
						yg = yt[j]
						// calculate distance
						dg=0
						for(i=0; i<model.voters.length; i++){
							voter = model.voters[i]
							xv = voter.x
							yv = voter.y
							xd = xv - xg
							yd = yv - yg
							dg += distancemeasure(xd,yd) * voter.ballots.length
						}
						if (dg < d) { // we found a better point
							d=dg * 1
							x=xg * 1
							y=yg * 1
							moved = true
						}
					}
					if(!moved) a*=.5
				}
			}
			// now we do it again for all the individual points within the voter group
			
			d=0
			for(i=0; i<model.voters.length; i++){
				
				voter = model.voters[i]
				for(m=0; m<voter.points.length; m++) {
					point = voter.points[m]
					xv = point[0]+voter.x
					yv = point[1]+voter.y
					xd = xv - x
					yd = yv - y
					d += distancemeasure(xd,yd)
				}
			}
			for (var a = 200; a > .1; ) {
				xt = [x-a,x+a,x-a,x+a] // try these points
				yt = [y-a,y-a,y+a,y+a]
				moved = false
				for (j in xt) {
					xg = xt[j] // the guess
					yg = yt[j]
					// calculate distance
					dg=0
					for(i=0; i<model.voters.length; i++){
						voter = model.voters[i]
						for(m=0; m<voter.points.length; m++) {
							point = voter.points[m]
							xv = point[0]+voter.x
							yv = point[1]+voter.y
							xd = xv - xg
							yd = yv - yg
							dg += distancemeasure(xd,yd)
						}
					}
					if (dg < d) { // we found a better point
						d=dg * 1
						x=xg * 1
						y=yg * 1
						moved = true
					}
				}
				if(!moved) a*=.5
			}
		} 
		return {x:x,y:y}
	}
	self.update = function() {// do the center voter thing
		// UPDATE
		var recenter = self.findVoterCenter()
		self.x = recenter.x
		self.y = recenter.y
	}
	self.drag = function() {
		var oldcenter = self.findVoterCenter()
		var changecenter = {x:self.x - oldcenter.x, y:self.y - oldcenter.y}
		for(var i=0; i<model.voters.length; i++){
			model.voters[i].x += changecenter.x
			model.voters[i].y += changecenter.y
		}
	}

	// DRAW!
	self.drawBackAnnotation = function(x,y,ctx) {}
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.draw = function(ctx){
		// UPDATE
		var s = model.arena.modelToArena(self)
		var x = s.x*2;
		var y = s.y*2;
		size = self.size
		if(self.highlight) var temp = ctx.globalAlpha
		if(self.highlight) ctx.globalAlpha = 0.8
		self.drawBackAnnotation(x,y,ctx)
		if (oldway) {
			_drawBlank(model, ctx, s.x, s.y, size);
			_drawRing(ctx,s.x,s.y,self.size)
			
			// Face!
			size = size*2;
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);

		} else {
			size = size*2;
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);

		}
		self.drawAnnotation(x,y,ctx)

		if(self.highlight) ctx.globalAlpha = temp
	};

}