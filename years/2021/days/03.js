const getMostCommonArray = (data, searchFor = 0) => {
  const count = data[0].split("").map((_) => 0);
  for (const inp of data) {
    for (let i = 0; i < inp.length; i++) {
      count[i] += inp[i] == searchFor ? 1 : 0;
    }
  }
  return count;
};

const partOne = (input) => {
  const zeroCounts = getMostCommonArray(input, 0);

  let mostCommon = "";
  let leastCommon = "";
  for (var i = 0; i < input[0].length; i++) {
    const zeroIsCommon = zeroCounts[i] > input.length - zeroCounts[i];
    mostCommon += zeroIsCommon ? "0" : "1";
    leastCommon += zeroIsCommon ? "1" : "0";
  }

  return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
};

const partTwoSub = (input, type) => {
  const map = {};
  for (var i = 0; i < input.length; i++) {
    map[i] = true;
  }

  let indexes = [];
  let itt = -1;
  while (Object.keys(map).length != 1 && ++itt < input[0].length) {
    indexes = [];
    const keys = Object.keys(map);
    let zeroCount = 0;

    for (key of keys) {
      if (map[key] == true) {
        indexes.push(key);
        if (input[key][itt] == 0) {
          zeroCount++;
        }
      }
    }

    const zeroIsCommon = zeroCount > indexes.length - zeroCount;
    for (let key of keys) {
      if (map[key] == true) {
        const value = input[key][itt];
        const target =
          type == "o2" ? (zeroIsCommon ? "1" : "0") : zeroIsCommon ? "0" : "1";
        if (value == target) {
          delete map[key];
        }
      }
    }
  }

  return parseInt(input[Object.keys(map)[0]], 2);
};

const partTwo = (input) => {
  return partTwoSub(input, "o2") * partTwoSub(input, "co2");
};

module.exports = {
  beforeEach: undefined,
  beforeAll: undefined,
  parseInput: undefined,
  testing: false,
  partOne,
  partTwo,
  runPartOne: true,
  runPartTwo: true,
};
