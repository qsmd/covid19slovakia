export const DEFAULT_CASES = ['SK', 'CZ', 'AT'];
export const DEFAULT_TESTS = ['SK', 'SK-testy', 'CZ', 'CZ-testy'];

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

function getDefaultPeriod(countries, defaults) {
  let max = 0;
  countries.forEach((country) => {
    if (defaults.includes(country[0]) && (country.length - 3) > max) {
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

export function getCountry(countries, countryName) {
  let result;
  countries.forEach((country) => {
    if (country[0] === countryName.split('-')[0]) {
      result = country;
    }
  });
  return result;
}

export function countryToDataset(daily, country, countries, defaults, testDaysToInclude) {
  const countryNameWithoutTest = country[0].split('-')[0];
  const multiplier = SLOVAK_POPULATION / POPULATION[countryNameWithoutTest];
  const dataset = [];
  let applicableDays = 0;
  let lastTotal = 0;
  const maxDays = getDefaultPeriod(countries, defaults);

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

  console.log(`### countryToDataset country [${testDaysToInclude}] ${country}`);
  console.log(`### countryToDataset dataset [${dataset.length}] ${dataset}`);

  return dataset;
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

export function createConfig(chartConfig) {
  const daily = chartConfig.type.includes('daily-');
  const datasets = [];
  chartConfig.countries.forEach((country) => {
    if (chartConfig.defaults.includes(country[0])) {
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
