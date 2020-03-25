// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

// eslint-disable-next-line no-unused-vars
import * as chartjs from './Chart.bundle.min.js'; // eslint-disable-line import/extensions
import * as util from './util.js';
import ChartConfig from './ChartConfig.js';

window.onload = function () {
  ['total', 'daily'].forEach((type) => {
    const daily = type === 'daily';
    const chartConfig = new ChartConfig();
    const chart = new Chart(document.getElementById(`canvas-${type}`).getContext('2d'), util.createConfig(chartConfig, daily));
    document.getElementById(`config-${type}`).addEventListener('click', util.collapseClick);
    document.getElementById(`download-${type}`).addEventListener('click', (event) => {
      event.target.href = chart.toBase64Image();
    });
    // checkboxes
    const panel = document.getElementById(`config-${type}-panel`);
    chartConfig.generateCheckboxes(type).forEach((element) => {
      panel.appendChild(element);
      if (element.tagName === 'INPUT') {
        element.addEventListener('click', (event) => chartConfig.checkboxClick(event, chart, daily));
      }
    });
  });

};
