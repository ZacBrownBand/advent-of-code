const parseInput = (input) => {
  return input.split('\n')
    .map(line => 
      line[0] === 'a' ? Number(line.split(' ').pop()) : 0
    );
};

const sim = (nums) => {
  let register = 1;
  const registerHistory = [register];
  const display = getDisplay();
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      registerHistory.push(register);
      display.print(register);

      registerHistory.push(register);
      display.print(register);

      register += nums[i];
    } else {
      registerHistory.push(register);
      display.print(register);
    }
  }

  return { registerHistory, display };
};

const getDisplay = () => {
  const screen = [];
  let pixel = 0;
  const print = (register) => {    
    screen.push(Math.abs(pixel % 40 - register) < 2 ? '#' : '.');
    pixel++;
  };

  const render = () => {
    let str = '\n';
    for (let i = 0; i < 240; i += 40) {
      str += screen.slice(i, i + 40).join('') + '\n';
    }
    return str;
  }

  return { print, render };
};

const partOne = (nums) => { 
  const { registerHistory } = sim(nums);

  return [20, 60, 100, 140, 180, 220].map(c => {
    return registerHistory[c] * c;
  })._sum();
};

const partTwo = (nums) => {
  return sim(nums).display.render();
};

module.exports = {
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
