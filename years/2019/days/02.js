const doOp = (values, index) => {
	const opCode = index < values.length && +values[index];

	const indexA = +values[index + 1];
	const indexB = +values[index + 2];
	const indexResult = +values[index + 3];
	
	const valueA = +values[indexA];
	const valueB = +values[indexB];
	
	switch (opCode) {
		case 1:
			values[indexResult] = valueA + valueB;
			return true;
		case 2:
			values[indexResult] = valueA * valueB;
			return true;
	} 

	return false;
}

const partOne = ([input], noun = 12, verb = 2) => {
	let values = input.split(',');
	let index = 0;

	values[1] = noun;
	values[2] = verb;

	while (doOp(values, index)) {
		index += 4;
	}

	return values[0];
}

const partTwo = (input) => {
	for (let noun = 0; noun < 100; noun++) {
		for (let verb = 0; verb < 100; verb++) {
			if (partOne(input, noun , verb) === 19690720) {
				return 100 * noun + verb;
			}
		}
	}

	return 'NaN';
}

module.exports = { partOne, partTwo };
