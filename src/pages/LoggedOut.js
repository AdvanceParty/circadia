import React from 'react';
import LogInOut from '../components/LogInOut';

function LoggedOut() {
  return (
    <>
      <p>You are logged out.</p>
      <p>
        <LogInOut />
      </p>
    </>
  );
}

export default LoggedOut;
