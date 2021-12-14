const { linesFromRead } = require("../../../fileReader.js");

const parseInput = (input) =>
  linesFromRead(input).map((line) => line.split("").map(Number));

const nextState = (state) => {
  for (let r = 0; r < state.length; r++) {
    for (let c = 0; c < state.length; c++) {
      state[r][c]++;
    }
  }

  const hasFlashed = {};

  function getReadyToFlash() {
    const ready = [];
    for (let r = 0; r < state.length; r++) {
      for (let c = 0; c < state.length; c++) {
        if (state[r][c] > 9 && !hasFlashed[`${r}--${c}`]) {
          ready.push({ r, c });
        }
      }
    }
    return ready;
  }

  function incrementNeighbors(r, c) {
    const points = [
      { r: r - 1, c: c - 1 },
      { r: r - 1, c },
      { r: r - 1, c: c + 1 },
      { r, c: c - 1 },
      { r, c: c + 1 },
      { r: r + 1, c: c - 1 },
      { r: r + 1, c },
      { r: r + 1, c: c + 1 },
    ];
    points.forEach((point) => {
      if (
        point.r > -1 &&
        point.r < state.length &&
        point.c > -1 &&
        point.c < state[0].length &&
        !hasFlashed[`${point.r}--${point.c}`]
      ) {
        state[point.r][point.c]++;
      }
    });
  }

  let readyToFlash = getReadyToFlash();

  while (readyToFlash.length) {
    readyToFlash.forEach(({ r, c }) => {
      state[r][c] = 0;
      hasFlashed[`${r}--${c}`] = true;
      incrementNeighbors(r, c);
    });

    readyToFlash = getReadyToFlash();
  }

  flashes = Object.keys(hasFlashed).length;

  return { state, flashes };
};

const partOne = (initialState) => {
  let state = JSON.parse(JSON.stringify(initialState));
  let totalFlashes = 0;
  const max = 100;
  for (let itt = 0; itt < max; itt++) {
    const next = nextState(state);
    state = next.state;
    totalFlashes += next.flashes;
  }

  return totalFlashes;
};
const partTwo = (initialState) => {
  let state = JSON.parse(JSON.stringify(initialState));
  const max = 10000;
  for (let itt = 1; itt < max; itt++) {
    const next = nextState(state);
    state = next.state;
    if (next.flashes === 100) {
      return itt;
    }
  }

  return "stopped";
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
