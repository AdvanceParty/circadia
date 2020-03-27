import React, { useState } from 'react';
import useSlackApi from '../../useSlackApi';
import styles from './Dashboard.module.scss';

const IMAGE_SIZES = {
  XS: 24,
  S: 32,
  M: 48,
  L: 72,
  XL: 192,
  XXL: 512
};

function Dashboard() {
  const [imageSize, setImageSize] = useState(IMAGE_SIZES.M);
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
      profile: { real_name, status_text }
    } = userData;
    const image = userData.profile[`image_${imageSize}`];
    return (
      <div className={styles.userStatus} key={id}>
        <img src={image} alt={real_name} width={imageSize} height={imageSize} />
        <div>
          <h5 className={styles.title}>{real_name}</h5>
          <p>{status_text}</p>
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
        : showUsers(data.users)}
    </>
  );
}

export default Dashboard;
