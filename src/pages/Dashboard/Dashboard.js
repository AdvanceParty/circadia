import React, { useState } from 'react';
import useHttpApi from '../../connecters/httpApi.connector';
import styles from './Dashboard.module.scss';
import Tile from '../../components/Tile/Tile';

const IMAGE_SIZES = {
  SMALL: 48,
  MEDIUM: 192,
  LARGE: 512,
};

function Dashboard() {
  const [imageSize, setImageSize] = useState(IMAGE_SIZES.SMALL);
  const { isLoading, error, data, status } = useHttpApi('/users/list');
  const forbidden = status === 403;

  const showUsers = (users) => {
    return (
      <div className={styles.tiles}>
        {users.map((user) => userStatus(user))}
      </div>
    );
  };

  const userStatus = (userData) => {
    const {
      id,
      presence,
      profile: { displayName, realName, title, status, images },
    } = userData;

    const image =
      images.filter((image) => image.size == imageSize)[0] || images[0];

    const name = displayName || realName;

    // ToDO: Bring in Tile COmponent for each user.

    const classNames = `${styles.userStatus} ${
      !presence || presence.active ? styles.online : styles.offline
    }`;

    return (
      <Tile
        image={image}
        title={title}
        name={name}
        status={status}
        presence={presence}
      />
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
