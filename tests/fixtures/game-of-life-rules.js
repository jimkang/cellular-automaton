var pluck = require('lodash.pluck');

function solitude(cell, neighbors, changeCellType) {
  var log;
  var populatedNeighbors = neighbors.filter(isPopulated);
  if (populatedNeighbors.length < 2) {
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
  var populatedNeighbors = neighbors.filter(isPopulated);
  if (populatedNeighbors.length >= 4) {
    changeCellType(cell, 'empty');
    log = {
      instigator: cell.id,
      sources: [pluck(populatedNeighbors, 'id')],
      targets: [cell.id],
      event: 'death',
      details: 'too crowded'
    };
  }
  return log;
}

function populate(cell, neighbors, changeCellType) {
  var log;
  var populatedNeighbors = neighbors.filter(isPopulated);
  if (populatedNeighbors.length >= 3) {
    changeCellType(cell, 'populated');
    log = {
      instigator: cell.id,
      sources: [pluck(populatedNeighbors, 'id')],
      targets: [cell.id],
      event: 'birth',
      details: 'neighbors got together'
    };
  }
  return log;
}

function isPopulated(cell) {
  return cell.type === 'populated';
}

module.exports = {
  solitude,
  overpopulation,
  populate
};
