import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// authenticate with Auth0
import { Auth0Provider } from './contexts/auth0-context';

// theming
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import './css/styles.css';

//
import App from './App';

ReactDOM.render(
  <Auth0Provider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
