var cloneDeep = require('lodash.clonedeep');
var curry = require('lodash.curry');

function applyDefToCell(def, cell) {
  Object.getOwnPropertyNames(def).forEach(curry(copyProp)(def, cell));
}

function copyProp(source, target, prop) {
  target[prop] = cloneDeep(source[prop]);
}

module.exports = applyDefToCell;
