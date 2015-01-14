/* global UI */
/* global Deck */
/* global BJ */
/* global Player */

var Dealer = (function(){
	var hand = [];
	var nShow = 0;

	function clear(){
		UI.log(UI.dealer() + 'CLEAN TABLE');
		hand = [];
		nShow = 0;
	}

	function draw(){
		var cid = Deck.popCard();
		hand.push(cid);
		UI.log(UI.dealer() + 'DRAW A CARD');
	}

	function show(){
		var cid = hand[hand.length - 1];
		UI.log(UI.dealer() + 'SHOW ' + UI.textCard(cid));
		nShow++;
	}

	function hit(){
		UI.log(UI.dealer() + 'HIT');
		Dealer.draw();
		Dealer.show();
		Dealer.rule();
	}

	function stand(){
		UI.log(UI.dealer() + 'STAND');
		Dealer.score();
		Player.scores();
	}

	function bust(){
		UI.log(UI.dealer() + 'BUST');
		Dealer.score();
		Player.scores();
	}

	function rule(){
		UI.log(UI.dealer() + 'RULE');
		var score = BJ.score(hand);
		if(score < 17){
			Dealer.hit();
		}else if(score === 17){
			if(hand.length === 2){
				Dealer.hit();
			}else{
				Dealer.stand();
				Player.match(22);
			}
		}else if(score<=21){
			Dealer.stand();
			Player.match(score);
		}else{
			Dealer.bust();
			Player.match(0);
		}
	}

	function print(){
		var line = UI.dealer()+ 'H ';
		for(var j = 0;j<hand.length;j++){
			var cid = hand[j];
			line += UI.textCard(cid);
			line += ' ';
		}
		UI.log(line);
	}

	function score(){
		var line = UI.dealer() + 'S ';
		line += BJ.score(hand);
		UI.log(line);
	}

	function getHand(){
		return hand;
	}

	function getNShow(){
		return nShow;
	}

	return {
		clear:clear,
		draw:draw,
		show:show,
		hit:hit,
		stand:stand,
		print:print,
		rule:rule,
		bust:bust,
		score:score,
		getHand:getHand,
		getNShow:getNShow,
	};
})();

console.log(Dealer);