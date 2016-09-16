var fs = require('fs');

var Letter = function(l) {
	this.l = l;
	this.show = false;
};

Letter.prototype.show = function() {
	if (!this.show) this.l = '_'
};

module.exports = {
	Letter : Letter
};