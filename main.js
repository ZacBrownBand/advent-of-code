var fr = require('./fileReader.js');

// Set the day number to the day of the month for the associated problem
var dayNumber = 5;
var year = 2019;

function runForDay(day) {
    var input = fr.readLines(`./years/${year}/inputs/${dayNumber}.txt`);
    var day = require(`./years/${year}/days/${dayNumber}.js`);

    var output1 = day.partOne(input);
    var output2 = day.partTwo(input);

    console.log(`---- Day ${dayNumber} ${year} ----`);
    console.log(`Part 1: ${output1}`);
    console.log(`Part 2: ${output2}`);
}


if (dayNumber === undefined) {
    console.warn('Must set problem day number.');
    return;
}

if (dayNumber < 10) {
	dayNumber = '0' + dayNumber;
}

runForDay(dayNumber);
