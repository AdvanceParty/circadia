import { useState, useEffect } from 'react';
import { useAuth0 } from '../contexts/auth0-context';
import { NotAuthorisedError } from '../models/Errors';

const { baseUrl, stage, versionString } = require('../httpApi.config.json');

const connectToServer = baseUrl[process.env.NODE_ENV] || baseUrl.default;
const endPoint = `${connectToServer}/${stage}/api/${versionString}`;
console.log(`--> Using API at ${endPoint}`);

function useHttpApi(method) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    setisLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const token = await getTokenSilently();
        const res = await fetch(`${endPoint}${method}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStatus(res.status);
        setData(data);
      } catch (e) {
        const authError = new NotAuthorisedError(e.error_description);
        console.error(authError);
        setError(authError);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, isLoading, error, status };
}

export default useHttpApi;
