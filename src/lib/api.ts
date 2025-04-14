
import axios from 'axios'
import { supabase } from './supabase';

export interface PredictionData {
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  bmi: number;
  systolic_bp: number;
  diastolic_bp: number;
  bp_category: number;
  smoking_status: string;
  alcohol_consumption: string;
  physical_activity: string;
  cholesterol_level: number;
  blood_sugar: number;
  family_history: boolean;
  risk_score?: number;
  userId: string;
}

const API_BASE_URL = 'http://localhost:5000';

// export const predictHeartDisease = async (data: PredictionData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/predict`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       throw new Error('Prediction request failed');
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Prediction error:', error);
//     throw new Error('Prediction failed');
//   }
// };


export const predictHeartDisease = async (formData: any) => {
  const genderMap: any = { male: 1, female: 0, other: 0 };
  const smokingMap: any = { never: 0, former: 1, current: 1 };
  const alcoholMap: any = { none: 0, moderate: 5, heavy: 9 };
  const activityMap: any = { sedentary: 1, moderate: 5, active: 9 };

  const payload = {
    age: Number(formData.age),
    gender: genderMap[formData.gender] ?? 0,
    height_cm: Number(formData.height_cm),
    weight_kg: Number(formData.weight_kg),
    bmi: Number(formData.bmi),
    systolic_bp: Number(formData.systolic_bp),
    diastolic_bp: Number(formData.diastolic_bp),
    bp_category: Number(formData.bp_category),
    smoking_status: smokingMap[formData.smoking_status] ?? 0,
    alcohol_consumption: alcoholMap[formData.alcohol_consumption] ?? 0,
    physical_activity: activityMap[formData.physical_activity] ?? 0,
    cholesterol_level: Number(formData.cholesterol_level),
    blood_sugar: Number(formData.blood_sugar),
    family_history: formData.family_history ? 1 : 0,
  };

  const res = await axios.post('https://beat-well-aws.onrender.com/predict', payload);
  return res.data;
  
};


export const getPredictionHistory = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predictions/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch prediction history');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch prediction history');
  }
};

export const calculateBMI = (weight: number, height: number): number => {
  // Height in meters (convert from cm)
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const calculateBPCategory = (systolic: number, diastolic: number): number => {
  if (systolic > 180 || diastolic > 120) return 4; // Hypertensive Crisis
  if (systolic >= 140 || diastolic >= 90) return 3; // Stage 2 Hypertension
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return 2; // Stage 1 Hypertension
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) return 1; // Elevated
  return 0; // Normal
};
