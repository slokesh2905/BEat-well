import React from 'react';
import { 
  Heart, 
  Utensils, 
  Dumbbell, 
  Clock, 
  Moon, 
  Calendar, 
  CheckCircle, 
  Activity,
  XCircle
} from 'lucide-react';
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

export default function Remedies() {
  return (
    <div className="space-y-12">
      <motion.section 
        className="text-center space-y-4"
        {...fadeIn}
      >
        <h1 className="text-4xl font-bold text-gray-900">Healthy Heart Remedies</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover diet plans, lifestyle changes, and prevention tips to maintain and improve your heart health
        </p>
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Utensils className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Foods to Include</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            {[
              "Fruits and vegetables (aim for 5+ servings daily)",
              "Whole grains (brown rice, whole wheat, oats)",
              "Lean proteins (fish, poultry, legumes)",
              "Healthy fats (olive oil, avocados, nuts)",
              "Low-fat dairy products",
              "Fatty fish rich in omega-3 (salmon, mackerel)",
              "Seeds (flax, chia, hemp)",
              "Herbs and spices instead of salt"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Foods to Limit</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            {[
              "Processed and fast foods",
              "Foods high in saturated and trans fats",
              "Red meat and processed meats",
              "Refined carbohydrates and added sugars",
              "Excessive salt (sodium)",
              "Sugary beverages and alcohol",
              "Full-fat dairy products",
              "Baked goods and fried foods"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Recommended Diets</h2>
          </div>
          <ul className="space-y-4">
            <li>
              <h4 className="font-medium">Mediterranean Diet</h4>
              <p className="text-sm text-gray-600">Emphasizes fruits, vegetables, whole grains, beans, nuts, and olive oil.</p>
            </li>
            <li>
              <h4 className="font-medium">DASH Diet</h4>
              <p className="text-sm text-gray-600">Designed to help lower blood pressure by limiting sodium, sweets, and red meats.</p>
            </li>
            <li>
              <h4 className="font-medium">Flexitarian Diet</h4>
              <p className="text-sm text-gray-600">Mostly plant-based with occasional meat consumption.</p>
            </li>
            <li>
              <h4 className="font-medium">Nordic Diet</h4>
              <p className="text-sm text-gray-600">Features fatty fish, berries, and whole grains.</p>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.section 
        className="text-center space-y-4"
        {...fadeIn}
      >
        <h2 className="text-3xl font-bold text-gray-900">Lifestyle Changes for Heart Health</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Small changes in your daily routine can make a big difference in your heart health
        </p>
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Dumbbell className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Physical Activity</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Regular physical activity helps strengthen your heart, lower blood pressure, and improve cholesterol levels.
          </p>
          <h4 className="font-medium mb-2">Recommended:</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• At least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity weekly</li>
            <li>• Strength training exercises at least twice a week</li>
            <li>• Breaking up sitting time with short activity breaks</li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Stress Management</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Chronic stress can contribute to heart disease by raising blood pressure and leading to unhealthy coping behaviors.
          </p>
          <h4 className="font-medium mb-2">Effective techniques:</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Meditation and mindfulness practices</li>
            <li>• Deep breathing exercises</li>
            <li>• Yoga or tai chi</li>
            <li>• Progressive muscle relaxation</li>
            <li>• Spending time in nature</li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Sleep Quality</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Poor sleep quality is linked to high blood pressure, insulin resistance, and heart disease.
          </p>
          <h4 className="font-medium mb-2">Recommendations:</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Aim for 7-9 hours of quality sleep each night</li>
            <li>• Maintain a consistent sleep schedule</li>
            <li>• Create a relaxing bedtime routine</li>
            <li>• Keep your bedroom cool, dark, and quiet</li>
            <li>• Limit screen time before bed</li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Regular Check-ups</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Regular health check-ups help monitor and control risk factors for heart disease.
          </p>
          <h4 className="font-medium mb-2">Key screenings:</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Blood pressure (at least yearly)</li>
            <li>• Cholesterol levels (every 4-6 years for average risk adults)</li>
            <li>• Blood glucose levels</li>
            <li>• Body mass index (BMI)</li>
            <li>• Waist circumference</li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.section 
        className="bg-red-50 p-8 rounded-lg"
        {...fadeIn}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Quick Prevention Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { tip: "Don't smoke or use tobacco", icon: <XCircle className="h-8 w-8 text-red-500" /> },
            { tip: "Maintain a healthy weight", icon: <Activity className="h-8 w-8 text-red-500" /> },
            { tip: "Get regular health screenings", icon: <Calendar className="h-8 w-8 text-red-500" /> },
            { tip: "Eat a heart-healthy diet", icon: <Utensils className="h-8 w-8 text-red-500" /> },
            { tip: "Exercise regularly", icon: <Dumbbell className="h-8 w-8 text-red-500" /> },
            { tip: "Get enough quality sleep", icon: <Moon className="h-8 w-8 text-red-500" /> },
            { tip: "Manage stress", icon: <Clock className="h-8 w-8 text-red-500" /> },
            { tip: "Limit alcohol consumption", icon: <XCircle className="h-8 w-8 text-red-500" /> },
            { tip: "Monitor blood pressure", icon: <Activity className="h-8 w-8 text-red-500" /> },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.icon}
              <p className="mt-2 font-medium text-gray-700">{item.tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}