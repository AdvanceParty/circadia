import React from 'react';
import styles from './Tile.module.scss';

function Tile(props) {
  const { user, ...restProps } = props;
  const { name, title, statusText, isOnline, doNotDisturb, images } = user;
  const image = images[2];

  const classes = `${styles.tile} ${!isOnline ? styles.offline : null}`;

  const titleElement = title ? (
    <p>
      <em>{title}</em>
    </p>
  ) : null;

  const dndElement = doNotDisturb ? (
    <p>
      <em>Do Not Disturb</em>
    </p>
  ) : null;

  return (
    <article {...restProps} className={classes}>
      <header>
        <img
          src={image.src}
          width={image.size}
          height={image.size}
          alt={name}
          className={styles.profilePic}
        />
      </header>
      <section>
        <h5 className={styles.name}>{name}</h5>
        {titleElement}
        {dndElement}
        <p>{statusText}</p>
      </section>
    </article>
  );
}

export default Tile;
