import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from './Navigation';
import '../style/Checkout.css';

function Checkout() {
  return (
    <div>
        <Navigation />
        <h1>Checkout Page</h1>
    </div>
  );
}

export default Checkout;