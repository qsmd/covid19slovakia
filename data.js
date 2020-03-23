// TODO reasonable fallback with disabled JavaScript
// TODO remove right chart labels if not used
// TODO white background for downloaded chart

const NEIGHBOR_COUNTRIES = {};
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

function getDefaultPeriod() {
  let max = 0;
  Object.values(NEIGHBOR_COUNTRIES).forEach((country) => {
    if (country.default && country.data.length > max) {
      max = country.data.length;
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
  const multiplier = population / country.population;
  const datasets = { cases: [], tests: [] };
  let applicableDays = 0;
  let lastTotalCases = 0;
  let lastTotalTests = 0;
  const maxDays = getDefaultPeriod();

  country.data.forEach((day) => {
    const relativeCasesDailyOrTotal = ((day[1] - lastTotalCases) * multiplier).toFixed(2);
    const relativeCasesTotal = (day[1] * multiplier).toFixed(2);
    const relativeTestsDailyOrTotal = ((day[2] - lastTotalTests) * multiplier).toFixed(2);
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

function getCountryDatasets(daily, country, minimumCases) {
  const datasets = [];
  const countryDatasets = countryToDatasets(daily, country, SLOVAK_POPULATION, 2);
  datasets.push({
    label: country.name,
    backgroundColor: country.color,
    borderColor: country.color,
    data: countryDatasets.cases,
    yAxisID: 'left-y-axis',
    fill: false,
  });
  if (country.tests) {
    const testsColor = `${country.color}33`;
    datasets.push({
      label: `${country.name}-testy`,
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
  Object.values(NEIGHBOR_COUNTRIES).forEach((country) => {
    if (country.default) {
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
              labelString: `${(daily ? 'Denný' : 'Celkový')} počet testov / počet obyvateľov Slovenska` 
            },
          },
        ],
      },
    },
  };
}

// generate <input type="checkbox" id="check-total-SK" value="SK"> SK |
function generateCheckboxes(chartType) {
  const nodes = [];
  Object.values(NEIGHBOR_COUNTRIES).forEach((country) => {
    const countryKeys = [country.name];
    if (country.tests) {
      countryKeys.push(`${country.name}-testy`);
    }
    countryKeys.forEach((countryKey) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', `${chartType}-countryKey`);
      input.setAttribute('value', countryKey);
      input.checked = country.default;
      nodes.push(input);
      nodes.push(document.createTextNode(`${countryKey} |\n`));
    });
  });
  return nodes;
}

function checkboxClick(event, chart, daily) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    if (event.target.value === chart.data.datasets[i].label) {
      chart.data.datasets.splice(i, 1);
    }
  }
  if (event.target.checked) {
    const countryKeyParts = event.target.value.split('-');
    const country = NEIGHBOR_COUNTRIES[countryKeyParts[0]];
    getCountryDatasets(daily, country, SLOVAK_POPULATION, 2).forEach((dataset) => {
      if (event.target.value === dataset.label) {
        chart.data.datasets.push(dataset);
      }
    });
  }
  const longestPeriod = getLongestPeriod(chart.data.datasets);
  chart.data.labels.splice(0, chart.data.labels.length);
  chart.data.labels.push(...Array.from(Array(longestPeriod).keys()));
  chart.update();
}

const collapseClick = function collapseClick(event) {
  const content = document.getElementById(`${event.target.id}-panel`);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
};
