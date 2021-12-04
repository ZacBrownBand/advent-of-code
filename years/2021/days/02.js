const convertInput = (input, useTestData = false) => {
  if (useTestData) {
    input = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];
  }
  return input.map((inp) => {
    const parts = inp.split(" ");
    return {
      direction: inp[0],
      value: Number(parts[1]),
    };
  });
};

const partOne = (input) => {
  moves = convertInput(input, false);

  let x = 0;
  let y = 0;
  for (move of moves) {
    if (move.direction === "f") {
      x += move.value;
    } else if (move.direction === "u") {
      y -= move.value;
    } else if (move.direction === "d") {
      y += move.value;
    }
  }
  return x * y;
};

const partTwo = (input) => {
  moves = convertInput(input, false);

  let x = 0;
  let y = 0;
  let aim = 0;
  for (move of moves) {
    if (move.direction === "f") {
      x += move.value;
      y += move.value * aim;
    } else if (move.direction === "u") {
      aim -= move.value;
    } else if (move.direction === "d") {
      aim += move.value;
    }
  }
  return x * y;
};

module.exports = {
  partOne,
  partTwo,
};
