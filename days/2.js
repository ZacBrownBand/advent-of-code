function partOne (input) {
	var count2 = 0;
	var count3 = 0;

	for (var word of input) {
		var map = getLeterFreq(word);
		if (hasFreq(map, 2)) {
			count2++;
		}
		if (hasFreq(map, 3)) {
			count3++;
		}
	}

	return count2 * count3;
}

function getLeterFreq(word) {
	var letters = word.split('');
	var map = {};
	letters.forEach((l) => {
		if (!map.hasOwnProperty(l)) {
			map[l] = 0;
		}

		map[l]++;
	});
	return map;
}

function hasFreq(map, count) {
	var keys = Object.keys(map);
	for (var key of keys) {
		if (map[key] === count) {
			return true;
		}
	}
	return false;
} 

function partTwo (input) {
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input.length; j++) {
			var diffData = diff(input[i], input[j]);
			if (diffData.diffs === 1) {
				return diffData.same;
			}
		}
	}
}

function diff(w0, w1) {
	var l0 = w0.split('');
	var l1 = w1.split('');
	var diffs = 0;
	var same = '';

	for (var i = 0; i < l0.length; i++) {
		if (l0[i] != l1[i]) {
			diffs++;
		} else {
			same += l0[i];
		}
	}

	return {diffs, same};
}

module.exports = {partOne, partTwo};
