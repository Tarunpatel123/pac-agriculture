import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';
import { showCelebration } from '../utils/confetti';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);

      if (response.status === 201) {
        showCelebration(
          'Message Received! ✉️',
          'हमने आपका संदेश प्राप्त कर लिया है। हम जल्द ही आपसे संपर्क करेंगे!'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Redirect to Home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      Swal.fire({
        title: 'Error!',
        text: 'संदेश भेजने में विफल। कृपया बाद में प्रयास करें।',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-green-900 mb-12"
      >
        Contact Us
      </motion.h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <label className="block text-gray-700 mb-1 font-medium">Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                placeholder="Your Name" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <label className="block text-gray-700 mb-1 font-medium">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                placeholder="Your Email" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <label className="block text-gray-700 mb-1 font-medium">Subject</label>
              <input 
                type="text" 
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                placeholder="Message Subject" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <label className="block text-gray-700 mb-1 font-medium">Message</label>
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-32 transition" 
                placeholder="How can we help you?"
              ></textarea>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3 rounded-lg transition shadow-md ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
        <div className="flex flex-col justify-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600"
          >
            <h3 className="text-xl font-bold text-green-900 mb-2">Visit Us</h3>
            <p className="text-gray-700">Main Road, Near Bus Stand,<br />Barwaha, Madhya Pradesh</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">Call Us</h3>
            <p className="text-gray-700 font-semibold">+91 7697783189</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600"
          >
            <h3 className="text-xl font-bold text-purple-900 mb-2">Email Us</h3>
            <p className="text-gray-700 font-semibold">yogeshpatel.at@gmail.com</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
