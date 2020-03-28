export const DEFAULT_CASES = ['sk', 'cz', 'at'];
export const DEFAULT_TESTS = ['sk', 'sk-tests', 'cz', 'cz-tests'];

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

export function isTest(country) {
  return country.id.includes('tests');
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
