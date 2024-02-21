//Retrieve books from Google books API and store in Mongodb Database

const mongoose = require('mongoose');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const Book = require('./models/bookModel');

// Fetch books from Google Books API and store in MongoDB
async function fetchBooks() {
    try {
        
        // Delete all existing documents in the 'books' collection
        await Book.deleteMany({});
        console.log('Existing books deleted from MongoDB');

        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&printType=books&startIndex=0&maxResults=40');
        const books = response.data.items.map(item => {
            return {
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                description: item.volumeInfo.description || 'No description available',
                publishedDate: item.volumeInfo.publishedDate,
                publisher: item.volumeInfo.publisher,
                pageCount: item.volumeInfo.pageCount || 0,
                categories: item.volumeInfo.categories || [],
                language: item.volumeInfo.language || "No language information",
                availableOnline: false,
                price: 0,
                copies: 10,
                imageLinks: {
                    smallThumbnail: item.volumeInfo.imageLinks.smallThumbnail || "No thumbnail available",
                    thumbnail: item.volumeInfo.imageLinks.thumbnail || "No thumbnail available"
                },
                previewLink: item.volumeInfo.previewLink

            };
        });
        await Book.insertMany(books);
        console.log('Books stored in MongoDB');
    } catch (error) {
        console.error('Error fetching and storing books:', error);
    }
}
fetchBooks();
