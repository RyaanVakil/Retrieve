import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in (you'll need to implement this based on your auth logic)
  const isAuthenticated = localStorage.getItem('token'); // Or however you store auth state

  if (!isAuthenticated) {
    // Redirect to landing page if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 