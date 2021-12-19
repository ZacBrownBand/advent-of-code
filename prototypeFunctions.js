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
  Array.prototype._min = function () {
    return Math.min(...this);
  };
  Array.prototype._max = function () {
    return Math.max(...this);
  };
}

module.exports = {
  addPrototypeFunctions,
};
