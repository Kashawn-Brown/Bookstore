//Retrieve books from Google books API nad store in Mongodb Database

const mongoose = require('mongoose');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booksDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a Mongoose schema for books
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    publishedDate: String,
    pageCount: Number,
    categories: [String]
});

const Book = mongoose.model('Book', bookSchema);

// Fetch books from Google Books API and store in MongoDB
async function fetchBooks() {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=javascript');
        const books = response.data.items.map(item => {
            return {
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                description: item.volumeInfo.description || 'No description available',
                publishedDate: item.volumeInfo.publishedDate,
                pageCount: item.volumeInfo.pageCount || 0,
                categories: item.volumeInfo.categories || []
            };
        });
        await Book.insertMany(books);
        console.log('Books stored in MongoDB');
    } catch (error) {
        console.error('Error fetching and storing books:', error);
    }
}

fetchBooks();
