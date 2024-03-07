import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from './Navigation';
import '../style/Checkout.css';

function Checkout() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', { name, email, address, city, postalCode });
    };


  return (
    <div>
        <Navigation />
        <div className="checkout-container">
                <h1>Checkout</h1>
                <form className="checkout-form">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" />

                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" />

                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" />

                    <label htmlFor="zip">ZIP Code:</label>
                    <input type="text" id="zip" name="zip" />

                    <button type="submit">Place Order</button>
                </form>
            </div>
    </div>
  );
}

export default Checkout;