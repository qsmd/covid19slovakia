export const DEFAULT_CASES = ['sk', 'cz', 'at', 'hu', 'pl'];
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

export function getTimelineType(timeline) {
  const idParts = timeline.id.split('-');
  if (idParts.length === 1) {
    return 'cases';
  }
  return `${idParts[1]}`;
}

export function yAxeLeft(id, daily) {
  return {
    id,
    display: true,
    position: 'left',
    scaleLabel: {
      display: true,
      labelString: `${(daily ? 'Denný' : 'Celkový')} počet prípadov / počet obyvateľov Slovenska`,
    },
  };
}

export function yAxeRight(id, daily) {
  return {
    id,
    display: true,
    position: 'right',
    scaleLabel: {
      display: true,
      labelString: `${(daily ? 'Denný' : 'Celkový')} počet testov / počet obyvateľov Slovenska`,
    },
  };
}
