import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        userName: username,
        password
      });
      console.log(response.data);
      window.location.href = '/signin'; // Redirect to signin page after successful registration
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to create an account');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className='signup_heading'><h2>Create an Account</h2></div>
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Signup;
