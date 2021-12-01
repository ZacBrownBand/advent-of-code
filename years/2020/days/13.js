const { bigIntChineseRemainder } = require("../util/bigIntChineseRemainder.js");

let time;
let busses;

const parse = (input) => {
  time = Number(input[0]);
  busses = input[1].split(",").filter((v) => v != "x");
};

const partOne = (input) => {
  let wait = busses.map((n) => n - (time % n));
  const min = Math.min(...wait);
  let index = wait.indexOf(min);
  const bus = busses[index];
  return min * bus;
};

function modulo(x, m) {
  while (x < 0) {
    x += m;
  }
  return x % m;
}

const partTwo = (input) => {
  const buses = input[1]
    .split(",")
    .map((x, i) => [x, i])
    .filter(([x, i]) => x !== "x")
    .map(([x, i]) => [Number(x), i]);

  const busses = buses.map(([bus]) => bus);
  const posOffset = buses.map(([bus, position]) => modulo(-position, bus));
  return bigIntChineseRemainder(posOffset.map(BigInt), busses.map(BigInt));
};

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo,
};
