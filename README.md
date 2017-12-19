cellular-automaton
==================

A cellular automaton that will run rules over your cells.

Supports:

- *Sequential*, rather than parallel, updating.
- Cells arranged in a 2D square grid in which each cell has up to eight neighbors.

[Here is a demo.](http://jimkang.com/cellular-automaton/demo);

Installation
------------

    npm install cellular-automaton

Usage
-----

      var Automaton = require('cellular-automaton');
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
      order: cells => cells.map(distanceFrom00).map(addIndex).sort(aIsCloserThanB.map(getIndex))
    });

    automaton.getCells();
    automaton.stepTurn();

Returns:

    {
      log: {
        {
          source: [0, 0],
          target: [0, 0],
          eventName: 'death'
        }
      },
      cells: <mutated cells>
      ]
    }

  automaton.stepGeneration();

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
