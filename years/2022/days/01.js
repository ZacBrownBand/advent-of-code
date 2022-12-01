const parseInput = (input) => {
  const elfs = [];
  let calories = 0;
  input.concat([undefined]).split('\n').forEach(
    (value) => {
      if (value > 0) {
        calories += +value;
      } else {
        elfs.push(calories);
        calories = 0;
      }
    }
  );
  return elfs.sort((a, b) => b-a);
};

const partOne = (elfs) => {
  return elfs[0];
};

const partTwo = (elfs) => {
  return elfs[0] + elfs[1] + elfs[2];
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
