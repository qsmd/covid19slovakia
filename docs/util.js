export const DEFAULT_CASES = ['SK', 'CZ', 'AT'];
export const DEFAULT_TESTS = ['SK', 'SK-testy', 'CZ', 'CZ-testy'];

// default is mandatory, so I created unneeded version property for that
const version = '0.1';
export default version;

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
    if (country[0] === countryName) {
      result = country;
    }
  });
  return result;
}

export function yAxeLeft(daily) {
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

export function yAxeRight(daily) {
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
