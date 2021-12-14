const PART_ONE_SCORE = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
const getPartOneScore = (char) => PART_ONE_SCORE[char];

const getPartTwoScore = (chars) => {
  let score = 0;
  chars.split("").forEach((char) => {
    score *= 5;
    score += CLOSING_CHARS.indexOf(char) + 1;
  });
  return score;
};

const OPENING_CHARS = ["(", "[", "{", "<"];
const CLOSING_CHARS = [")", "]", "}", ">"];

const isOpening = (char) => OPENING_CHARS.includes(char);
const isClosing = (char) => CLOSING_CHARS.includes(char);

const getPartner = (char) => CLOSING_CHARS[OPENING_CHARS.indexOf(char)];

const getCorruptChar = (line) => {
  const stack = [];
  for (let char of line) {
    if (isOpening(char)) {
      stack.push(char);
    } else {
      const shouldMatch = stack.pop();
      if (OPENING_CHARS.indexOf(shouldMatch) !== CLOSING_CHARS.indexOf(char)) {
        return char;
      }
    }
  }
};

const getMissingChars = (line) => {
  const stack = [];
  for (let char of line) {
    if (isOpening(char)) {
      stack.push(char);
    } else {
      stack.pop();
    }
  }
  return stack.map(getPartner).reverse().join("");
};

const partOne = (codeLines) => {
  return codeLines
    .map(getCorruptChar)
    .filter((corruptChar) => !!corruptChar)
    .map(getPartOneScore)
    ._sum();
};

const partTwo = (codeLines) => {
  return codeLines
    .filter((line) => !getCorruptChar(line))
    .map(getMissingChars)
    .map(getPartTwoScore)
    .sort((a, b) => b - a)
    ._middle();
};

module.exports = {
  beforeAll: Function.prototype,
  beforeEach: Function.prototype,
  parseInput: undefined,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
