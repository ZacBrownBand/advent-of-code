function partOne (input) {
	var claims = processInput(input);

	var fabricSize = 1000;
	var fabric = createFabric(fabricSize);

	fabric = processClaims(fabric, claims);

	var count = 0;
	for (var i = 0; i < fabricSize; i++) {
		for (var j = 0; j < fabricSize; j++) {
			if (fabric[i][j] > 1) {
				count++;
			}
		}
	}

	return count;

}

function processInput(input) {
	var claims = [];
	for (var line of input) {
		var parts = line.replace('#', '')
			.replace('@ ', '')
			.replace(',', ' ')
			.replace(':', '')
			.replace('x', ' ')
			.split(' ');
		claims.push({
			id: parts[0],
			left: +parts[1],
			top: +parts[2],
			width: +parts[3],
			height: +parts[4]
		});
	}
	return claims;
}

function createFabric(fabricSize) {
	var fabric = new Array(fabricSize);
	for (var i = 0; i < fabricSize; i++) {
		fabric[i] = new Array(fabricSize).fill(0);
	}
	return fabric;
}

function processClaims(fabric, claims) {
	for (var claim of claims) {
		for (var x = claim.left; x < claim.left + claim.width; x++) {
			for (var y = claim.top; y < claim.top + claim.height; y++) {
				fabric[x][y]++;
			}
		}
	}
	return fabric;
}

function partTwo (input) {
	var claims = processInput(input);
	
	var fabricSize = 1000;
	var fabric = createFabric(fabricSize);

	fabric = processClaims(fabric, claims);

	for (var claim of claims) {
		var conflict = false;
		for (var x = claim.left; x < claim.left + claim.width; x++) {
			for (var y = claim.top; y < claim.top + claim.height; y++) {
				if (fabric[x][y] != 1) {
					conflict = true;
				} 
			}
		}
		if (!conflict) {
			return claim.id;
		}
	}

}

module.exports = {partOne, partTwo};
