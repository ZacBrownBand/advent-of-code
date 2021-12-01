function partOne (input) {
    var parts = input[0].split(' ');
    var players = +parts[0];
    var turns = +parts[6];

    return solve(players, turns);
}

function partTwo (input) {
    var parts = input[0].split(' ');
    var players = +parts[0];
    var turns = +parts[6];

    return solve(players, turns * 100);
}

function solve (players, turns) {
    var scores = new Array(players).fill(0);

    var marble = newMarble(0);

    var currentMarble = marble;

    for (var turn = 0; turn < turns; turn++) {
        var placeAfter = currentMarble;
        var steps = 0;
        while (steps < 2) {
            if (currentMarble.next) {
                placeAfter = currentMarble.next;
                steps++;
            } else {
                var pointer = currentMarble;

                placeAfter = marble;
                steps++;
            }
        }

        if ((turn + 1) % 23 === 0) {
            var id = (turn % players) + 1;
            scores[id] += (turn + 1);

            var remove = currentMarble;
            var steps = 0;
            while (steps < 7) {
                if (remove.last) {
                    remove = remove.last;
                    steps++;
                } else {
                    var pointer = remove;
                    while (pointer.next) {
                        pointer = pointer.next;
                    }
                    remove = pointer;
                    steps++;
                }
            }

            var before = remove.last;
            var next = remove.next;

            if (before && next) {
                before.next = next;
                next.last = last;
            } else {
                console.log('Handle this case!');
                return;
            }

            scores[id] += remove.number;
                currentMarble = next;
            } else {
                currentMarble = marble;
            }

        } else {
            var last = newMarble(turn + 1, placeAfter, placeAfter.next || null);
            currentMarble = last;  
        }
    }

    var maxScore = 0;
    for (var s of scores) {
        if (s > maxScore) {
            maxScore = s;
        }
    }
    return maxScore;

}

function newMarble(number, last, next) {
    var marble = {
        number: number,
        next: next || null,
        last: last || null
    };

    if (last) {
        last.next = marble;
    }

    if (next) {
        next.last = marble;
    }

    return marble;
}

module.exports = {partOne, partTwo};