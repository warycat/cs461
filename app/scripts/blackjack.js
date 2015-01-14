/* global UI */
/* global Deck */
/* global Player */
/* global Dealer */

var BJ = (function(){
	var suits = ['♠','♥','♣','♦'];
	var colors = ['#000000','#ff0000'];
	var names = ['','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	var values = [0,11,2,3,4,5,6,7,8,9,10,10,10,10];
	var logs = [];
	var head = 0;
	var tail = 0;
	var pool = [];
	var round = 0;


	function init(){
		console.log('Black Jack Initialized!');
		round = 0;
		pool = [];
		for(var i=0;i<4;i++){
			for(var j = 1;j<=13;j++){
				pool.push({s:i,n:j,c:i%2});
			}
		}
	}

	function score(cids){
		var nAce = 0;
		var sum = 0;
		for(var i = 0;i<cids.length;i++){
			var cid = cids[i];
			var card = pool[cid];
			var value = values[card.n];
			if(value === 11){
				nAce++;
			}
			sum += value;
		}
		while(sum>21 && nAce > 0){
			sum -= 10;
			nAce--;
		}
		return sum;
	}

	function newRound(){
		round++;
		UI.log('ROUND '+round);
		UI.buttons(['stand','hit','doubledown','surrender','split','start'],['bet2']);
	}

	function enQueue(log){
		logs[tail]=log;
		tail++;
	}

	function deQueue(){
		var log = logs[head];
		head++;
		return log;
	}

	function printLogs(){
		for(var i = 0;i<tail;i++){
			console.log(logs[i]);
		}
	}

	function readLogs(logs){
		console.log('readlogs');
		for(var i=0;i<logs.length;i++){
			enQueue(logs[i]);
		}
	}

	function card(cid){
		return pool[cid];
	}

	function value(cid){
		var c = pool[cid];
		return values[c.n];
	}

	function loop(){
		while(head!==tail){
			var log = deQueue();
			processLog(log);
		}
	}

	function processLog(log){
		var strings = log.split(' ');
		var subject = strings[0];
		var action = strings[1];
		var target = strings[2];

		if(subject === 'round'){
			newRound();
			Player.clear();
			Dealer.clear();
			UI.log('');
		}else if(subject === 'deck'){
			if(action === 'test'){
				Deck.test();
			}else if(action === 'prepare'){
				Deck.prepare();
			}else if(action === 'print'){
				Deck.print();
			}else{
				UI.log(log);
			}
		}else if(subject === 'player'){
			if(action === 'draw'){
				Player.draw();
			}else if(action === 'show'){
				Player.show();
			}else if(action === 'clear'){
				Player.clear();
			}else if(action === 'split'){
				Player.split();
			}else if(action === 'print'){
				Player.print();
			}else if(action === 'bet'){
				console.log(target);
				Player.bet(target);
			}else if(action === 'hit'){
				Player.hit();
			}else if(action === 'bust'){
				Player.bust();
			}else if(action === 'nexthand'){
				Player.nexthand();
			}else if(action === 'scores'){
				Player.scores();
			}else if(action === 'doubledown'){
				Player.doubledown();
			}else if(action === 'surrender'){
				Player.surrender();
			}else if(action === 'stand'){
				Player.stand();
			}else{
				UI.log(log);
			}
		}else if(subject === 'dealer'){
			if(action === 'clear'){
				Dealer.clear();
			}else if(action === 'draw'){
				Dealer.draw();
			}else if(action === 'show'){
				Dealer.show();
			}else if(action === 'print'){
				Dealer.print();
			}else if(action === 'rule'){
				Dealer.rule();
			}else if(action === 'stand'){
				Dealer.stand();
			}else if(action === 'bust'){
				Dealer.bust();
			}else if(action === 'score'){
				Dealer.score();
			}else if(action === 'hit'){
				Dealer.hit();
			}else{
				UI.log(log);
			}
		}else{
			UI.log(log);
		}
	}

	function getRound(){
		return round;
	}

	return{
		suits:suits,
		colors:colors,
		names:names,
		values:values,
		init:init,
		score:score,
		enQueue:enQueue,
		deQueue:deQueue,
		processLog:processLog,
		printLogs:printLogs,
		readLogs:readLogs,
		loop:loop,
		card:card,
		getRound:getRound,
		newRound:newRound,
		value:value,
	};
})();

console.log(BJ);