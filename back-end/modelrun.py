import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from tensorflow.keras.models import load_model
from currencylist import model_paths, csv_paths
import google.generativeai as genai
from datetime import datetime, timedelta


def forecast_future(model, data, n_steps, seq_length):
    forecast = []
    input_seq = data[-seq_length:]
    for _ in range(n_steps):
        input_seq_reshaped = input_seq.reshape((1, seq_length, 1))
        pred = model.predict(input_seq_reshaped)
        forecast.append(pred[0])
        input_seq = np.append(input_seq[1:], pred, axis=0)
    return np.array(forecast)


def getModel(currency1, currency2):
    return load_model(model_paths.get((currency1, currency2)))


def create_sequences(data, seq_length):
    xs = []
    ys = []
    for i in range(len(data) - seq_length):
        x = data[i:i+seq_length]
        y = data[i+seq_length]
        xs.append(x)
        ys.append(y)
    return np.array(xs), np.array(ys)


def getResult(n_days, currency1, currency2):
    seq_length = 10
    df_currency = pd.read_csv(csv_paths[currency1])
    currency = currency2
    df_currency = df_currency[[currency]]
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(df_currency)
    X, y = create_sequences(scaled_data, seq_length)
    model = getModel(currency1, currency2)

    # Forecast future values
    forecasted_values = forecast_future(
        model, scaled_data, n_days, seq_length)

    # Inverse transform the forecasted values to get original scale
    forecasted_values_original = scaler.inverse_transform(forecasted_values)

    today = datetime.today()
    start_date = today + timedelta(days=1)
    forecast_dates = pd.date_range(start=start_date, periods=n_days)
    forecast_df = pd.DataFrame(forecasted_values_original,
                               index=forecast_dates, columns=[currency])

    return forecast_df


def generate_text_with_prompt(api_key, prompt):
    """Generates text using the Gemini API with the provided API key and prompt.

    Args:
        api_key: Your Gemini API key.
        prompt: The text prompt to guide the generation.

    Returns:
        The generated text as a string, or an error message.
    """
    try:
        genai.configure(api_key=api_key)
        response = genai.generate_text(prompt=prompt)
        return response.result if response.result else "No text generated."
    except Exception as e:
        return f"An error occurred: {e}"


def generate_forecast_and_interpretation(api_key, n_days, currency1, currency2):
    # Get the forecasted result
    forecast_df = getResult(n_days, currency1, currency2)
    # Format the prompt
    prompt = (f"Give me one paragraph for interpretation for this exchange rate from {currency1} to {currency2} "
              f"and this is the data:\n{forecast_df}\n"
              "Please suggest the optimum day we should go to exchange the money and why. Please give more interpretation from the data at least give us 3-4 sentences, maximum 400 character. And act like money changer that suggests us which days should we go to money changer. Please build all interpretation in a paragraph only. ")

    # Generate text using the API
    generated_text = generate_text_with_prompt(api_key, prompt)

    return forecast_df, generated_text


if __name__ == "__main__":
    # Replace with your actual API key
    your_api_key = "AIzaSyCRowvAYed5IwrQ_JIoN_2sAnR1PQ6KCHs"

    # Get user input for the number of days and the currencies
    n_days = int(input("Enter the number of days for prediction: "))
    currency_1 = input("Enter the first currency (currency 1): ")
    currency_2 = input("Enter the second currency (currency 2): ")

    # Generate forecast and interpretation
    forecast_df, generated_text = generate_forecast_and_interpretation(
        your_api_key, n_days, currency_1, currency_2)
