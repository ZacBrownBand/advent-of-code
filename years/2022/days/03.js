const charToScore = (char) => {
  const upperOffset =  'A'.charCodeAt(0) - 1 - 26;
  const lowerOffset = 'a'.charCodeAt(0) - 1;
  const charCode = char.charCodeAt(0);
  return charCode <= 'Z'.charCodeAt(0) ? charCode - upperOffset : charCode - lowerOffset;
};

const partOne = (lines) => {
  return lines.map((item) => {
    const group1 = new Set(item.substring(0, item.length / 2)); 
    const group2 = new Set(item.substring(item.length / 2));
    const intersection = group1._intersection(group2);
    return charToScore(intersection.values().next().value);
  })._sum();
};

const partTwo = (lines) => {
  const sets = lines.map(line => new Set(line));

  let sum = 0;
  for (let i = 0; i < sets.length; i++) {
    const intersection = sets[i]._intersection(sets[++i])._intersection(sets[++i]);
    sum += charToScore(intersection.values().next().value);
  };
  return sum;
};

module.exports = {
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};