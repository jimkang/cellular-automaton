function parseCellMap(mapString) {
  var cellSymbols = [];
  var rowStrings = mapString.trim().split('\n');
  for (var rowIndex = 0; rowIndex < rowStrings.length; ++rowIndex) {
    cellSymbols.push(rowStrings[rowIndex].trim().split(''));
  }
  return cellSymbols;
}

module.exports = parseCellMap;
