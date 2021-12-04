const { linesFromRead } = require("../../../fileReader.js");

const BOARD_SIZE = 5;
const integers = [];

const parseInput = (input) => {
  const lines = linesFromRead(input);
  const numbers = lines[0].split(",").map(Number);
  const boards = [];

  const parseBoardLine = (line) => {
    const numbers = [];
    for (var i = 0; i < line.length; i += 3) {
      const num = parseInt(line[i] + "" + line[i + 1], 10);
      numbers.push(integers[num]);
    }
    return numbers;
  };

  for (var i = 0; i < 100; i++) {
    integers[i] = {
      value: i,
      called: false,
    };
  }

  for (var i = 1; i < lines.length; i += BOARD_SIZE) {
    let board = [];
    i++; // empty line of input
    for (let j = i; j < i + BOARD_SIZE; j++) {
      board.push(parseBoardLine(lines[j]));
    }
    boards.push(board);
  }

  return {
    numbers,
    boards,
  };
};

const checkBoardForWin = (board) => {
  // any row wins
  if (board.some((row) => row.every(({ called }) => called === true))) {
    return true;
  }

  // columns
  let colLose;
  for (let col = 0; col < BOARD_SIZE; col++) {
    colLose = false;
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (board[row][col].called === false) {
        colLose = true;
      }
    }
    if (!colLose) {
      return true;
    }
  }

  return false;
};

const callNumber = (number) => {
  integers[number].called = true;
};

const calcScore = (board) => {
  let sum = 0;
  board.forEach((row) =>
    row.forEach((integer) => {
      sum += integer.called ? 0 : integer.value;
    })
  );
  return sum;
};

const printBoard = (b) => {
  console.log(
    b
      .map((row) =>
        row
          .map((ints) => {
            const num = ints.value < 10 ? "0" + ints.value : ints.value;
            return ints.called ? `-${num}-` : ` ${num} `;
          })
          .join(" ")
      )
      .join("\n")
  );
};

const partOne = ({ numbers, boards }) => {
  let numberIndex = -1;
  let winners = [];
  while (winners.length === 0 && numberIndex < numbers.length) {
    callNumber(numbers[++numberIndex]);
    winners = boards.filter(checkBoardForWin);
  }

  const winner = winners[0];
  const score = calcScore(winner);
  const winningNumber = numbers[numberIndex];
  return score * winningNumber;
};

const partTwo = ({ numbers, boards }) => {
  let numberIndex = -1;
  let notYetWon = boards;
  while (notYetWon.length > 1 && numberIndex < numbers.length) {
    callNumber(numbers[++numberIndex]);
    notYetWon = boards.filter((...args) => !checkBoardForWin(...args));
  }

  const indexOfBoardLastToWin = boards.indexOf(notYetWon[0]);

  while (notYetWon.length > 0 && numberIndex < numbers.length) {
    callNumber(numbers[++numberIndex]);
    notYetWon = boards.filter((...args) => !checkBoardForWin(...args));
  }

  const lastToWin = boards[indexOfBoardLastToWin];
  const score = calcScore(lastToWin);
  const winningNumber = numbers[numberIndex];

  return score * winningNumber;
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
