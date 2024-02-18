/*
A Mongoose schema is a blueprint that defines the structure of documents within a MongoDB collection  
It defines the fields and their types, default values, validation rules, and other properties for documents in the collection
Mongoose schemas are used to enforce data consistency and structure in MongoDB,
similar to how tables and columns work in relational databases
*/

//Mongoose Schema for books

const mongoose = require('mongoose');


// Define a schema for books
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    description: { type: String },
    publishedDate: { type: String },
    pageCount: { type: Number },
    categories: [{ type: String }],
    language: { type: String },
    availableOnline: {type: Boolean},
    price: {type: Number},
    imageLinks: {
      smallThumbnail: { type: String },
      thumbnail: { type: String }
    },
    previewLink: { type: String }

});

// Create a model based on the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;