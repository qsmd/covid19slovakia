// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

// eslint-disable-next-line no-unused-vars
import * as chartjs from './Chart.bundle.min.js'; // eslint-disable-line import/extensions
import * as util from './util.js'; // eslint-disable-line import/extensions
import ChartConfig from './ChartConfig.js'; // eslint-disable-line import/extensions

window.onload = function () {
  ['total-cases', 'daily-cases', 'total-tests', 'daily-tests'].forEach((type) => {
      const daily = type.includes('daily');
    const chartConfig = new ChartConfig(type);
    const aaa = document.getElementById(`canvas-${type}`);
    console.log(`### aaa canvas-${type}: ${aaa}`);
    
    const chart = new Chart(document.getElementById(`canvas-${type}`).getContext('2d'), util.createConfig(chartConfig));
    document.getElementById(`config-${type}`).addEventListener('click', () => { chartConfig.collapseClick(); });
    document.getElementById(`download-${type}`).addEventListener('click', (event) => {
      event.target.href = chart.toBase64Image();
    });
    // checkboxes
    const panel = document.getElementById(`panel-${type}`);
    chartConfig.generateCheckboxes(type).forEach((element) => {
      panel.appendChild(element);
      if (element.tagName === 'INPUT') {
        element.addEventListener('click', (e) => { chartConfig.checkboxClick(e, daily, chart); });
      }
    });
  });
};
