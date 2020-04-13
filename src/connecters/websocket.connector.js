// import { useState, useEffect } from 'react';
// const config = require('../websocket.config.json');

// const getWebsocketUrl = () => {
//   // switch (process.env.NODE_ENV) {
//   //   case "development":
//   // }

//   const nodeEnv = process.env.NODE_ENV;
//   const url = config[nodeEnv] || config.default;
//   console.log(`Connecting to Websocket on ${url}`);
//   return url;
// };

// function useWebsocket() {
//   const [websocket, setWebsocket] = useState();
//   const [socketId, setSocketId] = useState(null);

//   useEffect(() => {
//     const onopen = () => {
//       console.log('ws connected');
//     };

//     const onmessage = (evt) => {
//       const message = JSON.parse(evt.data);
//       console.log('ws event');
//       console.log(message);
//     };

//     const onclose = () => {
//       console.log('disconnected');
//       connect();
//     };

//     const connect = () => {
//       if (!websocket || websocket.readyState > WebSocket.OPEN) {
//         const websocket = new WebSocket(getWebsocketUrl());
//         websocket.onopen = onopen;
//         websocket.onmessage = onmessage;
//         websocket.onclose = onclose;
//         setWebsocket(websocket);
//       }
//     };

//     connect();

//     return () => {
//       if (websocket) {
//         // cancel the auto-reconnect
//         websocket.onclose = () => null;
//         websocket.close();
//       }
//     };
//   }, [tempApiKey]);

//   return { websocket };
// }

// export default useWebsocket;
