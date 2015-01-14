/* global UI */

var Deck = (function(){
	var cids, top;

	function shuffle(array) {
		var m = array.length, t, i;
		while (m) {
    		i = Math.floor(Math.random() * m--);
    		t = array[m];
    		array[m] = array[i];
    		array[i] = t;
		}
  		return array;
	}

	function popCard(){
		return cids[top++];
	}

	function prepare(){
		cids = [];
		for(var i = 0;i<52;i++){
			cids.push(i);
		}
		shuffle(cids);
		shuffle(cids);
		shuffle(cids);
		shuffle(cids);
		top = 0;
		UI.buttons(['bet2','stand','hit','doubledown','surrender','split'],['start']);
	}

	function test(){
		UI.log('DECK TEST');
		cids = [
			 0, 11, 0, 24, 3, 10, 6, 2, 8, 9,10,11,12,
			13,14,15,16,17,18,19,20,21,22,23,24,25,
			26,27,28,29,30,31,32,33,34,35,36,37,38,
			39,40,41,42,43,44,45,46,47,48,49,50,51
		];

		top = 0;
	}

	function print(){
		var cards = [];
		for(var i=top;i<52;i++){
			cards.push(UI.textCard(cids[i]));
		}
		console.log(cards.join());
	}

	function getLeft(){
		return 52 - top;
	}

	return {
		test:test,
		prepare:prepare,
		popCard:popCard,
		print:print,
		getLeft:getLeft,
	};
})();

console.log(Deck);