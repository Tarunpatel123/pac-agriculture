import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_URL || '';

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
            if (res.data.success) {
                Swal.fire('Success', 'OTP sent to your email', 'success');
                setStep(2);
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to send OTP', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email, otp });
            if (res.data.success) {
                setStep(3);
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Invalid OTP', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, { email, otp, newPassword });
            if (res.data.success) {
                await Swal.fire('Success', 'Password reset successfully! You can now login.', 'success');
                navigate('/login');
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to reset password', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0f0d]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-[#0a0f0d] to-emerald-950"></div>
            <div className="max-w-md w-full mx-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-white">Reset Password</h2>
                        <p className="text-green-300/80 mt-2">
                            {step === 1 ? 'Enter your email to receive OTP' : 
                             step === 2 ? 'Enter the 6-digit OTP sent to your email' : 
                             'Create a new strong password'}
                        </p>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2">Enter OTP</label>
                                <input
                                    type="text"
                                    required
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white text-center text-2xl tracking-widest placeholder-white/30 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="000000"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                            <button type="button" onClick={() => setStep(1)} className="w-full text-green-400 text-sm font-bold hover:underline">
                                Back to Email
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="group">
                                <label className="block text-sm font-bold text-green-300 mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength="6"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder-white/30 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <Link to="/login" className="text-white/60 font-medium hover:text-green-400 transition-colors">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
