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

function getDatasets(daily, country, population, maxDays, minimumCases) {
	let multiplier = population / country.population;
	let datasets = {'cases': [], 'tests': []};
	let applicableDays = 0;
	let lastTotalCases = 0;
	let lastTotalTests = 0;

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

function createConfig(daily, showTests, countries, population, maxDays, minimumCases, title) {
	let datasets = [];
	countries.forEach(country => {
		let countryDatasets = getDatasets(daily, country, population, maxDays, minimumCases);
		datasets.push({
			label: country.name,
			backgroundColor: country.color,
			borderColor: country.color,
			data: countryDatasets.cases,
			yAxisID: 'left-y-axis',
			fill: false
		});
		if (showTests && country.tests) {
			let testsColor = country.color.replace('rgb', 'rgba').replace(')', ',0.1');
			datasets.push({
				label: country.name + ' testy',
				backgroundColor: testsColor,
				borderColor: testsColor,
				data: countryDatasets.tests,
				yAxisID: 'right-y-axis',
				fill: true
			});
		}
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