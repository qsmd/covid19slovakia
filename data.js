// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

'use strict';

var NEIGHBOR_COUNTRIES = {};
const SLOVAK_POPULATION = 5435343;

window.chartColors = {
  SK: '#36a2eb',
  CZ: '#ff6384',
  AT: '#ffa600',
  DE: '#ff7c43',
  HU: '#d45087',
  IT: '#a05195',
  PL: '#665191',
  ES: '#2f4b7c',
};

function countryToDatasets(daily, country, population, minimumCases) {
  let multiplier = population / country.population;
  let datasets = {'cases': [], 'tests': []};
  let applicableDays = 0;
  let lastTotalCases = 0;
  let lastTotalTests = 0;
  let maxDays = getDefaultPeriod();

  country.data.forEach(day => {
    let relativeCasesDailyOrTotal = ((day[1] - lastTotalCases) * multiplier).toFixed(2);
    let relativeCasesTotal = (day[1] * multiplier).toFixed(2);
    let relativeTestsDailyOrTotal = ((day[2] - lastTotalTests) * multiplier).toFixed(2);
    if (maxDays > applicableDays && relativeCasesTotal >= minimumCases) {
      applicableDays++;
      if (daily) {
        lastTotalCases = day[1];
        lastTotalTests = day[2];
      }
      datasets.cases.push(relativeCasesDailyOrTotal);
      if (country.tests) {
        datasets.tests.push(relativeTestsDailyOrTotal);
      }
    }
  });
  return datasets;
}

function getDataset(daily, countryName, country, population, minimumCases) {
  let countryDatasets = countryToDatasets(daily, country, population, minimumCases);
  if (countryName.includes('-testy')) {
    let testsColor = `${country.color}33`;
    return {
      label: countryName,
      backgroundColor: testsColor,
      borderColor: testsColor,
      data: countryDatasets.tests,
      yAxisID: 'right-y-axis',
      fill: true
    };
  } else {
    return {
      label: countryName,
      backgroundColor: country.color,
      borderColor: country.color,
      data: countryDatasets.cases,
      yAxisID: 'left-y-axis',
      fill: false
    };
  }
}

function createConfig(daily, countries, population, minimumCases) {
  let datasets = [];
  for (let [countryName, country] of Object.entries(countries)) {
    if (country.default) {
      datasets.push(getDataset(daily, countryName, country, population, minimumCases));
    }
  };

  return {
    type: 'line',
    data: { 
      labels: Array.from(Array(getLongestPeriod(datasets)).keys()), 
      datasets: datasets },
    options: {
      responsive: true,
      title: { display: false },
      tooltips: { mode: 'index', intersect: false },
      hover: { mode: 'nearest', intersect: true },
      animation: { duration: 0 },
      scales: {
        xAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Dni od bodu zlomu (aspoň 2 prípady / počet obyvateľov Slovenska)' } }],
        yAxes: [
          { id: 'left-y-axis', display: true, position: 'left', scaleLabel: { 
            display: true, labelString: (daily ? 'Denný' : 'Celkový') + ' počet prípadov / počet obyvateľov Slovenska' }},
          { id: 'right-y-axis', display: true, position: 'right', scaleLabel: { 
            display: true, labelString: (daily ? 'Denný' : 'Celkový') + ' počet testov / počet obyvateľov Slovenska' }},
        ]
      }
    }
  };
}

function getDefaultPeriod() {
  let max = 0;
  for (let [countryName, country] of Object.entries(NEIGHBOR_COUNTRIES)) {
    if (country.default && country.data.length > max) {
      max = country.data.length;
    }
  };
  return max;
}

function getLongestPeriod(datasets) {
  let max = 0;
  datasets.forEach(dataset => {
    if (dataset.data.length > max) {
      max = dataset.data.length;
    }
  });
  return max;
}

// generate <input type="checkbox" id="check-total-SK" value="SK"> SK |
function generateCheckboxes(chartType) {
  let nodes = [];
  for (let [countryName, country] of Object.entries(NEIGHBOR_COUNTRIES)) {
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'check-' + chartType + '-' + countryName);
    input.setAttribute('value', countryName);
    input.checked = country.default;
    nodes.push(input);
    nodes.push(document.createTextNode(`${countryName} |\n`));
  }
  return nodes;
}

function checkboxClick(event, chart, daily) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    if (event.target.value === chart.data.datasets[i].label) {
      chart.data.datasets.splice(i, 1);
    }
  }
  if (event.target.checked) {
    let countryName = event.target.value;
    let country = NEIGHBOR_COUNTRIES[countryName];
    chart.data.datasets.push(getDataset(daily, countryName, country, SLOVAK_POPULATION, 2));
  }
  let longestPeriod = getLongestPeriod(chart.data.datasets);
  chart.data.labels = Array.from(Array(longestPeriod).keys());
  chart.update();
}

let collapseClick = function collapseClick(event) {
  let content = document.getElementById(event.target.id + '-panel');
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
};
