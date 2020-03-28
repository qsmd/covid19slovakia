/* eslint-disable no-underscore-dangle */
import CASES from './data/timelines.js'; // eslint-disable-line import/extensions
import TESTS from './data/tests.js'; // eslint-disable-line import/extensions
import * as util from './util.js'; // eslint-disable-line import/extensions

const MINIMUM_CASES = 2;
const SLOVAK_POPULATION = 5435343;
const POPULATION = {
  AT: 8772865,
  CZ: 10578820,
  DE: 82521653,
  ES: 46528966,
  HU: 9772756,
  IT: 60589445,
  PL: 37972964,
  SK: 5435343,
  NO: 5367580,
};

const _X_AXE = {
  display: true,
  scaleLabel: {
    display: true,
    labelString: 'Dni od 2 prípadov / počet obyvateľov Slovenska)',
  },
};

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
    this.labelToValidDays = {};
    this.countryCodeToColor = {};
  }

  // 'private' methods

  _getDefaultPeriod() {
    let max = 0;
    this.countries.forEach((country) => {
      if (this.defaults.includes(country[0]) && (country.length - 3) > max) {
        max = country.length - 3;
      }
    });
    return max;
  }

  _createTimeline(daily, country) {
    const countryNameWithoutTest = country[0].split('-')[0];
    const multiplier = SLOVAK_POPULATION / POPULATION[countryNameWithoutTest];
    const dataset = [];
    let applicableDays = 0;
    let lastTotal = 0;
    const maxDays = this._getDefaultPeriod(this.countries, this.defaults);

    const testDaysToInclude = this.labelToValidDays[country[0]];
    if (testDaysToInclude) {
      country.slice(country.length - testDaysToInclude).forEach((day) => {
        const relativeDailyOrTotal = ((day - lastTotal) * multiplier).toFixed(2);
        if (daily) {
          lastTotal = day;
        }
        dataset.push(relativeDailyOrTotal);
      });
    } else {
      country.slice(3).forEach((day) => {
        const relativeDailyOrTotal = ((day - lastTotal) * multiplier).toFixed(2);
        const relativeTotal = (day * multiplier).toFixed(2);
        if (maxDays > applicableDays && relativeTotal >= MINIMUM_CASES) {
          applicableDays += 1;
          if (daily) {
            lastTotal = day;
          }
          dataset.push(relativeDailyOrTotal);
        }
      });
    }

    return dataset;
  }

  _createChartjsDataset(daily, country) {
    let dataset;
    const timeline = this._createTimeline(daily, country);
    let color = this.countryCodeToColor[`${country[0].split('-')[0]}`];
    if (!color) {
      color = this.colors.shift();
    }
    if (country[0].includes('testy')) {
      dataset = {
        label: country[0],
        backgroundColor: `${color}33`,
        borderColor: `${color}33`,
        data: timeline,
        yAxisID: 'right-y-axis',
        fill: false,
      };
    } else {
      dataset = {
        label: country[0],
        backgroundColor: color,
        borderColor: color,
        data: timeline,
        yAxisID: 'left-y-axis',
        fill: false,
      };
      this.labelToValidDays[`${country[0]}-testy`] = timeline.length;
      this.countryCodeToColor[`${country[0]}`] = color;
    }
    return dataset;
  }

  _disableUnchecked() {
    this.checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    });
  }

  _enableUnchecked() {
    this.checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = false;
      }
    });
  }

  // 'public' methods

  createConfig() {
    const daily = this.type.includes('daily-');
    const datasets = [];
    this.countries.forEach((country) => {
      if (this.defaults.includes(country[0])) {
        datasets.push(this._createChartjsDataset(daily, country));
      }
    });

    return {
      type: 'line',
      data: {
        labels: Array.from(Array(util.getLongestPeriod(datasets)).keys()),
        datasets,
      },
      options: {
        responsive: true,
        title: { display: false },
        tooltips: { mode: 'index', intersect: false },
        hover: { mode: 'nearest', intersect: true },
        animation: { duration: 0 },
        scales: { xAxes: [_X_AXE], yAxes: [util.yAxeLeft(daily), util.yAxeRight(daily)] },
      },
    };
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

  checkboxClick(event, daily, chart) {
    if (event.target.checked) {
      const country = util.getCountry(this.countries, event.target.value);
      if (country) {
        const dataset = this._createChartjsDataset(daily, country);
        if (event.target.value === dataset.label) {
          chart.data.datasets.push(dataset);
        }
      }
      if (this.colors.length === 0) {
        this._disableUnchecked();
      }
    } else {
      for (let i = 0; i < chart.data.datasets.length; i += 1) {
        if (event.target.value === chart.data.datasets[i].label) {
          this.colors.push(chart.data.datasets[i].borderColor);
          chart.data.datasets.splice(i, 1);
        }
      }
      this._enableUnchecked();
    }
    const longestPeriod = util.getLongestPeriod(chart.data.datasets);
    chart.data.labels.splice(0, chart.data.labels.length);
    chart.data.labels.push(...Array.from(Array(longestPeriod).keys()));
    chart.update();
  }

  collapseClick() {
    const content = document.getElementById(`panel-${this.type}`);
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }
}
