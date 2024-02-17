//Book Catalog

const express = require('express');
const router = express.Router();

//Get all books
router.get('/', (req, res) => {
    
  });

//Get book by ID 
router.get('/:id', (req, res) => {
    
  });

//Get book by Title 
router.get('/:title', (req, res) => {
    
});

//Get books by Author 
router.get('/:author', (req, res) => {
    
});

//Get books by Genre 
router.get('/:genre', (req, res) => {
    
});


//Exporting the router object, making it available for use in other parts of the application
module.exports = router;

