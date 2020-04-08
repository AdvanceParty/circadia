import React from 'react';
import styles from './Tile.module.scss';

function Tile(props) {
  const {
    image,
    title,
    name = 'Secret Squirrel',
    status,
    presence,
    ...restProps
  } = props;

  const classes = `${styles.tile} ${!presence.active ? styles.offline : null}`;
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
        {title ? (
          <p>
            <em>{title}</em>
          </p>
        ) : (
          ''
        )}
        <p>{status.text}</p>
      </section>
    </article>
  );
}

export default Tile;
