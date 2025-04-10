import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Prediction from './pages/Prediction';
import Remedies from './pages/Remedies';
import Exercise from './pages/Exercise';
import Consultation from './pages/Consultation';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DiseaseInfo from './pages/DiseaseInfo';
import ChatBot from './components/ChatBot';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/remedies" element={<Remedies />} />
              <Route path="/exercise" element={<Exercise />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/disease/:id" element={<DiseaseInfo />} />
            </Routes>
          </main>
          <ChatBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;