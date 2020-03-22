// Source: https://onemocneni-aktualne.mzcr.cz/covid-19
// Date increased by 1 to match WHO reporting.
// Official Czech stats do not match those of WHO, though. There is a small difference.

const CZ = {
  name: 'CZ',
  population: 10578820,
  color: window.chartColors.CZ,
  tests: true,
  default: true,
  data: [
    ['2.3.2020', 3, 211],
    ['3.3.2020', 3, 262],
    ['4.3.2020', 5, 240],
    ['5.3.2020', 5, 407],
    ['6.3.2020', 8, 483],
    ['7.3.2020', 19, 594],
    ['8.3.2020', 26, 787],
    ['9.3.2020', 32, 928],
    ['10.3.2020', 38, 1193],
    ['11.3.2020', 63, 1358],
    ['12.3.2020', 94, 1816],
    ['13.3.2020', 116, 2353],
    ['14.3.2020', 141, 3094],
    ['15.3.2020', 189, 4065],
    ['16.3.2020', 298, 5068],
    ['17.3.2020', 383, 6302],
    ['18.3.2020', 450, 7664],
    ['19.3.2020', 560, 9402],
    ['20.3.2020', 765, 11619],
    ['21.3.2020', 889, 13704],
    ['22.3.2020', 995, 15584],
  ]
};
NEIGHBOR_COUNTRIES['CZ'] = CZ;
NEIGHBOR_COUNTRIES['CZ-testy'] = CZ;
