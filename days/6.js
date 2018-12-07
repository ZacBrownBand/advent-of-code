function partOne (input) {
	var coords = [];
	var ids = 65;
	var allIds = [];
	for (var inputLine of input) {
		var x, y;
		[x, y] = inputLine.split(', ');
		allIds.push(ids);
		coords.push({x: +x, y: +y, id: ids++});
	}

	var xMax = 0, xMin = 1000, yMax = 0, yMin = 1000;
	for (var coord of coords) {
		if (xMax < coord.x) {xMax = coord.x;}
		if (yMax < coord.y) {yMax = coord.y;}
		if (xMin > coord.x) {xMin = coord.x;}
		if (yMin > coord.y) {yMin = coord.y;}
	}

	var map = new Array(xMax + xMin);
	for (var i = 0; i < map.length; i++) {
		map[i] = new Array(yMax + yMin);
		map[i].fill(0);
	}

	var changesMade = true;
	var distence = 0;

	while (changesMade) {
		changesMade = false;

		for (var coord of coords) {
			if (distence === 0) {
				changesMade = tryToClaim(map, coord.x, coord.y, coord.id, distence);
			} else if (distence === 1) {
				changesMade |= tryToClaim(map, coord.x + 1, coord.y, coord.id, distence);
				changesMade |= tryToClaim(map, coord.x - 1, coord.y, coord.id, distence);
				changesMade |= tryToClaim(map, coord.x, coord.y + 1, coord.id, distence);
				changesMade |= tryToClaim(map, coord.x, coord.y - 1, coord.id, distence);
			} else {
				for (var xOff = -distence; xOff <= distence; xOff++) {
					for (var yOff = -distence; yOff <= distence; yOff++) {
						if (Math.abs(xOff) + Math.abs(yOff) === distence) {
							changesMade |= tryToClaim(map, coord.x + xOff, coord.y + yOff, coord.id, distence);
						}
					}
				}
			}
		}

		distence++;
	}

	var blackList = getBlackList(map);
	var mostArea = 0;

	for (var curId of allIds) {
		if (blackList[curId]) {
		} else {
			var area = getCount(map, curId);
			if (area > mostArea) {
				mostArea = area;
			}
		}
	}

	return mostArea;
}

function getCount(map, curId) {
	var count = 0;
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map.length; j++) {
			if (typeof map[i][j] === 'object') {
				if (map[i][j].id === curId) {
					count++;
				}
			}
		}
	}
	return count;
}

function tryToClaim (map, x, y, id, distence) {
	if (x < 0 || y < 0) {
		return false;
	}
	if (x >= map.length || y >= map[0].length) {
		return false;
	}

	if (map[x][y] == '.') {
		return false;
	} 

	if (map[x][y] == 0) {
		map[x][y] = {id, distence};
		return true;
	} 

	if (map[x][y].id === id) {
		return false;
	}

	if (map[x][y].distence === distence) {
		map[x][y] = '.';
		return true;
	}

	if (map[x][y].distence > distence) {
		map[x][y] = {id, distence};
		return true;
	}

	return false;
}

function getBlackList (map) {
	var items = {};
	var xs = map.length - 1;
	var ys = map[0].length - 1;

	for (var y = 0; y <= ys; y++) {
		var coord = map[0][y];
		if (coord.id) {
			items[coord.id] = true;
		}
		var coord = map[xs][y];
		if (coord.id) {
			items[coord.id] = true;
		}
	}

	for (var x = 0; x <= xs; x++) {
		var coord = map[x][0];
		if (coord.id) {
			items[coord.id] = true;
		}
		var coord = map[x][ys];
		if (coord.id) {
			items[coord.id] = true;
		}
	}
		return items;

}

function printMap (map) {
	var str = '';
	for (var row of map) {
		str += row.map((val) => {
			if (typeof val !== 'object') {
				return val;
			}
			if (val.distence === 0) {
				return String.fromCharCode(val.id);
			}
			return String.fromCharCode(val.id).toLowerCase();
		}).join(' ') + '\n';
	}
	console.log(str);
}

function partTwo (input) {
	var coords = [];
	var ids = 65;
	var allIds = [];
	for (var inputLine of input) {
		var x, y;
		[x, y] = inputLine.split(', ');
		allIds.push(ids);
		coords.push({x: +x, y: +y, id: ids++});
	}

	var xMax = 0, xMin = 1000, yMax = 0, yMin = 1000;
	for (var coord of coords) {
		if (xMax < coord.x) {xMax = coord.x;}
		if (yMax < coord.y) {yMax = coord.y;}
		if (xMin > coord.x) {xMin = coord.x;}
		if (yMin > coord.y) {yMin = coord.y;}
	}

	var map = new Array(xMax + xMin);
	for (var i = 0; i < map.length; i++) {
		map[i] = new Array(yMax + yMin);
		map[i].fill(0);
	}

	var limit = 10000;
	var count = 0;
	for (var y = 0; y < map.length; y++) {
		for (var x = 0; x < map[0].length; x++) {
			var sum = 0;
			for (var coord of coords) {
				sum += Math.abs(x - coord.x) + Math.abs(y - coord.y);
			}

			if (sum < limit) {
				count++;
			}
		}
	}

	return count;
}

module.exports = {partOne, partTwo};