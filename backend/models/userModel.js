/*
A Mongoose schema is a blueprint that defines the structure of documents within a MongoDB collection  
It defines the fields and their types, default values, validation rules, and other properties for documents in the collection
Mongoose schemas are used to enforce data consistency and structure in MongoDB,
similar to how tables and columns work in relational databases
*/

//Mongoose Schema for users

const mongoose = require('mongoose');


// Define a schema for the user collection
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }

});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
