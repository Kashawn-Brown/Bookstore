import { NavLink, Link } from 'react-router-dom'; //can use NavLink instead of Link
import React, { useState, useEffect } from 'react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import '../style/Nav.css';

function Navigation() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) 
        {
          //Manual decode
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const decodedToken = JSON.parse(atob(base64));
          const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
          if (decodedToken.exp < currentTime) 
          {
            // Token has expired
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
          }
          else
          {
             setIsLoggedIn(true);
          }
          
        } 
        else 
        {
          setIsLoggedIn(false);
        }
      }, []);
  
     const handleLogout = () => {
      console.log("hi")
      // Clear the JWT token from local storage
      localStorage.removeItem('jwtToken');
      setIsLoggedIn(false);
    };


  return (
    <nav className="navbar">
        <ul className="nav-links">
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/books" className="nav-link">Books</NavLink></li>
            <li><NavLink to="/cart" className="nav-link">Cart</NavLink></li>
            <li><NavLink to="/checkout" className="nav-link">Checkout</NavLink></li>
            <li><NavLink to="/orders" className="nav-link">Orders</NavLink></li>
        </ul>
          {/* <LoginButton /> */}
        {isLoggedIn ? 
        (
          <LogoutButton onClick={handleLogout} />
        ) : (
            <LoginButton />
        )}
    </nav>
  );
}

export default Navigation;