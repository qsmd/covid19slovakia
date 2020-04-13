/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import { CASES, DEFAULT_CASES, CASES_ACTIVE } from './data/cases.js';
import { TESTS, DEFAULT_TESTS } from './data/tests.js';
import * as util from './util.js';

const MINIMUM_CASES = 2;
const SLOVAK_POPULATION = 5435343;
const CASE_RATIO = 'caseratio';

const _LEFT_Y = 'left-y-axis';
const _RIGHT_Y = 'right-y-axis';
const _X_AXE = {
  display: true,
  scaleLabel: {
    display: true,
    labelString: 'Dni od 2 prípadov / počet obyvateľov Slovenska)',
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
    this.countries = ChartConfig._getTimelines(this.canvasId)
    this.defaults = ChartConfig._getDefaults(this.canvasId)
    this.checkboxes = [];
    this.countryNameToColor = {};
  }

  // 'private' methods

  static _getTimelines(canvasId) {
    if (canvasId.includes('active')) {
      return CASES_ACTIVE;
    }
    if (canvasId.includes('tests') || canvasId.includes(CASE_RATIO)) {
      return TESTS;
    }
    return CASES;
  }

  static _getDefaults(canvasId) {
    if (canvasId.includes('tests') || canvasId.includes(CASE_RATIO)) {
      return DEFAULT_TESTS;
    }
    return DEFAULT_CASES;
  }

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

  // TODO: unused
  static _createGrowthDays(timeline, validDays) {
    const result = [];
    let yesterday = 0;
    timeline.days.slice(timeline.days.length - validDays).forEach((day) => {
      if (yesterday !== 0) {
        result.push((((day - yesterday) / yesterday) * 100).toFixed(2));
      }
      yesterday = day;
    });
    return result;
  }

  _createCaseRatioDays(timelineCases, timelineTests, validDays) {
    const result = [];
    let yesterdayCases = 0;
    let yesterdayTests = 0;
    const daysCases = timelineCases.days.slice(timelineCases.days.length - validDays);
    const daysTests = timelineTests.days.slice(timelineTests.days.length - validDays);

    daysCases.forEach((dayCases, index) => {
      const dayTests = daysTests[index];
      if (yesterdayCases !== 0) {
        if (this.isDaily) {
          result.push((((dayCases - yesterdayCases) / (dayTests - yesterdayTests)) * 100).toFixed(2));
        } else {
          result.push((((dayCases) / (dayTests)) * 100).toFixed(2));
        }
      }
      yesterdayCases = dayCases;
      yesterdayTests = daysTests[index];
    });

    return result;
  }

  // TODO: cleanup params usage - 2nd used only in ratio charts
  _createChartjsDataset(timeline, timeline2 = undefined) {
    let color = this.countryNameToColor[`${timeline.name}`];
    if (!color) {
      color = this.colors.shift();
      this.countryNameToColor[`${timeline.name}`] = color;
    }
    const isRightYAxis = util.isRightYAxis(timeline);
    if (isRightYAxis) {
      color = `${color}33`;
    }

    const validDays = this._getValidDaysCount(timeline);
    let days = null;
    if (this.canvasId.includes('growth')) {
      days = ChartConfig._createGrowthDays(timeline, validDays);
    } else if (this.canvasId.includes(CASE_RATIO)) {
      days = this._createCaseRatioDays(timeline, timeline2, validDays);
    } else {
      days = this._createNormalizedNoncaseDays(timeline, validDays);
    }

    return {
      label: timeline.id,
      backgroundColor: color,
      borderColor: color,
      data: days,
      yAxisID: isRightYAxis ? _RIGHT_Y : _LEFT_Y,
      fill: false,
    };
  }

  _createYAxes(timeline, text) {
    return util.isRightYAxis(timeline)
      ? util.yAxeRight(_RIGHT_Y, this.isDaily)
      : util.yAxeLeft(_LEFT_Y, this.isDaily, text);
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

    if (this.canvasId.includes(CASE_RATIO)) {
      const tests = {};
      // collect tests timelines
      this.countries.forEach((timeline) => {
        if (this.defaults.includes(timeline.id)) {
          if (timeline.id.includes('tests')) {
            tests[timeline.id.split('-')[0]] = timeline;
          }
        }
      });
      this.countries.forEach((timeline) => {
        if (this.defaults.includes(timeline.id) && !timeline.id.includes('tests')) {
          datasets.push(this._createChartjsDataset(timeline, tests[timeline.id]));
          yAxes.push(this._createYAxes(timeline, 'pomer (%) pozitívnych prípadov / počet testov'));
        }
      });
    } else {
      this.countries.forEach((timeline) => {
        if (this.defaults.includes(timeline.id)) {
          datasets.push(this._createChartjsDataset(timeline));
          yAxes.push(this._createYAxes(timeline));
        }
      });
    }

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
