import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from './Navigation';
import '../style/Cart.css';



function Cart() {

    const jwtToken = localStorage.getItem('jwtToken');

    const [cartItems, setCart] = useState([]);

      useEffect(() => {
        axios.get('http://localhost:5000/api/cart/cart', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': jwtToken
          }
        })
        .then(response => setCart(response.data))
        .catch(error => console.error('Error fetching Cart Items:', error));
      });

      const removeItem = (bookId, jwtToken) => {

        axios.delete('http://localhost:5000/api/cart/remove-from-cart', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwtToken // Include your JWT token here
              },
              data: {
                bookId: bookId
            }
        })
        .then(response => {
            console.log('Book removed cart:', response.data);
            // Optionally, you can update your UI to reflect that the book was added to the cart
          })
        .catch(error => {
            console.error('There was a problem removing the book from the cart:', error);
          });
        
    };


    
    return (
      <div>
          <Navigation />
          <h1>Cart Page</h1>
          <ul className="cart-items">
            {cartItems.map((item) => (
            <li key={item._id} className="cart-item">
                <div className="item-image">
                {item.imageLinks && <img src={item.imageLinks.thumbnail} alt={item.title} />}
                </div>
                <div className="item-details">
                <h2>{item.title}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeItem(item.bookId, jwtToken)}>Remove Item</button>
                </div>
            </li>
            ))}
        </ul>
      </div>
    );
  }

export default Cart;

