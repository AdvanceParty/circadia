import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// authenticate with Auth0
import { Auth0Provider } from './contexts/auth0.context';

// se a global store provider
import { StoreProvider } from './contexts/store.context';

// use a global websocket provider
import { WebsocketContextProvider } from './contexts/websocket.context';

import App from './App';

import './theme/styles.scss';

ReactDOM.render(
  <Auth0Provider>
    <StoreProvider>
      <WebsocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WebsocketContextProvider>
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
