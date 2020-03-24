import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';
import AuthedUser from '../AuthedUser';
import LogInOut from '../LogInOut';
import styles from './PageHeader.module.css';

function PageHeader(props) {
  return (
    <header className={styles.header}>
      <div className={styles.authbox}>
        <AuthedUser />
        <LogInOut />
      </div>
      <h1>{props.title}</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
      <ApiAccess />
    </header>
  );
}

export default PageHeader;

// Temporary measure until proper JWT auth is added
// onto the serverless API functions
const ApiAccess = () => {
  const { tempApiKey, updateTempApiKey, isAuthenticated } = useAuth0();
  const onApiKeyChange = event => {
    updateTempApiKey(event.target.value);
  };
  const form = (
    <input
      name='tempApiKey'
      placeholder='API Key'
      onChange={onApiKeyChange}
      value={tempApiKey}
      className={styles.apiKey}
    />
  );
  return isAuthenticated ? form : null;
};
