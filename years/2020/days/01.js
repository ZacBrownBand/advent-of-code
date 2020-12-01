const key = 2020;

const partOne = (input) => {
	input = input.map(inp => Number(inp))

	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input.length; j++) {
			if (i === j) {
				continue;
			}
			if (input[i] + input[j] === key) {
				return input[i] * input[j];
			}
		}
	}
};

const partTwo = (input) => {
	input = input.map(inp => Number(inp))

	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input.length; j++) {
			for (var k = 0; k < input.length; k++) {
				if (i === j || i === k || j === k) {
					continue;
				}
				if (input[i] + input[j] + input[k] === key) {
					return input[i] * input[j] * input[k];
				}
			}
		}
	}
};

module.exports = {
  partOne,
  partTwo
};
