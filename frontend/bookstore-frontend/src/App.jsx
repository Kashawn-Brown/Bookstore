import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';




import Home from './Components/Home';
import Books from './Components/Books';
import Book from './Components/Book';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Orders from './Components/Orders';
import Navigation from './Components/Navigation';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <Router>
      <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/book/:id" element={<Book/>} /> {/* Dynamic route for book details */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
