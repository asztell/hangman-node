var fs = require('fs'),
	word = require('./word.js');


var game = function() {

	wordsGuessed : 0,

	guessesRemaining : 0,

	currentWrd : null,

	resetGuessesRemaining : function() {

		this.guessesRemaining = 0;

	},

	keepPromptingUser : function() {

		do {

			inquirer.prompt([

				{
					type: 'input',
					message: 'Please guess another letter: ',
					name: 'letter'
				}

			]).then(function(letter) {

				console.log(letter);

				word.checkIfLetterFound(letter);

			});

		} while (guessesRemaining < 1 && word.objectsFound != true);

	}

};


game.prototype.startgame = function() {

	// get random line from words.txt
	function get_line(filename, line_no) {
		var data = fs.readFileSync(filename, 'utf8');
		var lines = data.split("\n");
		return lines[+line_no];
	}

	function rand(min, max) {
		return (Math.floor(Math.random() * (max - min)) + min);
	}

	// size of random.txt
	var max = fs.readFileSync('./words.txt').toString().split('\n').length;

	return get_line('./words.txt', rand(0, max));

}


module.exports = {
	game : game
};