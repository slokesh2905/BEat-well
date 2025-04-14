import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { Heart, AlertCircle, Info, Zap, Activity, Stethoscope, ActivitySquare, Thermometer, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const InfoPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.section 
        className="text-center space-y-4"
        {...fadeIn}
      >
        <motion.div
          className="flex justify-center mb-6"
          animate={{
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          <Heart className="h-16 w-16 text-red-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900">Heart Disease Information</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Understanding heart disease is the first step toward prevention and treatment. Learn about symptoms, causes, risk factors, and early warning signs.
        </p>
      </motion.section>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">What is Heart Disease?</h2>
            </div>
            <p className="text-gray-600">
              Heart disease refers to several types of heart conditions. The most common type is coronary artery disease, which affects blood flow to the heart and can lead to heart attacks. Other conditions include arrhythmias (abnormal heart rhythms), heart valve disease, and heart failure.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-8 w-8 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">Common Symptoms</h2>
            </div>
            <div className="space-y-3">
              {[
                { icon: ActivitySquare, text: "Chest pain or discomfort" },
                { icon: Stethoscope, text: "Shortness of breath" },
                { icon: Thermometer, text: "Fatigue" },
                { icon: AlertCircle, text: "Pain or numbness in limbs" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <item.icon className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.h2 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        Risk Factors
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {[
          {
            title: "Lifestyle Factors",
            icon: Zap,
            items: ["Smoking", "Physical inactivity", "Unhealthy diet", "Excessive alcohol", "Stress", "Poor sleep"]
          },
          {
            title: "Health Conditions",
            icon: Activity,
            items: ["High blood pressure", "High cholesterol", "Diabetes", "Obesity", "Sleep apnea", "Metabolic syndrome"]
          },
          {
            title: "Other Factors",
            icon: Info,
            items: ["Family history", "Age", "Gender", "Previous heart problems", "Chronic inflammation", "Certain medications"]
          }
        ].map((section, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <section.icon className="h-8 w-8 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <ChevronRight className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.h2 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        Early Warning Signs
      </motion.h2>
      
      <motion.div 
        variants={cardVariants}
        whileHover="hover"
        className="bg-white rounded-lg shadow-md overflow-hidden mb-12"
      >
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Heart disease often develops slowly over time and may not have obvious symptoms. Pay attention to these early warning signs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <ActivitySquare className="h-8 w-8 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900">Physical Signs</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: ActivitySquare, text: "Frequent fatigue" },
                  { icon: Stethoscope, text: "Difficulty breathing" },
                  { icon: AlertCircle, text: "Swelling in extremities" },
                  { icon: Thermometer, text: "Persistent cough" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <item.icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-8 w-8 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900">Other Symptoms</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: Activity, text: "Rapid or irregular pulse" },
                  { icon: Zap, text: "Nausea or lack of appetite" },
                  { icon: Info, text: "Confusion or impaired thinking" },
                  { icon: Heart, text: "High blood pressure" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <item.icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={cardVariants}
        whileHover="hover"
        className="bg-white rounded-lg shadow-md overflow-hidden mb-10"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Info className="h-8 w-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">When to See a Doctor</h3>
              <p className="text-gray-600 mb-6">
                Seek emergency medical care if you have these heart disease symptoms:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Heart, text: "Chest pain" },
                  { icon: Activity, text: "Shortness of breath" },
                  { icon: AlertCircle, text: "Fainting" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <item.icon className="h-5 w-5 text-red-500" />
                    <span className="text-gray-900">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                Heart disease is easier to treat when detected early, so talk to your doctor about your concerns regarding your heart health. If you're concerned about developing heart disease, discuss your concerns with your doctor. Together, you can assess your risks and determine what steps to take to improve your heart health.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoPage; 