import { useState, useEffect } from 'react';
import { useAuth0 } from '../contexts/auth0-context';
import config from '../httpApi.config.json';

const { basePath, stage, versionString } = config;
const endpoint = `${basePath}/${stage}/${versionString}`;

function useHttpApi(method) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  const { tempApiKey } = useAuth0();

  useEffect(() => {
    setisLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`${endpoint}${method}`, {
          headers: { 'x-api-key': tempApiKey },
        });
        const data = await res.json();
        setStatus(res.status);
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setisLoading(false);
      }
    };

    fetchData();
  }, [endpoint, tempApiKey]);

  return { data, isLoading, error, status };
}

export default useHttpApi;
