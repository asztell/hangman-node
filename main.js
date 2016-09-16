var 
// prompt = require('prompt'),
	game = require('./game.js'),
	word = require('./word.js');

var new_game = new game.game();

new_game.currentWrd = new_game.startgame();

var	char_arr = [],
	display_arr = [];

console.log(new_game.currentWrd);
console.log(new_game);

// console.log(char_arr);