var instantiateCells = require('./instantiate-cells');
var findWhere = require('lodash.findwhere');
var curry = require('lodash.curry');
var compact = require('lodash.compact');
var applyDefToCell = require('./apply-def-to-cell');

function Automaton({ cellMap, cellDefs, orderingFn }) {
  var cellDefsByType = getCellDefsByType(cellDefs);
  var cells = instantiateCells({ cellMap, cellDefs });
  var cellOrder = orderingFn(cells);
  var currentStep = 0;
  var currentGeneration = 0;

  return {
    getCells,
    getMap,
    step,
    generationStep
  };

  function getCells() {
    return cells;
  }

  function getMap() {
    var rows = [];
    cells.forEach(addSymbolToRows);
    return rows.map(rowToString).join('\n');

    function addSymbolToRows(cell) {
      if (cell.row >= rows.length) {
        rows[cell.row] = [];
      }
      rows[cell.row][cell.col] = cell.mapSymbol;
    }
  }

  // Returns logs of rule runs.
  function step() {
    var actingCell = cells[cellOrder[currentStep]];
    var logs = actingCell.rules.map(curry(runRule)(actingCell));

    currentStep += 1;
    if (currentStep >= cellOrder.length) {
      currentStep = 0;
      currentGeneration += 1;
    }

    return logs;
  }

  function generationStep() {
    var generationLogs = [];
    var nextGeneration = currentGeneration + 1;
    while (currentGeneration < nextGeneration) {
      generationLogs.push(step());
    }
    return generationLogs;
  }

  function runRule(cell, rule) {
    var log = rule(cell, getNeighbors(cell), changeCellType);
    if (log) {
      return log;
    } else {
      return {
        instigator: cell.id,
        sources: [cell.id],
        event: 'idle'
      };
    }
  }

  function changeCellType(cell, type) {
    applyDefToCell(cellDefsByType[type], cell);
  }

  // TODO: Build coord index of cells, if this is significantly slow.
  function getNeighbors(cell) {
    return compact([
      findWhere(cells, { col: cell.col - 1, row: cell.row - 1 }),
      findWhere(cells, { col: cell.col, row: cell.row - 1 }),
      findWhere(cells, { col: cell.col + 1, row: cell.row - 1 }),
      findWhere(cells, { col: cell.col + 1, row: cell.row }),
      findWhere(cells, { col: cell.col + 1, row: cell.row + 1 }),
      findWhere(cells, { col: cell.col, row: cell.row + 1 }),
      findWhere(cells, { col: cell.col - 1, row: cell.row + 1 }),
      findWhere(cells, { col: cell.col - 1, row: cell.row })
    ]);
  }
}

function rowToString(row) {
  return row.join('');
}

function getCellDefsByType(defsBySymbol) {
  var defsByType = {};
  for (var symbol in defsBySymbol) {
    let def = defsBySymbol[symbol];
    defsByType[def.type] = def;
  }
  return defsByType;
}

module.exports = Automaton;
