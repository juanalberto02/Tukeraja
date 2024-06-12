import requests
import json
import time
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import os
from currencylist import csv_paths


def getData():
    def fetch_exchange_data(base_currency, symbols, start_date, end_date, headers):
        url = f"https://api.apilayer.com/exchangerates_data/timeseries?start_date={start_date}&end_date={end_date}&base={base_currency}&symbols={symbols}"
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                result = response.json()
                if result:
                    print(
                        f"Exchange rate data ({base_currency} to selected currencies):")
                    rates = result.get('rates', {})
                    data = []
                    for date, rate in rates.items():
                        row = {'date': date}
                        row.update(rate)
                        data.append(row)
                    return pd.DataFrame(data)
                else:
                    print("Failed to retrieve exchange rate data.")
            elif response.status_code == 524:
                print(
                    f"Timeout occurred for {base_currency}. Retrying in 5 seconds...")
                time.sleep(5)
                return fetch_exchange_data(base_currency, symbols, start_date, end_date, headers)
            else:
                response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
        return None

    end_date = datetime.today().strftime('%Y-%m-%d')
    start_date = (datetime.today() - timedelta(days=365)).strftime('%Y-%m-%d')
    symbols = {
        'USD': 'SAR,MYR,SGD,AED,THB,TRY,JPY,VND,IDR',
        'SAR': 'USD,MYR,SGD,AED,THB,TRY,JPY,VND,IDR',
        'MYR': 'USD,SAR,SGD,AED,THB,TRY,JPY,VND,IDR',
        'SGD': 'USD,SAR,MYR,AED,THB,TRY,JPY,VND,IDR',
        'AED': 'USD,SAR,MYR,SGD,THB,TRY,JPY,VND,IDR',
        'THB': 'USD,SAR,MYR,SGD,AED,TRY,JPY,VND,IDR',
        'TRY': 'USD,SAR,MYR,SGD,AED,THB,JPY,VND,IDR',
        'JPY': 'USD,SAR,MYR,SGD,AED,THB,TRY,VND,IDR',
        'VND': 'USD,SAR,MYR,SGD,AED,THB,TRY,JPY,IDR',
        'IDR': 'USD,SAR,MYR,SGD,AED,THB,TRY,JPY,VND'
    }
    headers = {
        "apikey": "mEmgYiuDsiRmzReUWvCgjVp3kD7WRSaP"
    }
    currencies = [
        'USD', 'SAR', 'MYR', 'SGD', 'AED', 'THB', 'TRY', 'JPY', 'VND', 'IDR'
    ]

    currency_data_dict = {}

    for currency in currencies:
        currency_data = fetch_exchange_data(
            currency, symbols[currency], start_date, end_date, headers)
        if currency_data is not None:
            currency_data_dict[currency] = currency_data

    for currency, currency_data in currency_data_dict.items():
        file_path = os.path.join("data", f'{currency.lower()}.csv')
        currency_data.to_csv(file_path, index=False)

    return currency_data_dict


def createModel():
    def train_currency_model(currency_data, currency_pair, seq_length=10, epochs=20, batch_size=1):
        base_currency, target_currency = currency_pair.split('-')
        df_currency = currency_data[[target_currency]]

        scaler = MinMaxScaler()
        scaled_data = scaler.fit_transform(df_currency)

        def create_sequences(data, seq_length):
            xs, ys = [], []
            for i in range(len(data) - seq_length):
                x = data[i:i + seq_length]
                y = data[i + seq_length]
                xs.append(x)
                ys.append(y)
            return np.array(xs), np.array(ys)

        X, y = create_sequences(scaled_data, seq_length)

        split = int(0.8 * len(X))
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]

        model = Sequential()
        model.add(LSTM(50, return_sequences=True, input_shape=(seq_length, 1)))
        model.add(LSTM(50, return_sequences=False))
        model.add(Dense(25))
        model.add(Dense(1))

        model.compile(optimizer='adam', loss='mean_squared_error')

        model.fit(X_train, y_train, batch_size=batch_size,
                  epochs=epochs, validation_split=0.2)

        loss = model.evaluate(X_test, y_test)
        print(f"Loss for {currency_pair}: {loss}")

        if not os.path.exists('model'):
            os.makedirs('model')

        model.save(f"model/{currency_pair}.h5")
        print(f"Model for {currency_pair} saved.")

    currencies1 = [
        'USD',
        'IDR', 'SAR', 'MYR', 'SGD'
    ]
    currencies2 = [
        'USD', 'SAR', 'MYR', 'SGD',
        'AED', 'THB', 'TRY', 'JPY', 'VND',
        'IDR']

    for base_currency in currencies1:
        for target_currency in currencies2:
            if base_currency != target_currency:
                currency_pair = f"{base_currency}-{target_currency}"
                print(f"Training model for {currency_pair}")
                df_currency = pd.read_csv(csv_paths[base_currency])
                train_currency_model(df_currency, currency_pair)


def loadAll():
    currency_data_dict = getData()
    createModel()
