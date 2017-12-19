var test = require('tape');
var Automaton = require('../index');
var sortCellsByDist = require('sort-cells-by-dist');
var rules = require('./fixtures/game-of-life-rules');
var curry = require('lodash.curry');

var initialMap = `
      xoxox
      xxoox
      xoxxo
      oooxx
      oxxxo
    `;

var cleanedInitialMap = `xoxox
xxoox
xoxxo
oooxx
oxxxo`;

var testSteps = [
  {
    method: 'step',
    expectedLogs: [],
    expectedMap: cleanedInitialMap
  },
  {
    method: 'step',
    expectedLogs: [],
    expectedMap: cleanedInitialMap
  },
  {
    method: 'step',
    expectedLogs: [
      {
        instigator: 'cell_1_0',
        source: ['cell_1_0'],
        target: ['cell_1_0'],
        event: 'death',
        details: 'too lonely'
      }
    ],
    expectedMap: `xxxox
xxoox
xoxxo
oooxx
oxxxo`
  },
  {
    method: 'step',
    expectedLogs: [],
    expectedMap: `xxxox
xxoox
xoxxo
oooxx
oxxxo`
  },
  {
    method: 'generationStep',
    expectedMap: `xxoox
xxxxo
oxooo
oxooo
xxxoo`,
    expectedLogs: [
      [
        {
          instigator: 'cell_0_2',
          sources: [['cell_1_2', 'cell_1_3', 'cell_0_3']],
          targets: ['cell_0_2'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_2_0',
          sources: [['cell_3_0', 'cell_3_1', 'cell_2_1']],
          targets: ['cell_2_0'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_2_1',
          sources: [['cell_2_0', 'cell_3_0', 'cell_3_1', 'cell_1_2']],
          targets: ['cell_2_1'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [
        {
          instigator: 'cell_1_2',
          sources: [['cell_2_3', 'cell_1_3', 'cell_0_3', 'cell_0_2']],
          targets: ['cell_1_2'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [
        {
          instigator: 'cell_2_2',
          sources: [['cell_3_1', 'cell_2_3', 'cell_1_3']],
          targets: ['cell_2_2'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [],
      [],
      [
        {
          instigator: 'cell_3_1',
          sources: [['cell_2_0', 'cell_3_0', 'cell_4_2', 'cell_2_2']],
          targets: ['cell_3_1'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [
        {
          instigator: 'cell_1_3',
          sources: [
            ['cell_0_2', 'cell_2_2', 'cell_2_3', 'cell_0_4', 'cell_0_3']
          ],
          targets: ['cell_1_3'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [
        {
          instigator: 'cell_3_2',
          sources: [['cell_4_2', 'cell_2_3', 'cell_2_2']],
          targets: ['cell_3_2'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [],
      [
        {
          instigator: 'cell_0_4',
          source: ['cell_0_4'],
          target: ['cell_0_4'],
          event: 'death',
          details: 'too lonely'
        }
      ],
      [],
      [
        {
          instigator: 'cell_4_1',
          sources: [['cell_3_0', 'cell_4_2', 'cell_3_2']],
          targets: ['cell_4_1'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [],
      [
        {
          instigator: 'cell_3_3',
          sources: [
            ['cell_2_2', 'cell_3_2', 'cell_4_2', 'cell_4_4', 'cell_2_3']
          ],
          targets: ['cell_3_3'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [],
      [],
      [
        {
          instigator: 'cell_3_4',
          sources: [['cell_2_3', 'cell_3_3', 'cell_4_4']],
          targets: ['cell_3_4'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_4_3',
          sources: [
            ['cell_3_2', 'cell_4_2', 'cell_4_4', 'cell_3_4', 'cell_3_3']
          ],
          targets: ['cell_4_3'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      []
    ]
  },
  {
    method: 'step',
    expectedMap: `xxoox
xxxxo
oxooo
oxooo
xxxoo`,
    expectedLogs: []
  },
  {
    method: 'step',
    expectedMap: `xxoox
xxxxo
oxooo
oxooo
xxxoo`,
    expectedLogs: []
  },
  {
    method: 'generationStep',
    expectedMap: `xxooo
xooox
ooxxo
ooxxo
xxxoo`,
    expectedLogs: [
      [],
      [
        {
          instigator: 'cell_1_1',
          sources: [['cell_2_0', 'cell_2_2', 'cell_0_2']],
          targets: ['cell_1_1'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [],
      [],
      [
        {
          instigator: 'cell_2_1',
          sources: [
            ['cell_2_0', 'cell_3_0', 'cell_3_2', 'cell_2_2', 'cell_1_1']
          ],
          targets: ['cell_2_1'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_1_2',
          sources: [
            [
              'cell_1_1',
              'cell_2_1',
              'cell_2_2',
              'cell_2_3',
              'cell_0_3',
              'cell_0_2'
            ]
          ],
          targets: ['cell_1_2'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_2_2',
          sources: [
            [
              'cell_1_1',
              'cell_2_1',
              'cell_3_2',
              'cell_3_3',
              'cell_2_3',
              'cell_1_2'
            ]
          ],
          targets: ['cell_2_2'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [],
      [],
      [
        {
          instigator: 'cell_3_1',
          sources: [
            [
              'cell_2_0',
              'cell_3_0',
              'cell_4_1',
              'cell_4_2',
              'cell_3_2',
              'cell_2_1'
            ]
          ],
          targets: ['cell_3_1'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_1_3',
          sources: [['cell_0_2', 'cell_1_2', 'cell_2_3', 'cell_0_3']],
          targets: ['cell_1_3'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_3_2',
          sources: [
            [
              'cell_2_1',
              'cell_3_1',
              'cell_4_1',
              'cell_4_2',
              'cell_4_3',
              'cell_3_3',
              'cell_2_3'
            ]
          ],
          targets: ['cell_3_2'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [
        {
          instigator: 'cell_2_3',
          sources: [['cell_1_2', 'cell_3_3', 'cell_3_4', 'cell_1_3']],
          targets: ['cell_2_3'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [],
      [
        {
          instigator: 'cell_4_0',
          sources: [['cell_4_1', 'cell_3_1', 'cell_3_0']],
          targets: ['cell_4_0'],
          event: 'birth',
          details: 'neighbors got together'
        }
      ],
      [
        {
          instigator: 'cell_4_1',
          sources: [['cell_3_0', 'cell_4_0', 'cell_4_2', 'cell_3_1']],
          targets: ['cell_4_1'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [],
      [
        {
          instigator: 'cell_3_3',
          sources: [['cell_4_2', 'cell_4_3', 'cell_4_4', 'cell_3_4']],
          targets: ['cell_3_3'],
          event: 'death',
          details: 'too crowded'
        }
      ],
      [],
      [],
      [],
      [],
      []
    ]
  }
];

var automaton = Automaton({
  cellMap: initialMap,
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
