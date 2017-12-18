var test = require('tape');
var parseCellMap = require('../parse-cell-map');

test('parse cell map', parseTest);

function parseTest(t) {
  t.deepEqual(
    parseCellMap(`
      xoxox
      xxoox
      xoxxo
      oooxx
      oxxxo

    `),
    [
      ['x', 'o', 'x', 'o', 'x'],
      ['x', 'x', 'o', 'o', 'x'],
      ['x', 'o', 'x', 'x', 'o'],
      ['o', 'o', 'o', 'x', 'x'],
      ['o', 'x', 'x', 'x', 'o']
    ],
    'Correctly parses map.'
  );
  t.end();
}
