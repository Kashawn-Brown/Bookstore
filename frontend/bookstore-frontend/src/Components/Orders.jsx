import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from './Navigation';
import '../style/Orders.css';

function Orders() {

  const jwtToken = localStorage.getItem('jwtToken');

  const [orders, setOrders] = useState([]);
  const [bookTitles, setBookTitles] = useState({});

    useEffect(() => {
      axios.get('http://localhost:5000/api/orders/get-orders', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': jwtToken
        }
      })
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching Cart Items:', error.response.data.message));
    });

    const fetchBookTitle = async (bookId) => {
      try {
          const response = await fetch(`http://localhost:5000/api/books/books-by-id/${bookId}`);
          const data = await response.json();
          return data.title;
      } catch (error) {
          console.error('Error fetching book title:', error);
          return '';
      }
  };

    useEffect(() => {
      const fetchTitles = async () => {
        const titles = {};
        for (const order of orders) {
          for (const item of order.items) {
            if (!titles[item.bookId]) {
              const title = await fetchBookTitle(item.bookId);
              titles[item.bookId] = title;
            }
          }
        }
        setBookTitles(titles);
      };
      fetchTitles();
    }, [orders]);


  return (
    <div>
        <Navigation />
        
        <div className="orders-container">
        <h1>Orders Page</h1>
        {orders.map((order, index) => (
                <div key={index} className="order">
                    <h2>Order #{index + 1}</h2>
                    <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>Shipping Address: {order.address.address}, {order.address.city}, {order.address.province}, {order.address.postalCode}, {order.address.country}</p>
                    <p>Payment Type: {order.paymentType}</p>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total}</p>
                    <h3>Items:</h3>
                    <ul>
                        {order.items.map( (item, i) => (
                            <li key={i}>
                            {bookTitles[item.bookId]} - Quantity: {item.quantity}
                          </li>                        
                        ))}
                    </ul>
                </div>
            ))}
            </div>
    </div>
  );
}

export default Orders;