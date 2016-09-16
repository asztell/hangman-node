var fs = require('fs'),
	letter = require('./letter.js');


var word = function() {

	this.letters = [];

	this.objectsFound = false;

};


word.prototype.getLets = function(new_word) {

	for(var i = 0; i < new_word.length; i++) {
		var new_Letter = new letter.Letter(new_word.charAt(i));
		this.letters.push(new_Letter);
	}

};


word.prototype.didWeFindTheWord = function() {
	// if() {
	// 	objectsFound = true;
	// }
};


word.prototype.checkIfLetterFound = function(letter) {

	for(var i = 0; i < this.letters.length; i++) {
		if(this.letters[i] == letter) {

			this.letters[i].show = true;

		}

	}

};


word.prototype.wordRender = function() {

	var renderedWord = '';

	for(var i = 0; i < this.letters.length; i++) {

		if(this.letters[i].show == true) {
			renderedWord += ' '+this.letters[i];
		} else {
			renderedWord += ' '+'_';
		}
	}

	console.log('The word so far is: '+renderedWord);
};


module.exports = {
	word: word
};