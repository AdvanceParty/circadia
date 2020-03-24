import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LoggedOut from './components/LoggedOut';
import PageHeader from './components/PageHeader';

import { appGrid, flexProps, headerFooter } from './theme/theme';
import { Box, Flex } from 'rebass';

function App() {
  return (
    <Box sx={appGrid}>
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
    </Box>
  );
}

export default App;
