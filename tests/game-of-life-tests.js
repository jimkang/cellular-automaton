var test = require('tape');
var Automaton = require('../index');
var sortCellsByDist = require('sort-cells-by-dist');
var rules = require('./fixtures/game-of-life-rules');
var curry = require('lodash.curry');

var testSteps = [
  {
    method: 'step',
    expectedLogs: [
      {
        instigator: 'cell_0_0',
        sources: [['cell_1_0', 'cell_1_1', 'cell_0_1']],
        targets: ['cell_0_0'],
        event: 'birth',
        details: 'neighbors got together'
      }
    ],
    expectedMap: `ooxox
xxoox
xoxxo
oooxx
oxxxo`
  }
  // {
  //   method: 'step',
  //   expectedMap: ``
  // },
  // {
  //   method: 'step',
  //   expectedMap: ``
  // },
  // {
  //   method: 'generationStep',
  //   expectedMap: ``
  // },
  // {
  //   method: 'step',
  //   expectedMap: ``
  // },
  // {
  //   method: 'step',
  //   expectedMap: ``
  // },
  // {
  //   method: 'generationStep',
  //   expectedMap: ``
  // }
];

// Rules

var automaton = Automaton({
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
  },
  orderingFn: curry(sortCellsByDist)({ col: 0, row: 0 })
});

// Actual test running starts here.
test('Test initial state', testInitialState);
testSteps.forEach(runTestStep);

function testInitialState(t) {
  t.equal(
    automaton.getCells().length,
    25,
    'The correct number of cells are instantiated.'
  );
  automaton.getCells().forEach(checkCell);
  t.end();

  function checkCell(cell) {
    t.equal(typeof cell, 'object', 'Cell is an object.');
  }
}

function runTestStep(step) {
  test('Test ' + step.method, testStep);

  function testStep(t) {
    var logs = automaton[step.method]();
    console.log('logs', JSON.stringify(logs, null, 2));
    console.log('map', automaton.getMap());
    t.deepEqual(automaton.getMap(), step.expectedMap, 'Map is correct.');
    t.deepEqual(logs, step.expectedLogs, 'Logs are correct.');
    t.end();
  }
}
