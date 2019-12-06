const planetsByName = {};

const getNumOrbits = (planet) => {
  let count = 0;
  let pointer = planet;
  
  while (pointer.orbits) {
    count++;
    pointer = pointer.orbits;
  }

  return count;
};

const getOrMakePlanet = (id) => {
  planetsByName[id] = planetsByName[id] || { id, orbits: null };
  return planetsByName[id];
};

const mapPlanetOrbit = (orbit) => {
  const [center, outter] = orbit.split(')');

  getOrMakePlanet(outter).orbits = getOrMakePlanet(center);
};

const mapPlanetOrbits = (orbits) => orbits.forEach(mapPlanetOrbit);

const partOne = (input) => {
  mapPlanetOrbits(input);

  var tottal = 0;
  Object.values(planetsByName).forEach((planet) => tottal += getNumOrbits(planet));

  return tottal;
};
const partTwo = (input) => {
  const san = planetsByName.SAN;
  const you = planetsByName.YOU;

  let sanMoves = 0;
  let sanPointer = san;
  while (sanPointer.orbits) {
    sanPointer.orbits.distence = sanMoves;
    sanMoves++;
    sanPointer = sanPointer.orbits;
  }

  let youMoves = 0;
  let youPointer = you;
  while (youPointer.orbits && !youPointer.orbits.distence) {
    youMoves++;
    youPointer = youPointer.orbits;
  }

  return youMoves + youPointer.orbits.distence;
};

module.exports = { partOne, partTwo };
