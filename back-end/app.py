from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import currency
from modelrun import getResult, generate_forecast_and_interpretation
from flask import jsonify
import pandas as pd


app = Flask(__name__)
CORS(app)


@app.route('/load', methods=['GET', 'POST'])
def load():
    result = currency.loadAll()
    return jsonify(result=result)


@app.route('/', methods=['GET'])
def index():
    currency1 = request.args.get('currency1', default='USD', type=str)
    currency2 = request.args.get('currency2', default='IDR', type=str)

    csv_path = f'data/{currency1}.csv'
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
    api_key = "AIzaSyCRowvAYed5IwrQ_JIoN_2sAnR1PQ6KCHs"

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


if __name__ == "__main__":
    app.run(debug=True)
