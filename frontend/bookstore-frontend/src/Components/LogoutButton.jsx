import React from 'react';
import { Link } from 'react-router-dom';

import '../style/LoginButton.css';

function LogoutButton({onClick}) {
  return (
    <div className="login-button">
      <Link to="/login"> <button onClick={onClick}>Logout</button> </Link>
    </div>
  );
}

export default LogoutButton;