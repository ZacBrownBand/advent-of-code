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

  Set.prototype._union = function(set) {
    const _union = new Set(this);
    for (const elem of set) {
      _union.add(elem);
    }
    return _union;
  }
  Set.prototype._intersection = function (set) {
    const _intersection = new Set();
    for (const elem of set) {
      if (this.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }
}

module.exports = {
  addPrototypeFunctions,
};
