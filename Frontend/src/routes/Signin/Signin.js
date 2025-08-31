import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import img from '../../media/Secure_login.svg';
import axios from 'axios';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';

// MODIFIED: Receive the setToken function as a prop
const Signin = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, formData);
        
        const accessToken = response.data.data.accessToken;

        if (accessToken) {
            // Save the token to localStorage as before
            localStorage.setItem('token', accessToken);
           
            setToken(accessToken);
            // Navigation will now work correctly
            navigate('/home');
        } else {
            setError("Login successful, but no token was received.");
        }

    } catch (error) {
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-image-container">
          <img src={img} alt="Sign In" className="signin-image" />
        </div>
        <div className="signin-form-container">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {/* ...your form JSX remains the same... */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="userName"
                className="form-control"
                placeholder="Enter your username"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn">
              Sign In
            </button>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;