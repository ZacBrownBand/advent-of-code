const { linesFromRead } = require("../../../fileReader.js");

const parseInput = (input) => {
  const lines = linesFromRead(input);
  const points = [];
  const folds = [];
  lines.forEach((line) => {
    if (line.length === 0) {
      return;
    }

    let parts;
    if (line[0] === "f") {
      parts = line.split(/fold along |=/);
      folds.push({
        axis: parts[1],
        value: Number(parts[2]),
      });
      return;
    }
    parts = line.split(",").map(Number);
    points.push({ x: parts[0], y: parts[1] });
  });

  return { points, folds };
};

const countUnique = (points) => {
  return new Set(points.map(({ x, y }) => `${x}--${y}`)).size;
};

const fold = (points, { axis, value: foldOn }) => {
  for (let i = points.length - 1; i >= 0; i--) {
    if (points[i][axis] === foldOn) {
      console.log("its on the line");
      return;
    }

    if (points[i][axis] > foldOn) {
      points[i][axis] -= (points[i][axis] - foldOn) * 2;
    }
  }
};

const print = (points) => {
  const xMax = Math.max(...points.map(({ x }) => x));
  const xMin = Math.min(...points.map(({ x }) => x));
  const yMax = Math.max(...points.map(({ y }) => y));
  const yMin = Math.min(...points.map(({ y }) => y));

  let str = "";
  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      if (points.find((p) => p.x === x && p.y === y)) {
        str += "#";
      } else {
        str += " ";
      }
    }
    str += "\n";
  }
  return str;
};

const partOne = ({ points, folds }) => {
  fold(points, folds[0]);

  return countUnique(points);
};

const partTwo = ({ points, folds }) => {
  folds.forEach((f) => {
    fold(points, f);
  });

  return `Must read from output\n\n${print(points)}`;
};

module.exports = {
  beforeAll: Function.prototype,
  beforeEach: Function.prototype,
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
