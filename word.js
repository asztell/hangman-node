var fs = require('fs'),
	letter = require('./letter.js');


var word = function() {

	letters : [],

	objectsFound : false,

	getLets : function(new_word) {
		for(var i = 0; i < new_word.length; i++) {
			var show = checkIfLetterFound(new_word.charAt(i));
			var new_Letter = new Letter(new_word.charAt(i), show);
			letters.push(new_Letter);
		}
	},

	didWeFindTheWord : function() {
		if() {
			objectsFound = true;
		}
	},

	checkIfLetterFound : function(letter) {
		for(var i = 0; i < letters.length; i++) {
			if(letters[i] == letter) {
				return true;
			}
		}
		return false;
	},

	wordRender : function() {
		var renderedWord = '';

		for(var i = 0; i < letters.length; i++) {
			renderedWord += ' '+letters[i];
		}

		console.log('The word so far is: '+renderedWord);
	}

};

module.exports = {
	word: word
};