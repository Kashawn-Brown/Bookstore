// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Navigation from './Navigation';
//import Book from '/Book';

import '../style/Books.css';

function Books() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
    fetch('http://localhost:5000/api/books/allBooks')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

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
            </div>
            
        ))}
        </div>
      
    </div>
  );

}

export default Books;