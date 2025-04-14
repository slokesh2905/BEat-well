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
  BookOpen
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
      className="bg-slate-800 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">Beat-Well</span>
            </Link>
          </motion.div>
          
          <div className="flex space-x-4">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/about", icon: Info, label: "About" },
              { to: "/info", icon: BookOpen, label: "Heart Info" },
              { to: "/prediction", icon: Activity, label: "Health Check" },
              { to: "/remedies", icon: Pill, label: "Remedies" },
              { to: "/exercise", icon: Dumbbell, label: "Exercise" },
              { to: "/consultation", icon: MapPin, label: "Find Doctors" }
            ].map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  to={item.to} 
                  className="text-gray-300 hover:text-red-500 flex items-center space-x-1"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ y: -2 }}>
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-red-500">
                    <User className="h-6 w-6" />
                    <span>Profile</span>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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