// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import '../style/Books.css';
import axios from 'axios';




//import Book from '/Book';



function Books() {

    const [books, setBooks] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
    fetch('http://localhost:5000/api/books/allBooks')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);


    const addToCart = (bookId, jwtToken) => {
        axios.post('http://localhost:5000/api/cart/add-to-cart', {bookId},{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwtToken // Include your JWT token here
              }
        })
        .then(response => {
            console.log('Book added to cart:', response.data);
            // Optionally, you can update your UI to reflect that the book was added to the cart
          })
        .catch(error => {
            console.error('There was a problem adding the book to the cart:', error);
          });
        
    };

  return (
    <div>
        <Navigation />
        
        <h1>Books</h1>
        <div className="books-grid">
        {books.map((book) => (
            
            <div key={book._id} className="book-card">
                <Link to={`/book/${book._id}`} className="book-link">
                <img src={book.imageLinks.thumbnail} alt={book.title} className="book-thumbnail" />
                <div className="book-info">
                    <h2>{book.title.length > 25 ? book.title.substring(0, 25) + "..." : book.title}</h2>
                    <p>by {book.authors.join(', ')}</p>
                    <p>{book.description.substring(0, 50) + "..."}</p>
                    <p>${book.price}</p>
                </div>
                </Link>
                <button onClick={() => addToCart(book._id, jwtToken)}>Add to Cart</button>
            </div>
            
        ))}
        </div>
      
    </div>
  );

}

export default Books;