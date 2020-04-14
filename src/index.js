import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// authenticate with Auth0
import { Auth0Provider } from './contexts/auth0.context';
import { StoreProvider } from './contexts/store.context';

import App from './App';

import './theme/styles.scss';

ReactDOM.render(
  <Auth0Provider>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
