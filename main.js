const fR = require("./fileReader.js");

// Set the day number to the day of the month for the associated problem

const dayNumber = 1;
const year = 2021;

const runForDay = (day) => {
  const input = fR.readLines(`./years/${year}/inputs/${day}.txt`);
  const {
    partOne,
    partTwo,
    beforeAll,
    beforeEach,
  } = require(`./years/${year}/days/${day}.js`);

  beforeAll && beforeAll(input);
  beforeEach && beforeEach(input);

  const partOneOutput = partOne(input);
  beforeEach && beforeEach(input);
  const partTwoOutput = partTwo(input);

  console.log(`---- Day ${dayNumber} ${year} ----`);
  console.log(`Part 1: ${partOneOutput}`);
  console.log(`Part 2: ${partTwoOutput}`);
};

const dayNumberAdjusted = dayNumber < 10 ? "0" + dayNumber : dayNumber;

runForDay(dayNumberAdjusted);
