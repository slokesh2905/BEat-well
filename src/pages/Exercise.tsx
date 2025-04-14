import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dumbbell, Heart, Wind, Clock, AlertCircle, ChevronRight } from 'lucide-react';
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

const Exercises: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.section 
        className="text-center space-y-4"
        {...fadeIn}
      >
        <motion.div
          className="flex justify-center mb-12"
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
              <Dumbbell className="h-24 w-24 text-red-500" />
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
              <Heart className="h-12 w-12 text-red-400" />
            </motion.div>
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900">Heart-Healthy Exercises</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover easy-to-do cardio workouts and breathing routines to strengthen your heart and improve overall cardiovascular health.
        </p>
      </motion.section>
      
      <Tabs defaultValue="cardio" className="space-y-8">
        <motion.div 
          className="flex justify-center"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <TabsList className="bg-gray-100">
            <TabsTrigger value="cardio" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Dumbbell className="h-4 w-4 mr-2" />
              Cardio Exercises
            </TabsTrigger>
            <TabsTrigger value="breathing" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Wind className="h-4 w-4 mr-2" />
              Breathing Techniques
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <TabsContent value="cardio">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                title: "Walking",
                image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                intensity: "Low",
                description: "Walking is one of the simplest and most accessible forms of exercise. It's perfect for beginners and those recovering from illness.",
                benefits: ["Improves circulation", "Lowers blood pressure", "Strengthens the heart", "Low impact on joints"],
                routine: "Start with 10-15 minutes daily, gradually increasing to 30-60 minutes 5 days a week. Aim for a moderate pace where you can talk but not sing."
              },
              {
                title: "Swimming",
                image: "https://images.unsplash.com/photo-1600965962102-9d260a71890d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                intensity: "Low to Moderate",
                description: "Swimming is excellent for cardiovascular health with minimal impact on joints, making it ideal for those with arthritis or joint issues.",
                benefits: ["Full-body workout", "Improves lung capacity", "Builds endurance", "Gentle on joints"],
                routine: "Begin with 10 minutes of light swimming 2-3 times weekly. Gradually increase to 30 minutes sessions 3-4 times per week."
              },
              {
                title: "Cycling",
                image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                intensity: "Moderate",
                description: "Cycling, either outdoors or on a stationary bike, provides excellent cardiovascular benefits while being low-impact.",
                benefits: ["Strengthens leg muscles", "Improves heart health", "Burns calories efficiently", "Low impact exercise"],
                routine: "Start with 15-20 minute sessions 3 times weekly at moderate intensity. Progress to 30-45 minute sessions 3-5 times per week."
              },
              {
                title: "Dancing",
                image: "https://images.unsplash.com/photo-1519925610903-381054cc2a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                intensity: "Moderate",
                description: "Dancing is a fun way to improve heart health while enjoying music. It also enhances balance, coordination, and mood.",
                benefits: ["Improves coordination", "Enhances mood", "Burns calories", "Strengthens muscles"],
                routine: "Dance for 15-30 minutes 3-4 times weekly. Choose styles you enjoy - from ballroom to Zumba or even just dancing freely at home."
              },
              {
                title: "Jogging/Running",
                image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                intensity: "Moderate to High",
                description: "Jogging and running are highly effective for cardiovascular fitness but require proper technique to avoid injury.",
                benefits: ["Highly efficient workout", "Improves bone density", "Enhances lung capacity", "Can be done anywhere"],
                routine: "Begin with a walk-jog routine (1 min jog, 2 min walk) for 15 minutes. Gradually increase jogging time and reduce walking intervals."
              },
              {
                title: "HIIT (High-Intensity Interval Training)",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                intensity: "High",
                description: "HIIT alternates between intense activity and rest periods, maximizing cardiovascular benefits in shorter time frames.",
                benefits: ["Time-efficient", "Burns calories even after workout", "Improves oxygen consumption", "Reduces heart rate and blood pressure"],
                routine: "Start with 30 seconds of high intensity followed by 90 seconds of rest, repeated 8-10 times. Always include warm-up and cool-down periods."
              }
            ].map((exercise, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={exercise.image} 
                    alt={exercise.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <Dumbbell className="h-8 w-8 text-red-500" />
                    <h2 className="text-xl font-semibold text-gray-900">{exercise.title}</h2>
                  </div>
                  <span className={`inline-block px-3 py-1 text-sm rounded-full mb-4 ${
                    exercise.intensity === "Low" ? "bg-green-100 text-green-800" : 
                    exercise.intensity === "Moderate" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {exercise.intensity} Intensity
                  </span>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                      <ul className="space-y-2">
                        {exercise.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <ChevronRight className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Sample Routine:</h4>
                      <p className="text-gray-600">{exercise.routine}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-8 w-8 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Safety Tips</h3>
                  <ul className="space-y-2">
                    {[
                      "Always consult with your doctor before starting a new exercise program, especially if you have existing heart conditions.",
                      "Start slowly and gradually increase intensity over time.",
                      "Warm up before and cool down after exercise.",
                      "Stay hydrated before, during, and after exercise.",
                      "Stop exercising and seek medical attention if you experience chest pain, severe shortness of breath, dizziness, or irregular heartbeat."
                    ].map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-red-500 font-bold">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Creating Your Heart-Healthy Exercise Plan
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Weekly Goals",
                    content: "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, preferably spread throughout the week."
                  },
                  {
                    icon: Dumbbell,
                    title: "Mix It Up",
                    content: "Combine different types of exercises to work different muscle groups and prevent boredom. Include both cardio and strength training in your weekly routine."
                  },
                  {
                    icon: Heart,
                    title: "Monitor Your Heart Rate",
                    content: "For moderate-intensity activity, aim for a target heart rate of 50-70% of your maximum heart rate. For vigorous activity, aim for 70-85%. A simple estimation of your maximum heart rate is 220 minus your age."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <item.icon className="h-8 w-8 text-red-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="breathing">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                title: "Diaphragmatic (Belly) Breathing",
                description: "This fundamental technique focuses on deep breathing using the diaphragm rather than shallow chest breathing.",
                instructions: [
                  "Lie on your back with knees bent and feet flat on the floor",
                  "Place one hand on your chest and one on your belly",
                  "Breathe in slowly through your nose, feeling your belly rise (not your chest)",
                  "Exhale slowly through pursed lips, feeling your belly fall",
                  "Repeat for 5-10 minutes, 1-2 times daily"
                ],
                benefits: "Reduces blood pressure, lowers stress, improves oxygen flow, and strengthens the diaphragm"
              },
              {
                title: "4-7-8 Breathing",
                description: "A relaxation technique that helps reduce anxiety and may help lower blood pressure.",
                instructions: [
                  "Sit with back straight or lie down comfortably",
                  "Place tip of tongue against the ridge behind upper front teeth",
                  "Exhale completely through your mouth making a 'whoosh' sound",
                  "Close mouth and inhale quietly through nose for 4 counts",
                  "Hold breath for 7 counts",
                  "Exhale completely through mouth for 8 counts",
                  "Repeat cycle 4 times"
                ],
                benefits: "Reduces anxiety and stress, helps lower heart rate and blood pressure, improves focus and sleep quality"
              },
              {
                title: "Equal Breathing (Sama Vritti)",
                description: "A yogic breathing technique that balances the nervous system and improves focus.",
                instructions: [
                  "Sit comfortably with spine straight",
                  "Close your eyes and focus on your natural breath",
                  "Gradually make your inhales and exhales equal length (start with 4 counts each)",
                  "Breathe through your nose, keeping the breathing smooth and continuous",
                  "Practice for 5-10 minutes daily"
                ],
                benefits: "Balances the nervous system, reduces stress and anxiety, improves focus and lung capacity"
              },
              {
                title: "Box Breathing",
                description: "Used by Navy SEALs for stress management, this technique is excellent for maintaining calm under pressure.",
                instructions: [
                  "Sit upright with feet flat on the floor",
                  "Exhale completely",
                  "Inhale slowly through nose for 4 counts",
                  "Hold breath for 4 counts",
                  "Exhale through mouth for 4 counts",
                  "Hold empty lungs for 4 counts",
                  "Repeat for 5 minutes"
                ],
                benefits: "Reduces stress, regulates autonomic nervous system, improves concentration, helps manage blood pressure"
              }
            ].map((technique, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <Wind className="h-8 w-8 text-red-500" />
                    <h2 className="text-xl font-semibold text-gray-900">{technique.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{technique.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How to Practice:</h4>
                      <ol className="space-y-2">
                        {technique.instructions.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-red-500 font-medium">{idx + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                      <p className="text-gray-600">{technique.benefits}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Combining Breathing with Daily Activities</h2>
              <p className="text-gray-600 mb-6">
                Incorporating mindful breathing into your daily routine can significantly enhance heart health over time. Here are some suggestions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Morning Practice",
                    content: "Start your day with 5 minutes of deep breathing before getting out of bed. This sets a calm tone for the day and activates your parasympathetic nervous system."
                  },
                  {
                    title: "Work Breaks",
                    content: "Take 2-minute breathing breaks every hour during work. This reduces stress hormones and gives your mind a refreshing pause."
                  },
                  {
                    title: "Commuting",
                    content: "Practice deep breathing while commuting (not while driving). This transforms potentially stressful travel time into a mindful practice."
                  },
                  {
                    title: "Before Meals",
                    content: "Take a few deep breaths before eating. This activates your digestive system and helps prevent overeating."
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="bg-white rounded-lg p-6 shadow-md mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Heart className="h-8 w-8 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">How Breathing Exercises Benefit Heart Health</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Reduces Stress Response",
                  content: "Deep breathing activates the parasympathetic nervous system, lowering stress hormones like cortisol and adrenaline that can damage the heart over time."
                },
                {
                  title: "Lowers Blood Pressure",
                  content: "Regular breathing exercises have been shown to reduce blood pressure by relaxing blood vessels and decreasing heart rate."
                },
                {
                  title: "Improves Heart Rate Variability",
                  content: "Breathing practices can increase heart rate variability (HRV), an important marker of cardiovascular health and resilience."
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h3 className="font-medium text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Exercises;