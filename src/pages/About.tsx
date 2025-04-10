import React from 'react';
import { Heart, Award, Users, Brain } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">About Beat-Well</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We combine cutting-edge artificial intelligence with medical expertise to provide accurate heart disease predictions and preventive care recommendations.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-6">
            <Brain className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-semibold">Our Technology</h2>
          </div>
          <p className="text-gray-600">
            Our AI model is trained on extensive medical datasets and validated by healthcare professionals. We use advanced machine learning algorithms to analyze multiple health parameters and provide accurate predictions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-6">
            <Award className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-600">
            We're committed to making early heart disease detection accessible to everyone. Our goal is to prevent heart-related complications through timely intervention and awareness.
          </p>
        </div>
      </div>
    </div>
  );
}