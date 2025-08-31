import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../media/retrieve_logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  console.log('Rendering Navbar component...');
  const [clicked, setClicked] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false); // Add state for submenu visibility
  const isAuthenticated = localStorage.getItem('token'); 

  const handleClick = () => {
    setClicked(!clicked);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  
  return (
    <nav>
      <div className="nav-container">
        <Link to='/'>
          <img src={logo} alt="" className='logo'/>
        </Link>
        <div className='menu-icons' onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={clicked ? 'nav active' : 'nav'}>
          <li><Link to={isAuthenticated ? '/home' : '/'}>Home</Link></li>
          <li><Link to='/about'>About Us</Link></li> 
          <li><Link to='/contact'>Contact Us</Link></li> 
          {!isAuthenticated ? (
            <>
              <li><Link to='/signin'>Sign In</Link></li>
              <li><Link to='/signup'><button className='btn'>Create an Account!</button></Link></li>
            </>
          ) : (
            <li>
              <Link to="#" className='user-pic' onClick={toggleSubMenu}>
                <i className='fas fa-user-circle'></i>
              </Link>
            </li>
          )}
        </ul>
        
        {isAuthenticated && showSubMenu && (
          <div className={`sub-menu-wrap ${showSubMenu ? 'show' : ''}`} id="subMenu">
            <div className="sub-menu">
              <div className="user-info">
                <i className='fas fa-user-circle'></i>
                <h3>name</h3>
              </div>
              <hr></hr>
              <Link to="/profile" className='sub-menu-link'>
                <p>Profile</p>
              </Link>
              <Link to="#" className='sub-menu-link'>
                <p>Settings</p>
              </Link>
              <Link to="#" className='sub-menu-link' onClick={() => {
                localStorage.removeItem('token'); 
                window.location.href = '/';
              }}>
                <p>Logout</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
