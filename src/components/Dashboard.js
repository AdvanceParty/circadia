import React from 'react';
import useSlackApi from '../useSlackApi';

function Dashboard() {
  const { isLoading, error, data } = useSlackApi('/getUsers');
  const showUsers = userList => {
    console.log(userList);
    return <pre>JSON.stringify(userList)</pre>;
  };
  return (
    <>
      <p>Sick Dashboard Action right here!</p>
      {isLoading ? 'Loading...' : error ? error.message : showUsers(data.body)}
    </>
  );
}

export default Dashboard;
