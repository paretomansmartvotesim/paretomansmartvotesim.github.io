
/////////////////////////////////////
///////// TYPES OF VOTER ////////////
/////////////////////////////////////

function ScoreVoter(model){

	var self = this;
	self.model = model;
	self.maxscore = 5;
	self.minscore = 0;
	self.defaultMax = window.HACK_BIG_RANGE ? 61 * 4 : 25 * 4; // step: x<25, 25<x<50, 50<x<75, 75<x<100, 100<x

	self.getBallot = function(x, y, strategy){

		doStar =  (self.model.election == Election.star  &&  strategy != "zero strategy. judge on an absolute scale.") || self.model.doStarStrategy
		if (self.model.autoPoll == "Auto" && self.model.pollResults) {
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
			viable = self.model.preFrontrunnerIds
		}
		var scoresfirstlast = dostrategy(x,y,self.minscore,self.maxscore,strategy,viable,self.model.candidates,self.defaultMax,doStar,self.model.utility_shape)
		
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
		var f = utility_function(self.model.utility_shape)
		var finv = inverse_utility_function(self.model.utility_shape)
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
			ctx.strokeStyle = "#888";
			ctx.setLineDash([]);
			if (self.dottedCircle) ctx.setLineDash([5, 15]);
			ctx.stroke();
			if (self.dottedCircle) ctx.setLineDash([]);
		}
	}

	self.drawCircle = function(ctx, x, y, size, ballot){

		// There are #Candidates*5 slices
		// Fill 'em in in order -- and the rest is gray.
		var totalSlices = self.model.candidates.length*(self.maxscore-self.minscore);
		var leftover = totalSlices;
		var slices = [];
		totalScore = 0;
		for(var i=0; i<self.model.candidates.length; i++){
			var c = self.model.candidates[i];
			var cID = c.id;
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
			_drawBlank(ctx, x, y, size);
			return;
		}

		_drawSlices(ctx, x, y, size, slices, totalSlices);

	};

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
	if (self.model.utility_shape == "quadratic") {
		var finv = x => Math.sqrt(x)
	} else if (self.model.utility_shape == "log") {
		var finv = x => Math.exp(x) - .1
	} else { // "linear"
		var finv = x => x
	}
	return finv
}


function dostrategy(x,y,minscore,maxscore,strategy,preFrontrunnerIds,candidates,defaultMax,doStar,utility_shape) {
	
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
		var dx = c.x-x;
		var dy = c.y-y;
		var dist = Math.sqrt(dx*dx+dy*dy);
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

}

function ApprovalVoter(model){

	var self = this;

	ScoreVoter.call(self,model)
	self.maxscore = 1
	self.defaultMax = 200 // step: x<25, 25<x<50, 50<x<75, 75<x<100, 100<x

	self.subGetBallot = self.getBallot
	self.getBallot = function(x, y, strategy){
		
		var scores = self.subGetBallot(x,y,strategy)

		// Anyone close enough. If anyone.
		var approved = [];
		for(var i=0; i<self.model.candidates.length; i++){
			var c = self.model.candidates[i];
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
			_drawBlank(ctx, x, y, size);
			return;
		}

		// Draw 'em slices
		for(var i=0; i<ballot.approved.length; i++){
			var candidate = self.model.candidatesById[ballot.approved[i]];
			slices.push({ num:1, fill:candidate.fill });
		}
		_drawSlices(ctx, x, y, size, slices, ballot.approved.length);

	};

}

function RankedVoter(model){

	var self = this;
	self.model = model;

	self.getBallot = function(x, y, strategy){

		// Rank the peeps I'm closest to...
		var rank = [];
		for(var i=0;i<self.model.candidates.length;i++){
			rank.push(self.model.candidates[i].id);
		}
		rank = rank.sort(function(a,b){

			var c1 = self.model.candidatesById[a];
			var x1 = c1.x-x;
			var y1 = c1.y-y;
			var d1 = x1*x1+y1*y1;

			var c2 = self.model.candidatesById[b];
			var x2 = c2.x-x;
			var y2 = c2.y-y;
			var d2 = x2*x2+y2*y2;

			return d1-d2;

		});

		var considerFrontrunners =  (strategy != "normalize"  &&  strategy != "zero strategy. judge on an absolute scale.")
		if (considerFrontrunners && self.model.election == Election.irv && self.model.autoPoll == "Auto" && self.model.pollResults) {
			// we can do an irv strategy here

			// so first figure out if our candidate is winning
			// should figure out how close we are to winning
			
			// who do we have first?
			var ourFirst = rank[0]
			// who was first?
			var weLost = ! self.model.winners.includes(ourFirst)

			if ( weLost ) {
				// find out if our second choice could win head to head
				var tally = model.pollResults
				for (var i in rank) {
					var ourguy = rank[i]
					if (ourguy == winguy) {
						break // there is no better candidate, so let's just keep the same strategy
					}
					var ourguyWins = true
					for (var iwinguy in self.model.winners) {
						var winguy = self.model.winners[iwinguy]
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

		// RETINA
		x = x*2;
		y = y*2;

		// DRAW 'EM LINES
		for(var i=0; i<ballot.rank.length; i++){

			// Line width
			var lineWidth = ((ballot.rank.length-i)/ballot.rank.length)*8;

			// To which candidate...
			var rank = ballot.rank[i];
			var c = self.model.candidatesById[rank];
			var cx = c.x*2; // RETINA
			var cy = c.y*2; // RETINA

			// Draw
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(cx,cy);
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = "#888";
			ctx.stroke();

		}

	};

	self.drawCircle = function(ctx, x, y, size, ballot){

		var slices = [];
		var n = ballot.rank.length;
		var totalSlices = (n*(n+1))/2; // num of slices!

		for(var i=0; i<ballot.rank.length; i++){
			var rank = ballot.rank[i];
			var candidate = self.model.candidatesById[rank];
			slices.push({ num:(n-i), fill:candidate.fill });
		}

		_drawSlices(ctx, x, y, size, slices, totalSlices);

	};

}

function PluralityVoter(model){

	var self = this;
	self.model = model;
	self.maxscore = 1; // just for autopoll

	self.getBallot = function(x, y, strategy){

		if (self.model.autoPoll == "Auto" && self.model.pollResults) {
			// if (self.model.autoPoll == "Auto" && (typeof self.model.pollResults !== 'undefined')) {
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
			var viable = self.model.preFrontrunnerIds
		}

		// Who am I closest to? Use their fill
		var checkOnlyFrontrunners = (strategy!="zero strategy. judge on an absolute scale." && viable.length > 1 && strategy!="normalize")
		
		if (self.model.election == Election.pluralityWithPrimary) checkOnlyFrontrunners = false // workaround
		
		var closest = null;
		var closestDistance = Infinity;
		for(var j=0;j<self.model.candidates.length;j++){
			var c = self.model.candidates[j];
			if(checkOnlyFrontrunners && ! viable.includes(c.id)  ) {
				continue // skip this candidate because he isn't one of the 2 or more frontrunners, so we can't vote for him
			}
			var dx = c.x-x;
			var dy = c.y-y;
			var dist = dx*dx+dy*dy;
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
		var tx = candidate.x*2;
		var ty = candidate.y*2;

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
		var fill = Candidate.graphics[ballot.vote].fill;
		ctx.fillStyle = fill;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1; // border

		// Just draw a circle.
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.TAU, true);
		ctx.fill();
		if (self.model.yeeon) {ctx.stroke();}

	};

}

// helper method...
var _drawSlices = function(ctx, x, y, size, slices, totalSlices){

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
	
	if (self.model.yeeon) {
		// Just draw a circle.		
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1; // border
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.TAU, true);
		ctx.closePath();
		ctx.stroke();
	}

};
var _drawBlank = function(ctx, x, y, size){
	var slices = [{ num:1, fill:"#bbb" }];
	_drawSlices(ctx, x, y, size, slices, 1);
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

/////////////////////////////////////////
///////// SINGLE OR GAUSSIAN ////////////
/////////////////////////////////////////

function GaussianVoters(config){ // this config comes from addVoters in main_sandbox

	var self = this;
	Draggable.call(self, config);

	// NUM
	self.num = config.num || 3;
	self.vid = config.vid || 0;
	self.snowman = config.snowman || false;
	self.x_voters = config.x_voters || false;
	self.spread_factor_voters = config.spread_factor_voters || 1

	// WHAT TYPE?
	self.type = new config.type(self.model);
	self.setType = function(newType){
		self.type = new newType(self.model);
	};
	
	self.percentStrategy = config.percentStrategy
	self.second_strategy = config.second_strategy
	self.group_count = config.group_count
	self.group_spread = config.group_spread
	self.strategy = config.strategy
	self.unstrategic = config.unstrategic
	self.preFrontrunnerIds = config.preFrontrunnerIds

	self.img = new Image();  // use the face
	self.img.src = "img/voter_face.png";


	// HACK: larger grab area
	self.radius = 50;
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
	} else if(self.num==1){
		spacings.splice(4);
	} else if(self.num==2){
		spacings.splice(5);
	} else if (self.num==3){
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
	var theta = Math.TAU * .5 * (3 - Math.sqrt(5))
	for (var count = 0; count < self.group_count; count++) {
		angle = theta * count
		_radius_norm = Math.sqrt(1-(count+.5)/self.group_count)
		_radius = _erfinv(_radius_norm) * _spread_factor
		var x = Math.cos(angle)*_radius  * self.spread_factor_voters;
		var y = Math.sin(angle)*_radius  * self.spread_factor_voters;
		points.push([x,y]);
	}
	self.points = points
}

	// UPDATE! Get all ballots.
	self.ballots = [];
	self.update = function(){
		self.ballots = [];
		
		//randomly assign voter strategy based on percentages, but using the same seed each time
		// from http://davidbau.com/encode/seedrandom.js
		Math.seedrandom('hi');
		
		for(var i=0; i<points.length; i++){
			var p = points[i];
			var x = self.x + p[0];
			var y = self.y + p[1];
			
			if (0) { // two ways to choose which voters are strategic
				var r1 = Math.random() * 99.8 + .1;
			} else {
				if (!self.x_voters) {
					var r1 = (1861*i) % 100 + .5;
				} else {
					var r1 = (34*i) % 100 + .5;
				}
			}	
			if (r1 < self.percentStrategy && self.second_strategy) { 
				var strategy = self.strategy // yes
			} else {
				var strategy = self.unstrategic; // no e.g. 
			}
			
			// choose the threshold of voters
			var r_11 = Math.random() * 2 - 1 
			self.type.poll_threshold_factor = _erfinv(r_11) * .2 + .5

			var ballot = self.type.getBallot(x, y, strategy);
			self.ballots.push(ballot);
		}
	};

	// DRAW!
	self.drawBackAnnotation = function(x,y,ctx) {}
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.draw = function(ctx){

		// DRAW ALL THE POINTS
		for(var i=0; i<points.length; i++){
			var p = points[i];
			var x = self.x + p[0];
			var y = self.y + p[1];
			var ballot = self.ballots[i];
			self.type.drawCircle(ctx, x, y, 10, ballot);
		}
		// Circle!
		var size = 20;
		//self.type.drawCircle(ctx, self.x, self.y, size, ballot);
		if(self.highlight) ctx.globalAlpha = 0.8
		self.drawBackAnnotation(x,y,ctx)
		_drawBlank(ctx, self.x, self.y, size)
		
		// Face!
		size = size*2;
		var x = self.x*2;
		var y = self.y*2;
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
		
		// Number ID
		var textsize = 20
		function drawStroked(text, x, y) {
			ctx.font = textsize + "px Sans-serif"
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 4;
			ctx.strokeText(text, x, y);
			ctx.fillStyle = 'white';
			ctx.fillText(text, x, y);
		}
		ctx.textAlign = "center";
		drawStroked(self.vid+1,x+0*textsize,y+0*textsize);

		self.drawAnnotation(x,y,ctx)
		if(self.highlight) ctx.globalAlpha = 1
	};

}

function SingleVoter(config){

	var self = this;
	Draggable.call(self, config);


	// not sure if we need all these, but just in case
	self.num = 1;
	self.vid = 0;
	self.snowman = false;
	self.x_voters = false;
	self.percentStrategy = config.percentStrategy
	self.second_strategy = config.second_strategy
	self.group_count = config.group_count
	self.group_spread = config.group_spread
	self.strategy = config.unstrategic // at first glance this doesn't seem right, but there is only one group of voters.
	self.unstrategic = config.unstrategic
	self.preFrontrunnerIds = config.preFrontrunnerIds


	// WHAT TYPE?
	self.type = new config.type(self.model);
	self.setType = function(newType){
		self.type = new newType(self.model);
	};

	// Image!
	self.img = new Image();
	self.img.src = "img/voter_face.png";

	
	self.points = [[0,0]];

	// UPDATE!
	self.ballot = null;
	self.ballots = [];
	self.update = function(){
		self.ballot = self.type.getBallot(self.x, self.y, self.unstrategic);
		self.ballots = [self.ballot]
	};

	// DRAW!
	self.drawBackAnnotation = function(x,y,ctx) {}
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.draw = function(ctx){

		if(self.highlight) ctx.globalAlpha = 0.8
		// Background, for showing HOW the decision works...
		self.drawBackAnnotation(x,y,ctx)
		self.type.drawBG(ctx, self.x, self.y, self.ballot);

		// Circle!
		var size = 20;
		self.type.drawCircle(ctx, self.x, self.y, size, self.ballot);

		// Face!
		size = size*2;
		var x = self.x*2;
		var y = self.y*2;
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
		
		self.drawAnnotation(x,y,ctx)
		if(self.highlight) ctx.globalAlpha = 1
	};


}

function VoterCenter(config){

	var self = this;
	Draggable.call(self, config);

	// Passed properties
	var model = config.model
	self.id = config.id;
	self.size = 30;
	
	self.points = [[0,0]];
	
	self.img = new Image();  // use the face
	self.img.src = "img/voter_face.png";

	self.findVoterCenter = function(){ // calculate the center of the voter groups
		var x = 0
		var y = 0
		var totalnumbervoters = 0
		for(var i=0; i<model.voters.length; i++){
			var voter = model.voters[i]
			var numbervoters = voter.ballots.length
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

	//self.findVoterCenter()

	// update
	self.update = function() {// do the center voter thing
		if(Mouse.dragging == self) {
			var oldcenter = self.findVoterCenter()
			var changecenter = {x:self.x - oldcenter.x, y:self.y - oldcenter.y}
			for(var i=0; i<model.voters.length; i++){
				model.voters[i].x += changecenter.x
				model.voters[i].y += changecenter.y
			}
		} else {
			var recenter = self.findVoterCenter()
			self.x = recenter.x
			self.y = recenter.y
		}
	}


	// DRAW!
	self.drawBackAnnotation = function(x,y,ctx) {}
	self.drawAnnotation = function(x,y,ctx) {}; // TO IMPLEMENT
	self.draw = function(ctx){
		size = self.size
		
		if(self.highlight) ctx.globalAlpha = 0.8
		self.drawBackAnnotation(x,y,ctx)
		_drawBlank(ctx, self.x, self.y, size);
		
		// Face!
		size = size*2;
		var x = self.x*2;
		var y = self.y*2;
		ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
		self.drawAnnotation(x,y,ctx)

		if(self.highlight) ctx.globalAlpha = 1
	};

}