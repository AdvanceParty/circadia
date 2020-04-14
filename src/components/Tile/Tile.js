import React, { useMemo, useRef, useState } from 'react';
import styles from './Tile.module.scss';
// import useWebSocket from 'react-use-websocket';
import User from '../../models/User';

import { ReactComponent as AwayIcon } from '../../assets/icons/away.svg';
import { ReactComponent as DndIcon } from '../../assets/icons/dnd.svg';
import { ReactComponent as AvailableIcon } from '../../assets/icons/available.svg';

// const wsConfig = require('../../websocket.config');
// const baseUrl = wsConfig[process.env.NODE_ENV] || wsConfig.default;
// console.info(`--> Connecting to websocket at: ${baseUrl}`);

const availabilityClassName = {
  [User.Offline]: styles.offline,
  [User.DnD]: styles.dnd,
  [User.Available]: styles.available,
};

function Tile(props) {
  const { user, ...restProps } = props;
  const [userData, setUserData] = useState(user.clone());

  // const onUserChageEvent = (evt) => {
  //   const { event, userId, data } = JSON.parse(evt.data);
  //   if (userId !== userData.id) return;

  //   const updatedUser = userData.clone();

  //   switch (event) {
  //     case 'user_profile_change':
  //       updatedUser.setProfile(data);
  //       break;
  //     case 'user_dnd_change':
  //       updatedUser.setDndStatus(data);
  //       break;
  //     case 'user_presence_change':
  //       updatedUser.setPresence(data);
  //       break;
  //     default:
  //     // ignore
  //   }

  //   setUserData(updatedUser);
  // };

  // const propRef = useRef(null);
  // propRef.current = onUserChageEvent;

  // const STATIC_OPTIONS = useMemo(
  //   () => ({
  //     onMessage: (evt) => propRef.current(evt),
  //     shouldReconnect: (closeEvent) => true,
  //     share: true,
  //   }),
  //   []
  // );

  // useWebSocket(baseUrl, STATIC_OPTIONS);

  const availability = userData.availability;
  const classes = [styles.tile, availabilityClassName[availability]];

  const availabilityIcon = !userData.isOnline ? (
    <AwayIcon className={styles.availability} />
  ) : userData.doNotDisturb ? (
    <DndIcon className={styles.availability} />
  ) : (
    <AvailableIcon className={styles.availability} />
  );

  const image = userData.images[4];
  const inlineStyleAtts = {
    '--image-size': `${image.size}px`,
    '--profile-pic': `url("${image.src}")`,
  };

  const userTitle = () => {
    return userData.title ? <p className={styles.title}>{userData.title}</p> : '';
  };

  return (
    <article {...restProps} className={classes.join(' ')} style={inlineStyleAtts}>
      <div>
        {availabilityIcon}
        <h2>{userData.name}</h2>
        {jobTitle(userData.title)}
        {statusText(userData.statusText)}
      </div>
    </article>
  );
}

export default Tile;

const jobTitle = (data) => {
  if (!data) return '';
  return <p className={styles.title}>{data}</p>;
};

const statusText = (data) => {
  if (!data) return '';
  return <p className={styles.status}>{data}</p>;
};
