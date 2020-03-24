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
      return <p>JSON.stringify(data.body)</p>;
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
