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
  XCircle,
  Apple,
  Salad
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        className="flex justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
            <Salad className="h-20 w-20 text-red-500" />
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.3
            }}
          >
            <Apple className="h-10 w-10 text-green-500" />
          </motion.div>
        </div>
      </motion.div>

      <motion.section 
        className="text-center space-y-3"
        {...fadeIn}
      >
        <h1 className="text-4xl font-bold text-gray-900">Healthy Heart Remedies</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover diet plans, lifestyle changes, and prevention tips to maintain and improve your heart health
        </p>
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Healthy foods to include"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Utensils className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Foods to Include</h2>
            </div>
            <ul className="space-y-2 text-base text-gray-600">
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
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517434324-1db605ff03c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Foods to limit"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <XCircle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Foods to Limit</h2>
            </div>
            <ul className="space-y-2 text-base text-gray-600">
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
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Recommended diets"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Recommended Diets</h2>
            </div>
            <ul className="space-y-4">
              <li>
                <h4 className="font-medium">Mediterranean Diet</h4>
                <p className="text-base text-gray-600">Emphasizes fruits, vegetables, whole grains, beans, nuts, and olive oil.</p>
              </li>
              <li>
                <h4 className="font-medium">DASH Diet</h4>
                <p className="text-base text-gray-600">Designed to help lower blood pressure by limiting sodium, sweets, and red meats.</p>
              </li>
              <li>
                <h4 className="font-medium">Flexitarian Diet</h4>
                <p className="text-base text-gray-600">Mostly plant-based with occasional meat consumption.</p>
              </li>
              <li>
                <h4 className="font-medium">Nordic Diet</h4>
                <p className="text-base text-gray-600">Features fatty fish, berries, and whole grains.</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.section 
        className="text-center space-y-3"
        {...fadeIn}
      >
        <h2 className="text-3xl font-bold text-gray-900">Lifestyle Changes for Heart Health</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Small changes in your daily routine can make a big difference in your heart health
        </p>
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Physical activity"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Dumbbell className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Physical Activity</h2>
            </div>
            <p className="text-base text-gray-600 mb-3">
              Regular physical activity helps strengthen your heart, lower blood pressure, and improve cholesterol levels.
            </p>
            <h4 className="font-medium mb-2 text-base">Recommended:</h4>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• At least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity weekly</li>
              <li>• Strength training exercises at least twice a week</li>
              <li>• Breaking up sitting time with short activity breaks</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Stress management"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Stress Management</h2>
            </div>
            <p className="text-base text-gray-600 mb-3">
              Chronic stress can contribute to heart disease by raising blood pressure and leading to unhealthy coping behaviors.
            </p>
            <h4 className="font-medium mb-2 text-base">Effective techniques:</h4>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• Meditation and mindfulness practices</li>
              <li>• Deep breathing exercises</li>
              <li>• Yoga or tai chi</li>
              <li>• Progressive muscle relaxation</li>
              <li>• Spending time in nature</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Sleep quality"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Moon className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Sleep Quality</h2>
            </div>
            <p className="text-base text-gray-600 mb-3">
              Poor sleep quality is linked to high blood pressure, insulin resistance, and heart disease.
            </p>
            <h4 className="font-medium mb-2 text-base">Recommendations:</h4>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• Aim for 7-9 hours of quality sleep each night</li>
              <li>• Maintain a consistent sleep schedule</li>
              <li>• Create a relaxing bedtime routine</li>
              <li>• Keep your bedroom cool, dark, and quiet</li>
              <li>• Limit screen time before bed</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Regular check-ups"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Regular Check-ups</h2>
            </div>
            <p className="text-base text-gray-600 mb-3">
              Regular health check-ups help monitor and control risk factors for heart disease.
            </p>
            <h4 className="font-medium mb-2 text-base">Key screenings:</h4>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• Blood pressure (at least yearly)</li>
              <li>• Cholesterol levels (every 4-6 years for average risk adults)</li>
              <li>• Blood glucose levels</li>
              <li>• Body mass index (BMI)</li>
              <li>• Waist circumference</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.section 
        className="bg-red-50 p-6 rounded-lg"
        {...fadeIn}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Quick Prevention Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { tip: "Don't smoke or use tobacco", icon: <XCircle className="h-6 w-6 text-red-500" /> },
            { tip: "Maintain a healthy weight", icon: <Activity className="h-6 w-6 text-red-500" /> },
            { tip: "Get regular health screenings", icon: <Calendar className="h-6 w-6 text-red-500" /> },
            { tip: "Eat a heart-healthy diet", icon: <Utensils className="h-6 w-6 text-red-500" /> },
            { tip: "Exercise regularly", icon: <Dumbbell className="h-6 w-6 text-red-500" /> },
            { tip: "Get enough quality sleep", icon: <Moon className="h-6 w-6 text-red-500" /> },
            { tip: "Manage stress", icon: <Clock className="h-6 w-6 text-red-500" /> },
            { tip: "Limit alcohol consumption", icon: <XCircle className="h-6 w-6 text-red-500" /> },
            { tip: "Monitor blood pressure", icon: <Activity className="h-6 w-6 text-red-500" /> },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.icon}
              <p className="mt-2 text-base font-medium text-gray-700">{item.tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}