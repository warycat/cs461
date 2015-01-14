/* global BJ */
/* global Dealer */
/* global Player */
/* global Deck */

var UI = (function(){
	var $log = $('#log');
	var $start = $('#start');
	var $bet2 = $('#bet2');
	var $stand = $('#stand');
	var $hit = $('#hit');
	var $doubledown = $('#doubledown');
	var $split = $('#split');
	var $surrender = $('#surrender');
	var $cleanup = $('#cleanup');
	var $dh = $('#dh');
	var $h0 = $('#h0');
	var $h1 = $('#h1');
	var $h2 = $('#h2');
	var $h3 = $('#h3');
	var $bet = $('#bet');
	var $total = $('#total');
	var $round = $('#round');
	var $deck = $('#deck');
	var no=0;

	function log(html){
		var $html = $('<p>' + html +'<p>');
		$log.append($html);
		console.log(no++,$html.text());
		update();
	}

	function configButtons(){
		$bet2.click(function(){
			BJ.enQueue('player bet 2');
		});
		$stand.click(function(){
			BJ.enQueue('player stand');
		});
		$hit.click(function(){
			BJ.enQueue('player hit');
		});
		$doubledown.click(function(){
			BJ.enQueue('player doubledown');
		});
		$split.click(function(){
			BJ.enQueue('player split');
		});
		$surrender.click(function(){
			BJ.enQueue('player surrender');
		});
		$start.click(function(){
			BJ.enQueue('round');
		});
		$cleanup.click(	function cleanup(){
			$log.empty();
		});
	}

	function textCard(cid){
		var card = BJ.card(cid);
		return BJ.suits[card.s] + BJ.names[card.n];
	}

	function htmlCard(cid){
		var card = BJ.card(cid);
		return '<span style="color:' + BJ.colors[card.c] + ';">' + BJ.suits[card.s] + BJ.names[card.n] +'</span> ';
	}

	function htmlCards(cids,show){
		var html = '';
		for(var i in cids){
			var cid = cids[i];
			if(i >= show){
				html += '#? ';
			}else{
				html += htmlCard(cid);
			}
		}
		return html;
	}


	function player(){
		return '<span style="color:#009000;font-weight:bold">PLAYER </span>';
	}

	function dealer(){
		return '<span style="color:#000090;font-weight:bold">DEALER </span>';
	}

	function update(){
		$dh.html(htmlCards(Dealer.getHand(),Dealer.getNShow()));
		$h0.html(htmlCards(Player.getHand(0),Player.getNShow(0)));
		$h1.html(htmlCards(Player.getHand(1),Player.getNShow(1)));
		$h2.html(htmlCards(Player.getHand(2),Player.getNShow(2)));
		$h3.html(htmlCards(Player.getHand(3),Player.getNShow(3)));
		$round.text(BJ.getRound());
		$bet.text(Player.getBet());
		$total.text(Player.getTotal());
		$deck.text(Deck.getLeft());
		var h = Player.getH();
		$('span[id^="i"]').css('color','#000000');
		$('#i'+h).css('color','#0000f0');
	}

	function buttons(hides,shows){
		var maps = {
			start:$start,
			bet2:$bet2,
			stand:$stand,
			hit:$hit,
			doubledown:$doubledown,
			split:$split,
			surrender:$surrender,
		};
		for(var i in hides){
			var hide = hides[i];
			maps[hide].hide();
		}
		for(var j in shows){
			var show = shows[j];
			maps[show].show();
		}
	}

	return {
		log:log,
		configButtons:configButtons,
		textCard:textCard,
		htmlCard:htmlCard,
		htmlCards:htmlCards,
		player:player,
		dealer:dealer,
		buttons:buttons,
	};
})();

console.log(UI);
