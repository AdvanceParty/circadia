import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthedUser from '../AuthedUser';
import LogInOut from '../LogInOut';
import styles from './PageHeader.module.scss';

function PageHeader(props) {
  return (
    <header className={styles.header}>
      <h1>{props.title}</h1>
      <div className={styles.authbox}>
        <AuthedUser />
        <LogInOut />
      </div>
    </header>
  );
}

export default PageHeader;

/*
<nav>
        <NavLink to='/' exact>
          Home
        </NavLink>
        <NavLink to='/dashboard' exact>
          Dashboard
        </NavLink>
      </nav>
*/
