import React, { useState } from 'react';
import useHttpApi from '../connecters/httpApi.connector';

function Ping() {
  const { isLoading, error, data } = useHttpApi('/ping');

  // const forbidden = status === 403;

  return (
    <>
      <p>Loading: {isLoading}</p>
      <p>Error: {JSON.stringify(error) || '-'}</p>
      <p>Data Received: {JSON.stringify(data) || '-'}</p>
    </>
  );
}

export default Ping;
