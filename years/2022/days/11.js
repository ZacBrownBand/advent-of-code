const getMonkey = ([_, staringItems, operation, testInput, ifTrue, ifFalse]) => {
  const [operator, value] = operation.replace('  Operation: new = old ', '').split(' ').map(v => isNaN(v) ? v : Number(v));
  const devideBy = Number(testInput.replace('  Test: divisible by ', ''));
  
  const calculateWorry = (level) => {
    const ops = {
      '+': (a, b) => a + b, 
      '*': (a, b) => a * b,  
    };
    const numbers = isNaN(value) ? [level, level ] : [level, value];
    return ops[operator](...numbers);
  };

  return {
      items: staringItems.match(/\d+/g).map(Number),
      calculateWorry,
      testWorry: (worry) => worry % devideBy === 0,
      trueMonkey: Number(ifTrue[ifTrue.length - 1]),
      falseMonkey: Number(ifFalse[ifFalse.length - 1]),
      devideBy
    };
};

const getMonkeyFromInput = (_lines) => {
  const lines = JSON.parse(JSON.stringify(_lines));
  lines.push('');
  let buffer = [];
  const monkeys = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 1) {
      buffer.push(lines[i]);
    } else {
      monkeys.push(getMonkey(buffer));
      buffer = [];
    }
  }
  return monkeys;
};

const processMonkey = (monkeys, number, hardCap) => {
  const monkey = monkeys[number];
  const inpections = monkey.items.length;
  while (monkey.items.length) {
    let worryLevel = monkey.calculateWorry(monkey.items.shift());

    if (hardCap) {
      worryLevel = worryLevel % hardCap;
    } else {
      worryLevel = Math.floor(worryLevel / 3);
    }

    const destination = monkey.testWorry(worryLevel) ? monkey.trueMonkey : monkey.falseMonkey;
    monkeys[destination].items.push(worryLevel);
  }
  return inpections;
};

const sim = (input, rounds, useHardCap) => {
  const monkeys = getMonkeyFromInput(input);
  const inpections = new Array(monkeys.length).fill(0);

  let hardCap = 0;
  if (useHardCap) {
    hardCap = 1;
    monkeys.forEach(m => hardCap *= m.devideBy);
  }

  for (let round = 0; round < rounds; round++) {
    for (let m = 0; m < monkeys.length; m++) {
      inpections[m] += processMonkey(monkeys, m, hardCap);
    }  
  } 

  return inpections.sort((a, b) => b - a).slice(0, 2)._product();
};

const partOne = (input) => sim(input, 20);
const partTwo = (input) => sim(input, 10000, true);

module.exports = {
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};