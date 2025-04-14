import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  User, 
  LogOut, 
  Home, 
  Info, 
  Activity, 
  Pill,
  MapPin,
  Dumbbell,
  BookOpen,
  HeartPulse
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <motion.nav 
      className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl border-b border-slate-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-10 w-10 text-red-500 animate-pulse" />
                <HeartPulse className="h-10 w-10 text-red-400 absolute top-0 left-0 animate-ping opacity-75" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  BEAT-WELL
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wider">HEART HEALTH MONITOR</span>
              </div>
            </Link>
          </motion.div>
          
          <div className="hidden lg:flex space-x-1">
            <motion.div className="flex rounded-lg bg-slate-800/50 p-1">
              {[
                { to: "/", icon: Home, label: "Home" },
                { to: "/prediction", icon: Activity, label: "Health Check" },
                { to: "/remedies", icon: Pill, label: "Remedies" },
                { to: "/exercise", icon: Dumbbell, label: "Exercise" },
                { to: "/info", icon: BookOpen, label: "Heart Info" },
                { to: "/consultation", icon: MapPin, label: "Find Doctors" },
                { to: "/about", icon: Info, label: "About" }
              ].map((item) => (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={item.to} 
                    className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700 flex items-center space-x-2 transition-all duration-200"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white bg-slate-700/50 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/20"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}