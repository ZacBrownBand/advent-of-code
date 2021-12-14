function addPrototypeFunctions() {
  Array.prototype._sum = function () {
    return this.reduce((sum, curr) => sum + curr);
  };
  Array.prototype._product = function () {
    return this.reduce((sum, curr) => sum * curr);
  };
  Array.prototype._middle = function () {
    return this[Math.floor((this.length - 1) / 2)];
  };
}

module.exports = {
  addPrototypeFunctions,
};
