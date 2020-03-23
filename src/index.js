import React from 'react';
import ReactDOM from 'react-dom';

import theme from '@rebass/preset';
import { ThemeProvider } from 'emotion-theming';
import './css/styles.css';
import { Auth0Provider } from './contexts/auth0-context';
import App from './App';

ReactDOM.render(
  <Auth0Provider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
