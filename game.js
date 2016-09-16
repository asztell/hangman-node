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

	console.log('guessesRemaining == '+this.guessesRemaining);

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
			word.didWeFindTheWord();

			if(!found) {
				self.guessesRemaining -= 1;
				// console.log('after decrement - this.guessesRemaining == ' + this.guessesRemaining);
			}

			self.keepPromptingUser(word);

		});

	} else if(word.objectsFound == true && this.guessesRemaining > 0){
	
		this.resetGuessesRemaining();
		console.log('after resetGuessesRemaining()');

		console.log('You guessed the word!');

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
				console.log(self.currentWrd);
				self.guessesRemaining = Math.floor(self.currentWrd.length/2);
				self.keepPromptingUser(new_word);

			} else if (answer.continue == 'n') {

				console.log('Thank you for playing this amazing game!');
				return;

			}

		});

	} else {

		this.resetGuessesRemaining();
		console.log('after resetGuessesRemaining()');

		console.log('Sorry try again with another word');

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
				console.log(self.currentWrd);
				self.guessesRemaining = Math.floor(self.currentWrd.length/2);
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



	this.guessesRemaining = Math.floor(this.currentWrd.length / 2);
	// console.log('this.guessesRemaining == '+this.guessesRemaining);

	var new_word = new word.word();

	return new_word;

};


module.exports = {
	game : game
};