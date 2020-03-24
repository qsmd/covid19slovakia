import csv

INDEX_FIRST_DAY = 4

watched_countries = {'Slovakia', 'Czechia', 'United Kingdom'}

def get_nonzero_idx(days):
    for index, day in enumerate(days[INDEX_FIRST_DAY:]):
        if day != '0':
            return INDEX_FIRST_DAY + index

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
            if row[0] == '' and row[1] in watched_countries:
                idx, days = get_days(row)
                print(f"['{row[1]}','{date_sk(header[idx])}',{','.join(days)}],")

print('COUNTRIES = [')
process_file()
print(']')