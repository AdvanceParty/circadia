import React from 'react';
import { useAuth0 } from '../contexts/auth0-context';

import { Button } from 'rebass';
import { Label, Input } from '@rebass/forms';

function AuthedUser(props) {
  const { user, logout, tempApiKey, updateTempApiKey } = useAuth0();
  const onKeyChange = event => {
    updateTempApiKey(event.target.value);
  };
  return (
    <>
      {user.name} |<Label htmlFor='api-temp-token'>API Key</Label>
      <Input
        id='api-temp-token'
        name='api-temp-token'
        type='text'
        placeholder='API Key'
        value={tempApiKey}
        onChange={onKeyChange}
      />
      <Button onClick={logout}>Logout</Button>
    </>
  );
}

export default AuthedUser;
