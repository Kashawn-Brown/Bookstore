import React from 'react';
import { Link } from 'react-router-dom';

import '../style/LoginButton.css';

function LoginButton() {
  return (
    <div className="login-button">
      <Link to="/login"> <button>Login/Register</button> </Link>
    </div>
  );
}

export default LoginButton;