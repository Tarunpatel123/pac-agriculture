import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Enroll = () => {
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
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
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
        Swal.fire({
          title: 'Success!',
          text: 'आपका पंजीकरण सफल रहा। हम आपसे जल्द ही संपर्क करेंगे।',
          icon: 'success',
          confirmButtonColor: '#16a34a',
          confirmButtonText: 'OK'
        });
        setStatus('success');
        setFormData({ fullName: '', mobileNumber: '', email: '', currentClass: '', interested_Course: '', instagramId: '' });
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:max-w-2xl">
        <div className="bg-green-600 py-6 px-8 relative">
          <h2 className="text-3xl font-bold text-white text-center">Enroll Now</h2>
          <p className="text-green-100 text-center mt-2">Join PAC Barwaha for a bright future in Agriculture & Science</p>
          
          {distance && (
            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full border border-white/30 flex items-center gap-1">
              📍 You are ~{distance} away from us
            </div>
          )}
        </div>
        
        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600">Thank you for enrolling. We will contact you shortly.</p>
              <button 
                onClick={() => setStatus('')}
                className="mt-8 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Back to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="10 digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Class</label>
                  <select
                    name="currentClass"
                    required
                    value={formData.currentClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select Class</option>
                    <option value="11th">11th Standard</option>
                    <option value="12th">12th Standard</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interested Course</label>
                  <select
                    name="interested_Course"
                    required
                    value={formData.interested_Course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select Course</option>
                    <option value="Science">Science (PCB/PCM)</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram ID (Optional)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="instagramId"
                    value={formData.instagramId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition pl-10"
                    placeholder="@username"
                  />
                  <span className="absolute left-3 top-3.5 text-pink-500">📸</span>
                  <button
                    type="button"
                    onClick={handleInstaLogin}
                    className="absolute right-2 top-2 px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded hover:opacity-90 transition shadow-sm"
                  >
                    Verify with Insta
                  </button>
                </div>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-lg text-white font-bold text-lg transition shadow-lg ${
                  status === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {status === 'sending' ? 'Sending Details...' : 'Submit Enrollment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
