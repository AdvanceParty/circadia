import React from 'react';
import { useAuth0 } from '../contexts/auth0.context';

function LogInOut() {
  const { isLoading, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const label = isAuthenticated ? 'Log Out' : 'Log In';
  const clickHandler = (event) => {
    isAuthenticated ? logout({ returnTo: 'http://localhost:3000/login' }) : loginWithRedirect();
  };

  return (
    <button disabled={isLoading} onClick={clickHandler}>
      {label}
    </button>
  );
}

export default LogInOut;
