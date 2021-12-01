const fields = [
	'byr', // (Birth Year)
	'iyr', // (Issue Year)
	'eyr', // (Expiration Year)
	'hgt', // (Height)
	'hcl', // (Hair Color)
	'ecl', // (Eye Color)
	'pid', // (Passport ID)
	// 'cid', // (Country ID)
];

let data;

const parse = input => {
	let str = '';
	const lines = input.map(line => line.length > 0 ? line : '||').join(' ').split('||');
	data = lines.map(str => {
		const item = {};
		const parts = str.split(' ');
		parts.forEach(p => {
			[key, value] = p.split(':');
			if (fields.indexOf(key) > -1) {
				item[key] = value;
			}
		});
		return item;
	});
};

const isValid = (item) => {
	const bry = item.byr >= 1920 && item.byr <= 2002;
	const iyr = item.iyr >= 2010 && item.iyr <= 2020; // 153
	const eyr = item.eyr >= 2020 && item.eyr <= 2030; // 145
	let hgt = false;
	const num = item.hgt.substring(0, item.hgt.length - 2);
	const unit = item.hgt.substring(item.hgt.length - 2);
	if (unit === 'cm') {
		hgt = num >= 150 && num <= 193;
	}
	if (unit === 'in') {
		hgt = num >= 59 && num <= 76;
	} 

	let hcl = false;
	if (item.hcl[0] === '#') {
		hcl = true;
		item.hcl.replace('#', '').split('').forEach(l => {
			if(
				(l >=0 && l <=9) || (l >= 'a' && l <= 'f')
			) {
				const a = 0;
			} else {
				hcl = flase;
			};
		});
	}

	const ecl = ['amb','blu','brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(item.ecl) > -1; // 131
	const pid = item.pid.length === 9;

	return bry && iyr && eyr && hgt && hcl && ecl && pid;
}; 

const partOne = () => {
	let count = 0;
	data.forEach(item => {
		if (Object.keys(item).length === fields.length) {
			count ++;
		}
	});
	return count;
};

const partTwo = () => {
	let count = 0;
	data.forEach(item => {
		if (Object.keys(item).length === fields.length && isValid(item)) {
			count ++;
		}
	});
	return count;
};

module.exports = {
  beforeAll: parse,
  partOne,
  partTwo
};
