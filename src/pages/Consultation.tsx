import React, { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Doctor {
  name: string;
  specialty: string;
  location: string;
  phone: string;
  email: string;
  image: string;
  distance: string;
  city: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Consultation() {
  const [location, setLocation] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  
  const doctors: Doctor[] = [
    {
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      location: "Apollo Hospital, Bandra West",
      phone: "+91 98765 43210",
      email: "priya.sharma@apollo.com",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
      distance: "2.5 km",
      city: "Mumbai"
    },
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiac Surgeon",
      location: "Max Healthcare, Saket",
      phone: "+91 98765 43211",
      email: "rajesh.kumar@max.com",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
      distance: "3.1 km",
      city: "Delhi"
    },
    {
      name: "Dr. Anjali Desai",
      specialty: "Cardiologist",
      location: "Fortis Hospital, Bannerghatta Road",
      phone: "+91 98765 43212",
      email: "anjali.desai@fortis.com",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      distance: "1.8 km",
      city: "Bangalore"
    },
    {
      name: "Dr. Suresh Reddy",
      specialty: "Interventional Cardiologist",
      location: "Care Hospitals, Banjara Hills",
      phone: "+91 98765 43213",
      email: "suresh.reddy@care.com",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      distance: "4.2 km",
      city: "Hyderabad"
    },
    {
      name: "Dr. Meera Patel",
      specialty: "Cardiac Surgeon",
      location: "Kokilaben Hospital, Andheri West",
      phone: "+91 98765 43214",
      email: "meera.patel@kokilaben.com",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
      distance: "3.5 km",
      city: "Mumbai"
    }
  ];

  const filteredDoctors = selectedCity === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.city === selectedCity);

  const cities = ['all', ...new Set(doctors.map(doctor => doctor.city))];

  return (
    <div className="space-y-8">
      <motion.section 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">Find Nearby Doctors</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with experienced cardiologists in your area
        </p>
      </motion.section>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-8">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          >
            {cities.map(city => (
              <option key={city} value={city}>
                {city === 'all' ? 'All Cities' : city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{doctor.location}</span>
                      <span className="ml-2 text-sm text-red-500">({doctor.distance})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${doctor.phone}`} className="hover:text-red-500">{doctor.phone}</a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${doctor.email}`} className="hover:text-red-500">{doctor.email}</a>
                    </div>
                  </div>
                </div>
                <motion.a
                  href="#"
                  className="flex items-center text-red-500 hover:text-red-600"
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(doctor.location)}`, '_blank');
                  }}
                >
                  <ExternalLink className="h-5 w-5 mr-1" />
                  <span>View on Map</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}