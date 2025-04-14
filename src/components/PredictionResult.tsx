import React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Heart, 
  Info, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRiskColorClass, getProgressStyle } from '../utils/styleUtils';
import { motion } from 'framer-motion';

interface PredictionResultProps {
  result: {
    prediction: boolean;
    probability: number;
    risk_level: 'low' | 'moderate' | 'high' | 'very-high';
  };
  resetForm: () => void;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ result, resetForm }) => {
  const { prediction, probability, risk_level } = result;
  
  const getRiskColor = () => getRiskColorClass(risk_level);
  
  const getRiskIcon = () => {
    switch(risk_level) {
      case 'low': 
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'moderate': 
        return <AlertTriangle className="h-12 w-12 text-yellow-500" />;
      case 'high': 
        return <AlertCircle className="h-12 w-12 text-orange-500" />;
      case 'very-high': 
        return <AlertCircle className="h-12 w-12 text-red-500" />;
      default: 
        return <Info className="h-12 w-12 text-gray-500" />;
    }
  };
  
  const getRiskDescription = () => {
    switch(risk_level) {
      case 'low': 
        return "Your risk of heart disease appears to be low based on the provided parameters. Continue maintaining your healthy lifestyle.";
      case 'moderate': 
        return "You have a moderate risk of heart disease. Consider making some lifestyle changes and consult with a healthcare professional.";
      case 'high': 
        return "Your risk of heart disease is high. We strongly recommend consulting with a healthcare professional for proper evaluation.";
      case 'very-high': 
        return "Your risk level is very high. Please consult with a healthcare professional as soon as possible for a thorough evaluation.";
      default: 
        return "Risk level assessment is inconclusive. Please consult with a healthcare professional.";
    }
  };
  
  const getRecommendations = () => {
    const common = [
      "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
      "Engage in regular physical activity (at least 150 minutes per week)",
      "Monitor your blood pressure and cholesterol levels regularly",
      "Avoid smoking and limit alcohol consumption"
    ];
    
    const specific = {
      'low': [
        "Continue your healthy habits",
        "Schedule regular check-ups with your doctor"
      ],
      'moderate': [
        "Consider increasing your physical activity",
        "Review your diet for potential improvements",
        "Schedule a check-up with your doctor"
      ],
      'high': [
        "Consult with a healthcare professional soon",
        "Review your medications and treatments with your doctor",
        "Consider stress-reduction techniques"
      ],
      'very-high': [
        "Seek medical attention as soon as possible",
        "Follow your doctor's recommendations strictly",
        "Make immediate lifestyle changes as advised by healthcare professionals"
      ]
    };
    
    return [...specific[risk_level], ...common];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`bg-white rounded-lg shadow-lg border-l-4 ${
        risk_level === 'low' ? 'border-l-green-500' : 
        risk_level === 'moderate' ? 'border-l-yellow-500' : 
        risk_level === 'high' ? 'border-l-orange-500' : 
        'border-l-red-500'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1, 1.15, 1],
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Heart className="h-6 w-6 text-red-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900">Heart Health Assessment Results</h2>
          </div>
          <p className="text-gray-600 mb-6">Based on the health parameters you provided</p>
          
          <motion.div 
            className="flex flex-col md:flex-row md:items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            >
              {getRiskIcon()}
            </motion.div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2 capitalize">
                {risk_level} Risk of Heart Disease
              </h3>
              <p className="text-gray-600 mb-4">
                {getRiskDescription()}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <span className="font-medium capitalize">{risk_level}</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getRiskColor()}`}
                      style={{ width: `${probability * 100}%` }}
                    ></div>
                  </div>
                </motion.div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Lower Risk</span>
                  <span>Higher Risk</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-4 pt-6 border-t mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h4 className="font-semibold text-gray-900">Recommendations:</h4>
            <ul className="space-y-2">
              {getRecommendations().map((rec, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + (idx * 0.1) }}
                >
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-900">
                <Info className="h-5 w-5 text-red-500" />
                Learn More
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Understand more about heart disease, its symptoms, causes, and prevention.
              </p>
              <Link 
                to="/info" 
                className="text-red-500 hover:text-red-600 font-medium flex items-center"
              >
                Heart Disease Information
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-900">
                <Heart className="h-5 w-5 text-red-500" />
                Healthy Lifestyle
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Discover diet plans, lifestyle changes, and exercises for heart health.
              </p>
              <Link 
                to="/remedies" 
                className="text-red-500 hover:text-red-600 font-medium flex items-center"
              >
                Healthy Heart Remedies
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="border-t p-6 flex flex-col sm:flex-row justify-between gap-4">
          <button 
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Start New Assessment
          </button>
          <Link 
            to="/consultation"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-center"
          >
            Find Cardiologists Near Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResult; 