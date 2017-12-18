function applyDefToCell(def, cell) {
  cell.type = def.type;
  cell.rules = def.rules;
  cell.mapSymbol = def.mapSymbol;
}

module.exports = applyDefToCell;
