const parseInput = (input) => {
  return input.split('\n')
    .map((line) => line.split(/[-,]/).map(Number));
};

const partOne = (pairs) => {
  return pairs.map((pairs) => {
    const [left_low, left_high, right_low, right_high] = pairs;
    if (left_low <= right_low && left_high >= right_high) {
      return 1;
    } 
    if (right_low <= left_low && right_high >= left_high) {
      return 1
    }
    return 0;
  })._sum();
};

const partTwo = (pairs) => {
  return pairs.map((pairs) => {
    const [left_low, left_high, right_low, right_high] = pairs;

    if (
      left_low <= right_low && left_high >= right_low ||
      left_low <= right_high && left_high >= right_high ||
      right_low <= left_low && right_high >= left_low ||
      right_low <= left_high && right_high >= left_high
    ) {
      return 1;
    }
    
    return 0;
  })._sum();
};

module.exports = {
  // beforeAll, // optional - function to run before the solutions are run
  // beforeEach, // optional - function to run before each solution
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
