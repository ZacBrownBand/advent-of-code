const parseLine = (line) => {
	const parts = line.split(' ');
	[low, high] = parts[0].split('-').map(i => Number(i));
	return {
		low,
		high,
		target: parts[1][0],
		psw: parts[2]
	};
};

let data;
const parse = input => {
	data = input.map(parseLine);
};

const countValid = (validate) => {
	let count = 0;
	data.forEach(d => {
		if (validate(d)) {
			count ++;
		}
	});
	return count;
};

const partOne_isValid = ({low, high, target, psw}) => {
	const count = psw.length - psw.replace(new RegExp(target, 'gi'), '').length;
	return count >= low && count <= high;
};
const partOne = () => countValid(partOne_isValid);

const partTwo_isValid = ({low, high, target, psw}) => {
	const char1 = psw[low-1];
	const char2 = psw[high-1];
	return (char1 === target || char2 === target) && char1 !== char2;
};
const partTwo = () => countValid(partTwo_isValid);

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo
};
