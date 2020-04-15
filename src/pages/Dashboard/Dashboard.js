import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useHttpApi from '../../connecters/httpApi.connector';
import { useStore } from '../../contexts/store.context';
import styles from './Dashboard.module.scss';
import Tile from '../../components/Tile/Tile';
import User from '../../models/User';

const sortBy = require('lodash.sortby');

function Dashboard() {
  const { isLoading, error, data } = useHttpApi('/users/list');
  const { dispatch, getUsers } = useStore();
  const users = data.users || [];
  const [filterOnline, setFilterOnline] = useState(false);

  useEffect(() => {
    users.map((user) => {
      dispatch({
        type: 'insertUser',
        payload: user,
      });
    });
  }, [users]);

  const showUsers = () => {
    const users = sortBy(getUsers(), [
      function (user) {
        return user.name;
      },
    ]);

    const tiles = users.map((userData) => {
      const user = new User(userData);
      return <Tile userId={user.id} key={user.id} />;
    });

    return (
      <div className={styles.tiles} data-filter-online={filterOnline}>
        {tiles.map((tile) => tile)}
      </div>
    );
  };

  const content = isLoading ? 'Loading..' : error ? <Redirect to='/login' /> : showUsers();

  return (
    <>
      <div>
        Showing {filterOnline ? 'online peeps' : 'everybody'}.
        <button onClick={() => setFilterOnline(!filterOnline)}>
          {filterOnline ? 'Show All' : 'Show Online'}
        </button>
      </div>
      {content}
    </>
  );
}

export default Dashboard;
