import React, { useState } from 'react';
import AuthedUser from '../AuthedUser';
import LogInOut from '../LogInOut';
import styles from './PageHeader.module.scss';

function PageHeader(props) {
  const [compact] = useState(false);
  const classes = [styles.header];
  if (compact) classes.push(styles.compact);

  return (
    <header className={classes.join(' ')}>
      <h1>{props.title}</h1>
      <AuthedUser className={styles.authUser} />
      <LogInOut />
    </header>
  );
}

export default PageHeader;
