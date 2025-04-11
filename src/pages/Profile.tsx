import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User, Phone, MapPin, Calendar, Save, AlertCircle, Pencil
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </button>
          )}
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 flex items-center space-x-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <AlertCircle className="h-5 w-5" />
            <span>{message.text}</span>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField icon={<User className="h-5 w-5 text-gray-400" />} label="Full Name" name="fullName" value={profile.fullName} onChange={handleChange} placeholder="John Doe" />
              <InputField icon={<Phone className="h-5 w-5 text-gray-400" />} label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} placeholder="+91 9876543210" />
              <InputField icon={<Calendar className="h-5 w-5 text-gray-400" />} label="Date of Birth" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} />
              <InputField icon={<MapPin className="h-5 w-5 text-gray-400" />} label="Address" name="address" value={profile.address} onChange={handleChange} placeholder="123 Main Street, City" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
              <textarea
                name="medicalHistory"
                value={profile.medicalHistory}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Any known conditions or medications..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-gray-800">
            <DisplayField label="Full Name" value={profile.fullName} />
            <DisplayField label="Phone Number" value={profile.phone} />
            <DisplayField label="Date of Birth" value={profile.dateOfBirth} />
            <DisplayField label="Address" value={profile.address} />
            <DisplayField label="Medical History" value={profile.medicalHistory} multiline />
          </div>
        )}
      </div>
    </div>
  );
}

const InputField = ({ icon, label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
      <input
        {...props}
        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
  </div>
);

const DisplayField = ({ label, value, multiline = false }: { label: string, value: string, multiline?: boolean }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
    {multiline ? (
      <p className="whitespace-pre-line bg-gray-100 p-3 rounded-lg">{value || '-'}</p>
    ) : (
      <p className="bg-gray-100 p-3 rounded-lg">{value || '-'}</p>
    )}
  </div>
);
