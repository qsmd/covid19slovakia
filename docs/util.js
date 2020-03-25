import COUNTRIES from './data/timelines.js'; // eslint-disable-line import/extensions

export const DEFAULT = ['SK', 'CZ', 'AT'];

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

// default is mandatory, so I created unneeded version property for that
const version = '0.1';
export default version;

function getDefaultPeriod() {
  let max = 0;
  COUNTRIES.forEach((country) => {
    if (DEFAULT.includes(country[0]) && (country.length - 3) > max) {
      max = country.length - 3;
    }
  });
  return max;
}

export function getLongestPeriod(datasets) {
  let max = 0;
  datasets.forEach((dataset) => {
    if (dataset.data.length > max) {
      max = dataset.data.length;
    }
  });
  return max;
}

export function getCountry(countryName) {
  let result;
  COUNTRIES.forEach((country) => {
    if (country[0] === countryName.split('-')[0]) {
      result = country;
    }
  });
  return result;
}

export function collapseClick(event) {
  const content = document.getElementById(`${event.target.id}-panel`);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
}

export function countryToDatasets(daily, country) {
  const multiplier = SLOVAK_POPULATION / POPULATION[country[0]];
  const datasets = { cases: [], tests: [] };
  let applicableDays = 0;
  let lastTotalCases = 0;
  const maxDays = getDefaultPeriod();

  country.slice(3).forEach((day) => {
    const relativeCasesDailyOrTotal = ((day - lastTotalCases) * multiplier).toFixed(2);
    const relativeCasesTotal = (day * multiplier).toFixed(2);
    if (maxDays > applicableDays && relativeCasesTotal >= MINIMUM_CASES) {
      applicableDays += 1;
      if (daily) {
        lastTotalCases = day;
      }
      datasets.cases.push(relativeCasesDailyOrTotal);
    }
  });
  return datasets;
}

const X_AXE = {
  display: true,
  scaleLabel: {
    display: true,
    labelString: 'Dni od 2 prípadov / počet obyvateľov Slovenska)',
  },
};

function yAxeLeft(daily) {
  return {
    id: 'left-y-axis',
    display: true,
    position: 'left',
    scaleLabel: {
      display: true,
      labelString: `${(daily ? 'Denný' : 'Celkový')} počet prípadov / počet obyvateľov Slovenska`,
    },
  };
}

function yAxeRight(daily) {
  return {
    id: 'right-y-axis',
    display: true,
    position: 'right',
    scaleLabel: {
      display: true,
      labelString: `${(daily ? 'Denný' : 'Celkový')} počet testov / počet obyvateľov Slovenska`,
    },
  };
}

export function createConfig(chartConfig, daily) {
  const datasets = [];
  COUNTRIES.forEach((country) => {
    if (DEFAULT.includes(country[0])) {
      datasets.push(...chartConfig.getCountryDatasets(daily, country));
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
      scales: { xAxes: [X_AXE], yAxes: [yAxeLeft(daily), yAxeRight(daily)] },
    },
  };
}
