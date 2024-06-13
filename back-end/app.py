from flask import Flask, request, jsonify
from flask_cors import CORS
import currency
from modelrun import generate_forecast_and_interpretation
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/load', methods=['GET', 'POST'])
def load():
    result = currency.loadAll()
    return jsonify(result=result)


@app.route('/', methods=['GET'])
def index():
    currency1 = request.args.get('currency1', default='USD', type=str)
    currency2 = request.args.get('currency2', default='IDR', type=str)

    csv_path = f'./data/{currency1.lower()}.csv'
    currency_data = pd.read_csv(csv_path)

    currenctValue = currency_data[currency2].iloc[-1]
    date = currency_data["date"].iloc[-1]

    response = {
        "currentValue": currenctValue,
        "date": date
    }
    return jsonify(response)


@app.route('/predict', methods=['GET'])
def predict():
    days = request.args.get('days', default=10, type=int)
    currency1 = request.args.get('currency1', default='IDR', type=str)
    currency2 = request.args.get('currency2', default='SGD', type=str)
    # Replace with your actual API key
    api_key = "AIzaSyBoc1Eg8PmEO0qYdUh8fZvl8sNX7_kfpvg"

    # Generate forecast and interpretation
    forecast_df, generated_text = generate_forecast_and_interpretation(
        api_key, days, currency1, currency2)

    # Extract the numerical values from the DataFrame
    values = forecast_df[currency2].tolist()

    response = {
        "values": values,
        "interpretation": generated_text
    }

    return jsonify(response)


def scheduled_load():
    with app.app_context():
        # Access the /load endpoint
        try:
            response = requests.get('http://174.138.17.75:8080/load')
            if response.ok:
                print('Successfully accessed /load endpoint')
            else:
                print('Failed to access /load endpoint')
        except Exception as e:
            print(f'Error accessing /load endpoint: {e}')


if __name__ == "__main__":
    # Set up the scheduler
    scheduler = BackgroundScheduler()
    scheduler.add_job(scheduled_load, 'cron', hour=1, minute=0)
    scheduler.start()

    app.run(debug=True, host='0.0.0.0', port=8080)
