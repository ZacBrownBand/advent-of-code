const modes = {
  immediate: 1,
  position: 0,
};

let log;
const output = (value) => value && log.push(value);

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
  return mode === modes.position ? readValue(immediate) : immediate;
};

const doMathOp = ({index, params, operation, readValue, writeValue}) => {
  const a = getValueWithMode({readValue, index: index + 1, mode: params[0]});
  const b = getValueWithMode({readValue, index: index + 2, mode: params[1]});

  const indexResult = readValue(index + 3);
  writeValue(indexResult, operation(a, b));
  return [true, index + 4];
};

const doComparWriteOp = ({index, params, operation, readValue, writeValue}) => {
const indexResult = readValue(index + 3);
  const a = getValueWithMode({readValue, index: index + 1, mode: params[0]});
  const b = getValueWithMode({readValue, index: index + 2, mode: params[1]});

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

const doReadOp = ({writeValue, readValue, index, giveInput}) => {
  writeValue(readValue(index + 1), giveInput());
  return [true,  index + 2];
}

const doWriteOp = ({writeValue, readValue, index, params}) => {
  output(getValueWithMode({readValue, mode: params[0], index: index + 1}));
  return [true,  index + 2];
};

const doOp = (values, index, giveInput) => {
  const readValue = (index) => +values[index];
  const writeValue = (index, value) => values[index] = value;

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
      operation = (value) => value != 0;
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
    case 99:
      return [false, index + 1];
    default:
      return [false, index];
  } 
}

const runProgramWithInputAndStartValue = (input, userInput1, userInput2) => {
  log = [];

  let hasGivenInput = false;
  const giveInput = () => {
    if (hasGivenInput) {
      return userInput2;
    }
    hasGivenInput = true;
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

const runProgramWithInputForFeedbackLoop = (input, userInput1, userInput2, memory) => {
  log = [];

  let hasGivenInput = !!memory;
  const giveInput = () => {
    if (hasGivenInput) {
      return userInput2;
    }
    hasGivenInput = true;
    return userInput1;
  };

  const values = memory ? memory.values : input.split(',');
  let index = memory ? memory.index : 0;
  let running = true;
  while (running) {
    if (log.length) {
      break;
    }

    [running, index] = doOp(values, index, giveInput);
  }

  return {
    memory: {
      index,
      values,
    },
    output: log[0]
  }
};

// https://initjs.org/all-permutations-of-a-set-f1be174c79f8
function getAllPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

const runSimulation = (ampInputs, programValues) => {
  const [inputA, inputB, inputC, inputD, inputE] = ampInputs;
  
  const outA = runProgramWithInputAndStartValue(programValues, inputA, 0);
  const outB = runProgramWithInputAndStartValue(programValues, inputB, outA);
  const outC = runProgramWithInputAndStartValue(programValues, inputC, outB);
  const outD = runProgramWithInputAndStartValue(programValues, inputD, outC);
  const outE = runProgramWithInputAndStartValue(programValues, inputE, outD);

  return outE;
};

const runSimulationWithFeedbackLoop = (ampInputs, programValues) => {
  let memories = [null, null, null, null, null];
  let output = 0;
  let returned;
  let currentAmp = 0;

  while (typeof output === 'number') {

    returned = runProgramWithInputForFeedbackLoop(programValues, ampInputs[currentAmp], output, memories[currentAmp]);
    memories[currentAmp] = returned.memory;

    if (typeof returned.output !== 'number') {
      return output;      
    }
    output = returned.output;

    currentAmp++;
    if (currentAmp == 5) {
      currentAmp = 0;
    }
  }

  return output;
};

const partOne = ([testA, testB, input]) => {
  const possibleOrientations = getAllPermutations('01234');
  const outputs = possibleOrientations.map((orientation) => runSimulation(orientation, input) || -1);
  return Math.max(...outputs);
};

const partTwo = ([testA, testB, input]) => {
  const possibleOrientations = getAllPermutations('56789');
  const outputs = possibleOrientations.map((orientation) => runSimulationWithFeedbackLoop(orientation, input) || -1);
  return Math.max(...outputs);
};

module.exports = { partOne, partTwo };
