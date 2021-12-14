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

const calcTotalFuelUsed = (map, target, fuelCostType) => {
  let sum = 0;
  const allNumbers = Object.keys(map);

  allNumbers.forEach((num) => {
    const diff = Math.abs(target - num);
    const times = map[num];
    if (fuelCostType === "constant") {
      sum += diff * times;
    } else {
      let total = 0;
      for (var i = 0; i <= diff; i++) {
        total += i;
      }
      sum += total * times;
    }
  });

  return sum;
};

const findTargetNum = (map, strategy) => {
  const allNumbers = Object.keys(map);
  const min = Math.min(...allNumbers);
  const max = Math.max(...allNumbers);

  const costs = {};
  for (let itt = min; itt <= max; itt++) {
    costs[itt] = calcTotalFuelUsed(map, itt, strategy);
  }

  return Math.min(...Object.keys(costs).map((k) => costs[k]));
};

const partOne = (map) => findTargetNum(map, "constant");
const partTwo = (map) => findTargetNum(map, "linear");

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
