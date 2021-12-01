const range = [235741, 706948];

const getAllNumbersInRange = (low, high) => {
  const arr = new Array(high - low + 1);

  for (var i = 0; i <= high - low; i++) {
    arr[i] = '' + (i + low);
  }

  return arr;
};

const isValidOrder = (chars) => {
  for (let i = 0; i < 5; i++) {
    if (chars[i] - chars[i + 1] > 0) {
      return false;
    }
  }

  return true;
};

const isValidPair = (chars, hasSeenEnough) => {
  let ch = chars[0];
  let seen = 1;

  for (let i = 1; i < 6; i++) {
    if (ch === chars[i]) {
      seen++;
      continue;
    }

    if (hasSeenEnough(seen)) {
      return true;
    }

    ch = chars[i];
    seen = 1;
  }

  return hasSeenEnough(seen);
}

const isValidOne = (num) => isValidOrder(num) && isValidPair(num, (n) => n > 1);

const partOne = () =>
  getAllNumbersInRange(...range)
    .filter(isValidOne)
    .length;

const isValidTwo = (num) => isValidOrder(num) && isValidPair(num, (n) => n === 2);

const partTwo = () =>
  getAllNumbersInRange(...range)
    .filter(isValidTwo)
    .length;

module.exports = { partOne, partTwo };