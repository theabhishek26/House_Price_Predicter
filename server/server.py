from flask import Flask, request, jsonify, send_from_directory
from . import util
from flask_cors import CORS
CORS(app)


app = Flask(__name__, static_folder='../client/static')

@app.route('/api/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/api/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/')
def home():
    return send_from_directory('../client', 'app.html')
    
@app.route('/<path:filename>') 
def serve_static_files(filename):
    return send_from_directory('../client', filename)


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
    app.run()


