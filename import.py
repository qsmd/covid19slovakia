import csv

watched_countries = ['Slovakia', 'Czechia', 'United Kingdom']

def get_days(days):
    row = ''
    for day in days:
        if day != '0':
            row += f'{day},'
    return row

def process_file():
    with open('time_series_covid19_confirmed_global.csv') as f:
        data = csv.reader(f)
        for row in data:
            if row[0] == '' and row[1] in watched_countries:
                print(f"'{row[1]}': [{get_days(row[4:])}],")

print('COUNTRIES = [')
process_file()
print(']')