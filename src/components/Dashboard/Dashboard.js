import React, { useState } from 'react';
import useSlackApi from '../../useSlackApi';
import styles from './Dashboard.module.scss';

const IMAGE_SIZES = {
  SMALL: 's',
  MEDIUM: 'm',
  LARGE: 'l'
};

function Dashboard() {
  const [imageSize, setImageSize] = useState(IMAGE_SIZES.MEDIUM);
  const { isLoading, error, data, status } = useSlackApi('/users/list');
  const forbidden = status === 403;

  const showUsers = users => {
    return (
      <div className={styles.tiles}>{users.map(user => userStatus(user))}</div>
    );
  };

  const userStatus = userData => {
    const {
      id,
      item: { displayName, statusText, images }
    } = userData;
    const image = images[imageSize];
    return (
      <div className={styles.userStatus} key={id}>
        <img src={image} alt={displayName} />
        <div>
          <h5 className={styles.title}>{displayName}</h5>
          <p>{statusText}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading
        ? 'Loading...'
        : forbidden
        ? 'Access denied. Check yo api key.'
        : error
        ? error.message
        : showUsers(data)}
    </>
  );
}

export default Dashboard;
