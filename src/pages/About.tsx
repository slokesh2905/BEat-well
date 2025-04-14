import React from 'react';
import { Heart, Award, Users, Brain, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <div className="space-y-12">
      <motion.section 
        className="text-center space-y-4"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-4xl font-bold text-gray-900">About Beat-Well</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We combine cutting-edge artificial intelligence with medical expertise to provide accurate heart disease predictions and preventive care recommendations.
        </p>
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <Brain className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-semibold">Our Technology</h2>
          </div>
          <p className="text-gray-600">
            Our AI model is trained on extensive medical datasets and validated by healthcare professionals. We use advanced machine learning algorithms to analyze multiple health parameters and provide accurate predictions.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <Award className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-600">
            We're committed to making early heart disease detection accessible to everyone. Our goal is to prevent heart-related complications through timely intervention and awareness.
          </p>
        </motion.div>
      </motion.div>

      <motion.section 
        className="text-center space-y-6"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl font-bold text-gray-900">Connect With Us</h2>
        <p className="text-lg text-gray-600">
          Follow our journey and contribute to our mission of improving heart health awareness
        </p>
        <div className="flex justify-center space-x-6">
          <motion.a
            href="https://github.com/slokesh2905"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="h-8 w-8" />
            <span className="font-medium">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/lokesh-sharma-4a16ba206/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="h-8 w-8" />
            <span className="font-medium">LinkedIn</span>
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}