const parseInput = (input) => {
  const lines = input.split('\n');

  const moves = lines.filter(line => line[0] === 'm').map(move => {
    const nums = move.replace('move ', '').replace(' from ', ',').replace(' to ', ',').split(',').map(Number);
    return {
      count: nums[0],
      from:  nums[1] - 1,
      to:  nums[2] - 1,
    };
  })
  
  const rowsNumbers = lines.filter(line => line[1] === '1')[0].split(' ').filter(a => a !== '');
  const numRows = parseInt(rowsNumbers[rowsNumbers.length - 1]);

  const state = Array(numRows).fill([]);
  const containers = lines.filter(line => line[0] === '[' || (line[0] === ' ' && line[1] !== '1'  && line.length));
   
  for (let i = containers.length - 1; i >=0; i--) {
    for (let col = 1; col < numRows * 4; col+=4) {
      const box = containers[i][col];
      if (box !== ' ') {
        state[(col - 1) / 4].push(box)
      }
    }
  }

  return { 
    moves,
    state
  }

};

const partOne = ({moves, state}) => {
  const containers = JSON.parse(JSON.stringify(state));
  moves.forEach((move) => {
      for (let i = 0; i < move.count; i++) {
        containers[move.to].push(containers[move.from].pop())
      }
  });
  return containers.map(stack => stack.pop()).join('');
};

const partTwo = ({moves, state}) => {
  const containers = JSON.parse(JSON.stringify(state));
  moves.forEach((move) => {
    const pivot = [];
    for (let i = 0; i < move.count; i++) {
      pivot.push(containers[move.from].pop())
    }
    for (let i = 0; i < move.count; i++) {
      containers[move.to].push(pivot.pop())
    }
  });
  return containers.map(stack => stack.pop()).join('');
};

module.exports = {
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};