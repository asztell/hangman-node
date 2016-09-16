var 
// prompt = require('prompt'),
	game = require('./game.js'),
	word = require('./word.js');

var new_game = new game.game();
var new_word = new word.word();

new_game.startgame();

new_word.getLets(new_game.currentWrd);

new_game.keepPromptingUser();

var	char_arr = [],
	display_arr = [];

// console.log(new_game.currentWrd);
