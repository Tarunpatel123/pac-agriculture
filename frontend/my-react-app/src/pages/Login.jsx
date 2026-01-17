import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { showCelebration } from '../utils/confetti';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const API_BASE_URL = import.meta.env.VITE_API_URL || '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
            if (res.status === 200) {
                localStorage.setItem('pac_token', res.data.token);
                localStorage.setItem('pac_user', JSON.stringify(res.data.user));
                
                onLogin(res.data.user);
                
                showCelebration(
                    `Welcome Back, ${res.data.user.fullName.split(' ')[0]}! ✨`,
                    'Glad to see you again. Ready for some learning?'
                );

                if (res.data.user.role === 'admin') {
                    navigate(from === '/' ? '/admin-pac-portal' : from, { replace: true });
                } else {
                    navigate(from, { replace: true });
                }
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0f0d]">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-[#0a0f0d] to-emerald-950"></div>
            
            {/* Mesh Gradient Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            {/* Floating Shapes for extra "maza" */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="max-w-md w-full mx-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
                    <div className="text-center mb-10">
                        <div className="inline-block p-4 rounded-2xl bg-green-500/20 mb-4 border border-green-400/30">
                            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight">Welcome Back</h2>
                        <p className="text-green-300/80 mt-2 font-medium">Login to your PAC account</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300/50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all hover:bg-white/10"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-green-300 mb-2 ml-1 transition-colors group-focus-within:text-white">Password</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300/50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all hover:bg-white/10"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link to="/forgot-password" size="sm" className="text-sm font-bold text-green-400 hover:text-green-300 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : 'Login Now'}
                        </button>

                        <div className="pt-6 border-t border-white/10 flex flex-col gap-4 text-center">
                            <p className="text-white/60 font-medium">
                                Don't have an account? 
                                <Link to="/signup" className="text-green-400 font-bold ml-2 hover:text-green-300 transition-colors">Create Account</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
