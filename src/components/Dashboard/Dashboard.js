import React, { useState } from 'react';
import useSlackApi from '../../useSlackApi';
import styles from './Dashboard.module.scss';

const IMAGE_SIZES = {
  SMALL: 48,
  MEDIUM: 192,
  LARGE: 512
};

function Dashboard() {
  const [imageSize, setImageSize] = useState(IMAGE_SIZES.SMALL);
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
      item: {
        profile: { displayName, realName, title, status, images }
      }
    } = userData;

    const image =
      images.filter(image => image.size == imageSize)[0] || images[0];

    const useName = displayName || realName || 'Secret Squirrel';

    return (
      <div className={styles.userStatus} key={id}>
        <img
          src={image.src}
          width={image.size}
          height={image.size}
          alt={useName}
        />
        <div>
          <h5 className={styles.title}>{useName}</h5>
          {title ? (
            <p>
              <em>{title}</em>
            </p>
          ) : (
            ''
          )}
          <p>{status.text}</p>
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
