import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthedUser from '../AuthedUser';
import LogInOut from '../LogInOut';
import styles from './PageHeader.module.scss';
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
        <NavLink to='/' exact>
          Home
        </NavLink>
        <NavLink to='/dashboard' exact>
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
}

export default PageHeader;
