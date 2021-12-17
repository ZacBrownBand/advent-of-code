const newCave = (name) => {
  return {
    name,
    pointers: new Set(),
    isBig: name === name.toUpperCase(),
  };
};

const mapConnections = (connections) => {
  const nodes = {};
  connections.forEach((connection) => {
    let [to, from] = connection.split("-");

    nodes[to] = nodes[to] || newCave(to);
    nodes[from] = nodes[from] || newCave(from);

    nodes[to].pointers.add(from);
    nodes[from].pointers.add(to);
  });
  return nodes;
};

const hasTwoSmall = (values) => {
  const map = {};
  for (let v of values) {
    if (v.toUpperCase() === v) {
      continue;
    }
    if (map[v]) {
      return true;
    }
    map[v] = true;
  }
  return false;
};

const partOne = (connections) => {
  const nodes = mapConnections(connections);
  const paths = [];

  const exploreAllPoints = (currentLocation, visited) => {
    const newVisited = [...visited];
    newVisited.push(currentLocation.name);

    if (currentLocation === nodes.end) {
      paths.push([...newVisited]);
      return;
    }

    currentLocation.pointers.forEach((nextPoint) => {
      if (nodes[nextPoint].isBig || !visited.includes(nextPoint)) {
        exploreAllPoints(nodes[nextPoint], newVisited);
      }
    });
  };

  exploreAllPoints(nodes.start, []);

  return paths.length;
};

const partTwo = (connections) => {
  const nodes = mapConnections(connections);
  const paths = [];

  const exploreAllPoints = (currentLocation, visited) => {
    const newVisited = [...visited];
    newVisited.push(currentLocation.name);

    if (currentLocation === nodes.end) {
      paths.push([...newVisited]);
      return;
    }

    currentLocation.pointers.forEach((nextPoint) => {
      const isStart = nextPoint === "start";
      const shouldVisitStart = visited.length === 0;
      const isBig = nodes[nextPoint].isBig;
      const hasSmallTwice = hasTwoSmall(newVisited);
      const hasBeenVisited = visited.indexOf(nextPoint) > -1;

      if (
        isBig ||
        (isStart && shouldVisitStart) ||
        (!isStart && !hasSmallTwice) ||
        (!isStart && hasSmallTwice && !hasBeenVisited)
      ) {
        exploreAllPoints(nodes[nextPoint], newVisited);
      }
    });
  };

  exploreAllPoints(nodes.start, []);

  return paths.length;
};

module.exports = {
  beforeAll: Function.prototype,
  beforeEach: Function.prototype,
  parseInput: undefined,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
