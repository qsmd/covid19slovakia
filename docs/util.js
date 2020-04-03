
export function getLongestPeriod(datasets) {
  let max = 0;
  datasets.forEach((dataset) => {
    if (dataset.data.length > max) {
      max = dataset.data.length;
    }
  });
  return max;
}

export function isRightYAxis(timeline) {
  return timeline.id.includes('tests');
}

export function yAxeLeft(id, daily, text = 'počet prípadov / počet obyvateľov Slovenska') {
  return {
    id,
    display: true,
    position: 'left',
    scaleLabel: {
      display: true,
      labelString: `${(daily ? 'Denný' : 'Celkový')} ${text}`,
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
