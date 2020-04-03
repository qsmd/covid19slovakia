// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import * as chartjs from './Chart.bundle.min.js';
import ChartConfig from './ChartConfig.js';

window.onload = function () {
  ['total-cases', 'daily-cases', 'total-tests', 'daily-tests', 'total-caseratio', 'daily-caseratio'].forEach((canvasId) => {
    const chartConfig = new ChartConfig(canvasId);
    const chart = new Chart(document.getElementById(`canvas-${canvasId}`).getContext('2d'), chartConfig.createConfig());
    document.getElementById(`config-${canvasId}`).addEventListener('click', () => { chartConfig.collapseClick(); });
    document.getElementById(`download-${canvasId}`).addEventListener('click', (event) => {
      event.target.href = chart.toBase64Image();
    });
    // checkboxes
    const panel = document.getElementById(`panel-${canvasId}`);
    chartConfig.generateCheckboxes(canvasId).forEach((element) => {
      panel.appendChild(element);
      if (element.tagName === 'INPUT') {
        element.addEventListener('click', (e) => { chartConfig.checkboxClick(e, chart); });
      }
    });
  });
};
