import React from 'react';
import { useAuth0 } from '../contexts/auth0.context';

function LogInOut() {
  const { isLoading, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const label = isAuthenticated ? 'Log Out' : 'Log In';
  const clickHandler = (event) => {
    isAuthenticated ? logout({ returnTo: `${window.location.origin}/login` }) : loginWithRedirect();
  };

  return (
    <button className='button is-small' disabled={isLoading} onClick={clickHandler}>
      {label}
    </button>
  );
}

export default LogInOut;
