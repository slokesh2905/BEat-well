import React from 'react';
import { Heart, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="bg-slate-800 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-xl font-bold text-white">BEAT-WELL</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Your partner in heart health monitoring and disease prevention.
            </p>
            <div className="mt-4 flex space-x-4">
              <motion.a
                href="https://github.com/slokesh2905"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/lokesh-sharma-4a16ba206/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/prediction", label: "Health Check" },
                { to: "/remedies", label: "Remedies" },
                { to: "/exercise", label: "Exercise" },
                { to: "/consultation", label: "Find Doctors" }
              ].map((link) => (
                <motion.li
                  key={link.to}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-sm text-gray-300">
              Have questions or feedback? Contact our team at{' '}
              <a 
                href="mailto:support@beatwell.com" 
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                support@beatwell.com
              </a>
            </p>
          </div>
        </div>
        
        <motion.div 
          className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BEAT-WELL. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 