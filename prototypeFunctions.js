function addPrototypeFunctions() {
  Array.prototype._sum = function () {
    return this.reduce((sum, curr) => sum + curr);
  };
  Array.prototype._product = function () {
    return this.reduce((sum, curr) => sum * curr);
  };
}

module.exports = {
  addPrototypeFunctions,
};
