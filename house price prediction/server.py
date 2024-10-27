from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)


with open('banglore_home_prices_model.pickle', 'rb') as f:
    model = pickle.load(f)



@app.route('/', methods=['GET'])
def home():
    return "Hi there"


@app.route('/predict_price', methods=['POST'])
def predict_price():
   
    data = request.get_json()
    
    location = data['location']
    sqft = float(data['sqft'])
    bath = int(data['bath'])
    bhk = int(data['bhk'])

   
    loc_index = np.where(model.feature_names_in_ == location)[0][0]
    x = np.zeros(len(model.feature_names_in_))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

 
    predicted_price = model.predict([x])[0]
    
   
    return jsonify({
        'predicted_price': predicted_price
    })
if __name__ == '__main__':
    app.run(debug=True, port=8000) 


