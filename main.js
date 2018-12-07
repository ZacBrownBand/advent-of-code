var fr = require('./fileReader.js');
function runForDay(day) {
    var input = fr.readLines(`./inputs/${dayNumber}.txt`);
    var day = require(`./days/${dayNumber}.js`);

    var output1 = day.partOne(input);
    var output2 = day.partTwo(input);

    console.log(`---- Day ${dayNumber} ----`);
    console.log(`Part 1: ${output1}`);
    console.log(`Part 2: ${output2}`);
}

// Set the day number to the day of the month for the associated problem
var dayNumber = 1;

if (dayNumber === undefined) {
    console.warn('Must set problem day number.');
    return;
}

runForDay(dayNumber);
