import React from 'react';
import { Heart, Activity, Sun, Moon } from 'lucide-react';

export default function Exercise() {
  const exercises = [
    {
      title: "Cardiovascular Exercises",
      description: "Regular cardio workouts to strengthen your heart",
      activities: [
        "Brisk walking - 30 minutes daily",
        "Swimming - 20-30 minutes, 3 times a week",
        "Cycling - 30 minutes, 3-4 times a week",
        "Jogging - 20-30 minutes, 3 times a week"
      ],
      icon: Heart
    },
    {
      title: "Yoga Poses for Heart Health",
      description: "Gentle yoga poses to improve circulation and reduce stress",
      activities: [
        "Uttanasana (Standing Forward Bend)",
        "Setu Bandhasana (Bridge Pose)",
        "Adho Mukha Svanasana (Downward-Facing Dog)",
        "Balasana (Child's Pose)"
      ],
      icon: Sun
    },
    {
      title: "Breathing Exercises",
      description: "Deep breathing techniques for stress reduction",
      activities: [
        "Anulom Vilom (Alternate Nostril Breathing)",
        "Bhramari Pranayama (Bee Breath)",
        "Deep Belly Breathing",
        "4-7-8 Breathing Technique"
      ],
      icon: Activity
    },
    {
      title: "Relaxation Techniques",
      description: "Methods to reduce stress and improve heart health",
      activities: [
        "Progressive Muscle Relaxation",
        "Guided Meditation",
        "Mindfulness Practice",
        "Body Scan Meditation"
      ],
      icon: Moon
    }
  ];

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Exercise & Yoga for Heart Health</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover exercises and yoga practices that promote heart health and overall well-being
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <exercise.icon className="h-8 w-8 text-red-500" />
              <h2 className="text-xl font-semibold">{exercise.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            <ul className="space-y-2">
              {exercise.activities.map((activity, actIndex) => (
                <li key={actIndex} className="flex items-center text-gray-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Always consult with your healthcare provider before starting any new exercise routine</li>
          <li>• Start slowly and gradually increase intensity</li>
          <li>• Listen to your body and stop if you feel discomfort</li>
          <li>• Stay hydrated and exercise in a comfortable environment</li>
          <li>• Combine exercise with a healthy diet for optimal results</li>
        </ul>
      </div>
    </div>
  );
}