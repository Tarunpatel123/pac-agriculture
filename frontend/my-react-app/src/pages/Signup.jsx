import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        location: null
    });
    const [loading, setLoading] = useState(false);
    const [locLoading, setLocLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            Swal.fire('Error', 'Geolocation is not supported by your browser', 'error');
            return;
        }

        setLocLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPos.lat}&lon=${newPos.lng}`);
                    const data = await response.json();
                    const addr = data.display_name || 'Unknown Location';
                    setFormData(prev => ({ ...prev, location: { ...newPos, address: addr } }));
                    Swal.fire({
                        title: 'Location Set!',
                        text: 'Your current location has been captured successfully.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.error("Geocoding error", error);
                    setFormData(prev => ({ ...prev, location: { ...newPos, address: 'Custom Location' } }));
                } finally {
                    setLocLoading(false);
                }
            },
            (error) => {
                setLocLoading(false);
                let msg = 'Could not get your location';
                if (error.code === 1) msg = 'Please allow location access in your browser';
                Swal.fire('Error', msg, 'error');
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.location) {
            Swal.fire('Error', 'Please set your current location', 'error');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
            if (res.status === 201) {
                Swal.fire({
                    title: 'Signup Successful!',
                    text: 'You can now login with your credentials.',
                    icon: 'success',
                    confirmButtonColor: '#16a34a'
                });
                navigate('/login');
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Signup failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0f0d] py-12 px-4">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-[#0a0f0d] to-emerald-950"></div>
            
            {/* Mesh Gradient Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            <div className="max-w-2xl w-full relative z-10">
                <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-white tracking-tight">Create Account</h2>
                        <p className="text-green-300/80 mt-2 font-medium">Join PAC and start your journey</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    required
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    placeholder="9876543210"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Current Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    readOnly
                                    required
                                    value={formData.location ? formData.location.address : ''}
                                    placeholder="Click to set current location"
                                    onClick={handleGetLocation}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all cursor-pointer pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={locLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-500/20 hover:bg-green-500/40 rounded-lg text-green-400 transition-all disabled:opacity-50"
                                >
                                    {locLoading ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {!formData.location && !locLoading && (
                                <p className="text-xs text-red-500/80 mt-2 ml-1">* Click to set your automatic location</p>
                            )}
                        </div>
                        
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || locLoading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up Now'}
                            </button>
                            
                            <div className="mt-6 flex flex-col gap-3 text-center">
                                <p className="text-white/60 font-medium">
                                    Already have an account? 
                                    <Link to="/login" className="text-green-400 font-bold ml-2 hover:text-green-300 transition-colors">Login</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
