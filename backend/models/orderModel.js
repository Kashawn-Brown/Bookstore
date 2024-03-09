/*
A Mongoose schema is a blueprint that defines the structure of documents within a MongoDB collection  
It defines the fields and their types, default values, validation rules, and other properties for documents in the collection
Mongoose schemas are used to enforce data consistency and structure in MongoDB,
similar to how tables and columns work in relational databases
*/

//Mongoose Schema for orders

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a schema for ordered items
const orderItemSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true }

});

// Define a schema for the order
const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    paymentType: {type: String, enum: ['credit', 'debit'], default: 'credit'},
    cardInfo: {
        cardNumber: {type: String, required: true},
        expiry: {type: String, required: true},
        CVV: {type: String, required: true}
    },
    address: {
        address: {type: String, required: true},
        country: {type: String, required: true, default: 'Canada'},
        city: {type: String, required: true},
        province: {type: String, required: true},
        postalCode: {type: String, required: true}
    },


});

// Create a model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

//If there are products to purchase other than books
// const orderItemSchema = new Schema({
//     itemType: { type: String, required: true }, // Type of the item, e.g., 'book', 'mug', 'water_bottle', etc.
//     itemId: { type: Schema.Types.ObjectId, required: true }, // ID of the item in its respective collection
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true } // Price of the item
//   });