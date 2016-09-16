var fs = require('fs'),
	word = require('./word.js'),
	inquirer = require('inquirer');


var game = function() {

	this.wordsGuessed = 0;

	this.guessesRemaining = undefined;

	this.currentWrd = null;

};


game.prototype.resetGuessesRemaining = function() {

	this.guessesRemaining = 0;

};


game.prototype.keepPromptingUser = function(word) {

	// console.log('inside prompt func - this.guessesRemaining == '+this.guessesRemaining);

	var self = this;

	if(this.guessesRemaining > 0 && word.objectsFound == false) {

		inquirer.prompt([

			{
				type: 'input',
				message: 'Please enter your next guess: ',
				name: 'letter'
			}

		]).then(function(answer) {

			// console.log(answer.letter);

			var found = word.checkIfLetterFound(answer.letter);
			word.wordRender();

			if(!found) {
				self.guessesRemaining -= 1;
				// console.log('after decrement - this.guessesRemaining == ' + this.guessesRemaining);
			}

			self.keepPromptingUser(word);

		});

	} else {
	
		this.resetGuessesRemaining();

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

	this.currentWrd = get_line('./words.txt', rand(0, max)).trim();

	this.guessesRemaining = Math.floor(this.currentWrd.length / 2);
	// console.log('this.guessesRemaining == '+this.guessesRemaining);

	return this.currentWrd;

};


module.exports = {
	game : game
};