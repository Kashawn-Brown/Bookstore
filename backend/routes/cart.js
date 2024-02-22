//Shopping Cart

const express = require('express');
const router = express.Router();


const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

const auth = require('../routes/authMiddleware');
const mongoose = require('mongoose');

//Get shopping cart items 
router.get('/cart', async (req, res) => {

  try{

    /* HARDCODED USER INFO, NEED TO FIND OUT HOW TO PASS IT AROUND THROUGH JWT */
    req.user = { _id: '65d69050c88f266a2ac5ade4' };

    // Find users cart
    const cart = await Cart.findOne({ userId: req.user._id });
    //*Maybe should have cart automatically made when account made...
    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.items.length === 0) 
    {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json(cart.items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });


//Add item to shopping cart 
router.post('/add-to-cart', async (req, res) => {

  
  try {

    const { bookId, quantity } = req.body;


    // Validate the bookId
    if (!bookId || !mongoose.isValidObjectId(bookId)) 
    {
      console.log('Invalid ID:', bookId);
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) 
    {
      return res.status(404).json({ message: 'Book not found' });
    }

    /* HARDCODED USER INFO, NEED TO FIND OUT HOW TO PASS IT AROUND THROUGH JWT */
    req.user = { _id: '65d69050c88f266a2ac5ade4' };

    //Find the users cart
    let cart = await Cart.findOne({ userId: req.user._id });

    //*Maybe should have cart automatically made when account made... does it matter...
    if (!cart) 
    {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    //See if the item being added already exists in the cart
    const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
    if (existingItem)
    {
      existingItem.quantity += quantity;
    }
    else
    {
      cart.items.push({ bookId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Book added to cart successfully' });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });

  
//Remove item from shopping cart logic
router.delete('/remove-from-cart', async (req, res) => {

  try{

    const { bookId } = req.body;

    /* HARDCODED USER INFO, NEED TO FIND OUT HOW TO PASS IT AROUND THROUGH JWT */
    req.user = { _id: '65d69050c88f266a2ac5ade4' };

    const cart = await Cart.findOne({ userId: req.user._id });
    //*Maybe should have cart automatically made when account made...
    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    const item = cart.items.find(item => item.bookId.toString() === bookId);
    if(item)
    {
      if(item.quantity > 1)
        item.quantity--;
      else
        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

      // Save the updated cart
      await cart.save();

      res.status(200).json({ message: 'Item removed from cart successfully' });
    }
    else
    {
      res.status(200).json({ message: 'No such item in cart' });
    }


    

  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });

//Exporting the router object, making it available for use in other parts of the application
module.exports = router;