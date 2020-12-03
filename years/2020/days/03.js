const isTree = (input, row, col) => {
	return input[row][col] === '#';
};

const checkSlope = (input, right, down) => {
	let trees = 0;
	let col = 0;
	const cols = input[0].length;
	for (var row = 0, rows = input.length; row < rows; row += down) {
		if (isTree(input, row, col)) {
			trees++;
		}
		col = (col + right) % cols;
	}
	return trees;
};

const partOne = (input) => checkSlope(input, 3, 1);

const partTwo = (input) => checkSlope(input, 1, 1)
		* checkSlope(input, 3, 1)
		* checkSlope(input, 5, 1)
		* checkSlope(input, 7, 1)
		* checkSlope(input, 1, 2);

module.exports = {
  partOne,
  partTwo
};
