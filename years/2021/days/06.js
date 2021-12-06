const parseInput = (input) => {
  return arrayToNumOccurrencesMap(input.split(",").map(Number));
};

const arrayToNumOccurrencesMap = (arr) => {
  const map = {};
  arr.forEach((num) => {
    if (!map[num]) {
      map[num] = 0;
    }
    map[num]++;
  });
  return map;
};

const MAX_AGE = 8;
const RESET_AGE = 6;
const MIN_AGE = 0;

const getNextState = (currentState) => {
  const nextState = {};
  const currentAges = Object.keys(currentState);
  currentAges.forEach((age) => {
    if (age == MIN_AGE) {
      nextState[MAX_AGE] = currentState[MIN_AGE];
      nextState[RESET_AGE] = currentState[MIN_AGE];
    } else {
      nextState[age - 1] = (nextState[age - 1] || 0) + currentState[age];
    }
  });
  return nextState;
};

const getCount = (state) => {
  let count = 0;
  const keys = Object.keys(state);
  keys.forEach((key) => {
    count += state[key];
  });
  return count;
};

const runSimForXDays = (initialState, days) => {
  let nextState;
  for (var i = 1; i <= days; i++) {
    nextState = getNextState(nextState || initialState);
  }
  return getCount(nextState);
};

const partOne = (initialState) => runSimForXDays(initialState, 80);
const partTwo = (initialState) => runSimForXDays(initialState, 256);

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
