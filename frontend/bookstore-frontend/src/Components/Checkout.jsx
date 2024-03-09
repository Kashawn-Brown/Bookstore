import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from './Navigation';
import '../style/Checkout.css';

function Checkout() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [card, setCard] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const jwtToken = localStorage.getItem('jwtToken');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log('Form submitted:', { name, address, city, postalCode });
    // };

    const handleCardChange = (e) => {
      const input = e.target.value.replace(/\D/g, "");
      let formattedInput = "";
      for (let i = 0; i < input.length; i++) {
        if (i % 4 === 0 && i > 0) {
          formattedInput += " "; // Add a space every 4 digits
        }
        formattedInput += input[i];
      }
      setCard(formattedInput);
    };

    const handleExpiryChange = (e) => {
      let input = e.target.value.replace(/\D/g, "");
      if (input.length > 4) 
      {
        input = input.substring(0, 4); // Limit to 4 characters
      }

      let formattedInput = "";
      for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0 && i > 0) 
        {
          formattedInput += "/"; // Add a space every 4 digits
        }
        formattedInput += input[i];
      }
      setExpiry(formattedInput);
    };

    const handleCvvChange = (e) => {
      let input = e.target.value.replace(/\D/g, "");
      if (input.length > 3) 
      {
        input = input.substring(0, 3); // Limit to 4 characters
      }

      setCvv(input);
    };


    const checkout = (orderData, jwtToken) => {
      axios.post('http://localhost:5000/api/orders/place-order', {orderData},{
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': jwtToken // Include your JWT token here
            }
      })
      .then(response => {
          console.log('Order placed', response.data);
          // Optionally, you can update your UI to reflect that the book was added to the cart
        })
      .catch(error => {
          console.error('There was a problem placing the order:', error);
        });
      
  };

  const handleCheckout = () => {
    const orderData = {
      cardInfo: {
        cardNumber: card,
        expiry: expiry,
        CVV: cvv
      },
      address: {
        address: address,
        city: city,
        province: province,
        postalCode: postalCode
      }
    };
    checkout(orderData, jwtToken);
  };


  return (
    <div>
      <Navigation />
      <div className="checkout">
        <div className="checkout-container">
          <h1>Checkout</h1>
          <div className="checkout-section">
            <h2>Shipping Address</h2>
            <div className="checkout-section-content">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
              
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" required />
              
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" required />
              
              <label htmlFor="province">Province</label>
              <input type="text" id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="Enter your province" required />

              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter your ZIP code" required />
              
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment Information</h2>
            <div className="checkout-section-content">
              <label htmlFor="card">Card Number</label>
              <input type="text" id="card" name="card" value={card} onChange={handleCardChange} placeholder="Enter your card number" required />
              
              <label htmlFor="expiry">Expiration Date</label>
              <input type="text" id="expiry" name="expiry" value={expiry} onChange={handleExpiryChange} placeholder="MM/YY" required />
              
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" value={cvv} onChange={handleCvvChange}placeholder="Enter your CVV" required />
            </div>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;