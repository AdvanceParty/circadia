import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Dashboard from './pages/Dashboard/';
import LoggedOut from './pages/LoggedOut';
import PageHeader from './components/PageHeader/';

import Log from './Log';

import './theme/styles.scss';

function App() {
  return (
    <>
      <PageHeader title='Circadia' className='container' />
      <main className='section'>
        <div className='container'>
          <Switch>
            <AuthenticatedRoute path='/' component={Dashboard} exact />
            <Route path='/login' component={LoggedOut} exact />
          </Switch>
        </div>
      </main>
      <footer>An AP Joint</footer>
    </>
  );
}

export default App;
