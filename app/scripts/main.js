/* global BJ */
/* global UI */

var testLogs = [
	'deck prepare',
	// 'round 1',
	// 'dealer clear',
	// 'player clear',
	// 'player bet 2',
	// 'dealer draw',
	// 'dealer show',
	// 'player draw',
	// 'player show',
	// 'dealer draw',
	// 'player draw',
	// 'player show',
	// 'player split',
	// 'player draw',
	// 'player show',
	// 'player hit',
	// 'player draw',
	// 'player show',
	// 'player print',
	// 'player bust',
	// 'deck print',
	// 'player nexthand',
	// 'player draw',
	// 'player show',
	// 'player print',
	// 'player doubledown',
	// 'player draw',
	// 'player show',
	// 'player print',
	// 'player stand',
	// 'dealer show',
	// 'dealer print',
	// 'dealer rule',
	// 'dealer hit',
	// 'dealer draw',
	// 'dealer show',
	// 'dealer stand',
	// 'dealer print',
	// 'dealer score',
	// 'player scores',
	// 'round 2',
	// 'player bet 2',
	// 'dealer print',
	// 'player print',
];


BJ.init();
UI.configButtons();
BJ.readLogs(testLogs);
BJ.loop();
setInterval(function(){
	BJ.loop();
},1000);
