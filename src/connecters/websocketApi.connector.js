// import { useState, useEffect } from 'react';
// import { useAuth0 } from './contexts/auth0-context';

// const base =
//   'https://ci2lsoudp3.execute-api.ap-southeast-2.amazonaws.com/dev/api';

// function useSlackApi(endpoint) {
//   const [data, setData] = useState({});
//   const [status, setStatus] = useState();
//   const [isLoading, setisLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { tempApiKey } = useAuth0();

//   useEffect(() => {
//     setisLoading(true);
//     setError(null);

//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${base}${endpoint}`, {
//           headers: { 'x-api-key': tempApiKey }
//         });
//         const data = await res.json();
//         setStatus(res.status);
//         setData(data);
//       } catch (e) {
//         setError(e);
//       } finally {
//         setisLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint, tempApiKey]);

//   return { data, isLoading, error, status };
// }

// export default useSlackApi;
