import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';
import { Heading, Button } from 'rebass';
import AuthedUser from './AuthedUser';

function PageHeader(props) {
  const { isLoading, user, loginWithRedirect } = useAuth0();
  const authbar = isLoading ? (
    loaderEl()
  ) : user ? (
    <AuthedUser />
  ) : (
    loginEl(loginWithRedirect)
  );
  return (
    <>
      <Heading as='h1'>{props.title}</Heading>
      <Link to='/'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>
      {authbar}
    </>
  );
}

export default PageHeader;

const loaderEl = () => <>Loading</>;
const loginEl = loginFunc => <Button onClick={loginFunc}>Login</Button>;
