import React, { useMemo, useRef, useState } from 'react';
import styles from './Tile.module.scss';
import useWebSocket from 'react-use-websocket';
import { baseUrl } from '../../websocket.config';
import User from '../../models/User';

const availabilityClassName = {
  [User.Offline]: styles.offline,
  [User.DnD]: styles.dnd,
  [User.Available]: styles.available,
};

function Tile(props) {
  const { user, ...restProps } = props;
  const [userData, setUserData] = useState(user.clone());
  const onUserChageEvent = (evt) => {
    const { event, userId, data } = JSON.parse(evt.data);
    if (userId !== userData.id) return;

    const updatedUser = userData.clone();

    switch (event) {
      case 'user_profile_change':
        updatedUser.setProfile(data);
        break;
      case 'user_dnd_change':
        updatedUser.setDndStatus(data);
        break;
      case 'user_presence_change':
        updatedUser.setPresence(data);
        break;
      default:
      // ignore
    }

    setUserData(updatedUser);
  };

  const propRef = useRef(null);
  propRef.current = onUserChageEvent;

  const STATIC_OPTIONS = useMemo(
    () => ({
      onMessage: (evt) => propRef.current(evt),
      share: true,
    }),
    []
  );

  useWebSocket(baseUrl, STATIC_OPTIONS);

  const availability = userData.availability;
  const classes = [styles.tile, availabilityClassName[availability]];

  const availabilityMessage = userData.doNotDisturb
    ? 'Do not disturb'
    : userData.isOnline
    ? 'Available'
    : 'Offline';
  const image = userData.images[4];
  console.log(image);

  const img = 'blue';

  return (
    <article
      {...restProps}
      className={classes.join(' ')}
      style={{
        '--image-size': `${image.size}px`,
        '--profile-pic': `url("${image.src}")`,
      }}
    >
      <header>
        <div>
          <p>{availabilityMessage}</p>
          <h2>{userData.name}</h2>
          <p className={styles.title}>{userData.title || '---'}</p>
        </div>
      </header>
      <section>
        <p className={styles.status}>{userData.statusText}</p>
      </section>
    </article>
  );
}

export default Tile;
