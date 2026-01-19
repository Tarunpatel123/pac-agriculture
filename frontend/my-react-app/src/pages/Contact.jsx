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

      if (response.status === 201 || response.status === 200) {
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
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'संदेश भेजने में विफल। कृपया बाद में प्रयास करें।';
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-[#0a0f0d] py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-emerald-900/30"></div>
        <div className="container mx-auto text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Get in Touch</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Have questions? We're here to help you start your journey towards success.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-8 md:space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Let's Talk <br/><span className="text-green-600">About Your Future</span></h2>
              <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                Whether you're looking for information about our courses, fees, or admission process, our team is ready to assist you.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { 
                  title: 'Visit Us', 
                  content: 'Main Road, Near Bus Stand, Barwaha, Madhya Pradesh',
                  icon: '📍',
                  color: 'bg-green-50 text-green-600'
                },
                { 
                  title: 'Call Us', 
                  content: '+91 7697783189',
                  icon: '📞',
                  color: 'bg-blue-50 text-blue-600'
                },
                { 
                  title: 'Email Us', 
                  content: 'yogeshpatel.at@gmail.com',
                  icon: '✉️',
                  color: 'bg-purple-50 text-purple-600'
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-6 group"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.color} flex items-center justify-center text-2xl md:text-3xl shadow-sm group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-black text-lg md:text-xl mb-1">{item.title}</h3>
                    <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl shadow-green-900/10 border border-gray-100 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[2.6rem] md:rounded-[4.1rem] opacity-0 group-hover:opacity-10 transition-opacity blur"></div>
              <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 font-black text-sm uppercase tracking-widest ml-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 md:p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition font-medium" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-700 font-black text-sm uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 md:p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition font-medium" 
                      placeholder="Your Email" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-black text-sm uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 md:p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition font-medium" 
                    placeholder="Message Subject" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-black text-sm uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 md:p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none h-40 transition font-medium resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-green-900/20 text-white ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

};

export default Contact;
