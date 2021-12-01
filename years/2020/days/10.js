let nums;
const parse = (input) => {
  nums = input.map(Number).sort((a, b) => a - b);
  nums = [0, ...nums, (Math.max(...nums) + 3)];
};

const partOne = () => {
  let i = 0;
  let j = 1;

  const jumps = [0,0,0,0];

  while (j < nums.length) {
    jumps[nums[j++] - nums[i++]]++;
  }

  return jumps[1] * jumps[3];

};

const findNext = (index, gap) => {
  if (gap >= nums.length) {
    return 0;
  }

  const target = nums[index] + gap;
  const next = nums.indexOf(target);
  if (next > -1) {
    if (next === nums.length - 1) {
      return 1;
    }

    return findNext(next, 1) + findNext(next, 2) + findNext(next, 3);
  }

  return 0;
};

const partTwo = () => {
  // return findNext(0, 1, '') + findNext(0, 2, '') + findNext(0, 3, '');
 const ways = {};

 nums.forEach(num => {
  ways[num] = 0;
 });

  const reversedNums = [...nums].reverse();

  ways[reversedNums[0]] = 1;

  reversedNums.forEach((num) => {
    let all = 0;
    nums.forEach(
      jump => {
        if (jump > num && jump - num <= 3) {
           all += ways[jump];
        } 
      }
    );
    
    ways[num] += all;
  });

  return ways[0];

};

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo
};