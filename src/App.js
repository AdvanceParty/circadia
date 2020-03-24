import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LoggedOut from './components/LoggedOut';
import PageHeader from './components/PageHeader';

import { Flex } from 'rebass';

const flexProps = {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const headerFooter = {
  p: 40,
  bg: '#000',
  color: '#fff'
};

function App() {
  return (
    <>
      <Flex as='header' sx={{ ...flexProps, ...headerFooter }}>
        <PageHeader title='Circadia' />
      </Flex>
      <Flex as='main' sx={flexProps}>
        <Switch>
          <Route path='/' component={Home} exact />
          <AuthenticatedRoute path='/dashboard' component={Dashboard} exact />
          <Route path='/login' component={LoggedOut} exact />
        </Switch>
      </Flex>
      <Flex as='footer' sx={{ ...flexProps, ...headerFooter }}>
        An AP Joint
      </Flex>
    </>
  );
}

export default App;
