// import React from 'react';
import React, { useState, useEffect } from 'react';

import Navigation from './Navigation';

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
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author(s): {book.authors.join(', ')}</p>
            <p>Description: {book.description}</p>
            {/* Add more book details here */}
          </li>
        ))}
      </ul>
    </div>
  );
//   return (
//     <div>
//       <h1>Books Page</h1>
//       {/* Add your books list here */}
//     </div>
    
//   );
}

export default Books;