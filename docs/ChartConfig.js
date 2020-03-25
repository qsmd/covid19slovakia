import COUNTRIES from './data/timelines.js'; // eslint-disable-line import/extensions
import * as util from './util.js';

export default class ChartConfig {
  constructor() {
    this.colors = [
      '#36a2eb',
      '#ff6384',
      '#ffa600',
      '#ff7c43',
      '#2f4b7c',
      '#d45087',
      '#a05195',
      '#665191',
    ];
    this.checkboxes = [];
  }

  getCountryDatasets(daily, country) {
    const datasets = [];
    const countryDatasets = util.countryToDatasets(daily, country, 2);
    const color = this.colors.shift();
    datasets.push({
      label: country[0],
      backgroundColor: color,
      borderColor: color,
      data: countryDatasets.cases,
      yAxisID: 'left-y-axis',
      fill: false,
    });
    if (country.tests) {
      const testsColor = `${color}33`;
      datasets.push({
        label: `${country[0]}-testy`,
        backgroundColor: testsColor,
        borderColor: testsColor,
        data: countryDatasets.tests,
        yAxisID: 'right-y-axis',
        fill: true,
      });
    }
    return datasets;
  }

  disableUnchecked() {
    this.checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    });
  }

  enableUnchecked() {
    this.checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = false;
      }
    });
  }

  checkboxClick(event, chart, daily) {
    if (event.target.checked) {
      const country = util.getCountry(event.target.value);
      console.log(`### 111 ${country[0]}`);
      
      if (country) {
        this.getCountryDatasets(daily, country).forEach((dataset) => {
          if (event.target.value === dataset.label) {
            console.log(`### 222 ${dataset.data}`);
            
            chart.data.datasets.push(dataset);
          }
        });
      }
      if (this.colors.length === 0) {
        this.disableUnchecked();
      }
    } else {
      for (let i = 0; i < chart.data.datasets.length; i += 1) {
        if (event.target.value === chart.data.datasets[i].label) {
          this.colors.push(chart.data.datasets[i].borderColor);
          chart.data.datasets.splice(i, 1);
        }
      }
      this.enableUnchecked();
    }
    const longestPeriod = util.getLongestPeriod(chart.data.datasets);
    chart.data.labels.splice(0, chart.data.labels.length);
    chart.data.labels.push(...Array.from(Array(longestPeriod).keys()));
    chart.update();
  }

  generateCheckboxes(chartType) {
    const nodes = [];
    COUNTRIES.forEach((country) => {
      const countryKeys = [country[0]];
      if (country.tests) {
        countryKeys.push(`${country[0]}-testy`);
      }
      countryKeys.forEach((countryKey) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', `${chartType}-countryKey`);
        input.setAttribute('value', countryKey);
        input.checked = util.DEFAULT.includes(country[0]);
        nodes.push(input);
        nodes.push(document.createTextNode(`${countryKey} |\n`));
        this.checkboxes.push(input);
      });
    });
    return nodes;
  }
}
