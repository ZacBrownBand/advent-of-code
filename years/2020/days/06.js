let groups = [];

const parse = (input) => {
  groups = input.map(l => l.length ? l : '.')
    .join('|')
    .split('|.|')
    .map(g => g.split('|'));
};

const getCountUnion = (group) => {
  const map = {};
  group.join('')
    .split('')
    .forEach(l => { 
      map[l] = true; 
    });
  return Object.keys(map).length;
};

const getCountIntersection = (group) => {
  const map = {};
  group.forEach(answers => {
    answers.split('').forEach(a => {
      map[a] = map[a] ? map[a] + 1 : 1;
    });
  });

  const keys = Object.keys(map);
  const groupCount = group.length;
  keys.forEach(k => {
    if (map[k] < groupCount) {
      delete map[k];
    }
  });
  return Object.keys(map).length;
};

const sumUpAll = (strategy) => {
  let count = 0;
  groups.forEach(g => {
    count += strategy(g);
  });
  return count;
};

const partOne = sumUpAll.bind(null, getCountUnion);
const partTwo = sumUpAll.bind(null, getCountIntersection);

module.exports = {
beforeAll: parse,
  partOne,
  partTwo
};
