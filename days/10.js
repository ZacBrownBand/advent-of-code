function partOne (input) {
    var points = input.map(parseLine);

    var maxItter = 100000;
    var itter = 0;

    while (itter < maxItter) {
        var height = getHeight(points);

        if (height <= 10) {
            printPicture(points);
            return 'Look at picture above.'
        }

        tick(points);
        itter++;
    } 
}


function partTwo (input) {
    var points = input.map(parseLine);

    var maxItter = 100000;
    var itter = 0;

    while (itter < maxItter) {
        var height = getHeight(points);

        if (height < 10) {
            return itter;
        }

        tick(points);
        itter++;
    } 
}

function parseLine(str) {
    var parts = str
        .replace('position=< ', '',)
        .replace('> velocity=< ', ' ')
        .replace('position=<', '',)
        .replace('> velocity=<', ' ')
        .replace('>', '')
        .replace(/,  /g, ' ')
        .replace(/,/g, '')
        .split(' ');

    return {
        position: {
            x: +parts[0],
            y: +parts[1]
        },
        velocity: {
            x: +parts[2],
            y: +parts[3]
        }
    }
} 

function getHeight(points) {
    var yMax = -100000000,
        yMin = 100000000;

    for (var point of points) {
        if (point.position.y > yMax) {
            yMax = point.position.y;
        }
        if (point.position.y < yMin) {
            yMin = point.position.y;
        }
    }

    return yMax - yMin;
}

function printPicture(points) {
    var xMax = -100000000,
        xMin = 100000000,
        yMax = -100000000,
        yMin = 100000000;

    for (var point of points) {
        if (point.position.x > xMax) {
            xMax = point.position.x;
        }
        if (point.position.y > yMax) {
            yMax = point.position.y;
        }
        if (point.position.x < xMin) {
            xMin = point.position.x;
        }
        if (point.position.y < yMin) {
            yMin = point.position.y;
        }
    }

    var numX = xMax - xMin + 1;
    var numY = yMax - yMin + 1;

    var map = new Array(numY);

    for (var y = 0; y <= numY; y++) {
        map[y] = new Array(numX);
        map[y].fill('.');
    }
    
    for (var point of points) {
        map[point.position.y - yMin][point.position.x - xMin] = '#';
    }

    for (var y = 0; y < (numY); y++) {
        console.log(map[y].join(''));
    }
    console.log();
}

function tick(points) {
    for (var point of points) {
        point.position.x += point.velocity.x;
        point.position.y += point.velocity.y;
    }
}

module.exports = {partOne, partTwo};