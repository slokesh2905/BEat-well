import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User, Phone, MapPin, Calendar, Save, AlertCircle, Pencil,
  Shield, Activity, ClipboardList
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    medicalHistory: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile({
          fullName: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          dateOfBirth: data.date_of_birth || '',
          medicalHistory: data.medical_history || ''
        });
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile({
        full_name: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        date_of_birth: profile.dateOfBirth,
        medical_history: profile.medicalHistory
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const sections = [
    {
      title: "Personal Information",
      icon: <User className="h-6 w-6 text-red-500" />,
      fields: [
        { label: "Full Name", name: "fullName", icon: <User />, placeholder: "John Doe" },
        { label: "Phone Number", name: "phone", icon: <Phone />, placeholder: "+91 9876543210" }
      ]
    },
    {
      title: "Contact Details",
      icon: <MapPin className="h-6 w-6 text-red-500" />,
      fields: [
        { label: "Date of Birth", name: "dateOfBirth", icon: <Calendar />, type: "date" },
        { label: "Address", name: "address", icon: <MapPin />, placeholder: "123 Main Street, City" }
      ]
    }
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-gray-600 bg-white p-8 rounded-lg shadow-md flex flex-col items-center"
        >
          <Shield className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-lg">Please log in to view your profile.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      {/* Header Section */}
      <motion.div 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="h-8 w-8 text-red-500" />
            </motion.div>
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center text-sm px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              <Pencil className="w-4 h-4 mr-2" /> Edit Profile
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg mb-6 flex items-center space-x-2 ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              <AlertCircle className="h-5 w-5" />
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Section */}
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.form
              key="edit-form"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {sections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 pb-2 border-b">
                    {section.icon}
                    <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map(field => (
                      <InputField
                        key={field.name}
                        icon={field.icon}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={profile[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b">
                    <ClipboardList className="h-6 w-6 text-red-500" />
                    <h2 className="text-lg font-semibold text-gray-800">Medical History</h2>
                  </div>
                  <textarea
                    name="medicalHistory"
                    value={profile.medicalHistory}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="Any known conditions or medications..."
                  />
                </div>
              </motion.div>

              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={saving}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center space-x-2 transition-colors duration-200"
                >
                  <Save className="h-5 w-5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </motion.button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              key="display-view"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              {sections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 pb-2 border-b">
                    {section.icon}
                    <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map(field => (
                      <DisplayField
                        key={field.name}
                        label={field.label}
                        value={profile[field.name]}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 pb-2 border-b">
                  <ClipboardList className="h-6 w-6 text-red-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Medical History</h2>
                </div>
                <DisplayField
                  label="Medical History"
                  value={profile.medicalHistory}
                  multiline
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

const InputField = ({ icon, label, ...props }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="transition-all duration-200"
  >
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  </motion.div>
);

const DisplayField = ({ label, value, multiline = false }: { label: string, value: string, multiline?: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="transition-all duration-200"
  >
    <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
    {multiline ? (
      <p className="whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-100">{value || '-'}</p>
    ) : (
      <p className="bg-gray-50 p-4 rounded-lg border border-gray-100">{value || '-'}</p>
    )}
  </motion.div>
);
