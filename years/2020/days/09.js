let inputs;
const beforeAll = (input) => inputs = input.map(Number);

const canSum = (key, arr, len) => {
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === key) {
        return true;
      }
    }
  }
  return false;
};

const checkRangeFrom = (i, inputs, key) => {
  let val = 0;
  let index = i;
  const nums = [];
  while (val < key) {
    nums.push(inputs[index]);
    val += inputs[index++];
  }

  if (val === key) {
    return Math.max(...nums) + Math.min(...nums);
  }
};

const partOne = () => {  
  const pm = 25;
  const q = [];
  let index = 0;

  for (let i = 0; i < pm; i++) {
    q.push(inputs[i]);
  }

  for (index = pm; index < inputs.length; index++) {
    if (!canSum(inputs[index], q, pm)) {
      return inputs[index];
    }
    q.push(inputs[index]);
    q.shift();
  }
};

const partTwo = () => {
  const key = partOne();
  for (var i = 0; i < inputs.length; i++) {
    const range = checkRangeFrom(i, inputs, key);
    if (range) {
      return range;
    }
  }
};

module.exports = {
  beforeAll,
  partOne,
  partTwo
};
