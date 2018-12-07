function partOne(input) {
	// Build history
	var history = processInput(input);

	// Tally up how sleepy the guards are
	var sleepPerGuard = {};
	var shifts = Object.keys(history);
	for (var shiftKey of shifts) {
		var guard = shiftKey.split(' ')[1];
		var data = history[shiftKey];

		if (!sleepPerGuard[guard]) {
			sleepPerGuard[guard] = 0;
		}

		sleepPerGuard[guard] += data.filter((awake) => !awake).length;
	}

	// Find the sleepiest one
	var gardIds = Object.keys(sleepPerGuard);
	var mostSleepyGuard = null;
	var howSleepy = -1;

	for (var gardId of gardIds) {
		if (sleepPerGuard[gardId] > howSleepy) {
			mostSleepyGuard = gardId;
			howSleepy = sleepPerGuard[gardId];
		}
	}

	// Build up when the guard sleeps
	var minuteFreq = new Array(60).fill(0);
	var shifts = Object.keys(history);
	for (var shiftKey of shifts) {
		var guard = shiftKey.split(' ')[1];
		var data = history[shiftKey];

		if (guard !== mostSleepyGuard) {
			continue;
		}

		for (var t0 = 0; t0 < 60; t0++) {
			if (!data[t0]) {
				minuteFreq[t0]++;
			}
		}
	}

	// Get the minute the guard is most likely to sleep
	var sleepiestMinute = null;
	var howSleepyIsThatMinute = -1;
	for (var t1 = 0; t1 < 60; t1++) {
		if (minuteFreq[t1] > howSleepyIsThatMinute) {
			howSleepyIsThatMinute = minuteFreq[t1];
			sleepiestMinute = t1;
		}
	}

	return mostSleepyGuard * sleepiestMinute;
}

function partTwo(input) {
	var history = processInput(input);

	// Tally up how sleepy the guards are
	var sleepPerGuard = {};
	var shifts = Object.keys(history);
	for (var s = 0; s < shifts.length; s++) {
		var shiftKey = shifts[s];
		var guard = shiftKey.split(' ')[1];
		var data = history[shiftKey];

		if (!sleepPerGuard[guard]) {
			sleepPerGuard[guard] = 0;
		}
	}

	var resultId = null;
	var resultFreq = -1;
	var resultMin = null;

	// For each guard
	var gardIds = Object.keys(sleepPerGuard);
	for (var gardIndex = 0; gardIndex < gardIds.length; gardIndex++) {
		var minuteFreq = new Array(60).fill(0);
		var guard = gardIds[gardIndex];

		// Check all there shifts, and tally up the frequency of each minute they slept
		var shifts = Object.keys(history);
		for (var s = 0; s < shifts.length; s++) {
			var shiftKey = shifts[s];
			var curGuard = shiftKey.split(' ')[1];
			var data = history[shiftKey];

			if (guard !== curGuard) {
				continue;
			}

			for (var t0 = 0; t0 < 60; t0++) {
				if (!data[t0]) {
					minuteFreq[t0]++;
				}
			}
		}

		var maxIndex = null;
		var maxOc = -1;
		for (var t1 = 0; t1 < 60; t1++) {
			if (minuteFreq[t1] > maxOc) {
				maxOc = minuteFreq[t1];
				maxIndex = t1;
			}
		}

		if (maxOc > resultFreq) {
			resultFreq = maxOc;
			resultId = guard;
			resultMin = maxIndex;
		}
	}

	return resultId * resultMin;
}

function processInput(input) {
	input.sort();

	var history = {};
	var historyIndex = null;
	var historyIndexTime = 0;

	var _dateHalf, _commandHalf, date, time, command, id;

	for (var line of input) {
		// [1518-03-31 00:00] Guard #773 begins shift
		[_dateHalf, _commandHalf] = line.split('] ');
		[date, time] = _dateHalf.replace('[', '').split(' ');
		time = time.substring(3);
		[command, id] = _commandHalf.replace('#', '').split(' ');

		switch (command) {
			case 'Guard':
				if (historyIndex) {
					while (historyIndexTime < 60) {
						history[historyIndex][historyIndexTime] = true;
						historyIndexTime++;
					}
				}

				// reset
				historyIndex = null;
				historyIndexTime = 0;

				historyIndex = date + ' ' + id;

				if (history[historyIndex]) {
					historyIndex = '2#' + historyIndex;
				}

				history[historyIndex] = new Array(60);
				break;
			case 'falls':
				while (historyIndexTime < time) {
					history[historyIndex][historyIndexTime] = true;
					historyIndexTime++;
				}
				break;
			case 'wakes': 
				while (historyIndexTime < time) {
					history[historyIndex][historyIndexTime] = false;
					historyIndexTime++;
				}
				break;
		}
	}

	if (historyIndex) {
		while (historyIndexTime < 60) {
			history[historyIndex][historyIndexTime] = true;
			historyIndexTime++;
		}
	}

	return history;
}

function printHistory(history) {
	var colLength = 18;
	var i = -1;
	console.log(' '.repeat(colLength) + new Array(60).fill(0).map((a) => { i++; return i < 10 ? 0 : (i + '')[0] }).join(''));
	console.log(' '.repeat(colLength) + new Array(60).fill(0).map((a) => { i++; return i % 10 }).join(''));

	var keys = Object.keys(history);
	for (var key of keys) {
		var historyItem = history[key];
		var spaces = colLength - key.length;
		console.log(key + ' '.repeat(spaces) + historyItem.join('').replace(/true/g, '.').replace(/false/g, '#'));
	}
}

module.exports = {partOne, partTwo};