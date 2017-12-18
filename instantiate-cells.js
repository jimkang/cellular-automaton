var parseCellMap = require('./parse-cell-map');
var applyDefToCell = require('./apply-def-to-cell');

function instantiateCells({ cellMap, cellDefs }) {
  var cells = [];

  var rowsOfSymbols = parseCellMap(cellMap);

  for (var rowIndex = 0; rowIndex < rowsOfSymbols.length; ++rowIndex) {
    var row = rowsOfSymbols[rowIndex];
    for (var colIndex = 0; colIndex < row.length; ++colIndex) {
      cells.push(instantiateCell(row[colIndex], colIndex, rowIndex));
    }
  }

  return cells;

  function instantiateCell(symbol, col, row) {
    var cell = {
      col,
      row,
      id: 'cell_' + col + '_' + row
    };
    applyDefToCell(cellDefs[symbol], cell);
    return cell;
  }
}

module.exports = instantiateCells;
