/*
A Mongoose schema is a blueprint that defines the structure of documents within a MongoDB collection  
It defines the fields and their types, default values, validation rules, and other properties for documents in the collection
Mongoose schemas are used to enforce data consistency and structure in MongoDB,
similar to how tables and columns work in relational databases
*/

//Mongoose Schema for shopping carts

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a schema for cart items
const cartItemSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 }, // Price of the item
    imageLinks: {
        smallThumbnail: { type: String },
        thumbnail: { type: String }
      },
});

// Define a schema for the shopping cart 
const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    //total: { type: Number, required: true }

});

// Create a model based on the schema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


//If there are products to purchase other than books
// const cartItemSchema = new Schema({
//     itemType: { type: String, required: true }, // Type of the item, e.g., 'book', 'mug', 'water_bottle', etc.
//     itemId: { type: Schema.Types.ObjectId, required: true }, // ID of the item in its respective collection
//     quantity: { type: Number, required: true }
//     price: { type: Number, required: true } // Price of the item
//
// });