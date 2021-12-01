
const doOp = (values, index) => {
  const readValue = (index) => +values[index];
  const writeValue = (index, value) => values[index] = value;

  const opCode = index < values.length && readValue(index);
  
  if (opCode === 99) return false;

  const indexA = readValue(index + 1);
  const indexB = readValue(index + 2);
  const indexResult = readValue(index + 3);
  
  switch (opCode) {
    case 1:
      writeValue(indexResult, readValue(indexA) + readValue(indexB));
      return true;
    case 2:
      writeValue(indexResult, readValue(indexA) * readValue(indexB));
      return true;
    default:
      return false;
  } 
}

const partOne = ([input], noun = 12, verb = 2) => {
  let values = input.split(',');
  let index = 0;

  values[1] = noun;
  values[2] = verb;

  while (doOp(values, index)) index += 4;

  return values[0];
}

const partTwo = (input) => {
  const target = 19690720;
  const lowerBound = 0;
  const upperBound = 100;

  for (let noun = lowerBound; noun < upperBound; noun++) {
    for (let verb = lowerBound; verb < upperBound; verb++) {
      if (partOne(input, noun , verb) === target) {
        return 100 * noun + verb;
      }
    }
  }

  return 'NaN';
}

module.exports = { partOne, partTwo };
