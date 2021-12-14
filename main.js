const fR = require("./fileReader.js");
const prototypeFunctions = require("./prototypeFunctions.js");

// Set the day number to the day of the month for the associated problem

const dayNumber = 11;
const year = 2021;

const runForDay = (day) => {
  // Explanation and examples of all exports in template/days/01.js
  const {
    partOne,
    partTwo,
    beforeAll,
    beforeEach,
    testing = false,
    parseInput = fR.linesFromRead,
    runPartOne = true,
    runPartTwo = true,
  } = require(`./years/${year}/days/${day}.js`);
  const input = parseInput(
    fR.read(`./years/${year}/inputs/${day}${testing ? ".test" : ""}.txt`)
  );

  prototypeFunctions.addPrototypeFunctions();

  beforeAll && beforeAll(input);
  beforeEach && beforeEach(input);
  const partOneOutput = runPartOne ? partOne(input) : "Skipped";
  beforeEach && beforeEach(input);
  const partTwoOutput = runPartTwo ? partTwo(input) : "Skipped";

  console.log(`---- Day ${dayNumber} ${year} ----`);
  console.log(`Part 1: ${partOneOutput}`);
  console.log(`Part 2: ${partTwoOutput}`);
};

const dayNumberAdjusted = dayNumber < 10 ? "0" + dayNumber : dayNumber;

runForDay(dayNumberAdjusted);
