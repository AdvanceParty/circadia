import React from 'react';
import { Redirect } from 'react-router-dom';
import useHttpApi from '../../connecters/httpApi.connector';
import styles from './Dashboard.module.scss';
import Tile from '../../components/Tile/Tile';
import User from '../../models/User';

function Dashboard() {
  const { isLoading, error, data } = useHttpApi('/users/list');

  const showUsers = (users) => {
    console.log(users);
    const tiles = users.map((userData) => {
      const user = new User(userData);
      return <Tile user={user} key={user.id} />;
    });

    return <div className={styles.tiles}>{tiles.map((tile) => tile)}</div>;
  };

  const content = isLoading ? (
    'Loading..'
  ) : error ? (
    <Redirect to='/login' />
  ) : (
    showUsers(data.users)
  );

  // const userStatus = (userData) => {
  //   const user = new User(userData);
  //   return <Tile user={user} key={user.id} />;
  // };

  return <>{content}</>;
}

export default Dashboard;
