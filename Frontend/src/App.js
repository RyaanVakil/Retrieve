import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home/Home';
import Contact from './routes/Contact/Contact';
import About from './routes/About/About';
import Signin from './routes/Signin/Signin';
import Signup from './routes/Signup/Signup';
import Landing from './routes/landing/Landing';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const isAuthenticated = !!token;

  // Show a loading screen until the token has been checked
  if (loading) {
    return <div>Loading Application...</div>;
  }

  return (
    <div>
      <Routes>
        {/* MODIFIED: Public routes now redirect if the user is already logged in */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Landing />} 
        />
        <Route 
          path="/signin" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Signin setToken={setToken} />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Signup />} 
        />
        
        {/* Your other public routes can remain as they are */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;