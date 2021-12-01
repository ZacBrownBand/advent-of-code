const partOne = (input) => {
  input = input.map((inp) => Number(inp));

  let count = 0;
  let last = input[0];
  for (var i = 1, len = input.length; i < len; i++) {
    if (input[i] > last) {
      count++;
    }
    last = input[i];
  }
  return count;
};

const partTwo = (input) => {
  input = input.map((inp) => Number(inp));

  let count = 0;
  let last = input[0] + input[1] + input[2];
  let current;

  for (let i = 2; i < input.length - 1; i++) {
    current = input[i - 1] + input[i] + input[i + 1];
    if (current > last) {
      count++;
    }
    last = current;
  }

  return count;
};

module.exports = {
  partOne,
  partTwo,
};
