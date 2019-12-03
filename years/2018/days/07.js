function partOne (input) {
    var nodes = {};

    for (var line of input) {
        var parts = line.split(' ');
        var parent = parts[1];
        var child = parts[7];

        if (!nodes.hasOwnProperty(parent)) {
            nodes[parent] = makeNewNode(parent);
        }

        if (!nodes.hasOwnProperty(child)) {
            nodes[child] = makeNewNode(child);
        }

        nodes[parent].next.push(child);
        nodes[parent].next.sort();
    }   

    var ids = Object.keys(nodes);
    var order = [];
    var num = ids.length;

    // find nodes with no parents
    while (order.length < num) {
        var exc = getNodeToExectute(nodes);
        
        exectuteNode(nodes, exc[0]);
        
        order.push(exc[0]);
        nodes[exc[0]].done = true;
    }

    return order.join('');
}

function makeNewNode(id) {
    return {
        id: id,
        done: false,
        next: [],
        working: false,
        searched: false
    };
}

function getNodeToExectute(nodes) {
    var ids = Object.keys(nodes).filter((id) => {
        return nodes[id].done === false;
    }).sort();

    var arr = [];
    for (var i = 0; i < ids.length; i++) {
        var first = ids[i];
        var found = false;

        for (var j = 0; j < ids.length; j++) {
            var next = ids[j];

            if (nodes[next].next.includes(first)) {
                found = true;
            }
        }

        if (!found && nodes[first].working == false) {
            arr.push(first);
        }
    }
    return arr;
}

function exectuteNode(nodes, exc) {
    var ids = Object.keys(nodes);

    for (var i = 0; i < ids.length; i++) {
        var node = nodes[ids[i]];
        if (node.next.includes(exc)) {
            node.next = node.next.filter((n) => {
                return n != ids[i];
            });
        }
    }
}


function partTwo (input) {
    var nodes = {};

    for (var line of input) {
        var parts = line.split(' ');
        var parent = parts[1];
        var child = parts[7];

        if (!nodes.hasOwnProperty(parent)) {
            nodes[parent] = makeNewNode(parent);
        }

        if (!nodes.hasOwnProperty(child)) {
            nodes[child] = makeNewNode(child);
        }

        nodes[parent].next.push(child);
        nodes[parent].next.sort();
    }   

    var ids = Object.keys(nodes);

    var order = [];

    var num = ids.length;

    var workers = new Array({id: null, time: 0}, {id: null, time: 0}, {id: null, time: 0}, {id: null, time: 0}, {id: null, time: 0});
    var time = 0;
    var timeOffset = 0;

    // find nodes with no parents
    while (order.length < num) {
        var exc = getNodeToExectute(nodes).reverse();

        for (var w = 0; w < workers.length; w++) {
            if (workers[w].id === null && exc.length) {
                workers[w].id = exc.pop();
                workers[w].time = workers[w].id.toLowerCase().charCodeAt(0) - 36;

                nodes[workers[w].id].working = true;
            }
        }

        var jobEnded = false;
        while (!jobEnded) {
            time++;
            for (var w = 0; w < workers.length; w++) {
                if (workers[w].id !== null) {
                    workers[w].time--;
                    if (workers[w].time === 0) {
                        jobEnded = true;

                        
                        exectuteNode(nodes, workers[w].id);
                        nodes[workers[w].id].done = true;
                        order.push(workers[w].id);

                        workers[w].id = null;
                        workers[w].time = 0;
                    }
                }
            }
        }
    }

    return time;
}

module.exports = {partOne, partTwo};