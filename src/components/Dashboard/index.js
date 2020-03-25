import React from 'react';
import useSlackApi from '../../useSlackApi';
import { useAuth0 } from '../../contexts/auth0-context';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { tempApiKey } = useAuth0();
  const { isLoading, error, data, status } = useSlackApi('/users');

  const showUsers = users => {
    console.log(users);
    if (status === 403) {
      return <p>Forbidden</p>;
    } else {
      const statuses = users.map(user => (
        <UserStatus
          name={user.profile.real_name}
          key={user.id}
          status={user.profile.status_text}
          image={user.profile.image_24}
        />
      ));
      return <div className={styles.tiles}>{statuses.map(user => user)}</div>;
    }
  };

  return (
    <>
      {isLoading ? 'Loading...' : error ? error.message : showUsers(data.users)}
    </>
  );
}

export default Dashboard;

const UserStatus = props => {
  return (
    <div className={styles.userStatus} key={props.id}>
      <img src={props.image} />
      <h5>{props.name}</h5>
      <p>{props.status}</p>
    </div>
  );
};
