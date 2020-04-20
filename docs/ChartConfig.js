/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import { CASES, DEFAULT_CASES, CASES_ACTIVE } from './data/cases.js';
import * as util from './util.js';

const MINIMUM_CASES = 1;
const SLOVAK_POPULATION = 1000000;

const _LEFT_Y = 'left-y-axis';
const _X_AXE = {
  display: true,
  scaleLabel: {
    display: true,
    labelString: 'Days since first case per million people',
  },
};

export default class ChartConfig {
  constructor(canvasId) {
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
    this.canvasId = canvasId;
    this.isDaily = this.canvasId.includes('daily');
    this.countries = canvasId.includes('active') ? CASES_ACTIVE : CASES;
    this.defaults = DEFAULT_CASES;
    this.checkboxes = [];
    this.countryNameToColor = {};
  }

  // 'private' methods

  _getValidDaysCount(timeline) {
    const multiplier = SLOVAK_POPULATION / timeline.population;
    let invalidDaysCount = 0;
    const casesTimeline = this._getCountryById(timeline.id.split('-')[0]);
    casesTimeline.days.some((day) => {
      if (day * multiplier >= MINIMUM_CASES) {
        return true;
      }
      invalidDaysCount += 1;
      return false;
    });
    return timeline.days.length - invalidDaysCount;
  }

  _createNormalizedNoncaseDays(timeline, validDays) {
    const days = [];
    const multiplier = SLOVAK_POPULATION / timeline.population;
    let yesterday = 0;

    timeline.days.slice(timeline.days.length - validDays).forEach((day) => {
      const normalizedValue = ((day - yesterday) * multiplier).toFixed(2);
      days.push(normalizedValue);
      if (this.isDaily) {
        yesterday = day;
      }
    });

    return days;
  }

  _createChartjsDataset(timeline) {
    let color = this.countryNameToColor[`${timeline.name}`];
    if (!color) {
      color = this.colors.shift();
      this.countryNameToColor[`${timeline.name}`] = color;
    }
    const validDays = this._getValidDaysCount(timeline);
    const days = this._createNormalizedNoncaseDays(timeline, validDays);

    return {
      label: timeline.id,
      backgroundColor: color,
      borderColor: color,
      data: days,
      yAxisID: _LEFT_Y,
      fill: false,
    };
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

  _getCountryById(countryId) {
    let result;
    this.countries.forEach((country) => {
      if (country.id === countryId) {
        result = country;
      }
    });
    return result;
  }

  // 'public' methods

  createConfig() {
    const datasets = [];
    const yAxes = [];

    this.countries.forEach((timeline) => {
      if (this.defaults.includes(timeline.id)) {
        datasets.push(this._createChartjsDataset(timeline));
        yAxes.push(util.yAxeLeft(_LEFT_Y, this.isDaily));
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
        scales: {
          xAxes: [_X_AXE],
          yAxes,
        },
      },
    };
  }

  generateCheckboxes(type) {
    const nodes = [];
    this.countries.forEach((country) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', `${type}-${country.id}`);
      input.setAttribute('value', country.id);
      input.checked = this.defaults.includes(country.id);
      nodes.push(input);
      nodes.push(document.createTextNode(`${country.id} |\n`));
      this.checkboxes.push(input);
    });
    return nodes;
  }

  checkboxClick(event, chart) {
    if (event.target.checked) {
      const country = this._getCountryById(event.target.value);
      if (country) {
        const dataset = this._createChartjsDataset(country);
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
    const content = document.getElementById(`panel-${this.canvasId}`);
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }
}
