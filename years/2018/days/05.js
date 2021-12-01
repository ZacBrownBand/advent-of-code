function partTwo(input) {
    input = input.join('').split('');

    var shortestLetter = null;
    var shortestLength = 10000000;

    var map = {};
    var letters = 'ABCDEFGHIKLMNOPQRSTVXYZ'.split('');
    for (var l of letters) {
        var length = tryLetter(input, l);
        if (length < shortestLength) {
            shortestLength = length;
            shortestLetter = l;
        }
    }
    return shortestLength;
}

function tryLetter(input, letter) {
    var newInput =  input.filter((l) => { return l.toUpperCase() !== letter; }).join('');
    return partOne(newInput);
}

function partOne(input) {
    if (typeof input === 'string') {
        input = input.split('');
    } else {
        input = input.join('').split('');
    }

    var iLo = 0;
    var iHi = 0;

    while (iLo < input.length && iHi < input.length) {
        if (input[iLo] === '*' || iLo < 0) {
            iLo++;
            continue;
        }

        iHi = iLo + 1;

        while (input[iHi] === '*' && iHi < input.length) {
            iHi++;
        }

        if (input[iHi] === '*' || iHi >= input.length) {
            return input.filter((letter) => { return letter != '*'; }).join('').length;
        }

        if (input[iLo].toLowerCase() === input[iHi].toLowerCase() &&
            input[iLo] !== input[iHi]) {
            
            input[iLo] = '*';
            input[iHi] = '*';
            

            iLo--;

            while (input[iLo] === '*' && iLo > 0) {
                iLo--;
            }
        } else {
            iLo++;
        }
    }


    return input.filter((letter) => { return letter !== '*'; }).join('').length;
}

module.exports = {partOne, partTwo};