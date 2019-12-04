const getAllPointsAsLL = (wire) => {
  let firstNode = null;
  let currentNode = null;
  
  let x = 0;
  let y = 0;

  const transfromations = {
    U: () => y++,
    D: () => y--,
    L: () => x--,
    R: () => x++,
  };

  const push = () => {
    const node = {
      x,
      y,
      d: Math.abs(x) + Math.abs(y),
      next: null
    };

    if (currentNode) {
      currentNode.next = node;
    } else {
      firstNode = node;
    }

    currentNode = node;
  }

  wire.split(',').forEach((section) => {
    const dir = section[0];
    let dist = +section.substring(1);

    const transfrom = transfromations[dir];
    while (dist > 0) {
      transfrom();
      push();
      dist--;
    }
  });

  return firstNode;
};

const getIntersections = (wireHeadA, wireHeadB) => {
  const intersections = [];
  const points = {};

  let aCurr = wireHeadA;
  let bCurr = wireHeadB;

  while (aCurr) {
    points[aCurr.x] = points[aCurr.x] || {};
    points[aCurr.x][aCurr.y] = true;
    aCurr = aCurr.next;
  } 

  while (bCurr) {
    if (points[bCurr.x] && points[bCurr.x][bCurr.y]) {
      intersections.push(bCurr);
    }
    bCurr = bCurr.next;
  }

  return intersections;
};


let getIntersectionsCache = null;
const getIntersectionsCached = (wireA, wireB) => {
  // lets not do this twice
  if (!getIntersectionsCache) {
    const wireHeadA = getAllPointsAsLL(wireA);
    const wireHeadB = getAllPointsAsLL(wireB);

    getIntersectionsCache = {
      intersections: getIntersections(wireHeadA, wireHeadB),
      headA: wireHeadA,
      headB: wireHeadB,
    };
  }

  return getIntersectionsCache;
};

const partOne = (wires) => {
  const { intersections } = getIntersectionsCached(...wires);

  return Math.min(...intersections.map(({d}) => d));
};

const trackWire = (head, intersections, setDist) => {
 const memory = {};
  let dist = 1;
  let curr = head;

  while (curr) {
    const { x, y } = curr;
    const cross = intersections.find((c) => c.x === x && c.y === y );
    if (cross) {
      setDist(cross, dist);
    }

    curr = curr.next;
    dist++;
  }
};

const partTwo = (wires) => {
  const { intersections, headA, headB } = getIntersectionsCached(...wires);

  trackWire(headA, intersections, (point, dist) => point.distA = dist);
  trackWire(headB, intersections, (point, dist) => point.distB = dist);

  const distences = intersections.map(({distA, distB}) => distA + distB);

  return Math.min(...distences);
}

module.exports = { partOne, partTwo };
