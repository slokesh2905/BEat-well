import React from 'react';
import { Heart, Utensils, Scaling as Walking, Moon, Coffee, Cigarette } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Remedies() {
  const indianFoods = [
    {
      name: "Oats Dalia",
      benefits: ["Rich in fiber", "Reduces cholesterol", "Heart-healthy"],
      recipe: "Cook dalia with vegetables and spices. Add oats for extra nutrition.",
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Ragi Porridge",
      benefits: ["High in calcium", "Controls blood pressure", "Rich in antioxidants"],
      recipe: "Cook ragi flour in water, add milk and jaggery for sweetness.",
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Spinach Dal",
      benefits: ["Iron-rich", "Protein-packed", "Low-fat"],
      recipe: "Cook dal with spinach, garlic, and spices. Serve with brown rice.",
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e604?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="space-y-12">
      <motion.section 
        className="text-center space-y-4"
        {...fadeIn}
      >
        <h1 className="text-4xl font-bold text-gray-900">Heart Health Remedies</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover lifestyle changes and natural remedies that can help improve your heart health
        </p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Utensils className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Healthy Diet</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Increase intake of fruits and vegetables</li>
            <li>• Choose whole grains over refined grains</li>
            <li>• Limit saturated and trans fats</li>
            <li>• Reduce sodium intake</li>
            <li>• Include omega-3 rich foods</li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Walking className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Physical Activity</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Aim for 150 minutes of moderate exercise weekly</li>
            <li>• Include both cardio and strength training</li>
            <li>• Take regular walking breaks</li>
            <li>• Try swimming or cycling</li>
            <li>• Practice yoga for stress reduction</li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Lifestyle Changes</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Get adequate sleep (7-9 hours)</li>
            <li>• Manage stress through meditation</li>
            <li>• Maintain a healthy weight</li>
            <li>• Monitor blood pressure regularly</li>
            <li>• Stay hydrated</li>
          </ul>
        </motion.div>
      </div>

      <motion.section 
        className="bg-white p-8 rounded-lg shadow-md"
        {...fadeIn}
      >
        <h2 className="text-2xl font-bold mb-6">Heart-Healthy Indian Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {indianFoods.map((food, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{food.name}</h3>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Benefits:</p>
                  <ul className="text-sm text-gray-600">
                    {food.benefits.map((benefit, i) => (
                      <li key={i}>• {benefit}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Recipe:</span> {food.recipe}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="bg-white p-8 rounded-lg shadow-md"
        {...fadeIn}
      >
        <h2 className="text-2xl font-bold mb-6">Habits to Avoid</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <Cigarette className="h-6 w-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Quit Smoking</h3>
              <p className="text-gray-600">Smoking increases risk of heart disease and stroke</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Coffee className="h-6 w-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Limit Caffeine</h3>
              <p className="text-gray-600">Excessive caffeine can increase blood pressure</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Heart className="h-6 w-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Avoid Stress</h3>
              <p className="text-gray-600">Chronic stress contributes to heart problems</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}