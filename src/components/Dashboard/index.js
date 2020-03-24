import React from 'react';
import useSlackApi from '../../useSlackApi';
import { useAuth0 } from '../../contexts/auth0-context';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { tempApiKey } = useAuth0();
  const { isLoading, error, data, status } = useSlackApi('/getUsers');

  const showUsers = userList => {
    console.log(userList);
    if (status === 403) {
      return <p>{data.body}</p>;
    } else {
      // const people = data.bod
      const { members } = data.body;
      console.log(members);
      const statuses = members.reduce((acc, member) => {
        const {
          id,
          is_bot,
          profile: { real_name, status_text, image_24 }
        } = member;
        const el = is_bot ? null : (
          <UserStatus
            name={real_name}
            key={id}
            status={status_text}
            image={image_24}
          />
        );
        console.log(el);
        return el ? [...acc, el] : acc;
      }, []);
      return <div className={styles.tiles}>{statuses.map(user => user)}</div>;
    }
  };

  return (
    <>
      <p>Temp Api Key: {tempApiKey}</p>
      {isLoading ? 'Loading...' : error ? error.message : showUsers(data.body)}
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
