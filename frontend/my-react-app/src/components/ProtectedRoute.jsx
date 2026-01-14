import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const location = useLocation();
    const token = localStorage.getItem('pac_token');
    let user = null;

    try {
        const userStr = localStorage.getItem('pac_user');
        if (userStr && userStr !== 'undefined') {
            user = JSON.parse(userStr);
        }
    } catch (err) {
        console.error('Error parsing user data in ProtectedRoute:', err);
        localStorage.removeItem('pac_user');
        localStorage.removeItem('pac_token');
    }

    if (!token) {
        // Redirect to login but save the current location to redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && user?.role !== 'admin') {
        // If it's an admin route but user is not admin, redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
