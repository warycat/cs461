/* global UI */
/* global BJ */
/* global Dealer */
/* global Deck */

var Player = (function(){
	var hands = [[],[],[],[]];
	var h = 0;
	var bets = [0,0,0,0];
	var nh = 1;
	var nShows = [0,0,0,0];
	var total = 0;

	function clear(){
		hands = [[],[],[],[]];
		bets = [0,0,0,0];
		h = 0;
		nh = 1;
		nShows = [0,0,0,0];
		UI.log(UI.player() + 'CLEAN TABLE');
	}

	function draw(){
		var cid = Deck.popCard();
		var hand = hands[h];
		hand.push(cid);
		UI.log(UI.player() + 'DRAW A CARD');
	}

	function show(){
		var hand = hands[h];
		var cid = hand[hand.length - 1];
		nShows[h]++;
		UI.log(UI.player() + 'SHOW ' + UI.textCard(cid));
	}

	function bet(b){
		b = parseInt(b);
		console.log(b);
		bets[0] = b;
		total -= b;
		UI.log(UI.player() + 'BET $' + b);
		Dealer.draw();
		Dealer.show();
		Player.draw();
		Player.show();
		Dealer.draw();
		Player.draw();
		Player.show();
		UI.buttons(['start','bet2'],['stand','hit','doubledown','surrender']);
		checkSplit();
	}

	function checkSplit(){
		var hand = hands[h];
		var c1 = hand[0];
		var c2 = hand[1];
		if(BJ.value(c1) !== BJ.value(c2)){
			UI.buttons(['split'],[]);
		}else{
			UI.buttons([],['split']);
		}
	}

	function hit(){
		UI.log(UI.player() + 'HIT');
		Player.draw();
		Player.show();
		Player.print();
		var score = BJ.score(hands[h]);
		if(score > 21){
			Player.bust();
		}
		UI.buttons(['doubledown','surrender'],[]);
	}

	function stand(){
		UI.log(UI.player() + 'STAND');
		Player.nexthand();
	}

	function bust(){
		UI.log(UI.player() + 'BUST');
		Player.nexthand();
	}


	function doubledown(){
		total -= bets[h];
		bets[h] *= 2;
		var score = BJ.score(hands[h]);
		UI.log(UI.player() + 'DOUBLE DOWN');
		Player.draw();
		Player.show();
		if(score > 21){
			Player.bust();
		}else{
			Player.stand();
		}
	}

	function match(s){
		for(var i = 0;i<nh;i++){
			var hand = hands[i];
			var hs = BJ.score(hand);
			if(hs<=21){
				if(hs === 21 && hand.length === 2){
					hs = 22;
				}
				if(hs === s){
					total += bets[i];
				}else if(hs > s){
					total += 2 * bets[i];
				}
			}
		}
		UI.log('');
	}


	function split(){
		var hand = hands[h];
		var c1 = hand[0];
		var c2 = hand[1];
		hands.splice(h,1,[c1],[c2]);
		hands.pop();
		nShows[h]--;
		nShows[h+1]++;
		total -= bets[h];
		bets[h+1]=bets[h];
		nh++;
		UI.log(UI.player() + 'SPLIT ' + UI.htmlCard(c1) + ' ' + UI.htmlCard(c2));
		Player.draw();
		Player.show();
		checkSplit();
	}

	function surrender(){
		UI.log(UI.player() + 'SURRENDER');
		bets[h] /= 2;
		total += bets[h];
		Player.nexthand();

	}

	function nexthand(){
		if(h + 1 < nh){
			UI.log(UI.player() + 'NEXT HAND');
			h++;
			Player.draw();
			Player.show();
			UI.buttons(['start'],['stand','hit','doubledown','surrender','split']);
			checkSplit();
		}else{
			Dealer.show();
			Dealer.rule();
			UI.buttons(['stand','hit','doubledown','surrender','split'],['start']);
		}
	}

	function print(){
		for(var i = 0;i<4;i++){
			var hand = hands[i];
			var line = UI.player() +  'H' + i + ' ';
			for(var j = 0;j<hand.length;j++){
				var cid = hand[j];
				line += UI.textCard(cid);
				line += ' ';
			}
			UI.log(line);
		}
	}

	function scores(){
		for(var i = 0;i<4;i++){
			var hand = hands[i];
			var line = UI.player() + 'S' + i + ' ';
			var score = BJ.score(hand);
			line += score;
			UI.log(line);
		}
	}

	function getHand(i){
		return hands[i];
	}

	function getNShow(i){
		return nShows[i];
	}

	function getBet(){
		return bets[h];
	}

	function getTotal(){
		return total;
	}

	function getH(){
		return h;
	}

	return {
		clear:clear,
		draw:draw,
		show:show,
		bet:bet,
		stand:stand,
		hit:hit,
		doubledown:doubledown,
		split:split,
		surrender:surrender,
		bust:bust,
		nexthand:nexthand,
		scores:scores,
		match:match,
		print:print,
		getHand:getHand,
		getNShow:getNShow,
		getBet:getBet,
		getTotal:getTotal,
		getH:getH,
	};
})();

