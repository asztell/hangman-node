var game = require('./game.js'),
	word = require('./word.js');

var new_game = new game.game();
var new_word = new_game.startgame();

new_word.getLets(new_game.currentWrd);

new_word.wordRender();

new_game.keepPromptingUser(new_word);



// console.log(new_game.currentWrd);

// console.log(new_game.currentWrd);
