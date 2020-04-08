import { useState, useEffect } from 'react';
import { useAuth0 } from '../contexts/auth0-context';
import { baseUrl } from '../httpApi.config.js';

function useHttpApi(method) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  const { tempApiKey } = useAuth0();

  useEffect(() => {
    setisLoading(true);
    setError(null);

    const requestOptions = {
      headers: {
        // 'Content-Type': 'application/json',
        'X-Api-Key': tempApiKey,
      },
      // method: 'POST',
    };

    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}${method}`, requestOptions);
        const data = await res.json();
        console.log(data);
        setStatus(res.status);
        console.log(res.status);
        setData(data);
      } catch (e) {
        console.errors(`AWS API Error: ${e.message}`);
        console.error(e);
        setError(e);
      } finally {
        setisLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, tempApiKey]);

  return { data, isLoading, error, status };
}

export default useHttpApi;
