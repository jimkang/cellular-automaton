cellular-automaton
==================

A cellular automaton that will run rules over your cells.

Supports:

- *Sequential*, rather than parallel, updating.
- Cells arranged in a 2D square grid in which each cell has up to eight neighbors.

[Here is a demo.](http://jimkang.com/cellular-automaton/demo)

Installation
------------

    npm install cellular-automaton

Usage
-----

      var Automaton = require('cellular-automaton');
      var sortCellsByDist = require('sort-cells-by-dist');

      var automaton = Automaton({
        cellMap: `
          xoxox
          xxoox
          xoxxo
          oooxx
          oxxxo
        ` ,
      cellDefs: {
        o: {
          type: 'populated',
          rules: [
            solitude,
            overpopulation
          ]
        },
        x: {
          type: 'empty',
          rules: [
            populate
          ]
        }
      },
      orderingFn: curry(sortCellsByDist)({ col: 0, row: 0 })
    });

    automaton.getCells();
    automaton.step();
    automaton.step();
    automaton.step();

`step` returns:

    [
      {
        instigator: 'cell_1_0',
        source: ['cell_1_0'],
        target: ['cell_1_0'],
        event: 'death',
        details: 'too lonely'
      },
      {
        instigator: 'cell_1_0',
        sources: ['cell_1_0'],
        event: 'idle'
      }
    ]

`getCells` returns a list of cell objects, like so:

    [
      {
        "col": 0,
        "row": 0,
        "id": "cell_0_0",
        "type": "empty",
        "rules": [
          null
        ],
        "mapSymbol": "x"
      },
      {
        "col": 1,
        "row": 0,
        "id": "cell_1_0",
        "type": "empty",
        "rules": [
          null
        ],
        "mapSymbol": "x"
      },
      {
        "col": 2,
        "row": 0,
        "id": "cell_2_0",
        "type": "empty",
        "rules": [
          null
        ],
        "mapSymbol": "x"
      },
      {
        "col": 3,
        "row": 0,
        "id": "cell_3_0",
        "type": "populated",
        "rules": [
          null,
          null
        ],
        "mapSymbol": "o"
      }
    ]

`stepGeneration` will call `step` until an entire generation is complete, meaning that each cell is processed once.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2017 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
