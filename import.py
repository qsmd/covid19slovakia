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

class Country:
    def __init__(self, id, name, population, header, csv_row):
        self.id = id
        self.name = name
        self.population = population
        self.header = header
        self.csv_row = csv_row

def get_first_nonzero_column(csv_row, meta_columns_to_skip):
    for index, day in enumerate(csv_row[meta_columns_to_skip:]):
        if eval(day) > 0:
            return meta_columns_to_skip + index

def get_days(csv_row):
    nonzero_idx = get_first_nonzero_column(csv_row, TIMELINE_IDX)
    nonzero_days = []
    for day in csv_row[nonzero_idx:]:
        nonzero_days.append(day)
    return nonzero_idx, nonzero_days

def date_sk(date):
    a = date.split('/')
    return f'{a[1]}.{a[0]}.{a[2]}'

def csv_to_countries(filename):
    with open(f'CSSEGISandData/COVID-19/csse_covid_19_data/csse_covid_19_time_series/{filename}') as f:
        result = {}
        header = None
        csv_rows = csv.reader(f)
        for csv_row in csv_rows:
            if header is None:
                header = csv_row
            if csv_row[0] == '' and csv_row[1] in COUNTRIES:
                country = COUNTRIES[csv_row[1]]
                item = Country(country['code'], csv_row[1], country['population'], header, csv_row)
                result[item.id] = item
        return result

def print_countries(countries, omit_ids):
    for id in countries:
        country = countries[id]
        if (country.id not in omit_ids):
            idx, days = get_days(country.csv_row)
            print(f"  {{id:'{country.id}',name:'{country.name}',population:{country.population},first:'{date_sk(country.header[idx])}',days:[{','.join(days)}]}},")

def calculate_active(countries_confirmed, countries_deaths, countries_recovered):
    result = { }
    for id in countries_confirmed:
        country_confirmed = countries_confirmed[id]
        country_deaths = countries_deaths[id]
        country_recovered = countries_recovered[id]
        row_active = []
        for index in range(len(country_confirmed.csv_row)):
            if (index < 4):
                row_active.append(country_confirmed.csv_row[index])
            else:
                row_active.append(str(int(country_confirmed.csv_row[index]) - int(country_deaths.csv_row[index]) - int(country_recovered.csv_row[index])))
        item = Country(country_confirmed.id, country_confirmed.name, country_confirmed.population, country_confirmed.header, row_active)
        result[item.id] = item
    return result

countries_confirmed = csv_to_countries('time_series_covid19_confirmed_global.csv')
countries_deaths = csv_to_countries('time_series_covid19_deaths_global.csv')
countries_recovered = csv_to_countries('time_series_covid19_recovered_global.csv')
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
print_countries(countries_confirmed, ['sk','cz'])
print('];')
print("export const DEFAULT_CASES = ['sk', 'cz', 'at', 'hu', 'pl'];")
print()
print('export const CASES_ACTIVE = [')
print_countries(countries_active, [])
print('];')