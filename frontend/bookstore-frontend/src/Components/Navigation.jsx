import { Link } from 'react-router-dom';
  import React from 'react';

  
  import '../style/Nav.css';


function Navigation() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/books" className="nav-link">Books</Link></li>
            <li><Link to="/cart" className="nav-link">Cart</Link></li>
            <li><Link to="/checkout" className="nav-link">Checkout</Link></li>
            <li><Link to="/orders" className="nav-link">Orders</Link></li>
          </ul>
    </nav>
  );
}

export default Navigation;