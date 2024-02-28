
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import '../style/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log(response.data);
      // Handle successful login (e.g., store token in localStorage)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., display error message)
    }
  };

//   return (
//     <div className="login-form">
//         <Navigation />
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );

  return (
    <div>
        <div className="login-form">
            <Navigation />
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

