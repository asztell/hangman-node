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

	console.log('You have ' + this.guessesRemaining + ' guesses left');

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

			if(!word.checkIfLetterFound(answer.letter)) {self.guessesRemaining -= 1;}

			word.wordRender();

			if(word.didWeFindTheWord()) {endPrompt();}

			self.keepPromptingUser(word);

		});

	} else {

		this.resetGuessesRemaining();
		console.log('after resetGuessesRemaining()');

		if(word.objectsFound && this.guessesRemaining > 0){
			console.log('You guessed the word!');
		} else {
			console.log('Sorry try again with another word');
		}

		endPrompt();

	} 


	function endPrompt() {

		inquirer.prompt([

			{
				type: 'input',
				message: 'Would you like to play again? (y/n) ',
				name: 'continue'
			}

		]).then(function(answer) {

			console.log(answer.continue);

			if(answer.continue == 'y') {

				var new_word = self.startgame();
				new_word.getLets(self.currentWrd);
				new_word.wordRender();
				// console.log(self.currentWrd);
				self.guessesRemaining = (self.currentWrd.length/2 | 0)+2;
				self.keepPromptingUser(new_word);

			} else if (answer.continue == 'n') {

				console.log('Thank you for playing this amazing game!');
				return;

			}

		});

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



	this.guessesRemaining = (this.currentWrd.length/2 | 0)+2;
	// console.log('this.guessesRemaining == '+this.guessesRemaining);

	var new_word = new word.word();

	return new_word;

};


module.exports = {
	game : game
};