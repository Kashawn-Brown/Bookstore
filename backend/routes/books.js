//Book Catalog

/* 
To consider:
  Creating a new book, updating a book, deleting a book
  recommended books (same series, same author, etc.)
  Different type of search (keyword...)
*/

const express = require('express');
const router = express.Router();


const Book = require('../models/bookModel');

//Get all books
router.get('/', async (req, res) => {

  try {
    
    const books = await Book.find();
    res.status(200).json(books);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });

//Get book by ID 
router.get('/:id', async (req, res) => {
  
  try {
    
    const book = await Book.findById(req.params.id);
    if (!book) 
    {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

  });

//Get book by Title 
router.get('/title/:title', async (req, res) => {

  try {

    const book = await Book.findOne({ title: req.params.title });

    if (!book) 
    {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
});

//Get books by Author 
router.get('/author/:author', async (req, res) => {

  try {

    const books = await Book.find({ author: req.params.author });

    if (books.length === 0) 
    {
      return res.status(404).json({ message: 'Books by this author not found' });
    }

    res.status(200).json(books);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
});

// //Get books by Genre (or category?? if same?)
// router.get('/genre/:genre', async (req, res) => {

//   try {

//     const books = await Book.find({ genre: req.params.genre });

//     if (books.length === 0) 
//     {
//       return res.status(404).json({ message: 'Books in this genre not found' });
//     }

//     res.status(200).json(books);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
    
// });


//Get books by Category
router.get('/category/:category', async (req, res) => {

  try {

    const books = await Book.find({ category: req.params.category });

    if (books.length === 0) 
    {
      return res.status(404).json({ message: 'Books in this category not found' });
    }

    res.status(200).json(books);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
});


const auth = require('../routes/authMiddleware');

//Creating a new book
router.post('/', auth, async (req, res) => {
  
  //Add logic for if creating a duplicate book
  try {
    
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Updating an existing book
router.put('/:id', auth, async (req, res) => {
  
  try {
    
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) 
    {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Deleting a book
router.delete('/:id', auth, async (req, res) => {
  
  try {
    
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) 
    {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({message: "Book deleted Successfully"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Exporting the router object, making it available for use in other parts of the application
module.exports = router;

