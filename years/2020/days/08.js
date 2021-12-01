const partOne = (input) => {
	const visited = {};

	let index = 0;
	let acc = 0;
	let tryNum = 0;
	while (!visited[index] || visited[index].length < 1) {
		if (index == input.length) {
			return {
				value: acc
			};
		}
		if (++tryNum > 10000) {
			console.log('increase limit');
			return 'increase limit';
		}
		
		let nextIndex = 0;
		[instruction, num] = input[index].split(' ');
		num = Number(num);

		if (instruction === 'nop') {
			nextIndex = index + 1;
		} else if (instruction === 'acc') {
			acc += num;
			nextIndex = index + 1;
		} else {
			nextIndex = index + num;
		}

		visited[index] = visited[index] || [];
		visited[index].push(acc);
		index = nextIndex;
	}

	return acc;
};

const partTwo = (input) => {
	for (var i = 0; i < input.length; i++) {
		if (input[i].indexOf('nop') > -1) {
			const copy = [...input];
			copy[i] = 'jmp' + input[i].substring(3);
			const v = partOne(copy);
			if (v.hasOwnProperty('value')) {
				return v.value;
			}
		} else if (input[i].indexOf('jmp') > -1) {
			const copy = [...input];
			copy[i] = 'nop' + input[i].substring(3);
			const v = partOne(copy);
			if (v.hasOwnProperty('value')) {
				return v.value;
			}
		}
	}
};

module.exports = {
  partOne,
  partTwo
};
