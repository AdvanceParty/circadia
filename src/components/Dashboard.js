import React from 'react';
import useSlackApi from '../useSlackApi';
import { useAuth0 } from '../contexts/auth0-context';

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
          <li key={id}>
            <img src={image_24} alt={`'${real_name} Avatar'`} />
            {real_name} | {status_text}
          </li>
        );
        console.log(el);
        return [...acc, el];
      }, []);
      return <ul>{statuses.map(li => li)}</ul>;
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
