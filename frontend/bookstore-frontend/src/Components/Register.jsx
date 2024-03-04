
import React, { useState } from 'react';
import axios from 'axios';

import Navigation from './Navigation';

import '../style/Register.css';

function Register() {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) 
    {
        setError('Passwords do not match');
        return;
    }
    try {
        console.log("HELLO");
        console.log(userName);
        console.log(email);
        console.log(password);
        const response = await axios.post('http://localhost:5000/api/auth/register', {
        userName,
        email,
        password,
        });

        console.log(response.data);
        // Handle successful login (e.g., store token in localStorage)

        const data = await response.json();
        localStorage.setItem('jwtToken', data.token); // Store the JWT token in local storage
    } catch (error) {
      console.error('Register error:', error);
      // Handle login error (e.g., display error message)
    }
  };


  return (
    <div>
        <Navigation />
        <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">Username: </label>
            <input type="text" id="userName" name="userName" value={userName} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

            {error && <div className="error">{error}</div>}
            
            <button type="submit">Create Account</button>
        </form>
        </div>
    </div>
  );

  
}

export default Register;


