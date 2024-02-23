import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';




import Home from './Components/Home';
import Books from './Components/Books';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Orders from './Components/Orders';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
