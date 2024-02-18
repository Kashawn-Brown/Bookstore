//importing
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//creating instance of Express application
const app = express();

//Telling Express to use the body-parser middleware for parsing JSON bodies
//parses incoming request bodies in a middleware before your handlers
app.use(bodyParser.json()); //or can apparently use express.json() ~ bodyparser.json vs express.json
//Setting up routes for different parts of applictaion
/*
1. Sets up a route for handling authentication-related requests under the /api/auth path
Any requests to /api/auth will be handled by the routes defined in ./routes/auth.

2. Sets up a route for handling book-related requests under the /api/books path.
Any requests to /api/books will be handled by the routes defined in ./routes/books

3.Sets up a route for handling shopping cart-related requests under the /api/cart path
Any requests to /api/cart will be handled by the routes defined in ./routes/cart

4.Sets up a route for handling order-related requests under the /api/orders path.
It mounts the router exported by ./routes/orders onto the Express application, 
so any requests to /api/orders will be handled by the routes defined in ./routes/orders

These lines of code set up routes for different parts of the application (authentication, books, shopping cart, orders) 
and configure the body-parser middleware to parse JSON request bodies. 
Each route is mounted onto the Express application and will handle requests that match its respective 
path
*/
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

//Port is initialized with the value of the environment if set, or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// //Connecting to database
// mongoose.connect('mongodb://localhost:27017/bookstore', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });