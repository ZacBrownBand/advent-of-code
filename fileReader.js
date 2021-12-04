const fs = require("fs");

const linesFromRead = (data) => data.split(/\r?\n/);

const read = (filename) => fs.readFileSync(filename, "utf8");
const readLines = (filename) => linesFromRead(read(filename));

module.exports = { read, readLines, linesFromRead };
