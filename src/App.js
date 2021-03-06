import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/';
import LoggedOut from './pages/LoggedOut';
import PageHeader from './components/PageHeader/';

function App() {
  return (
    <>
      <PageHeader title='Circadia' />
      <main>
        <Switch>
          {/* <Route path='/' component={Home} exact /> */}
          <AuthenticatedRoute path='/' component={Dashboard} exact />
          <Route path='/login' component={LoggedOut} exact />
        </Switch>
      </main>
      <footer>An AP Joint</footer>
    </>
  );
}

export default App;
