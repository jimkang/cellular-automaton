var Automaton = require('../index');
var sortCellsByDist = require('sort-cells-by-dist');
var rules = require('../tests/fixtures/game-of-life-rules');
var curry = require('lodash.curry');
var flatten = require('lodash.flatten');
var d3 = require('d3-selection');
var accessor = require('accessor')();
var Crown = require('csscrown');

var crown = Crown({
  crownClass: 'instigator'
});

const cellSize = 100;

var cellsRoot = d3.select('#cells-root');
var logsRoot = d3.select('#logs-root');

var initialMap = `
      xoxox
      xxoox
      xoxxo
      oooxx
      oxxxo
    `;

(function go() {
  var accumulatedLogs;
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

  renderControls({ onStep, onGeneration });
  renderCells({ cells: automaton.getCells() });

  function onStep() {
    var logs = automaton.step();
    accumulatedLogs = logs.concat(accumulatedLogs);
    console.log(automaton.getMap());
    render({
      cells: automaton.getCells(),
      logs: accumulatedLogs,
      latestLogs: logs
    });
  }

  function onGeneration() {
    var logs = automaton.generationStep();
    accumulatedLogs = flatten(logs).concat(accumulatedLogs);
    renderCells({ cells: automaton.getCells() });
    console.log(automaton.getMap());
    render({
      cells: automaton.getCells(),
      logs: accumulatedLogs,
      latestLogs: logs
    });
  }
})();

function render({ cells, logs, latestLogs }) {
  var instigatorId;
  if (latestLogs.length > 0) {
    instigatorId = latestLogs[0].instigator;
  }
  renderCells({ cells, instigatorId });
  renderLogs({ logs });
}

function renderControls({ onStep, onGeneration }) {
  d3.select('#step-button').on('click', onStep);
  d3.select('#generation-button').on('click', onGeneration);
}

function renderCells({ cells, instigatorId }) {
  var cellSel = cellsRoot.selectAll('.cell').data(cells, accessor());
  cellSel.exit().remove();

  var newCellSel = cellSel
    .enter()
    .append('g')
    .classed('cell', true)
    .attr('id', accessor())
    .attr('transform', getCellTransform);

  newCellSel
    .append('circle')
    .attr('r', cellSize * 0.4)
    .attr('cx', cellSize / 2)
    .attr('cy', cellSize / 2);
  newCellSel
    .append('rect')
    .attr('width', cellSize)
    .attr('height', cellSize)
    .classed('frame', true);

  var updateSel = newCellSel.merge(cellSel);
  updateSel.select('circle').attr('visibility', getCellVisibility);

  if (instigatorId) {
    crown(document.getElementById(instigatorId));
  }
}

function renderLogs({ logs }) {
  var logSel = logsRoot.selectAll('.log').data(logs);
  logSel.exit().remove();

  var newLogSel = logSel
    .enter()
    .append('li')
    .classed('log', true);
  newLogSel.append('pre');

  newLogSel
    .merge(logSel)
    .select('pre')
    .text(getLogJSON);
}

function getCellVisibility(cell) {
  return cell.type === 'populated' ? 'visibility' : 'hidden';
}

function getCellTransform(cell) {
  return `translate(${cell.col * cellSize}, ${cell.row * cellSize})`;
}

function getLogJSON(log) {
  return JSON.stringify(log, null, 2);
}
