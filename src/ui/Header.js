import React from 'react';
import { useAuth0 } from '../contexts/auth0-context';

import { Heading, Button } from 'rebass';

function Header(props) {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();
  const authbar = isLoading
    ? loaderEl()
    : user
    ? userEl(user, logout)
    : loginEl(loginWithRedirect);
  return (
    <>
      <Heading as='h1'>{props.title}</Heading>
      {authbar}
    </>
  );
}

export default Header;

const loaderEl = () => <>Loading</>;
const userEl = (user, logoutFunc) => (
  <p>
    {user.name} | <Button onClick={logoutFunc}>Logout</Button>
  </p>
);
const loginEl = loginFunc => <Button onClick={loginFunc}>Login</Button>;
