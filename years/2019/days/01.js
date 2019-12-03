const getFuelForMass = (mass) => Math.floor(mass / 3) - 2;
const getFuelForMassDeep = (mass) => {
  var fuel = getFuelForMass(mass);
  return fuel > 0 ? (fuel + getFuelForMassDeep(fuel)) : 0;
};

const getReducerFor = (fn) =>
  (input) => [0, ...input].reduce((acc, mass) => acc + fn(mass));

module.exports = {
  partOne: getReducerFor(getFuelForMass),
  partTwo: getReducerFor(getFuelForMassDeep)
};
