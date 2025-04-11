import React, { useState, useEffect } from 'react';
import { Activity, Heart, AlertCircle, Droplets, Gauge, HeartPulse as Pulse, Dumbbell, Scale, Ruler, Wine, Cigarette } from 'lucide-react';
import { predictHeartDisease, calculateBMI, calculateBPCategory } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Prediction() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height_cm: '',
    weight_kg: '',
    bmi: '',
    systolic_bp: '',
    diastolic_bp: '',
    bp_category: '',
    smoking_status: '',
    alcohol_consumption: '',
    physical_activity: '',
    cholesterol_level: '',
    blood_sugar: '',
    family_history: false
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load profile data if user is logged in
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          if (data) {
            setFormData(prev => ({
              ...prev,
              age: data.age || '',
              gender: data.gender || '',
              height_cm: data.height_cm || '',
              weight_kg: data.weight_kg || '',
              bmi: data.bmi || '',
              systolic_bp: data.systolic_bp || '',
              diastolic_bp: data.diastolic_bp || '',
              bp_category: data.bp_category || '',
              smoking_status: data.smoking_status || '',
              alcohol_consumption: data.alcohol_consumption || '',
              physical_activity: data.physical_activity || '',
              cholesterol_level: data.cholesterol_level || '',
              blood_sugar: data.blood_sugar || '',
              family_history: data.family_history || false
            }));
          }
        } catch (err) {
          console.error('Error loading profile:', err);
        }
      }
    };

    loadProfile();
  }, [user]);

  useEffect(() => {
    if (formData.height_cm && formData.weight_kg) {
      const bmi = calculateBMI(Number(formData.weight_kg), Number(formData.height_cm));
      setFormData(prev => ({ ...prev, bmi: bmi.toString() }));
    }
  }, [formData.height_cm, formData.weight_kg]);

  useEffect(() => {
    if (formData.systolic_bp && formData.diastolic_bp) {
      const bpCategory = calculateBPCategory(Number(formData.systolic_bp), Number(formData.diastolic_bp));
      setFormData(prev => ({ ...prev, bp_category: bpCategory.toString() }));
    }
  }, [formData.systolic_bp, formData.diastolic_bp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save profile data first
      await saveProfileData();
      
      // Then get prediction
      const result = await predictHeartDisease(formData);
      setPrediction(result.risk_score);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveProfileData = async () => {
    if (!user) return;

    try {
      const profileData = {
        age: formData.age ? Number(formData.age) : null,
        gender: formData.gender,
        height_cm: formData.height_cm ? Number(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? Number(formData.weight_kg) : null,
        bmi: formData.bmi ? Number(formData.bmi) : null,
        systolic_bp: formData.systolic_bp ? Number(formData.systolic_bp) : null,
        diastolic_bp: formData.diastolic_bp ? Number(formData.diastolic_bp) : null,
        bp_category: formData.bp_category ? Number(formData.bp_category) : null,
        smoking_status: formData.smoking_status,
        alcohol_consumption: formData.alcohol_consumption,
        physical_activity: formData.physical_activity,
        cholesterol_level: formData.cholesterol_level ? Number(formData.cholesterol_level) : null,
        blood_sugar: formData.blood_sugar ? Number(formData.blood_sugar) : null,
        family_history: formData.family_history,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error saving profile:', err);
      throw err;
    }
  };

  // ... rest of your component code remains the same ...
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const getBPCategoryLabel = (category: string) => {
    switch (Number(category)) {
      case 0: return 'Normal';
      case 1: return 'Elevated';
      case 2: return 'Stage 1 Hypertension';
      case 3: return 'Stage 2 Hypertension';
      case 4: return 'Hypertensive Crisis';
      default: return 'Not calculated';
    }
  };

 


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Heart Disease Prediction</h1>
        <p className="text-xl text-gray-600">
          Enter your health metrics below for an AI-powered heart disease risk assessment
        </p>
      </section>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Body Measurements</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="height_cm" className="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <div className="relative mt-1">
                  <Ruler className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    id="height_cm"
                    name="height_cm"
                    value={formData.height_cm}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weight_kg" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <div className="relative mt-1">
                  <Scale className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    id="weight_kg"
                    name="weight_kg"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">BMI</label>
                <input
                  type="text"
                  value={formData.bmi}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Blood Pressure */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Blood Pressure</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="systolic_bp" className="block text-sm font-medium text-gray-700">
                  Systolic BP (mmHg)
                </label>
                <div className="relative mt-1">
                  <Gauge className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    id="systolic_bp"
                    name="systolic_bp"
                    value={formData.systolic_bp}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="diastolic_bp" className="block text-sm font-medium text-gray-700">
                  Diastolic BP (mmHg)
                </label>
                <div className="relative mt-1">
                  <Gauge className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    id="diastolic_bp"
                    name="diastolic_bp"
                    value={formData.diastolic_bp}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">BP Category</label>
                <input
                  type="text"
                  value={formData.bp_category ? getBPCategoryLabel(formData.bp_category) : ''}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lifestyle Factors</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="smoking_status" className="block text-sm font-medium text-gray-700">
                  Smoking Status
                </label>
                <div className="relative mt-1">
                  <Cigarette className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    id="smoking_status"
                    name="smoking_status"
                    value={formData.smoking_status}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="never">Never Smoked</option>
                    <option value="former">Former Smoker</option>
                    <option value="current">Current Smoker</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="alcohol_consumption" className="block text-sm font-medium text-gray-700">
                  Alcohol Consumption
                </label>
                <div className="relative mt-1">
                  <Wine className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    id="alcohol_consumption"
                    name="alcohol_consumption"
                    value={formData.alcohol_consumption}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="physical_activity" className="block text-sm font-medium text-gray-700">
                  Physical Activity Level
                </label>
                <div className="relative mt-1">
                  <Dumbbell className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    id="physical_activity"
                    name="physical_activity"
                    value={formData.physical_activity}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Medical History</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cholesterol_level" className="block text-sm font-medium text-gray-700">
                  Cholesterol Level (mg/dL)
                </label>
                <input
                  type="number"
                  id="cholesterol_level"
                  name="cholesterol_level"
                  value={formData.cholesterol_level}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="blood_sugar" className="block text-sm font-medium text-gray-700">
                  Blood Sugar (mg/dL)
                </label>
                <input
                  type="number"
                  id="blood_sugar"
                  name="blood_sugar"
                  value={formData.blood_sugar}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="family_history"
                  name="family_history"
                  checked={formData.family_history}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="family_history" className="ml-2 block text-sm text-gray-700">
                  Family History of Heart Disease
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 flex items-center space-x-2"
            disabled={loading}
          >
            <Activity className="h-5 w-5" />
            <span>{loading ? 'Processing...' : 'Get Prediction'}</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {prediction !== null && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-500" />
            <span>Prediction Result</span>
          </h2>
          <p className="text-lg">
            Risk of Heart Disease: 
            <span className={`font-bold ${prediction > 0.5 ? 'text-red-500' : 'text-green-500'}`}>
              {prediction > 0.5 ? ' High' : ' Low'} ({(prediction * 100).toFixed(2)}%)
            </span>
          </p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <span>Important Note</span>
        </h2>
        <p className="text-gray-600">
          This prediction tool is for informational purposes only and should not be considered as a substitute for professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}