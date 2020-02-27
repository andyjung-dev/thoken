import sqlite3, csv
conn = sqlite3.connect('rawdata.db')
c = conn.cursor()

def write(token_info):
    c.execute("INSERT INTO tokens VALUES (?,?,?,?)", token_info)
    conn.commit()

def getConverted(value):
    # 20000000000000000000
    if len(value) > 9:
        return int(value[:9])
    return int(value)


selected_tokens = [
"0xb8c77482e45f1f44de1745f52c74426c631bdd52",
"0x514910771af9ca656af840dff83e8264ecf986ca",
"0x0d8775f648430679a709e98d2b0cb6250d2887ef",
"0xe41d2489571d322189246dafa5ebde1f4699f498",
"0x6b175474e89094c44da98b954eedeac495271d0f"]


with open('big_token_data.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    next(csvreader)
    i = 0
    # token_address,value,block_timestamp,block_number
    for row in csvreader:
        token_address = row[0]
        value = getConverted(row[1])
        block_timestamp = row[2]
        block_number = int(row[3])
        if any(x in token_address for x in selected_tokens):
            write((token_address,value,block_timestamp,block_number))
            print("wrote record " + str(i))
            i+=1
        



conn.close()
