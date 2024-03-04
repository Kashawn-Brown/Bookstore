import { Link } from 'react-router-dom';
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
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/books" className="nav-link">Books</Link></li>
            <li><Link to="/cart" className="nav-link">Cart</Link></li>
            <li><Link to="/checkout" className="nav-link">Checkout</Link></li>
            <li><Link to="/orders" className="nav-link">Orders</Link></li>
        </ul>
          {/* <LoginButton /> */}
        {isLoggedIn ? 
        (
            <div className="logout-button">
            <Link to="/login"> <button onClick={handleLogout}>Logout</button> </Link>
            </div>
        ) : (
            <LoginButton />
        )}
    </nav>
  );
}

export default Navigation;