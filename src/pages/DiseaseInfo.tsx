import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, AlertTriangle, Activity, Pill, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const diseases = {
  'coronary-artery-disease': {
    title: 'Coronary Artery Disease',
    description: 'A condition where the major blood vessels that supply your heart become damaged or diseased.',
    severity: 'High',
    symptoms: [
      'Chest pain (angina)',
      'Shortness of breath',
      'Pain in arms or shoulders',
      'Fatigue',
      'Nausea'
    ],
    causes: [
      'High blood pressure',
      'High cholesterol',
      'Smoking',
      'Diabetes',
      'Obesity'
    ],
    treatments: [
      'Lifestyle changes',
      'Medications',
      'Angioplasty',
      'Bypass surgery'
    ],
    prevention: [
      'Regular exercise',
      'Healthy diet',
      'Quit smoking',
      'Stress management',
      'Regular check-ups'
    ],
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'
  },
  'heart-arrhythmia': {
    title: 'Heart Arrhythmia',
    description: "An irregular heartbeat or abnormal heart rhythm that occurs when the electrical signals coordinating your heartbeat don't work properly.",
    severity: 'Moderate to High',
    symptoms: [
      'Fluttering in chest',
      'Racing heartbeat',
      'Slow heartbeat',
      'Chest pain',
      'Dizziness'
    ],
    causes: [
      'Heart defects',
      'High blood pressure',
      'Diabetes',
      'Sleep apnea',
      'Stress'
    ],
    treatments: [
      'Medications',
      'Cardioversion',
      'Catheter ablation',
      'Pacemaker'
    ],
    prevention: [
      'Healthy lifestyle',
      'Avoid excessive alcohol',
      'Limit caffeine',
      'Manage stress',
      'Regular exercise'
    ],
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'
  },
  'heart-valve-disease': {
    title: 'Heart Valve Disease',
    description: 'A condition where one or more of the heart valves don\'t work properly, affecting blood flow through the heart.',
    severity: 'Moderate to High',
    symptoms: [
      'Shortness of breath',
      'Fatigue',
      'Swollen ankles or feet',
      'Irregular heartbeat',
      'Chest pain',
      'Dizziness or fainting'
    ],
    causes: [
      'Aging',
      'Congenital heart defects',
      'Infections (endocarditis)',
      'Rheumatic fever',
      'High blood pressure',
      'Coronary artery disease'
    ],
    treatments: [
      'Medications',
      'Valve repair surgery',
      'Valve replacement surgery',
      'Balloon valvuloplasty',
      'Lifestyle changes'
    ],
    prevention: [
      'Regular heart check-ups',
      'Maintain healthy blood pressure',
      'Treat infections promptly',
      'Healthy diet and exercise',
      'Avoid smoking'
    ],
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'
  }
  // Add more diseases as needed
};

export default function DiseaseInfo() {
  const { id } = useParams<{ id: string }>();
  const disease = id ? diseases[id as keyof typeof diseases] : null;

  if (!disease) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Disease not found</h1>
        <Link to="/" className="text-red-500 hover:text-red-600 mt-4 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-red-500 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={disease.image}
          alt={disease.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{disease.title}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-red-500 font-medium">Severity: {disease.severity}</span>
            </div>
            <p className="text-gray-600 text-lg">{disease.description}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold">Symptoms</h2>
              </div>
              <ul className="space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold">Causes</h2>
              </div>
              <ul className="space-y-2">
                {disease.causes.map((cause, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Pill className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold">Treatments</h2>
              </div>
              <ul className="space-y-2">
                {disease.treatments.map((treatment, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    {treatment}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold">Prevention</h2>
              </div>
              <ul className="space-y-2">
                {disease.prevention.map((prevention, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    {prevention}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}