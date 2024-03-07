import { NavLink, Link } from 'react-router-dom'; //can use NavLink instead of Link
import React, { useState, useEffect } from 'react';

import LoginButton from './LoginButton';


import '../style/Nav.css';


function Navigation() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, []);
  
     const handleLogout = () => {
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
            <div className="logout-button">
            <NavLink to="/login"> <button onClick={handleLogout}>Logout</button> </NavLink>
            </div>
        ) : (
            <LoginButton />
        )}
    </nav>
  );
}

export default Navigation;