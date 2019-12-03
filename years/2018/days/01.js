function partOne (input) {
    var sum = 0;
    for (var num of input) {
        sum += +num;
    }
    return sum;
}

function partTwo (input) {
    var freq = 0;
    var seen = {};
    seen[0] = true;
    var i = 0;
    while (true) {
        if (i >= input.length) {
            i = 0;
        }

        freq += +input[i];

        if (seen[freq]) {
            return freq;
        }

        seen[freq] = true;
        i++;
    }
}

module.exports = {partOne, partTwo};
