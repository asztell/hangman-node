var 
// prompt = require('prompt'),
	game = require('./game.js'),
	word = require('./word.js');

var new_game = new game.game();
var new_word = new word.word();

new_game.startgame();

// console.log(new_game.currentWrd);
new_word.getLets(new_game.currentWrd);

new_word.wordRender();

new_game.keepPromptingUser(new_word);

// console.log(new_game.currentWrd);
