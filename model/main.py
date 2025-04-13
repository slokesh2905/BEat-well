from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

# Allow frontend access (adjust origin in production)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model and scaler
model = joblib.load("xgb_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define the request body structure
class InputData(BaseModel):
    age: int
    gender: int
    height_cm: int
    weight_kg: int
    bmi: float
    systolic_bp: int
    diastolic_bp: int
    bp_category: int
    smoking_status: int
    alcohol_consumption: int
    physical_activity: int
    cholesterol_level: int
    blood_sugar: int
    family_history: int

@app.post("/predict")
def predict(data: InputData):
    input_values = np.array([[v for v in data.dict().values()]])
    scaled_input = scaler.transform(input_values)
    
    # Return probability of class 1 (heart disease present)
    probability = model.predict_proba(scaled_input)[0][1]
    print("predicte probablity ", probability)

    return {"risk_score": float(probability)}

@app.get("/")
def read_root():
    return {"message": "Service is up and running!"}


# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import joblib
# import numpy as np

# app = FastAPI()

# # Allow frontend access (adjust origin in production)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Set to your frontend domain in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load model and scaler
# model = joblib.load("xgb_model.pkl")
# scaler = joblib.load("scaler.pkl")

# # Define the request body structure
# class InputData(BaseModel):
#     age: int
#     gender: int
#     height_cm: int
#     weight_kg: int
#     bmi: float
#     systolic_bp: int
#     diastolic_bp: int
#     bp_category: int
#     smoking_status: int
#     alcohol_consumption: int
#     physical_activity: int
#     cholesterol_level: int
#     blood_sugar: int
#     family_history: int

# @app.post("/predict")
# def predict(data: InputData):
#     input_values = np.array([[v for v in data.dict().values()]])
#     scaled_input = scaler.transform(input_values)
#     prediction = model.predict(scaled_input)[0]
#     return {"risk_score": int(prediction)}
