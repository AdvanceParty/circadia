import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useHttpApi from '../../connecters/httpApi.connector';
import { useStore } from '../../contexts/store.context';
import styles from './Dashboard.module.scss';
import Tile from '../../components/Tile/Tile';
import User from '../../models/User';

function Dashboard() {
  const { isLoading, error, data } = useHttpApi('/users/list');
  const { dispatch, getUsers } = useStore();
  const users = data.users || [];

  useEffect(() => {
    users.map((user) => {
      dispatch({
        type: 'insertUser',
        payload: user,
      });
    });
  }, [users]);

  const showUsers = () => {
    const tiles = users.map((userData) => {
      const user = new User(userData);
      return <Tile userId={user.id} key={user.id} />;
    });

    return <div className={styles.tiles}>{tiles.map((tile) => tile)}</div>;
  };

  const content = isLoading ? 'Loading..' : error ? <Redirect to='/login' /> : showUsers(data);

  return <>{content}</>;
}

export default Dashboard;
