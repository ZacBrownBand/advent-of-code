var index = 0;
function partOne (input) {
    // input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ');
    input = input.join('').split(' ');
    index = 0;

    var root = {
        next: []
    };

    processNext(root, input);

    return getSum(root.next[0]);
}

function getSum(node) {
    var children = node.next;
    var sum = 0;
    for (var child of children) {
        sum += getSum(child);
    }

    for (var meta of node.metadata) {
        sum += +meta;
    }

    return sum;
}

function processNext(parent, input) {
    if (index >= input.length) {
        return;
    }

    var children = input[index++];
    var metadata = input[index++];

    var node = {
        next: [],
        metadata: []
    };

    for (let i = 0; i < children; i++) {
        processNext(node, input);
    }

    for (let i = 0; i < metadata; i++) {
        node.metadata.push(input[index++]);
    }

    parent.next.push(node);
}

function getRootValue (node) {
    var children = node.next;
    var value = 0;

    if (children.length === 0) {
        for (var meta of node.metadata) {
            value += +meta;
        }
    } else {
        for (var meta of node.metadata) {
            var i = meta - 1;
            if (i > -1 && i < children.length) {
                value += getRootValue(children[i]);
            }
        } 
    }

    return value;
}


function partTwo (input) {
    // input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ');
    input = input.join('').split(' ');
    index = 0;

    var root = {
        next: []
    };

    processNext(root, input);

    return getRootValue(root.next[0]);
}

module.exports = {partOne, partTwo};