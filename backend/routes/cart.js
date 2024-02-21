//Shopping Cart

const express = require('express');
const router = express.Router();


const Cart = require('../models/cartModel');

const auth = require('../routes/authMiddleware');

//Get shopping cart items 
router.get('/cart', async (req, res) => {

  try{

    // Find users cart
    const cart = await Cart.findOne({ userId: req.user._id });
    //*Maybe should have cart automatically made when account made...
    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart.items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });


//Add item to shopping cart 
router.post('add-to-cart/:id', async (req, res) => {

  const { Id } = req.params;
  const { quantity } = req.body;

  try {

    //Find the users cart
    const cart = await Cart.findOne({ userId: req.user._id });

    //*Maybe should have cart automatically made when account made...
    if (!cart) 
    {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    //See if the item being added already exists in the cart
    const existingItem = cart.items.find(item => item.bookId.toString() === Id);
    if (existingItem)
    {
      existingItem.quantity += quantity;
    }
    else
    {
      cart.items.push({ Id, quantity });
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
router.delete('remove-from-cart/:id', async (req, res) => {

  const { Id } = req.params;

  try{

    const cart = await Cart.findOne({ userId: req.user._id });
    //*Maybe should have cart automatically made when account made...
    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.bookId.toString() !== Id);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully' });

  } catch (error){

  }
    
  });

//Exporting the router object, making it available for use in other parts of the application
module.exports = router;