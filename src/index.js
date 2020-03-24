import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// authenticate with Auth0
import { Auth0Provider } from './contexts/auth0-context';

import App from './App';

import './theme/styles.scss';

ReactDOM.render(
  <Auth0Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
