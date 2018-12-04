// Set the day number to the day of the month for the associated problem
var dayNumber;

if (dayNumber === undefined) {
	console.warn('Must set problem day number.');
	return;
}

var fr = require('./fileReader.js');
var input = fr.readLines(`./inputs/${dayNumber}.txt`);
var day = require(`./days/${dayNumber}.js`);

var output1 = day.partOne(input);
var output2 = day.partTwo(input);

console.log(`---- Day ${dayNumber} ----`);
console.log(`Part 1: ${output1}`);
console.log(`Part 2: ${output2}`);
