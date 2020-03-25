// Temporary measure until proper JWT auth is added
// onto the serverless API functions
import React from 'react';
import { useAuth0 } from '../../contexts/auth0-context';
import styles from './ApiAccess.module.scss';

const ApiAccess = () => {
  const { tempApiKey, updateTempApiKey, isAuthenticated } = useAuth0();
  const empty = tempApiKey.length === 0;
  const classes = `${styles.apiKey} ${empty ? styles.empty : ''}`;
  const onApiKeyChange = event => {
    updateTempApiKey(event.target.value);
  };
  const form = (
    <input
      name='tempApiKey'
      placeholder='API Key'
      onChange={onApiKeyChange}
      value={tempApiKey}
      className={classes}
    />
  );
  return isAuthenticated ? form : null;
};

export default ApiAccess;
