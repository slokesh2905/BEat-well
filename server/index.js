import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as tf from '@tensorflow/tfjs';
import { createModel, normalizeData } from './model/model.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend dev server
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/heartcare');

// Define prediction schema
const PredictionSchema = new mongoose.Schema({
  userId: String,
  age: Number,
  gender: Number,
  height_cm: Number,
  weight_kg: Number,
  bmi: Number,
  systolic_bp: Number,
  diastolic_bp: Number,
  bp_category: Number,
  smoking_status: Number,
  alcohol_consumption: Number,
  physical_activity: Number,
  cholesterol_level: Number,
  blood_sugar: Number,
  family_history: Number,
  prediction: Number,
  createdAt: { type: Date, default: Date.now }
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

// Load and initialize the model
let model;

async function loadModel() {
  try {
    model = await createModel();
    // Load the trained weights using the correct path
    const weightsPath = path.join(process.cwd(), 'server/model/weights/model.json');
    model = await tf.loadLayersModel(`file://${weightsPath}`);
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

loadModel();

// Prediction endpoint
app.post('/api/predict', async (req, res) => {
  try {
    if (!model) {
      throw new Error('Model not loaded');
    }

    const {
      age, gender, height_cm, weight_kg, bmi, systolic_bp, diastolic_bp,
      bp_category, smoking_status, alcohol_consumption, physical_activity,
      cholesterol_level, blood_sugar, family_history, userId
    } = req.body;

    // Create input array
    const inputData = [
      age, gender, height_cm, weight_kg, bmi, systolic_bp, diastolic_bp,
      bp_category, smoking_status, alcohol_consumption, physical_activity,
      cholesterol_level, blood_sugar, family_history
    ];

    // Normalize input data
    const normalizedInput = normalizeData(inputData);

    // Make prediction
    const tensorInput = tf.tensor2d([normalizedInput]);
    const prediction = model.predict(tensorInput);
    const result = (await prediction.data())[0];

    // Cleanup tensors
    tensorInput.dispose();
    prediction.dispose();

    // Save prediction to database
    const newPrediction = new Prediction({
      userId,
      age, gender, height_cm, weight_kg, bmi, systolic_bp, diastolic_bp,
      bp_category, smoking_status, alcohol_consumption, physical_activity,
      cholesterol_level, blood_sugar, family_history,
      prediction: result
    });
    await newPrediction.save();

    res.json({ prediction: result });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction failed: ' + error.message });
  }
});

// Get user predictions history
app.get('/api/predictions/:userId', async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});