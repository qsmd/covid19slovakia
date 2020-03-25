// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

// eslint-disable-next-line no-unused-vars
import * as chartjs from './Chart.bundle.min.js'; // eslint-disable-line import/extensions
import COUNTRIES from './data/timelines.js'; // eslint-disable-line import/extensions

const SLOVAK_POPULATION = 5435343;
const DEFAULT = ['SK', 'CZ', 'AT', 'HU', 'PL'];
const POPULATION = {
  AT: 8772865,
  CZ: 10578820,
  DE: 82521653,
  ES: 46528966,
  HU: 9772756,
  IT: 60589445,
  PL: 37972964,
  SK: 5435343,
};
const COLOR = {
  AT: '#ffa600',
  CZ: '#ff6384',
  DE: '#ff7c43',
  ES: '#2f4b7c',
  HU: '#d45087',
  IT: '#a05195',
  PL: '#665191',
  SK: '#36a2eb',
};

function getDefaultPeriod() {
  let max = 0;
  COUNTRIES.forEach((country) => {
    if (DEFAULT.includes(country[0]) && (country.length - 3) > max) {
      max = country.length - 3;
    }
  });
  return max;
}

function getLongestPeriod(datasets) {
  let max = 0;
  datasets.forEach((dataset) => {
    if (dataset.data.length > max) {
      max = dataset.data.length;
    }
  });
  return max;
}

function countryToDatasets(daily, country, population, minimumCases) {
  const multiplier = population / POPULATION[country[0]];
  const datasets = { cases: [], tests: [] };
  let applicableDays = 0;
  let lastTotalCases = 0;
  const maxDays = getDefaultPeriod();

  country.slice(3).forEach((day) => {
    const relativeCasesDailyOrTotal = ((day - lastTotalCases) * multiplier).toFixed(2);
    const relativeCasesTotal = (day * multiplier).toFixed(2);
    if (maxDays > applicableDays && relativeCasesTotal >= minimumCases) {
      applicableDays += 1;
      if (daily) {
        lastTotalCases = day;
      }
      datasets.cases.push(relativeCasesDailyOrTotal);
    }
  });
  return datasets;
}

function getCountryDatasets(daily, country) {
  const datasets = [];
  const countryDatasets = countryToDatasets(daily, country, SLOVAK_POPULATION, 2);
  datasets.push({
    label: country[0],
    backgroundColor: COLOR[country[0]],
    borderColor: COLOR[country[0]],
    data: countryDatasets.cases,
    yAxisID: 'left-y-axis',
    fill: false,
  });
  if (country.tests) {
    const testsColor = `${COLOR[country[0]]}33`;
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

function createConfig(daily) { // eslint-disable-line no-unused-vars
  const datasets = [];
  COUNTRIES.forEach((country) => {
    if (DEFAULT.includes(country[0])) {
      datasets.push(...getCountryDatasets(daily, country));
    }
  });

  return {
    type: 'line',
    data: {
      labels: Array.from(Array(getLongestPeriod(datasets)).keys()),
      datasets,
    },
    options: {
      responsive: true,
      title: { display: false },
      tooltips: { mode: 'index', intersect: false },
      hover: { mode: 'nearest', intersect: true },
      animation: { duration: 0 },
      scales: {
        xAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Dni od bodu zlomu (aspoň 2 prípady / počet obyvateľov Slovenska)' } }],
        yAxes: [
          {
            id: 'left-y-axis',
            display: true,
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: `${(daily ? 'Denný' : 'Celkový')} počet prípadov / počet obyvateľov Slovenska`,
            },
          },
          {
            id: 'right-y-axis',
            display: true,
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: `${(daily ? 'Denný' : 'Celkový')} počet testov / počet obyvateľov Slovenska`,
            },
          },
        ],
      },
    },
  };
}

function generateCheckboxes(chartType) { // eslint-disable-line no-unused-vars
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
      input.checked = DEFAULT.includes(country[0]);
      nodes.push(input);
      nodes.push(document.createTextNode(`${countryKey} |\n`));
    });
  });
  return nodes;
}

function getCountry(countryName) {
  let result;
  COUNTRIES.forEach((country) => {
    if (country[0] === countryName.split('-')[0]) {
      result = country;
    }
  });
  return result;
}

function checkboxClick(event, chart, daily) { // eslint-disable-line no-unused-vars
  for (let i = 0; i < chart.data.datasets.length; i += 1) {
    if (event.target.value === chart.data.datasets[i].label) {
      chart.data.datasets.splice(i, 1);
    }
  }
  if (event.target.checked) {
    const country = getCountry(event.target.value);
    if (country) {
      getCountryDatasets(daily, country).forEach((dataset) => {
        if (event.target.value === dataset.label) {
          chart.data.datasets.push(dataset);
        }
      });
    }
  }
  const longestPeriod = getLongestPeriod(chart.data.datasets);
  chart.data.labels.splice(0, chart.data.labels.length);
  chart.data.labels.push(...Array.from(Array(longestPeriod).keys()));
  chart.update();
}

const collapseClick = function collapseClick(event) { // eslint-disable-line no-unused-vars
  const content = document.getElementById(`${event.target.id}-panel`);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
};

window.onload = function () {
  ['total', 'daily'].forEach((type) => {
    const daily = type === 'daily';
    const chart = new Chart(document.getElementById(`canvas-${type}`).getContext('2d'), createConfig(daily));
    document.getElementById(`config-${type}`).addEventListener('click', collapseClick);
    document.getElementById(`download-${type}`).addEventListener('click', (event) => {
      event.target.href = chart.toBase64Image();
    });
    // checkboxes
    const panel = document.getElementById(`config-${type}-panel`);
    generateCheckboxes(type).forEach((element) => {
      panel.appendChild(element);
      if (element.tagName === 'INPUT') {
        element.addEventListener('click', (event) => checkboxClick(event, chart, daily));
      }
    });
  });

};
