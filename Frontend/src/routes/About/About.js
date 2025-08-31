import React from 'react';
import './About.css';
import img1 from '../../media/Teleportation.svg';
import img2 from '../../media/Files_sent.svg';
import Navbar from '../../components/Navbar/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <h1 className="welcome-heading">Welcome to Retrieve!</h1>
      <div className="container">
        <div className="content">
          <div className="image1">
            <img src={img1} alt="outer space" className="about-image" />
          </div>
          <div className="text1">
            <p>Your ultimate digital vault for safeguarding all your mission-critical documents and code snippets, engineered with love for the tech-savvy student community!</p>
            <p>Ever wished for a smoother way to shuttle your files between devices without resorting to the ancient ritual of emailing yourself? Well, say hello to Retrieve! No more precarious logins on sketchy public computers, risking exposure of your Gmail fortress to wandering eyes.</p>
            <p>With Retrieve, it's like having a high-tech teleportation device for your data – securely zapping it from college computers straight to the cozy confines of your personal device, all with just a few clicks.</p>
          </div>
        </div>
        <div className="content">
          <div className="text2">
            <p>Here's the kicker: no convoluted login processes here. Just punch in your digits, set up your secret code, and voilà! Retrieve conjures up a unique username faster than you can say 'Java.'</p>
            <p>And the fun doesn't stop there! We've embedded self-destruct protocols straight out of a spy movie. Your uploads? They'll vanish into the digital ether after 12 hours, leaving no trace behind. It's like Mission: Impossible, but with your files – gone in a puff of digital smoke!</p>
            <p>So, join the tech revolution with Retrieve – where security meets playfulness, and every upload feels like a victory lap in the digital realm. Let's make file sharing fun again!</p>
          </div>
          <div className="image2">
            <img src={img2} alt="files" className="about-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
