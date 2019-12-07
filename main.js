const fR = require('./fileReader.js');

// Set the day number to the day of the month for the associated problem
const dayNumber = 7;
const year = 2019;

const runForDay = day => {
  const input = fR.readLines(`./years/${year}/inputs/${day}.txt`);
  const { partOne, partTwo } = require(`./years/${year}/days/${day}.js`);

  const partOneOutput = partOne(input);
  const partTwoOutput = partTwo(input);

  console.log(`---- Day ${dayNumber} ${year} ----`);
  console.log(`Part 1: ${partOneOutput}`);
  console.log(`Part 2: ${partTwoOutput}`);
}

const dayNumberAdjusted = dayNumber < 10 ? '0' + dayNumber : dayNumber;

runForDay(dayNumberAdjusted);
