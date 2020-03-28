// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

// eslint-disable-next-line no-unused-vars
import * as chartjs from './Chart.bundle.min.js'; // eslint-disable-line import/extensions
import * as util from './util.js'; // eslint-disable-line import/extensions
import ChartConfig from './ChartConfig.js'; // eslint-disable-line import/extensions

window.onload = function () {
  ['total-cases', 'daily-cases', 'total-tests', 'daily-tests'].forEach((canvasId) => {
  // ['total-tests'].forEach((canvasId) => {
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
