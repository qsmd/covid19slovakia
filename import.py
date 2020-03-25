import csv

TIMELINE_IDX = 4
COUNTRIES = {
    'Austria': 'AT',
    'Czechia': 'CZ',
    'Germany': 'DE',
    'Hungary': 'HU',
    'Italy': 'IT',
    # 'Korea, South': 'KR',
    # 'Norway': 'NO',
    'Poland': 'PL',
    'Slovakia': 'SK',
    'Spain': 'ES',
    # 'United Kingdom': 'UK',
    # 'US': 'US',
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
    with open('time_series_covid19_confirmed_global.csv') as f:
        header = None
        rows = csv.reader(f)
        for row in rows:
            if header is None:
                header = row
            if row[0] == '' and row[1] in COUNTRIES:
                idx, days = get_days(row)
                print(f"  ['{COUNTRIES[row[1]]}','{row[1]}','{date_sk(header[idx])}',{','.join(days)}],")

print('/* eslint-disable comma-spacing */')
print('const COUNTRIES = [')
process_file()
print('];')
print('export default COUNTRIES;')
