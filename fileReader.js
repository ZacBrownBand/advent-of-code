var fs = require('fs');

var reader = {
	read: (filename) => {
		return fs.readFileSync(filename, 'utf8');
	},
	readLines: (filename) => {
		return fs.readFileSync(filename, 'utf8').split(/\r?\n/);
	}
};

module.exports = reader;