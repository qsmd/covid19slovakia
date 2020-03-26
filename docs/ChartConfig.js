import CASES from './data/timelines.js'; // eslint-disable-line import/extensions
import TESTS from './data/tests.js'; // eslint-disable-line import/extensions
import * as util from './util.js'; // eslint-disable-line import/extensions

export default class ChartConfig {
  constructor(type) {
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
    this.type = type;
    this.countries = type.includes('-tests') ? TESTS : CASES;
    this.defaults = type.includes('-tests') ? util.DEFAULT_TESTS : util.DEFAULT_CASES;
    this.checkboxes = [];
    this.testDaysToInclude = {};
    this.countryColors = {};
  }

  getCountryDatasets(daily, country) {
    const datasets = [];
    const countryDataset = util.countryToDataset(daily, country, this.countries, this.defaults, this.testDaysToInclude[country[0]]);
    let color = this.countryColors[`${country[0].split('-')[0]}`];
    if (!color) {
      color = this.colors.shift();
    }
    if (country[0].includes('testy')) {
      datasets.push({
        label: country[0],
        backgroundColor: `${color}33`,
        borderColor: `${color}33`,
        data: countryDataset,
        yAxisID: 'right-y-axis',
        fill: false,
      });
    } else {
      datasets.push({
        label: country[0],
        backgroundColor: color,
        borderColor: color,
        data: countryDataset,
        yAxisID: 'left-y-axis',
        fill: false,
      });
      this.testDaysToInclude[`${country[0]}-testy`] = countryDataset.length;
      this.countryColors[`${country[0]}`] = color;
      console.log(`### getCountryDatasets 222 ${country[0]}, ${country[0]}-testy, ${this.testDaysToInclude[`${country[0]}-testy`]}`);
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

  collapseClick() {
    const content = document.getElementById(`panel-${this.type}`);
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }

  checkboxClick(event, daily, chart) {
    if (event.target.checked) {
      const country = util.getCountry(this.countries, event.target.value);
      console.log(`### checkboxClick ${event.target.value}, ${country}`);
      
      if (country) {
        this.getCountryDatasets(daily, country).forEach((dataset) => {
          if (event.target.value === dataset.label) {
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

  generateCheckboxes(type) {
    const nodes = [];
    this.countries.forEach((country) => {
      const countryKeys = [country[0]];
      if (country.tests) {
        countryKeys.push(`${country[0]}-testy`);
      }
      countryKeys.forEach((countryKey) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', `${type}-${countryKey}`);
        input.setAttribute('value', countryKey);
        input.checked = this.defaults.includes(country[0]);
        nodes.push(input);
        nodes.push(document.createTextNode(`${countryKey} |\n`));
        this.checkboxes.push(input);
      });
    });
    return nodes;
  }
}
