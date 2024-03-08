
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate   } from 'react-router-dom';

import Navigation from './Navigation';

import '../style/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        });
        console.log(response.data);
        // Handle successful login (e.g., store token in localStorage)

        //const data = await response.json();
        localStorage.setItem('jwtToken', response.data.token); // Store the JWT token in local storage

        navigate('/', { replace: true }); // Navigate to the home page
        //window.location.href = '/' // Another way to go to home page

        } catch (error) {
        console.error('Login error:', error);
        // Handle login error (e.g., display error message)
    }
  };

  return (
    <div>
        <Navigation />
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
            </form>
        </div>
    
        <Link to="/register"> <button>Register</button> </Link>
    </div>
  );

  
}

export default Login;

