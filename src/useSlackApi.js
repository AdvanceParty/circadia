import { useState, useEffect } from 'react';
import { useAuth0 } from './contexts/auth0-context';

const base = '/api';

function useSlackApi(endpoint) {
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  const { tempApiKey } = useAuth0();

  useEffect(() => {
    setisLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`${base}${endpoint}`, {
          headers: { 'temp-token': tempApiKey }
        });
        const data = await res.json();
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setisLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}

export default useSlackApi;
