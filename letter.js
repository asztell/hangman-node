var fs = require('fs');

var Letter = function(l, show) {
	this.l = l;
	this.show = show;
};

Letter.prototype.show = function() {
	if (!this.show) this.l = '_'
}

module.exports = {
	Letter : Letter
};