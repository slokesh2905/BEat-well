import * as tf from '@tensorflow/tfjs';
import { createModel } from './model.js';
import fs from 'fs';
import path from 'path';

// Sample training data based on heart disease features
const trainingData = [
  // Age, Gender, Height, Weight, BMI, SysBP, DiaBP, BPCat, Smoking, Alcohol, Activity, Chol, Sugar, Family
  [45, 1, 170, 75, 26, 120, 80, 1, 0, 1, 2, 200, 0, 1],
  [55, 0, 165, 68, 25, 140, 90, 2, 1, 0, 1, 240, 1, 0],
  [35, 1, 180, 82, 25.3, 118, 76, 1, 0, 0, 3, 180, 0, 0],
  [62, 0, 160, 65, 25.4, 150, 95, 3, 0, 0, 1, 260, 1, 1],
  [50, 1, 175, 78, 25.5, 130, 85, 1, 1, 1, 2, 220, 0, 1]
];

const trainingLabels = [0, 1, 0, 1, 0];

async function trainModel() {
  const model = await createModel();
  
  // Convert data to tensors
  const tensorData = tf.tensor2d(trainingData);
  const labelsTensor = tf.tensor2d(trainingLabels, [trainingLabels.length, 1]);

  // Calculate normalization parameters
  const dataMean = tensorData.mean(0);
  // Use moments() to calculate variance, then take square root for standard deviation
  const moments = tf.moments(tensorData, 0);
  const dataStd = tf.sqrt(moments.variance);
  
  // Normalize the data
  const normalizedData = tensorData.sub(dataMean).div(dataStd);

  // Train the model
  await model.fit(normalizedData, labelsTensor, {
    epochs: 100,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
      }
    }
  });

  // Save the model weights
  const saveDir = './server/model/weights';
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }
  
  await model.save(`file://${saveDir}`);
  
  // Save normalization parameters
  const normParams = {
    mean: await dataMean.array(),
    std: await dataStd.array()
  };
  
  fs.writeFileSync(
    path.join(saveDir, 'norm_params.json'),
    JSON.stringify(normParams, null, 2)
  );

  // Cleanup
  tensorData.dispose();
  labelsTensor.dispose();
  dataMean.dispose();
  dataStd.dispose();
  normalizedData.dispose();
  moments.variance.dispose();
}

trainModel().catch(console.error);