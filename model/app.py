from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:5173",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Load model and normalization parameters
model = None
norm_params = None

def load_model():
    global model, norm_params
    try:
        model = tf.keras.models.load_model('./server/model/weights/model.h5')
        
        with open('./server/model/weights/norm_params.json', 'r') as f:
            norm_params = json.load(f)
            
        print("Model loaded successfully")
    except Exception as e:
        print("Error loading model:", e)

def normalize_data(data):
    return (data - np.array(norm_params['mean'])) / np.array(norm_params['std'])

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features in correct order
        input_data = np.array([
            data['age'],
            1 if data['gender'] == 'male' else 0,
            data['height_cm'],
            data['weight_kg'],
            data['bmi'],
            data['systolic_bp'],
            data['diastolic_bp'],
            data['bp_category'],
            2 if data['smoking_status'] == 'current' else (1 if data['smoking_status'] == 'former' else 0),
            2 if data['alcohol_consumption'] == 'heavy' else (1 if data['alcohol_consumption'] == 'moderate' else 0),
            2 if data['physical_activity'] == 'active' else (1 if data['physical_activity'] == 'moderate' else 0),
            data['cholesterol_level'],
            data['blood_sugar'],
            1 if data['family_history'] else 0
        ])
        
        # Normalize input
        normalized_input = normalize_data(input_data)
        
        # Make prediction
        prediction = model.predict(normalized_input.reshape(1, -1))[0][0]
        
        return jsonify({'prediction': float(prediction)})
    
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == '__main__':
    load_model()
    app.run(port=5000, debug=True)