import React from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../../components/Navbar/Navbar';
import './Landing.css';
import img from '../../media/Uploading.svg';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='content'>
          <div className='text'>
            <p>Looking for an effortless and secure way to shuttle your files and codes across your devices? Tired of resorting to the old email-yourself routine with Gmail? </p>
            <p>Well, say hello to Retrieve – your digital teleporter for all things code and data!

            With Retrieve, you can seamlessly stash and retrieve your files from any of your electronic gizmos in a snap, no Gmail account needed!

            No more juggling emails or USB sticks like a digital acrobat. With Retrieve, you're the master of your data universe. So why wait? Dive into the world of hassle-free file sharing – sign up and start beaming your bits today! 🚀</p>
            
            <div className="button-container">
              <Link to='/signup'>
                <button className='btn'>Try Retrieve</button>
              </Link>
            </div>
          </div>
          <div className='image'>
            <img src={img} alt='Uploading' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
