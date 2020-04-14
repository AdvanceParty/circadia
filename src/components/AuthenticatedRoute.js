import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0.context';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const fn = async () => {
      try {
        await loginWithRedirect({
          appState: { targetUrl: path },
        });
      } catch (e) {
        console.log(e);
      }
    };

    if (loading) {
      return <p>Loading...</p>;
    }

    fn();
  }, [loading, isAuthenticated]);

  const render = (props) => (isAuthenticated === true ? <Component {...props} /> : null);

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
};

export default withRouter(PrivateRoute);
