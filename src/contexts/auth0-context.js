import React, { Component, createContext, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import auth0Config from '../auth0.config.json';

// create the context
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

// create a provider
export class Auth0Provider extends Component {
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: false,
    user: null,
    tempApiKey: '',
  };

  componentDidMount = () => {
    this.initializeAuth0();
  };

  config = {
    ...auth0Config,
    redirect_uri: window.location.origin,
  };

  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    this.setState({ auth0Client });

    if (window.location.search.includes('code=')) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });
    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();
    this.setState({ user, isAuthenticated: true, isLoading: false });
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  render() {
    const {
      auth0Client,
      isLoading,
      isAuthenticated,
      user,
      tempApiKey,
    } = this.state;
    const { children } = this.props;
    const configObject = {
      isLoading,
      isAuthenticated,
      user,
      tempApiKey,
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      logout: (...p) => auth0Client.logout(...p),
      updateTempApiKey: (tempApiKey) => this.setState({ tempApiKey }),
    };

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
