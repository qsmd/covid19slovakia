'use strict';

var NEIGHBOR_COUNTRIES = []
var OTHER_COUNTRIES = []

window.chartColors = {
	black: 'rgb(0, 0, 0)',
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function filterDataset(daily, country, population, maxDays, minimumCases) {
	let multiplier = population / country.population;
	let dataset = [];
	let applicableDays = 0;
	let lastTotal = 0;

	for (const date in country.data) {
		let relativeCasesDailyOrTotal = ((country.data[date] - lastTotal) * multiplier).toFixed(2);
		let relativeCasesTotal = (country.data[date] * multiplier).toFixed(2);
		if (maxDays > applicableDays && relativeCasesTotal >= minimumCases) {
			applicableDays++;
			if (daily) {
				lastTotal = country.data[date];
			}
			dataset.push(relativeCasesDailyOrTotal);
		}
	}
	return dataset;
}

function createConfig(daily, countries, population, maxDays, minimumCases, title) {
	let datasets = [];
	countries.forEach(country => {
		datasets.push({
			label: country.name,
			backgroundColor: country.color,
			borderColor: country.color,
			data: filterDataset(daily, country, population, maxDays, minimumCases),
			fill: false
		})
	});

	return {
		type: 'line',
		data: { labels: Array.from(Array(maxDays).keys()), datasets: datasets },
		options: {
			responsive: true,
			title: { display: true, text: title },
			tooltips: { mode: 'index', intersect: false },
			hover: { mode: 'nearest', intersect: true },
			scales: {
				xAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Dni od bodu zlomu (aspoň 2 prípady / počet obyvateľov Slovenska)' } }],
				yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Celkový počet prípadov / počet obyvateľov Slovenska' }}]
			}
		}
	};
}