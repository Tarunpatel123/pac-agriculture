import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { showCelebration } from '../utils/confetti';

const Enroll = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const ig = params.get('ig') || params.get('instagram');
    return {
      fullName: '',
      mobileNumber: '',
      email: '',
      currentClass: '',
      interested_Course: '',
      instagramId: ig || ''
    };
  });

  const [status, setStatus] = useState('');
  const [distance, setDistance] = useState(null);

  // Calculate distance on load
  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || '';
        // We use the visit tracking logic to get distance
        const res = await fetch(`${API_BASE_URL}/api/track-visit`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ pagePath: '/enroll' })
         });
         const data = await res.json();
         if (data.success && data.distance !== 'N/A') {
           setDistance(data.distance);
         }
       } catch (error) {
         console.log("Distance fetch error", error);
       }
     };
    fetchDistance();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showCelebration(
          'Enrollment Successful! 🎓',
          'आपका पंजीकरण सफल रहा। PAC Barwaha में आपका स्वागत है!'
        );
        setStatus('success');
        setFormData({ fullName: '', mobileNumber: '', email: '', currentClass: '', interested_Course: '', instagramId: '' });
        
        // Redirect to Home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', response.status, errorData);
        Swal.fire({
          title: 'Error!',
          text: 'कुछ गलत हो गया। कृपया फिर से प्रयास करें।',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
        setStatus('error');
      }
    } catch (error) {
      console.error('Network/Connection Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'सर्वर से संपर्क नहीं हो पाया।',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
      setStatus('error');
    }
  };

  const handleInstaLogin = () => {
    const APP_ID = 'YOUR_INSTAGRAM_APP_ID'; // Replace after getting from Meta
    const REDIRECT_URI = window.location.origin + '/enroll';
    const url = `https://api.instagram.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    
    // For now, let's show a simulated effect
    if (APP_ID === 'YOUR_INSTAGRAM_APP_ID') {
      alert("कृपया पहले Meta App ID और Secret प्राप्त करें, फिर यह बटन काम करेगा।");
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-900/10 overflow-hidden md:max-w-2xl border border-white/20 relative z-10"
      >
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 py-8 md:py-12 px-6 md:px-10 relative">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-black text-white text-center"
          >
            Enroll Now
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-green-50 text-center mt-3 text-sm md:text-lg font-medium opacity-90"
          >
            Join PAC Barwaha for a bright future in Agriculture & Science
          </motion.p>
          
          {distance && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', damping: 15 }}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 font-bold"
            >
              <span className="animate-pulse">📍</span> ~{distance} away
            </motion.div>
          )}
        </div>
        
        <div className="p-6 md:p-10">
          {status === 'success' ? (
            <div className="text-center py-12 md:py-16">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
              >
                <svg className="w-10 h-10 md:w-12 md:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">Registration Successful!</h3>
              <p className="text-gray-600 text-base md:text-lg font-medium">Thank you for enrolling. We will contact you shortly.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatus('')}
                className="mt-8 md:mt-10 px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-900/20 text-sm md:text-base"
              >
                Back to Form
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base md:text-lg font-medium"
                  placeholder="e.g. Rahul Sharma"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base md:text-lg font-medium"
                    placeholder="10-digit mobile number"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base md:text-lg font-medium"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Current Class</label>
                  <div className="relative">
                    <select
                      name="currentClass"
                      required
                      value={formData.currentClass}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base md:text-lg font-medium appearance-none"
                    >
                      <option value="">Select Class</option>
                      <option value="10th">10th Standard</option>
                      <option value="11th">11th Standard</option>
                      <option value="12th">12th Standard</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Interested Course</label>
                  <div className="relative">
                    <select
                      name="interested_Course"
                      required
                      value={formData.interested_Course}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base md:text-lg font-medium appearance-none"
                    >
                      <option value="">Select Course</option>
                      <option value="11th Agriculture">11th Agriculture</option>
                      <option value="12th Agriculture">12th Agriculture</option>
                      <option value="Both">Both (Full Foundation)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Instagram ID (Optional)</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                    <input
                      type="text"
                      name="instagramId"
                      value={formData.instagramId}
                      onChange={handleChange}
                      className="w-full pl-9 pr-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base md:text-lg font-medium"
                      placeholder="username"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleInstaLogin}
                    className="px-5 py-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-xl hover:opacity-90 transition-all flex items-center justify-center shadow-lg shadow-purple-900/10"
                    title="Login with Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.376.896.419.419.679.818.896 1.376.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.376-.419.419-.818.679-1.376.896-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.376-.896-.419-.419-.679-.818-.896-1.376-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.376.419-.419.818-.679 1.376-.896.422-.163 1.057-.358 2.227-.412 1.266-.058 1.688-.072 4.947-.072z"/>
                      <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-5 rounded-2xl text-white font-black text-xl shadow-xl shadow-green-900/20 transition-all ${
                  status === 'sending' ? 'bg-gray-400' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                }`}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Registering...
                  </span>
                ) : 'Complete Enrollment'}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Enroll;
