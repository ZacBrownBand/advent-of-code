const fs = require('fs');

const read = (filename) => fs.readFileSync(filename, 'utf8');
const readLines = (filename) => read(filename).split(/\r?\n/);

module.exports = { read, readLines };
