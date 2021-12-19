const { readdir } = require("fs");
const { linesFromRead, read } = require("../../../fileReader.js");

const parseInput = (input) => linesFromRead(input);

const HEX_TO_BIN_MAP = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const hexToBin = (hex) =>
  hex
    .split("")
    .map((h) => HEX_TO_BIN_MAP[h])
    .join("");

const binToNum = (bin) => parseInt(bin, 2);

const makeReader = (bin) => {
  let index = 0;
  let versions = [];

  function addVersion(version) {
    versions.push(version);
  }

  function getIndex() {
    return index;
  }

  function getVersions() {
    return versions;
  }

  function hasMore() {
    return index < bin.length;
  }

  function next(digits = 1) {
    let returnValue = "";
    for (let i = 0; i < digits; i++) {
      returnValue += bin[index++];
    }
    return returnValue;
  }

  return {
    addVersion,
    getIndex,
    getVersions,
    hasMore,
    next,
  };
};

const OP = {
  EQ: "EQ",
  GT: "GT",
  LITERAL: "LITERAL",
  LT: "LT",
  MAX: "MAX",
  MIN: "MIN",
  PRODUCT: "PRODUCT",
  SUM: "SUM",
};

const OPS = {
  0: OP.SUM,
  1: OP.PRODUCT,
  2: OP.MIN,
  3: OP.MAX,
  4: OP.LITERAL,
  5: OP.GT,
  6: OP.LT,
  7: OP.EQ,
};

const readStuff = (reader, lastIndex = Infinity) => {
  while (reader.hasMore() && reader.getIndex() < lastIndex) {
    // read 3 bits as version
    reader.addVersion(binToNum(reader.next(3)));

    // read 3 bits as ID
    const idType = OPS[binToNum(reader.next(3))];

    if (idType === OP.LITERAL) {
      let hasMoreBytes;
      let digits = "";
      do {
        // read 1 bit as has another chunk indicator
        hasMoreBytes = reader.next(1) == 1;

        // read 4 bits as data to convert
        digits += reader.next(4);
      } while (hasMoreBytes);

      // return the literal as base 10
      return binToNum(digits);
    }

    // read 1 bit as length type
    const lengthTypeId = reader.next(1);
    const readValues = [];

    if (lengthTypeId == 0) {
      // read 15 bits as length indicator (number of bits)
      const number = binToNum(reader.next(15));

      const end = reader.getIndex() + number;
      while (reader.getIndex() < end && reader.hasMore()) {
        // read single sub packet
        readValues.push(readStuff(reader, reader.getIndex() + 11));
      }
    } else {
      // read 11 bits as length indicator (number of operators)
      const number = binToNum(reader.next(11));

      for (let ops = 0; ops < number; ops++) {
        // read single operator
        readValues.push(readStuff(reader));
      }
    }

    switch (idType) {
      case OP.SUM:
        return readValues.map(Number)._sum();
      case OP.PRODUCT:
        return readValues.map(Number)._product();
      case OP.MIN:
        return readValues.map(Number)._min();
      case OP.MAX:
        return readValues.map(Number)._max();
      case OP.GT:
        return readValues[0] > readValues[1] ? 1 : 0;
      case OP.LT:
        return readValues[0] < readValues[1] ? 1 : 0;
      case OP.EQ:
        return readValues[0] == readValues[1] ? 1 : 0;
    }
  }
};

const partOne = ([input]) => {
  const binary = hexToBin(input);
  const reader = makeReader(binary);
  readStuff(reader);
  return reader.getVersions()._sum();
};

const partTwo = ([input]) => {
  const binary = hexToBin(input);
  const reader = makeReader(binary);
  return readStuff(reader);
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
