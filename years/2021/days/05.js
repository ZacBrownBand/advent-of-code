const { linesFromRead } = require("../../../fileReader.js");

const parseInput = (input) =>
  linesFromRead(input)
    .map((line) => line.split(/ -> |,/).map(Number))
    .map(([x1, y1, x2, y2]) => {
      return {
        x1,
        x2,
        y1,
        y2,
        isLinear: x1 == x2 || y1 == y2,
      };
    });

const getPointsInLine = ({ x1, x2, y1, y2 }) => {
  const points = [];
  const deltaX = x1 < x2 ? 1 : -1;
  const deltaY = y1 < y2 ? 1 : -1;

  if (x1 === x2) {
    for (let i = 0; i <= Math.abs(y2 - y1); i++) {
      points.push({ x: x1, y: y1 + i * deltaY });
    }
  } else if (y1 === y2) {
    for (let i = 0; i <= Math.abs(x2 - x1); i++) {
      points.push({ x: x1 + i * deltaX, y: y1 });
    }
  } else {
    for (let i = 0; i <= Math.abs(x2 - x1); i++) {
      points.push({ x: x1 + i * deltaX, y: y1 + i * deltaY });
    }
  }
  return points;
};

const getHighestX = (lines) =>
  Math.max(...lines.map(({ x1, x2 }) => Math.max(x1, x2)));

const getHighestY = (lines) =>
  Math.max(...lines.map(({ y1, y2 }) => Math.max(y1, y2)));

const findDangerAreas = (lines) => {
  let allPoints = Array(getHighestY(lines) + 1)
    .fill()
    .map(() => Array(getHighestX(lines) + 1).fill(0));

  let count = 0;
  lines.forEach((line) => {
    getPointsInLine(line).forEach(({ x, y }) => {
      allPoints[y][x]++;
      if (allPoints[y][x] == 2) {
        count++;
      }
    });
  });

  return count;
};

const partOne = (input) => {
  const linearLines = input.filter(({ isLinear }) => isLinear);
  return findDangerAreas(linearLines);
};

const partTwo = findDangerAreas;

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
