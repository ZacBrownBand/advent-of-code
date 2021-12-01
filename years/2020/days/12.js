const test = ["F10", "N3", "F7", "R90", "F11"];

const parse = () => {};

const dirs = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};

const getAbsoluteDir = (direction) => {
  return dirs[direction];
};

const partOne = (input) => {
  let direction = 90;
  let x = 0;
  let y = 0;
  let instr;
  let number;
  input.forEach((d) => {
    [instr, ...number] = d.split("");
    number = Number(number.join(""));

    if (instr === "F") {
      instr = getAbsoluteDir(direction);
    }
    switch (instr) {
      case "N":
        y += number;
        break;
      case "S":
        y -= number;
        break;
      case "W":
        x -= number;
        break;
      case "E":
        x += number;
        break;
      case "L":
        direction -= number;
        direction = (direction + 360) % 360;
        break;
      case "R":
        direction += number;
        direction = direction % 360;
        break;
    }
  });

  return Math.abs(x) + Math.abs(y);
};

const rotateR = (headingX, headingY, num) => {
  let lastX;
  let lastY;

  for (let i = 0; i < num; i++) {
    lastX = headingX;
    lastY = headingY;

    headingX = lastY;
    headingY = -lastX;
  }

  return [headingX, headingY];
};

const rotateL = (headingX, headingY, num) => {
  let lastX;
  let lastY;

  for (let i = 0; i < num; i++) {
    lastX = headingX;
    lastY = headingY;

    headingY = lastX;
    headingX = -lastY;
  }

  return [headingX, headingY];
};

const partTwo = (input) => {
  // input = test;
  let headingX = 10;
  let headingY = 1;
  let x = 0;
  let y = 0;
  let instr;
  let number;
  let rotations;
  input.forEach((d) => {
    [instr, ...number] = d.split("");
    number = Number(number.join(""));

    switch (instr) {
      case "N":
        headingY += number;
        break;
      case "S":
        headingY -= number;
        break;
      case "W":
        headingX -= number;
        break;
      case "E":
        headingX += number;
        break;
      case "L":
        rotations = number / 90;
        [headingX, headingY] = rotateL(headingX, headingY, rotations);
        break;
      case "R":
        rotations = number / 90;
        [headingX, headingY] = rotateR(headingX, headingY, rotations);
        break;
      case "F":
        x += number * headingX;
        y += number * headingY;
    }
    console.log(d, x, y, headingX, headingY);
  });

  // 178450 too high
  // 22848
  return Math.abs(x) + Math.abs(y);
};

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo,
};
