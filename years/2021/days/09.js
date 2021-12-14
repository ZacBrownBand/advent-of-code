const { linesFromRead } = require("../../../fileReader.js");

const parseInput = (input) =>
  linesFromRead(input).map((line) => line.split("").map(Number));

const isLowest = (values, row, col) => {
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (
        (r !== row || c !== col) &&
        r >= 0 &&
        c >= 0 &&
        r < values.length &&
        c < values[0].length &&
        values[row][col] >= values[r][c]
      ) {
        return false;
      }
    }
  }
  return true;
};

const getLowPoints = (values) => {
  const lowValues = [];
  for (let row = 0; row < values.length; row++) {
    for (let col = 0; col < values[0].length; col++) {
      if (isLowest(values, row, col)) {
        lowValues.push({ row, col });
      }
    }
  }
  return lowValues;
};

const getBasinSize = (values, point) => {
  const basinPoints = {};
  const exploreFromPoint = (row, col) => {
    const travelPoints = [
      { r: row + 1, c: col },
      { r: row - 1, c: col },
      { c: col + 1, r: row },
      { c: col - 1, r: row },
    ];

    travelPoints.forEach(({ r, c }) => {
      if (
        r >= 0 &&
        c >= 0 &&
        r < values.length &&
        c < values[0].length &&
        !basinPoints[`${r}-${c}`] &&
        values[r][c] < 9
      ) {
        basinPoints[`${r}-${c}`] = true;
        exploreFromPoint(r, c);
      }
    });
  };

  exploreFromPoint(point.row, point.col);

  return Object.keys(basinPoints).length;
};

const partOne = (values) => {
  return getLowPoints(values)
    .map(({ row, col }) => values[row][col])
    .map((n) => n + 1)
    ._sum();
};

const partTwo = (values) => {
  return getLowPoints(values)
    .map((loc) => getBasinSize(values, loc))
    .sort((a, b) => b - a)
    .slice(0, 3)
    ._product();
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
