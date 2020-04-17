import React from 'react';
import { useAuth0 } from '../contexts/auth0.context';

function AuthedUser(props) {
  const { user } = useAuth0();
  const message = user ? 'Logged in as ' : 'Not logged in';
  const name = user ? user.name : '';
  return (
    <aside {...props}>
      {message}
      <span>{name}</span>
    </aside>
  );
}

export default AuthedUser;
