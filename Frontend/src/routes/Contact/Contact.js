import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-text">
          <h2 className='contact_heading'>Contact Us</h2>
          <p>Got questions or mind-blowing ideas? Blast them our way!</p>
          <p>Whether you're pondering the mysteries of the digital cosmos or just want to chat about food, we're all ears! (no jk, dont message us about food at least)</p>
          <p>Simply fire up the form below, send your thoughts hurtling through cyberspace, and we'll have our team of digital wizards conjure up a response faster than you can say "Pizza"!</p>
          <p>Ready to make contact? Fill out the form and prepare for lift-off!</p>
        </div>
        <div className="contact-form">
          <form>
            <div className="form-group">
              <div className="name-fields">
                <label htmlFor="inputFirstName">First Name</label>
                <input type="text" className="form-control" id="inputFirstName" placeholder='Humpty' />
              </div>
              <div className="name-fields">
                <label htmlFor="inputLastName">Last Name</label>
                <input type="text" className="form-control" id="inputLastName" placeholder='Dumpty' />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="inputMessage">Message</label>
              <textarea className="form-control" id="inputMessage" rows="5" placeholder='Your enquiry'></textarea>
            </div>
            <div className='form-button'>
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
