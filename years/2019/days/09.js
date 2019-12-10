const modes = {
  relative: 2,
  immediate: 1,
  position: 0,
};

let log;
let relativeIndex = 0;

const output = (value) => {
  value && log.push(value);
};

const getOpcodeAndParams = (opCodeRawParam) => {
  opCodeRaw = '' + opCodeRawParam;

  let opCode = '';
  let params = [0, 0, 0];

  if (opCodeRaw.length === 1 || opCodeRaw.length === 2) {
    opCode = +opCodeRaw;
  } else {
    opCode = Number(opCodeRaw[opCodeRaw.length - 2] + '' + opCodeRaw[opCodeRaw.length - 1]);

    let pIndex = 0;
    for (var i = opCodeRaw.length - 3; i >= 0; i--) {
      params[pIndex++] = (+opCodeRaw[i]);
    }
  }

  return { opCode, params };
};

const getValueWithMode = ({readValue, mode, index}) => {
  const immediate = readValue(index);
  if (mode === modes.position) {
    return readValue(immediate);
  }
  if (mode === modes.relative) {
    return readValue(relativeIndex + immediate);
  }
  return immediate;
};

const doMathOp = ({index, params, operation, readValue, writeValue}) => {
  const a = getValueWithMode({readValue, index: index + 1, mode: params[0]});
  const b = getValueWithMode({readValue, index: index + 2, mode: params[1]});

  const indexResult = readValue(index + 3);

  if (params[2] === modes.relative) {
    writeValue(relativeIndex + indexResult, operation(a, b));
  } else if (params[2] === modes.position) {
    writeValue(indexResult, operation(a, b));
  }

  return [true, index + 4];
};

const doComparWriteOp = ({index, params, operation, readValue, writeValue}) => {
const indexResult = readValue(index + 3);
  const a = getValueWithMode({readValue, index: index + 1, mode: params[0]});
  const b = getValueWithMode({readValue, index: index + 2, mode: params[1]});

  if (params[2] === modes.relative) {
    writeValue(relativeIndex + indexResult, operation(a, b) ? 1 : 0);
  } else if (params[2] === modes.position) {
    writeValue(relativeIndex + indexResult, operation(a, b) ? 1 : 0);
  }

  writeValue(indexResult, operation(a, b) ? 1 : 0);
  return [true, index + 4];
};

const doSeekOp = ({index, params, operation, readValue}) => {
  const valueA = getValueWithMode({readValue, mode: params[0], index: index + 1});
  
  if (operation(valueA)) {
    const valueB = getValueWithMode({readValue, mode: params[1], index: index + 2});

    return [true, valueB];
  }

  return [true, index + 3];
};

const doReadOp = ({writeValue, readValue, index, giveInput, params}) => {
  if (params[0] === modes.relative) {
    writeValue(relativeIndex + readValue(index + 1), giveInput());
  } else if (params[0] === modes.position) {
    writeValue(readValue(index + 1), giveInput());
  }
  
  return [true,  index + 2];
}

const doWriteOp = ({writeValue, readValue, index, params}) => {
  output(getValueWithMode({readValue, mode: params[0], index: index + 1}));
  return [true,  index + 2];
};
const extendedMemory = {};

const doOp = (values, index, giveInput) => {
  const readValue = (index) => {
    if (index > values.length) {
      return +extendedMemory[index];
    } else {
      return +values[index];
    }
  }
  const writeValue = (index, value) => {
    if (+index > +values.length) {
      extendedMemory[index] = value;
    } else {
      values[index] = value;
    }
  };

  const { opCode, params } = getOpcodeAndParams(values[index]);
  const defualtArgs = {index, params, readValue, giveInput, writeValue};
  let operation;

  switch (opCode) {
    case 1:
      operation = (value1, value2) => value1 + value2;
      return doMathOp({ ...defualtArgs, operation });
    case 2:
      operation = (value1, value2) => value1 * value2;
      return doMathOp({ ...defualtArgs, operation });
    case 3:
      return doReadOp(defualtArgs);
    case 4:
      return doWriteOp(defualtArgs);
    case 5:
      operation = (value) => {
        return value != 0;
      }
      return doSeekOp({ ...defualtArgs, operation});
    case 6:
      operation = (value) => value == 0;
      return doSeekOp({ ...defualtArgs, operation });
    case 7:
      operation = (value1, value2) => value1 < value2;
      return doComparWriteOp({ ...defualtArgs, operation });
    case 8:
      operation = (value1, value2) => value1 == value2;
      return doComparWriteOp({ ...defualtArgs, operation });
    case 9:
      const change = getValueWithMode({readValue, index: index + 1, mode: params[0]});
      relativeIndex += change;
      return [true, index + 2];
    case 99:
      return [false, index + 1];
  } 
}

const runProgramWithInputAndStartValue = (input, userInput1) => {
  log = [];
  relativeIndex = 0;

  const giveInput = () => {
    return userInput1;
  };

  const values = input.split(',');

  let index = 0;
  let running = true;
  while (running) {
    if (log.length) {
      break;
    }

    [running, index] = doOp(values, index, giveInput);
  }

  return log[0];
};

// 203 too low
const partOne = ([input]) => runProgramWithInputAndStartValue(input, 1);
const partTwo = ([input]) => runProgramWithInputAndStartValue(input, 2);

module.exports = { partOne, partTwo };
