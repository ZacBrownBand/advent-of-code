const { linesFromRead } = require("../../../fileReader.js");

const toSnailNumber = (raw, index = 0) => {
  function getNextNumber(depth) {
    if (raw[index] === "," || raw[index] === "]") {
      index++;
      return getNextNumber(depth);
    }

    if (raw[index] === "[") {
      index++;
      return {
        depth,
        left: getNextNumber(depth + 1),
        right: getNextNumber(depth + 1),
      };
    }

    return raw[index++];
  }

  return getNextNumber(0);
};

const convert = (line) =>
  line.split("").map((el) => (isNaN(el) ? el : Number(el)));

const parseInput = (input) => linesFromRead(input).map(convert);

const attemptToReduce = (eq) => {
  let pointer = 0;
  let depth = 0;
  let hasDepthIssue = false;
  let hasValueIssue = false;

  while (!hasDepthIssue && pointer < eq.length - 1) {
    if (eq[pointer] === "[") {
      depth++;
    } else if (eq[pointer] === "]") {
      depth--;
    }

    if (
      depth > 4 &&
      !isNaN(eq[pointer + 1]) &&
      eq[pointer + 2] === "," &&
      !isNaN(eq[pointer + 3])
    ) {
      hasDepthIssue = true;
    } else {
      pointer++;
    }
  }

  if (hasDepthIssue) {
    const removed = eq.splice(pointer, 5);
    eq.splice(pointer, 0, 0);

    for (let i = pointer + 1; i < eq.length - 1; i++) {
      if (!isNaN(eq[i])) {
        eq[i] += removed[3];
        break;
      }
    }

    for (let i = pointer - 1; i >= 0; i--) {
      if (!isNaN(eq[i])) {
        eq[i] += removed[1];
        break;
      }
    }
  } else {
    for (let i = 0; i < eq.length - 1; i++) {
      if (!isNaN(eq[i]) && eq[i] > 9) {
        hasValueIssue = true;
        pointer = i;
        break;
      }
    }

    if (hasValueIssue) {
      const removed = eq.splice(pointer, 1);
      eq.splice(
        pointer,
        0,
        "[",
        Math.floor(removed[0] / 2),
        ",",
        Math.ceil(removed[0] / 2),
        "]"
      );
    }
  }

  return {
    sum: eq,
    continue: hasDepthIssue || hasValueIssue,
  };
};

const add = (a, b) => ["[", ...a, ",", ...b, "]"];

const getMagnitude = (eq) => {
  const root = toSnailNumber(eq.join(""));

  const calcMag = (node) => {
    let left = isNaN(node.left) ? calcMag(node.left) : node.left;
    let right = isNaN(node.right) ? calcMag(node.right) : node.right;
    return left * 3 + right * 2;
  };

  return calcMag(root);
};

const addAndReduce = (a, b) => {
  let sum = add(a, b);

  let run = true;
  while (run) {
    const value = attemptToReduce(sum);
    sum = value.sum;
    run = value.continue;
  }

  return sum;
};

const partOne = (lines) => {
  let index = 0;
  let sum = lines[index++];

  while (index < lines.length) {
    sum = addAndReduce(sum, lines[index++]);
  }

  return getMagnitude(sum);
};

const partTwo = (lines) => {
  let maxMag = -Infinity;
  let nextMag;

  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = i; j < lines.length - 1; j++) {
      nextMag = getMagnitude(addAndReduce(lines[i], lines[j]));
      if (nextMag > maxMag) {
        maxMag = nextMag;
      }

      nextMag = getMagnitude(addAndReduce(lines[j], lines[i]));
      if (nextMag > maxMag) {
        maxMag = nextMag;
      }
    }
  }

  return maxMag;
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
