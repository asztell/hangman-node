var fs = require('fs'),
	letter = require('./letter.js');


var word = function() {

	this.letters = [];

	this.objectsFound = false;

	this.counter = undefined;

};


word.prototype.getLets = function(new_word) {

	for(var i = 0; i < new_word.length; i++) {
		var new_Letter = new letter.Letter(new_word.charAt(i));
		this.letters.push(new_Letter);
	}

	this.counter = this.letters.length;

};


word.prototype.didWeFindTheWord = function() {
	if(this.counter < 1) {
		objectsFound = true;
	}
};


word.prototype.checkIfLetterFound = function(letter) {
	var found = false;


	for(var i = 0; i < this.letters.length; i++) {
		if(this.letters[i].l == letter) {

			this.letters[i].show = true;
			found = true;
		}

	}

	// console.log(this.letters);

	return found;

};


word.prototype.wordRender = function() {

	var renderedWord = '';

	for(var i = 0; i < this.letters.length; i++) {
		// console.log(this.letters[i].show);
		if(this.letters[i].show == true) {
			renderedWord += ' '+this.letters[i].l;
		} else {
			renderedWord += ' '+'_';
		}
	}

	console.log('');
	console.log(renderedWord);
	console.log('');
};


module.exports = {
	word: word
};