const { linesFromRead } = require("../../../fileReader.js");

const parseInput = (input) => {
  const lines = linesFromRead(input);
  const pairs = {};
  lines
    .filter((l) => l.indexOf("-") > 0)
    .map((l) => l.split(" -> "))
    .forEach((parts) => {
      pairs[parts[0]] = parts[1];
    });

  return { template: lines[0], pairs };
};

const sim = (template, pairs) => {
  let next = "";
  for (let i = 0; i < template.length - 1; i++) {
    next += template[i];
    const pair = template[i] + template[i + 1];
    if (pairs[pair]) {
      next += pairs[pair];
    }
  }
  return next + template[template.length - 1];
};

const smartSim = (pairCounts, letterCounts, pairs) => {
  const newPairCounts = {};

  Object.keys(pairs).forEach((p) => {
    if (pairCounts[p]) {
      newPairCounts[p[0] + pairs[p]] =
        (newPairCounts[p[0] + pairs[p]] || 0) + pairCounts[p];
      newPairCounts[pairs[p] + p[1]] =
        (newPairCounts[pairs[p] + p[1]] || 0) + pairCounts[p];

      letterCounts[pairs[p]] = (letterCounts[pairs[p]] || 0) + pairCounts[p];
    }
  });

  return newPairCounts;
};

const partOne = ({ template, pairs }) => {
  let nextTemplate = template;
  for (let itt = 1; itt <= 10; itt++) {
    nextTemplate = sim(nextTemplate, pairs);
  }

  const freq = {};
  nextTemplate.split("").forEach((l) => (freq[l] = freq[l] + 1 || 1));
  const sortedNumbers = Object.values(freq).sort((a, b) => b - a);

  return sortedNumbers[0] - sortedNumbers.pop();
};

const partTwo = ({ template, pairs }) => {
  let nextTemplate = template;

  let letterCounts = {};
  let pairCounts = {};

  for (let i = 0; i < nextTemplate.length; i++) {
    const currentLetter = nextTemplate[i];
    letterCounts[currentLetter] = letterCounts[currentLetter] || 0;
    letterCounts[currentLetter]++;

    if (i === nextTemplate.length - 1) {
      continue;
    }

    const pair = nextTemplate[i] + nextTemplate[i + 1];
    pairCounts[pair] = pairCounts[pair] || 0;
    pairCounts[pair]++;
  }

  for (let itt = 1; itt <= 40; itt++) {
    pairCounts = smartSim(pairCounts, letterCounts, pairs);
  }

  const sortedNumbers = Object.values(letterCounts).sort((a, b) => b - a);
  return sortedNumbers[0] - sortedNumbers.pop();
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
