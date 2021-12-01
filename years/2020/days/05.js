const seatMapping = [...Array(128)].map(_ => '.'.repeat(8).split(''));

const getPos = (str, lowChar, index, low, high) => {
  if (index === str.length) return low;

  const offset = (high - low + 1) / 2;

  return (str[index] === lowChar)
    ? getPos(str, lowChar, index + 1, low, high - offset) 
    : getPos(str, lowChar, index + 1, low + offset, high);
};

const getRow = (str) => getPos(str, 'F', 0, 0, 127);
const getCol = (str) => getPos(str, 'L', 0, 0, 7);
const getId = (row, col) => row * 8 + col;

const getSeatId = (seatInfo) => {
  const row = getRow(seatInfo.substring(0, 7));
  const col = getCol(seatInfo.substring(7));

  // track for part two
  seatMapping[row][col] = '#';

  return getId(row, col);
};

const partOne = (input) => Math.max(...input.map(getSeatId));

const partTwo = () => {
  const allSeats = seatMapping.map(r => r.join('')).join('');
  const firstSeat = allSeats.indexOf('#');
  const middleSectionSeats = allSeats.substring(firstSeat);
  const emptyMidSeat = middleSectionSeats.indexOf('.') + firstSeat;
  
  const col = emptyMidSeat % 8;
  const row = (emptyMidSeat - col) / 8;
  return getId(row, col);
};

module.exports = {
  partOne,
  partTwo
};
