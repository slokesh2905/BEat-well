import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, AlertTriangle, Info } from 'lucide-react';
import { useChatStore, Message } from '../store/chatStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const INITIAL_MESSAGE = "Hi! I'm your Beat-Well assistant. I can help you understand heart health, guide you through the website, and provide medical information. What would you like to know about?\n\n You can ask about:\n- Heart diseases and symptoms\n- Blood pressure and cholesterol\n- Health check prediction\n- Exercise recommendations\n- Finding doctors\n- Emergency assistance";

const EMERGENCY_MESSAGE = "⚠️ MEDICAL EMERGENCY: If you're experiencing:\n- Severe chest pain\n- Difficulty breathing\n- Numbness in arm/face\n- Severe dizziness\n\nCALL EMERGENCY SERVICES IMMEDIATELY (911 in US)\nDo not wait - every minute counts with heart emergencies!";

const HEART_DISEASES = {
  'coronary artery disease': {
    description: "A condition where the major blood vessels that supply your heart become damaged or diseased.",
    symptoms: [
      "Chest pain (angina)",
      "Shortness of breath",
      "Pain in arms/shoulders",
      "Fatigue",
      "Nausea"
    ],
    riskFactors: [
      "High blood pressure",
      "High cholesterol",
      "Smoking",
      "Diabetes",
      "Obesity"
    ]
  },
  'heart attack': {
    description: "Occurs when blood flow to part of the heart is blocked, causing damage to heart muscle.",
    symptoms: [
      "Severe chest pain/pressure",
      "Pain radiating to arm/jaw",
      "Shortness of breath",
      "Cold sweats",
      "Nausea/vomiting"
    ],
    emergency: true
  },
  'arrhythmia': {
    description: "Irregular heartbeat or abnormal heart rhythm.",
    symptoms: [
      "Fluttering in chest",
      "Racing heartbeat",
      "Slow heartbeat",
      "Chest pain",
      "Dizziness"
    ]
  }
};

const BP_CATEGORIES = `Blood Pressure Categories:
• Normal: Below 120/80 mmHg
• Elevated: 120-129/<80 mmHg
• Stage 1 Hypertension: 130-139/80-89 mmHg
• Stage 2 Hypertension: 140+/90+ mmHg
• Crisis: 180+/120+ mmHg (Emergency!)`;

const NAVIGATION_GUIDE = {
  'prediction': {
    path: '/prediction',
    description: "Get an AI-powered assessment of your heart disease risk based on your health parameters."
  },
  'doctors': {
    path: '/consultation',
    description: "Find and connect with experienced cardiologists in your area."
  },
  'exercise': {
    path: '/exercise',
    description: "Access personalized exercise recommendations and heart-healthy activities."
  },
  'remedies': {
    path: '/remedies',
    description: "Discover natural remedies and lifestyle changes for better heart health."
  }
};

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isOpen, hasConsent, addMessage, toggleChat, setConsent } = useChatStore();
  const [showConsentDialog, setShowConsentDialog] = useState(!hasConsent);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 0 && !showConsentDialog) {
      addMessage({ type: 'bot', content: INITIAL_MESSAGE });
    }
    scrollToBottom();
  }, [messages, showConsentDialog]);

  const handleConsent = (agreed: boolean) => {
    setConsent(agreed);
    setShowConsentDialog(false);
    if (agreed) {
      addMessage({ type: 'bot', content: INITIAL_MESSAGE });
    }
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    addMessage({
      type: 'bot',
      content: "I've taken you to the requested page. Let me know if you need help understanding anything here!"
    });
  };

  const getHeartDiseaseInfo = (disease: string) => {
    const info = HEART_DISEASES[disease as keyof typeof HEART_DISEASES];
    if (!info) return null;

    let response = `${disease.toUpperCase()}\n\n${info.description}\n\nKey Symptoms:`;
    info.symptoms.forEach(symptom => {
      response += `\n• ${symptom}`;
    });

    if (info.riskFactors) {
      response += '\n\nRisk Factors:';
      info.riskFactors.forEach(factor => {
        response += `\n• ${factor}`;
      });
    }

    if (info.emergency) {
      response += '\n\n⚠️ This condition requires immediate medical attention!';
    }

    return response;
  };

  const processUserInput = async (userMessage: string) => {
    addMessage({ type: 'user', content: userMessage });
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    // Emergency keywords check
    if (lowerMessage.includes('emergency') || 
        lowerMessage.includes('chest pain') || 
        lowerMessage.includes('heart attack')) {
      response = EMERGENCY_MESSAGE;
    }
    // Navigation assistance
    else if (lowerMessage.includes('prediction') || lowerMessage.includes('check')) {
      response = NAVIGATION_GUIDE.prediction.description;
      navigateToPage(NAVIGATION_GUIDE.prediction.path);
    }
    else if (lowerMessage.includes('doctor') || lowerMessage.includes('consultation')) {
      response = NAVIGATION_GUIDE.doctors.description;
      navigateToPage(NAVIGATION_GUIDE.doctors.path);
    }
    else if (lowerMessage.includes('exercise')) {
      response = NAVIGATION_GUIDE.exercise.description;
      navigateToPage(NAVIGATION_GUIDE.exercise.path);
    }
    else if (lowerMessage.includes('remedies') || lowerMessage.includes('treatment')) {
      response = NAVIGATION_GUIDE.remedies.description;
      navigateToPage(NAVIGATION_GUIDE.remedies.path);
    }
    // Health parameters
    else if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
      response = BP_CATEGORIES;
    }
    else if (lowerMessage.includes('cholesterol')) {
      response = `Cholesterol Guidelines:\n
• Total Cholesterol: Less than 200 mg/dL
• HDL (Good) Cholesterol: Higher than 40 mg/dL
• LDL (Bad) Cholesterol: Less than 100 mg/dL
• Triglycerides: Less than 150 mg/dL

High cholesterol is a major risk factor for heart disease. Regular monitoring and maintaining healthy levels through diet and exercise is crucial.`;
    }
    // Heart disease information
    else if (lowerMessage.includes('coronary')) {
      response = getHeartDiseaseInfo('coronary artery disease') || '';
    }
    else if (lowerMessage.includes('arrhythmia')) {
      response = getHeartDiseaseInfo('arrhythmia') || '';
    }
    // Form guidance
    else if (lowerMessage.includes('form') || lowerMessage.includes('input')) {
      response = `To help you fill out the health check form:\n
• Blood Pressure: Enter your latest BP reading (e.g., 120/80)
• Cholesterol: Enter your total cholesterol in mg/dL
• BMI: Will be calculated automatically from height and weight
• Family History: Include immediate family members only
• Smoking/Alcohol: Be honest - this affects risk assessment

Need help with specific fields? Just ask!`;
    }
    // General help
    else if (lowerMessage.includes('help')) {
      response = `I can assist you with:\n
1. Understanding Heart Conditions
2. Interpreting Health Parameters
3. Navigation Around Website
4. Emergency Information
5. Form Filling Guidance
6. Finding Medical Help

What would you like to know more about?`;
    }
    else {
      response = "I'm here to help! Could you please specify what you'd like to know about? You can ask about:\n- Heart diseases\n- Health parameters\n- Website navigation\n- Emergency assistance";
    }

    addMessage({ type: 'bot', content: response });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    processUserInput(input);
    setInput('');
  };

  const ConsentDialog = () => (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Privacy Notice</h3>
      <p className="text-gray-600 mb-4">
        This chat service collects and processes health-related information to provide personalized assistance. Your data is encrypted and handled according to healthcare privacy standards.
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => handleConsent(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Decline
        </button>
        <button
          onClick={() => handleConsent(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50"
          >
            <div className="p-4 border-b bg-red-500 text-white rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <span className="font-semibold">Beat-Well Assistant</span>
              </div>
              <button onClick={toggleChat}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {showConsentDialog ? (
                <ConsentDialog />
              ) : (
                messages.map((message: Message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {!showConsentDialog && (
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;