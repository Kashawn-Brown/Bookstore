//Book Catalog

/* 
To consider:
  Creating a new book, updating a book, deleting a book
  recommended books (same series, same author, etc.)
  Different type of search (keyword...)
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

//Get all books
router.get('/allBooks', async (req, res) => {


  try {
    
    const books = await Book.find();
    res.status(200).json(books);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error... but its here' });
  }
    
  });

//Get book by ID 
router.get('/books-by-id/:id', async (req, res) => {
  
  try {

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) 
    {
      console.log('Invalid ID:', id);
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const validId = new mongoose.Types.ObjectId(id)
    
    const book = await Book.findById(validId);
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
router.get('/books-by-title/:title', async (req, res) => {

  try {

    let title = req.params.title;
    if(title)
    {
      title = title.replace(/\+/g, ' ');
    }
    else
    {
      console.log('Title:', title);
      return res.status(400).json({ message: 'No Title Found' });
    }
    

    const book = await Book.findOne({ title: title});

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
router.get('/books-by-author/:author', async (req, res) => {

  try {

    let author = req.params.author;
    if(author)
    {
      author = author.replace(/\+/g, ' ');
    }
    else
    {
      console.log('Author:', author);
      return res.status(400).json({ message: 'No Author Found' });
    }

    const books = await Book.find({ authors: { $in: author } });

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
router.get('/books-by-category/:category', async (req, res) => {

  try {

    console.log(req.params.category)

    let category = req.params.category;
    if(category)
    {
      category = category.replace(/\+/g, ' ');
    }
    else
    {
      console.log('Category:', category);
      return res.status(400).json({ message: 'No Category Found' });
    }

    const books = await Book.find({ categories: { $in: category } });
    

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


// const auth = require('../routes/authMiddleware');

// //Creating a new book
// router.post('/', auth, async (req, res) => {
  
//   //Add logic for if creating a duplicate book
//   try {
    
//     const newBook = await Book.create(req.body);
//     res.status(201).json(newBook);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// //Updating an existing book
// router.put('/:id', auth, async (req, res) => {
  
//   try {
    
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedBook) 
//     {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     res.status(200).json(updatedBook);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// //Deleting a book
// router.delete('/:id', auth, async (req, res) => {
  
//   try {
    
//     const deletedBook = await Book.findByIdAndDelete(req.params.id);
//     if (!deletedBook) 
//     {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     res.status(200).json({message: "Book deleted Successfully"});

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

//Exporting the router object, making it available for use in other parts of the application
module.exports = router;

