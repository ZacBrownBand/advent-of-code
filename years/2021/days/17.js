const parseInput = (input) => {
  const parts = input
    .replace("target area: x=", "")
    .replace("y=", "")
    .split(/, |\.\./)
    .map(Number);

  return {
    xMin: parts[0],
    xMax: parts[1],
    yMin: parts[2],
    yMax: parts[3],
  };
};

const MISS = {
  X_VEL_TOO_LOW: "X_VEL_TOO_LOW",
  LONG: "LONG",
  SHORT: "SHORT",
  MIDDLE: "MIDDLE",
};

const getHighestY = (velocity, target) => {
  function isInTarget(_x, _y) {
    return (
      _x >= target.xMin &&
      _x <= target.xMax &&
      _y >= target.yMin &&
      _y <= target.yMax
    );
  }

  let velX = velocity.x;
  let velY = velocity.y;
  let x = 0;
  let y = 0;
  let yHigh = 0;

  let xOnly = 0;
  let xOnlyV = velX;
  while (xOnlyV > 0 && xOnly < target.xMin) {
    xOnly += xOnlyV--;
  }

  if (xOnlyV === 0) {
    return MISS.X_VEL_TOO_LOW;
  }

  while (true) {
    if (isInTarget(x, y)) {
      return yHigh;
    }

    if (velX == 0 && x < target.xMin) {
      return MISS.X_VEL_TOO_LOW;
    }

    if (x > target.xMax && Math.abs(y) < Math.abs(target.yMin)) {
      return MISS.LONG;
    }

    if (y < target.yMin) {
      return x < target.xMin ? MISS.SHORT : MISS.MIDDLE;
    }

    x += velX;
    y += velY;

    velX = --velX < 0 ? 0 : velX;
    velY--;

    if (y > yHigh) {
      yHigh = y;
    }
  }
};

const partOne = (target) => {
  const defaultY = 0;

  let velX = 1;
  let velY = -500;
  let result;
  let max = -Infinity;

  let a = 0;
  while (true) {
    a++;
    if (a > 2000) {
      velX++;
      a = 0;
      velY = defaultY;
    }
    result = getHighestY({ x: velX, y: velY }, target);

    switch (result) {
      case MISS.X_VEL_TOO_LOW:
        velX++;
        a = 0;
        velY = defaultY;
        break;
      case MISS.LONG:
        if (velY == 0) {
          return max;
        }
        velX++;
        a = 0;
        velY = defaultY;
        break;
      case MISS.SHORT:
        velY++;
        break;
      case MISS.MIDDLE:
        velY++;
        break;
      default:
        if (result > max) {
          max = result;
        }
        velY++;
    }

    if (velX > target.xMax) {
      return max;
    }
  }
};

const partTwo = (target) => {
  let result;
  let valid = 0;

  for (let velX = 0; velX <= target.xMax; velX++) {
    if (getHighestY({ x: velX, y: 0 }, target) == MISS.X_VEL_TOO_LOW) continue;
    for (let velY = target.yMin; velY < 1000; velY++) {
      result = getHighestY({ x: velX, y: velY }, target);
      if (result == MISS.LONG) {
        break;
      }
      if (!MISS[result]) {
        valid++;
      }
    }
  }

  return valid;
};

module.exports = {
  beforeAll: Function.prototype,
  beforeEach: Function.prototype,
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
