import React from 'react';
import { Link } from 'react-router-dom';
import AuthedUser from '../AuthedUser';
import LogInOut from '../LogInOut';
import styles from './PageHeader.module.css';
import ApiAccess from '../ApiAccess';

function PageHeader(props) {
  return (
    <header className={styles.header}>
      <ApiAccess />
      <div className={styles.authbox}>
        <AuthedUser />
        <LogInOut />
      </div>
      <h1>{props.title}</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
    </header>
  );
}

export default PageHeader;
