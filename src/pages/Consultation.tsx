import React from 'react';
import { MapPin, Phone, ExternalLink, Stethoscope, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Consultation() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
            <Stethoscope className="h-24 w-24 text-red-500" />
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
            <HeartPulse className="h-12 w-12 text-red-400" />
          </motion.div>
        </div>
      </motion.div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Find Cardiologists Near You</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Locate top-rated cardiologists in your area for consultations, check-ups, and specialized heart care.
        </p>
      </div>

      <div className="text-center mb-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <MapPin className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">We're Expanding Our Network!</h3>
          <p className="text-gray-600 mb-6">
            We are currently working on expanding our network of cardiologists across India. 
            Meanwhile, you can find and connect with qualified heart specialists in your area through our trusted partner.
          </p>
          <motion.a
            href="https://www.drdata.in/cardiologists.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Find Cardiologists on DrData</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
          <p className="text-sm text-gray-500 mt-4">
            DrData maintains a comprehensive directory of over 150 verified cardiologists across India
          </p>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 bg-red-100 p-3 rounded-full">
            <Phone className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Need immediate assistance?</h3>
            <p className="mb-4">
              Call our emergency helpline numbers for immediate medical assistance or to connect with a cardiac specialist.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-xl font-bold text-red-500">102</span>
                <span className="text-sm text-gray-500 ml-3">(Ambulance Services)</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-red-500">108</span>
                <span className="text-sm text-gray-500 ml-3">(Emergency Medical Services)</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-red-500">1800-180-1104</span>
                <span className="text-sm text-gray-500 ml-3">(National Heart Institute Helpline)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">Find the Right Heart Specialist</h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          Different cardiac specialists focus on different aspects of heart health. Understanding these specialties can help you find the right doctor for your specific needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {[
            {
              title: "General Cardiologist",
              description: "Diagnoses and treats common heart conditions including coronary artery disease, heart failure, and valve problems."
            },
            {
              title: "Interventional Cardiologist",
              description: "Performs minimally invasive procedures like stent placements and balloon angioplasties."
            },
            {
              title: "Electrophysiologist",
              description: "Specializes in heart rhythm disorders and treatments like pacemakers and ablation procedures."
            },
            {
              title: "Cardiac Surgeon",
              description: "Performs surgical procedures like bypass surgeries, valve repairs or replacements, and heart transplants."
            },
            {
              title: "Preventive Cardiologist",
              description: "Focuses on preventing heart disease through risk assessment, lifestyle changes, and medication management."
            },
            {
              title: "Pediatric Cardiologist",
              description: "Specializes in heart conditions affecting infants, children, and adolescents, including congenital heart defects."
            }
          ].map((specialty, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">{specialty.title}</h3>
              <p className="text-sm text-gray-600">{specialty.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}