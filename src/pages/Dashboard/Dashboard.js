import React from 'react';
import useHttpApi from '../../connecters/httpApi.connector';
import styles from './Dashboard.module.scss';
import Tile from '../../components/Tile/Tile';
import User from '../../models/User';

function Dashboard() {
  const { isLoading, error, data, status } = useHttpApi('/users/list');
  const forbidden = status === 403;

  const showUsers = (users) => {
    return <div className={styles.tiles}>{users.map((user) => userStatus(user))}</div>;
  };

  const userStatus = (userData) => {
    const user = new User(userData);
    return <Tile user={user} key={user.id} />;
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
