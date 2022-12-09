const parseInput = (input) => {
  return input.split('\n');
};

const moveHeadPosition = (headPosition, dir) => {
  if (dir === 'R') {
    headPosition.x++;
  } else if (dir === 'L') {
    headPosition.x--;
  } else if (dir === 'U') {
    headPosition.y++
  } else {
    headPosition.y--;
  }
};

const follow = (tailPosition, headPosition) => {
  let dX = headPosition.x - tailPosition.x;
  let dY = headPosition.y - tailPosition.y;
  
  if (Math.abs(dX) > 1) {
    if (dX > 0) {
      tailPosition.x++;
    } else {
      tailPosition.x--;
    }
    if (Math.abs(dY) > 0) {
      if (dY > 0) {
        tailPosition.y++;
      } else {
        tailPosition.y--;
      }
    }
  } else if (Math.abs(dY) > 1) {
    if (dY > 0) {
      tailPosition.y++;
    } else {
      tailPosition.y--;
    }
    if (Math.abs(dX) > 0) {
      if (dX > 0) {
        tailPosition.x++;
      } else {
        tailPosition.x--;
      }
    }
  }
}

const simRope = (lines, segments) =>  {
  const tVisited = {};
  const rope = new Array(segments).fill(0).map(() => {
    return {
      x: 0,
      y: 0
  }});

  lines.forEach(instruction => {
    const numberOfSteps = +instruction.match(/\d+/g).pop();

    for (let step = 0; step < numberOfSteps; step++) {
      moveHeadPosition(rope[0], instruction[0]);

      for (let segment = 1; segment < rope.length; segment++) {
        follow(rope[segment], rope[segment-1]);
      }

      tVisited[`${rope[rope.length - 1].x}_${rope[rope.length - 1].y}`] = true;
    }
  });
  return Object.keys(tVisited).length;
};

const partOne = (lines) => simRope(lines, 2);
const partTwo = (lines) => simRope(lines, 10);

module.exports = {
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
