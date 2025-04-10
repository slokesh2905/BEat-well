import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import path from 'path';

// Create a sequential model
export async function createModel() {
  const model = tf.sequential();
  
  // Add layers for our 14 features
  model.add(tf.layers.dense({
    units: 32,
    activation: 'relu',
    inputShape: [14]
  }));
  
  model.add(tf.layers.dropout(0.2));
  
  model.add(tf.layers.dense({
    units: 16,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dropout(0.1));
  
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

// Load normalization parameters
export function loadNormParams() {
  const normParamsPath = path.join(process.cwd(), 'server/model/weights/norm_params.json');
  if (fs.existsSync(normParamsPath)) {
    return JSON.parse(fs.readFileSync(normParamsPath, 'utf-8'));
  }
  throw new Error('Normalization parameters not found');
}

// Function to normalize input data
export function normalizeData(data) {
  const params = loadNormParams();
  return data.map((value, index) => 
    (value - params.mean[index]) / params.std[index]
  );
}