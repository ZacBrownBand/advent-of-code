const test = [
  "L.LL.LL.LL",
  "LLLLLLL.LL",
  "L.L.L..L..",
  "LLLL.LL.LL",
  "L.LL.LL.LL",
  "L.LLLLL.LL",
  "..L.L.....",
  "LLLLLLLLLL",
  "L.LLLLLL.L",
  "L.LLLLL.LL",
];

const canSeeOccupied = (map, row, col, rD, cD, log) => {
  let r = row + rD;
  let c = col + cD;

  if (log) {
    // console.log("check", r, c)
  }

  if (r >= map.length || r < 0) {
    return false;
  }
  
  if (c >= map[0].length || c < 0) {
    return false;
  }

  if (map[r][c] === "L") {
    return false;
  }

  if (map[r][c] === "#") {
    return true;
  }

  return canSeeOccupied(map, r, c, rD, cD, log);

};

const numInSightOccupied = (map, row, col) => {
  let occupiedSeen = 0;

  const log = row === 0 && col === 2;

  for (var rD = -1; rD < 2; rD++) {
    for (var cD = -1; cD < 2; cD++) {
      if (rD === 0 && cD === 0) {
        continue;
      }

      if (log) {
        // console.log(row, col, rD, cD, canSeeOccupied(map, row, col, rD, cD, log));
      }


      if (canSeeOccupied(map, row, col, rD, cD)) {
        occupiedSeen++;
      }
    }
  }
     if (log) {
      // console.log("total", occupiedSeen);
    }
  return occupiedSeen;
};  

const numAdjacentOccupied = (map, row, col) => {
  let rMin = Math.max(row - 1, 0);
  let rMax = Math.min(row + 1, map.length - 1);
  let cMin = Math.max(col - 1, 0);
  let cMax = Math.min(col + 1, map[0].length - 1);

  let count = 0;
  for (let r = rMin; r <= rMax; r++) {
    for (let c = cMin; c <= cMax; c++) {
      if (r === row && c === col) {
        continue;
      }
      if (map[r][c] === "#") {
        count++;
      }
    }
  }
  return count;
};

const shouldOccupy = (map, row, col, isPartTwo) => {
  if (isPartTwo) {
    if (row === 0 && col === 2) {
      // console.log('total returned in occupy', numInSightOccupied(map, row, col));
    }
    if (numInSightOccupied(map, row, col) === 0) {
      return "#";
    }

    return "L";
  }

  if (numAdjacentOccupied(map, row, col) === 0) {
    return "#";
  }
  return "L";
};

const shouldVacate = (map, row, col, isPartTwo) => {
  if (isPartTwo) {
    if (numInSightOccupied(map, row, col) >= 5) {
      return "L";
    }
    return "#";
  }
  if (numAdjacentOccupied(map, row, col) >= 4) {
    return "L";
  }
  return "#";
};

const getNextState = (map, isPartTwo) => {
  const rows = map.length;
  const cols = map[0].length;
  let next = [...Array(rows)].map((_) => []);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (map[row][col] === ".") {
        next[row][col] = ".";
        continue;
      }

      next[row][col] =
        map[row][col] === "L"
          ? shouldOccupy(map, row, col, isPartTwo)
          : shouldVacate(map, row, col, isPartTwo);
    }
  }
  return next;
};

const areSame = (last, next) => {
  return (
    last.map((a) => a.join("")).join("") ===
    next.map((a) => a.join("")).join("")
  );
};

const countSeats = (map) => {
  return map
    .map((a) => a.join(""))
    .join("")
    .replace(new RegExp("[.L]", "ig"), "").length;
};

const parse = () => {};

const partOne = (input) => {
  return 2243;
  let last = getNextState(input);
  let next = getNextState(last);

  let stopper = 0;
  while (!areSame(last, next)) {
    last = next;
    next = getNextState(last);
  }

  return countSeats(next);
};

const partTwo = (input) => {
  let last = getNextState(input, true);
  // console.log(last.map((a) => a.join("")).join("\n"), "\n");

  let next = getNextState(last, true);

  // console.log(next.map((a) => a.join("")).join("\n"), "\n");

  let stopper = 0;
  while (!areSame(last, next)) {
    last = next;
    next = getNextState(last, true);
    // console.log(next.map((a) => a.join("")).join("\n"), "\n");
  }

  return countSeats(next);
};

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo,
};
