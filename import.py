import csv

TIMELINE_IDX = 4
COUNTRIES = {
    'Austria': {'code': 'at', 'population': 8772865},
    'Czechia': {'code': 'cz', 'population': 10578820},
    'Germany': {'code': 'de', 'population': 82521653},
    'Hungary': {'code': 'hu', 'population': 9772756},
    'Italy': {'code': 'it', 'population': 60589445},
    'Korea, South': {'code': 'kr', 'population': 51709098},
    'Norway': {'code': 'no', 'population': 5367580},
    'Poland': {'code': 'pl', 'population': 37972964},
    'Slovakia': {'code': 'sk', 'population': 5435343},
    'Spain': {'code': 'es', 'population': 46528966},
    'Sweden': {'code': 'se', 'population': 10333456},
    'UK': {'code': 'uk', 'population': 67545757},
    'US': {'code': 'us', 'population': 328239523},
}

def get_nonzero_idx(days):
    for index, day in enumerate(days[TIMELINE_IDX:]):
        if eval(day) > 0:
            return TIMELINE_IDX + index

def get_days(days):
    nonzero_idx = get_nonzero_idx(days)
    nonzero_days = []
    for day in days[nonzero_idx:]:
        nonzero_days.append(day)
    return nonzero_idx, nonzero_days

def date_sk(date):
    a = date.split('/')
    return f'{a[1]}.{a[0]}.{a[2]}'

class Country:
    def __init__(self, id, name, population, header, row):
        self.id = id
        self.name = name
        self.population = population
        self.header = header
        self.row = row

def read_csv_file(filename):
    with open(filename) as f:
        result = {}
        header = None
        rows = csv.reader(f)
        for row in rows:
            if header is None:
                header = row
            if row[0] == '' and row[1] in COUNTRIES:
                country = COUNTRIES[row[1]]
                item = Country(country['code'], row[1], country['population'], header, row)
                result[item.id] = item
        return result

def output_countries(countries, omitids):
    for id in countries:
        country = countries[id]
        if (country.id not in omitids):
            idx, days = get_days(country.row)
            print(f"  {{id:'{country.id}',name:'{country.name}',population:{country.population},first:'{date_sk(country.header[idx])}',days:[{','.join(days)}]}},")

def calculate_active(countries_confirmed, countries_deaths, countries_recovered):
    result = { }
    for id in countries_confirmed:
        country_confirmed = countries_confirmed[id]
        country_deaths = countries_deaths[id]
        country_recovered = countries_recovered[id]
        row_active = []
        for index in range(len(country_confirmed.row)):
            if (index < 4):
                row_active.append(country_confirmed.row[index])
            else:
                row_active.append(str(int(country_confirmed.row[index]) - int(country_deaths.row[index]) - int(country_recovered.row[index])))
        item = Country(country_confirmed.id, country_confirmed.name, country_confirmed.population, country_confirmed.header, row_active)
        result[item.id] = item
    return result

countries_confirmed = read_csv_file('time_series_covid19_confirmed_global.csv')
countries_deaths = read_csv_file('time_series_covid19_deaths_global.csv')
countries_recovered = read_csv_file('time_series_covid19_recovered_global.csv')
countries_active = calculate_active(countries_confirmed, countries_deaths, countries_recovered)

print('/* eslint-disable import/extensions */')
print('/* eslint-disable key-spacing */')
print('/* eslint-disable comma-spacing */')
print('/* eslint-disable object-curly-newline */')
print('/* eslint-disable object-curly-spacing */')
print()
print("import SK from './sk-cases.js';")
print("import CZ from './cz-cases.js';")
print()
print('export const CASES = [')
print('  SK, CZ,')
output_countries(countries_confirmed, ['sk','cz'])
print('];')
print("export const DEFAULT_CASES = ['sk', 'cz', 'at', 'hu', 'pl'];")
print()
print('export const CASES_ACTIVE = [')
output_countries(countries_active, [])
print('];')