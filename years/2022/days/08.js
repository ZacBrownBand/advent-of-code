const parseInput = (input) => {
  return input.split('\n').map(line => line.split('').map(Number));
};

// ----- PART I -----

const checkFromLeft = (grid, canBeSeen) => {
  for (let x = 0; x < grid.length; x++) {
    let max = -1;
    for (let y = 0; y < grid.length; y++) {
      if (grid[x][y] > max) {
        max = grid[x][y];
        canBeSeen[`${x}_${y}`] = grid[x][y];
      }
    }
  }
}

const checkFromRight = (grid, canBeSeen) => {
  for (let x = 0; x < grid.length; x++) {
    let max = -1;
    for (let y = grid.length - 1; y >= 0; y--) {
      if (grid[x][y] > max) {
        max = grid[x][y];
        canBeSeen[`${x}_${y}`] = grid[x][y];
      }
    }
  }
}

const checkFromTop = (grid, canBeSeen) => {
  for (let y = 0; y < grid.length; y++) {
    let max = -1;
    for (let x = 0; x < grid.length; x++) {
      if (grid[x][y] > max) {
        max = grid[x][y];
        canBeSeen[`${x}_${y}`] = grid[x][y];
      }
    }
  }

}

const checkFromBottom = (grid, canBeSeen) => {
  for (let y = 0; y < grid.length; y++) {
    let max = -1;
    for (let x = grid.length - 1; x >= 0; x--) {
      if (grid[x][y] > max) {
        max = grid[x][y];
        canBeSeen[`${x}_${y}`] = grid[x][y];
      }
    }
  }
}

const partOne = (grid) => {
  const canBeSeen = {};

  checkFromLeft(grid, canBeSeen);
  checkFromRight(grid, canBeSeen);
  checkFromTop(grid, canBeSeen);
  checkFromBottom(grid, canBeSeen);

  return Object.keys(canBeSeen).length;
};

// ----- PART II -----

const checkRight = (grid, _x, _y) => {
  let viewCount = 0;
  for (let y = _y + 1; y < grid.length; y++) {
    viewCount++;
    if (grid[_x][y] >= grid[_x][_y]) {
      break;
    }
  }
  return viewCount;
};

const checkLeft = (grid, _x, _y) => {
  let viewCount = 0;
  for (let y = _y - 1; y >= 0; y--) {
    viewCount++;
    if (grid[_x][y] >= grid[_x][_y]) {
      break;
    }
  }
  return viewCount;
};

const checkUp = (grid, _x, _y) => {
  let viewCount = 0;
  for (let x = _x - 1; x >= 0; x--) {
    viewCount++;
    if (grid[x][_y] >= grid[_x][_y]) {
      break;
    }

  }
  return viewCount;
};

const checkDown = (grid, _x, _y) => {
  let viewCount = 0;
  for (let x = _x + 1; x < grid.length; x++) {
    viewCount++;
    if (grid[x][_y] >= grid[_x][_y]) {
      break;
    }

  }
  return viewCount;

};
const getScoreForTree = (...args) => {
  return checkRight(...args) *
    checkLeft(...args) *
    checkUp(...args) *
    checkDown(...args);
};

const partTwo = (grid) => {
  let best = -1;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      const curr = getScoreForTree(grid, x, y);
      if (curr > best) {
        best = curr;
      }
    }
  }
  return best;
};

module.exports = {
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
