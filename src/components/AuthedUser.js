import React from 'react';
import { useAuth0 } from '../contexts/auth0.context';

function AuthedUser(props) {
  const { user } = useAuth0();
  return <>{user ? user.name : ''}</>;
}

export default AuthedUser;
