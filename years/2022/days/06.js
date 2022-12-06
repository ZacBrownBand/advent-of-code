const partOne = (chars) => {
  for (let i = 0; i < chars.length - 4; i++) {
    const set = new Set(chars.substring(i, i + 4));
    if (set.size === 4) {
      return i + 4;
    }
  }
};

const partTwo = (chars) => {
  for (let i = 0; i < chars.length - 14; i++) {
    const set = new Set(chars.substring(i, i + 14));
    if (set.size === 14) {
    return i + 14;
    }
  }
};

module.exports = {
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
