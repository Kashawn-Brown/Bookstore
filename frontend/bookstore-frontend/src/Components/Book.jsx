// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom


import Navigation from './Navigation';

import '../style/Book.css';

function Book() {

    const { id } = useParams(); // Get the id parameter from the URL
    const [book, setBook] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:5000/api/books/books-by-id/${id}`) // Fetch the book details using the id
        .then(response => response.json())
        .then(data => setBook(data))
        .catch(error => console.error('Error fetching book:', error));
    }, [id]);


    if (!book) {
        return  (
            <div>
                <Navigation />
                <div>Loading...</div>; // Display a loading message while fetching the book
            </div>
      );
    }
    
      return (
        <div>
          <Navigation />
          <h2>{book.title}</h2>
          <img src={book.imageLinks.thumbnail} alt={book.title} className="book-thumbnail" style={{ display: 'block', margin: '0 auto', width:"200px", height:"300px"}} />
          <p>Author(s): {book.authors.join(', ')}</p>
          <p>Description: {book.description}</p>
          <p>Price: ${book.price}</p>
          {/* Add more book details here */}
        </div>
      );
    


}

export default Book;