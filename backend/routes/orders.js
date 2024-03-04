//Orders 

const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');


const {authenticateToken} = require('../routes/authMiddleware');

//Get all orders 
router.get('/get-orders', authenticateToken, async (req, res) => {

  try
  {

    /* HARDCODED USER INFO, NEED TO FIND OUT HOW TO PASS IT AROUND THROUGH JWT */
    //req.user = { _id: '65d69050c88f266a2ac5ade4' };

    // Find orders for the current user
    const orders = await Order.find({ userId: req.user._id });

    if (orders.length === 0) 
    {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);

  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }


    
  });



// Place new order
router.post('/place-order', authenticateToken, async (req, res) => {

  try
  {

    /* HARDCODED USER INFO, NEED TO FIND OUT HOW TO PASS IT AROUND THROUGH JWT */
    //req.user = { _id: '65d69050c88f266a2ac5ade4' };

    // Find the cart for the current user
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }
    if (cart.items.length === 0) 
    {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    // Calculate the total amount
    let total = 0;
    cart.items.forEach(item => {
      total += item.quantity * item.price;
    });


    // Create a new order
    // Will take the default values for the status and created fields
    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      total //shorthand since the variable name and object property name are the same (aka total: total)
    });

    // Save the order to the database
    await order.save();

    
    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });

  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });


//Exporting the router object, making it available for use in other parts of the application
module.exports = router;