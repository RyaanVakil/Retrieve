import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import img from '../../media/Personal.svg';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make an API call to update the user's profile
      const response = await axios.put('YOUR_BACKEND_ENDPOINT_HERE', { fullName, rollNumber });
      
      // Handle successful response
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
    <Navbar />
    <div className='container contain'>
        <h2>User Profile</h2>
      <div className="image-container">
        <img src={img} alt="Profile" className="profile-image" />
      </div>
      <div className="form-container">
        
        <p>Username: { /* Add username here */ }</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input 
            type="text" 
            id="fullName" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
          />
          <label htmlFor="rollNumber">Roll Number:</label>
          <input 
            type="text" 
            id="rollNumber" 
            value={rollNumber} 
            onChange={(e) => setRollNumber(e.target.value)} 
            required 
          />
          <button type="submit" className='btn'>Save</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Profile;
