var pluck = require('lodash.pluck');

function solitude(cell, neighbors, changeCellType) {
  var log;
  if (neighbors.length < 2) {
    changeCellType(cell, 'empty');
    log = {
      instigator: cell.id,
      source: [cell.id],
      target: [cell.id],
      event: 'death',
      details: 'too lonely'
    };
  }
  return log;
}

function overpopulation(cell, neighbors, changeCellType) {
  var log;
  if (neighbors.length >= 4) {
    changeCellType(cell, 'empty');
    log = {
      instigator: cell.id,
      sources: [cell.id],
      targets: [cell.id],
      event: 'death',
      details: 'too crowded'
    };
  }
  return log;
}

function populate(cell, neighbors, changeCellType) {
  var log;
  if (neighbors.length >= 3) {
    changeCellType(cell, 'populated');
    log = {
      instigator: cell.id,
      sources: [pluck(neighbors, 'id')],
      targets: [cell.id],
      event: 'birth',
      details: 'neighbors got together'
    };
  }
  return log;
}

module.exports = {
  solitude,
  overpopulation,
  populate
};
