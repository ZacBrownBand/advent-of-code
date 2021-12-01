const grammer = {};
const bagsInBags = {};

const parseLine = line => {
	[lhs, rhs] = line.split(' contain ');
	lhs = lhs.replace(' bags', '');

	let bags;
	let count = [0];
	if (rhs[0] === 'n' && rhs[1] === 'o' && rhs[2] === ' ') {
		bags = false;
		count = 0;
	} else {
		bags = rhs.split(', ').map(b => {
			const parts = b.split(' ');
			return parts[1] + ' ' + parts[2];
		});
		counts = rhs.split(', ').map(b => b[0]);
	}

	grammer[lhs] = bags;
	bagsInBags[lhs] = counts;
};

const parse = (input) => input.forEach(parseLine);

const getLeafNodes = () => {
	return Object.keys(grammer).filter(k => grammer[k] === false);
};

const partOne = () => {
	const roots = Object.keys(grammer);
	const canHaveGold = {};

	const checkBagForGold = (curr, root = curr) => {
		const bags = grammer[curr];
		if (bags === false) {
			return;
		}

		let hasGold = false;
		bags.forEach(b => {
			if (b.indexOf('shiny gold') > -1) {
				hasGold = true;
			}
		});

		if (hasGold) {
			canHaveGold[root] = true;
			return;
		}

		bags.forEach(b => checkBagForGold(b, root));
	};
	
	roots.forEach(r => checkBagForGold(r, r));

	return Object.keys(canHaveGold).filter(k => canHaveGold[k] === true).length;	
};

const partTwo = () => {
	const root = 'shiny gold';
	let count = 0;

	const countBagsInside = (curr) => {
		if (grammer[curr] === false) {
			return 1;
		}

		let sum = 0;
		const subs = [];
		for (var i = 0; i < grammer[curr].length; i++) {
			const currBag = grammer[curr];
			const nextBag = currBag[i];
			const nextCount = bagsInBags[curr][i];
			const countInNextBag = countBagsInside(nextBag);
			sum += nextCount * countInNextBag;
			subs.push({ name: nextBag, num: nextCount, next: countInNextBag});
		}

		return sum + 1;
	};

	return countBagsInside('shiny gold', 0) - 1 // the bad is not included;
};

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo
};
