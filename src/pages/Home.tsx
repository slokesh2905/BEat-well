import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, Users, Stethoscope, Award, Clock, Shield } from 'lucide-react';
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

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
            alt="Heart Care Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-red-600/60"></div>
        </div>
        
        <motion.div 
          className="relative text-center text-white space-y-6 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your Heart's Rhythm, <br/>Our Priority
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Take control of your heart health with our advanced AI technology and comprehensive wellness approach
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              to="/prediction"
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all"
            >
              Get Your Heart Health Score
            </Link>
            <Link
              to="/about"
              className="bg-white text-red-500 px-8 py-3 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Beat-Well?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with medical expertise to provide you with the best heart care possible
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: Activity,
                title: "AI-Powered Analysis",
                description: "Advanced machine learning algorithms analyze your health data for accurate risk assessment"
              },
              {
                icon: Shield,
                title: "Preventive Care",
                description: "Get personalized recommendations to maintain optimal heart health"
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Connect with certified cardiologists and healthcare professionals"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={cardVariants}
                whileHover="hover"
              >
                <feature.icon className="h-12 w-12 text-red-500 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section 
        className="py-16 bg-gradient-to-r from-red-50 to-red-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Understanding Heart Disease</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about different types of heart conditions and their severity levels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Coronary Artery Disease",
                severity: "High",
                description: "Buildup of plaque in the heart's arteries that can lead to heart attacks",
                link: "/disease/coronary-artery-disease",
                image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=300"
              },
              {
                title: "Heart Arrhythmia",
                severity: "Moderate to High",
                description: "Irregular heartbeat that can lead to complications if untreated",
                link: "/disease/heart-arrhythmia",
                image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=300"
              },
              {
                title: "Heart Valve Disease",
                severity: "Moderate",
                description: "Problems with heart valves that affect blood flow",
                link: "/disease/heart-valve-disease",
                image: "https://images.unsplash.com/photo-1618939304347-e91b1f33d2ab?auto=format&fit=crop&q=80&w=300"
              }
            ].map((disease, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <img
                  src={disease.image}
                  alt={disease.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{disease.title}</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-white bg-red-500 px-3 py-1 rounded-full">
                      Severity: {disease.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{disease.description}</p>
                  <Link
                    to={disease.link}
                    className="text-red-500 font-medium hover:text-red-600 flex items-center"
                  >
                    Learn more
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take the first step towards better heart health with our comprehensive platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                title: "1. Create Account",
                description: "Quick and easy registration process"
              },
              {
                icon: Activity,
                title: "2. Health Assessment",
                description: "Complete your health profile"
              },
              {
                icon: Heart,
                title: "3. Get Results",
                description: "Receive personalized insights"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div 
                  className="bg-red-50 rounded-full p-6 inline-block mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <step.icon className="h-8 w-8 text-red-500" />
                </motion.div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              className="inline-flex items-center bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all"
            >
              <Heart className="h-5 w-5 mr-2" />
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}