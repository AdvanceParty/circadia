import React, { useMemo, useRef, useState } from 'react';
import styles from './Tile.module.scss';
import useWebSocket from 'react-use-websocket';
import { baseUrl } from '../../websocket.config';

function Tile(props) {
  const { user, ...restProps } = props;
  const [userData, setUserData] = useState(user.clone());

  // const { name, title, statusText, isOnline, doNotDisturb, images, id } = user;

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
      case 'user_presence_change':
        updatedUser.setPresence(data);
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

  const classes = `${styles.tile} ${!userData.isOnline ? styles.offline : null}`;

  const titleElement = userData.title ? (
    <p>
      <em>{userData.title}</em>
    </p>
  ) : null;

  const dndElement = userData.doNotDisturb ? (
    <p>
      <em>Do Not Disturb</em>
    </p>
  ) : null;

  const image = userData.images[2];

  return (
    <article {...restProps} className={classes}>
      <header>
        <img
          src={image.src}
          width={image.size}
          height={image.size}
          alt={userData.name}
          className={styles.profilePic}
        />
      </header>
      <section>
        <h5 className={styles.name}>{userData.name}</h5>
        {titleElement}
        {dndElement}
        <p>{userData.statusText}</p>
      </section>
    </article>
  );
}

export default Tile;
