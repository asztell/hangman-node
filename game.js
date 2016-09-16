var fs = require('fs'),
	word = require('./word.js'),
	inquirer = require('inquirer');


var game = function() {

	this.wordsGuessed = 0;

	this.guessesRemaining = 0;

	this.currentWrd = null;

};


game.prototype.resetGuessesRemaining = function() {

	this.guessesRemaining = 0;

};


game.prototype.keepPromptingUser = function() {

	if(this.guessesRemaining > 0 && word.objectsFound != true) {

		inquirer.prompt([

			{
				type: 'input',
				message: 'Please guess another letter: ',
				name: 'letter'
			}

		]).then(function(letter) {

			console.log(letter);

			word.checkIfLetterFound(letter);
			word.wordRender();

			this.guessesRemaining--;

			this.keepPromptingUser();

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

	this.currentWrd = get_line('./words.txt', rand(0, max));

	this.guessesRemaining = this.currentWrd.length;

	return this.currentWrd;

};


module.exports = {
	game : game
};