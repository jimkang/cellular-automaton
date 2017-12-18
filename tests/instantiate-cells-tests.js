var test = require('tape');
var instantiateCells = require('../instantiate-cells');
var rules = require('./fixtures/game-of-life-rules');

var expectedInitialCells = [
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 0,
    row: 0,
    id: 'cell_0_0'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 1,
    row: 0,
    id: 'cell_1_0'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 2,
    row: 0,
    id: 'cell_2_0'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 3,
    row: 0,
    id: 'cell_3_0'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 4,
    row: 0,
    id: 'cell_4_0'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 0,
    row: 1,
    id: 'cell_0_1'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 1,
    row: 1,
    id: 'cell_1_1'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 2,
    row: 1,
    id: 'cell_2_1'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 3,
    row: 1,
    id: 'cell_3_1'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 4,
    row: 1,
    id: 'cell_4_1'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 0,
    row: 2,
    id: 'cell_0_2'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 1,
    row: 2,
    id: 'cell_1_2'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 2,
    row: 2,
    id: 'cell_2_2'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 3,
    row: 2,
    id: 'cell_3_2'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 4,
    row: 2,
    id: 'cell_4_2'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 0,
    row: 3,
    id: 'cell_0_3'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 1,
    row: 3,
    id: 'cell_1_3'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 2,
    row: 3,
    id: 'cell_2_3'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 3,
    row: 3,
    id: 'cell_3_3'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 4,
    row: 3,
    id: 'cell_4_3'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 0,
    row: 4,
    id: 'cell_0_4'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 1,
    row: 4,
    id: 'cell_1_4'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 2,
    row: 4,
    id: 'cell_2_4'
  },
  {
    mapSymbol: 'x',
    type: 'empty',
    rules: [rules.populate],
    col: 3,
    row: 4,
    id: 'cell_3_4'
  },
  {
    mapSymbol: 'o',
    type: 'populated',
    rules: [rules.solitude, rules.overpopulation],
    col: 4,
    row: 4,
    id: 'cell_4_4'
  }
];

test('Instantiate cells', instantiateTest);

function instantiateTest(t) {
  var cells = instantiateCells({
    cellMap: `
      xoxox
      xxoox
      xoxxo
      oooxx
      oxxxo
    `,
    cellDefs: {
      o: {
        mapSymbol: 'o',
        type: 'populated',
        rules: [rules.solitude, rules.overpopulation]
      },
      x: {
        mapSymbol: 'x',
        type: 'empty',
        rules: [rules.populate]
      }
    }
  });
  // console.log(JSON.stringify(cells, null, 2));

  t.deepEqual(cells, expectedInitialCells, 'Cells are correctly instantiated.');
  t.end();
}
