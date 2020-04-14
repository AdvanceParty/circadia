import React, { useRef } from 'react';
import styles from './Tile.module.scss';
import { useStore } from '../../contexts/store.context';
import User from '../../models/User';

import { ReactComponent as AwayIcon } from '../../assets/icons/away.svg';
import { ReactComponent as DndIcon } from '../../assets/icons/dnd.svg';
import { ReactComponent as AvailableIcon } from '../../assets/icons/available.svg';

const availabilityClass = {
  [User.Offline]: styles.offline,
  [User.DnD]: styles.dnd,
  [User.Available]: styles.available,
};

const icons = {
  [User.Offline]: <AwayIcon className={styles.offline} />,
  [User.DnD]: <DndIcon className={styles.dnd} />,
  [User.Available]: <AvailableIcon className={styles.available} />,
};

function Tile(props) {
  const { userId, ...restProps } = props;

  const { state } = useStore();
  const userData = state.users[userId];

  const availability = userData.availability;
  const icon = icons[availability];

  const classes = [styles.tile, availabilityClass[availability]];
  const classList = classes.join(' ');
  console.log(classList);

  const image = userData.images[4] || userData.images[userData.images.length - 1];

  const inlineStyleAtts = {
    '--image-size': `${image.size}px`,
    '--profile-pic': `url("${image.src}")`,
  };

  const userTitle = () => {
    return userData.title ? <p className={styles.title}>{userData.title}</p> : '';
  };

  return (
    <article {...restProps} className={classList} style={inlineStyleAtts}>
      <div>
        {icon}
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

const availabilityIcon = (availability) => {};
