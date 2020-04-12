import csv

TIMELINE_IDX = 4
COUNTRIES = {
    'Austria': {'code': 'at', 'population': 8772865},
    'Germany': {'code': 'de', 'population': 82521653},
    'Hungary': {'code': 'hu', 'population': 9772756},
    'Italy': {'code': 'it', 'population': 60589445},
    'Korea, South': {'code': 'kr', 'population': 51709098},
    'Norway': {'code': 'no', 'population': 5367580},
    'Poland': {'code': 'pl', 'population': 37972964},
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

def process_file():
    with open('CSSEGISandData/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv') as f:
        header = None
        rows = csv.reader(f)
        for row in rows:
            if header is None:
                header = row
            if row[0] == '' and row[1] in COUNTRIES:
                idx, days = get_days(row)
                country = COUNTRIES[row[1]]
                print(f"  {{id:'{country['code']}',name:'{row[1]}',population:{country['population']},first:'{date_sk(header[idx])}',days:[{','.join(days)}]}},")

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
process_file()
print('];')
print("export const DEFAULT_CASES = ['sk', 'cz', 'at', 'hu', 'pl'];")
