import { useState, useEffect } from 'react';
import { useAuth0 } from '../contexts/auth0-context';
import { baseUrl } from '../websocket.config';

function useWebsocket() {
  const [websocket, setWebsocket] = useState();
  const { tempApiKey } = useAuth0();

  useEffect(() => {
    const onopen = () => {
      console.log('ws connected');
    };

    const onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log('ws event');
      console.log(message);
    };

    const onclose = () => {
      console.log('disconnected');
      connect();
    };

    const connect = () => {
      if (!websocket || websocket.readyState > WebSocket.OPEN) {
        const websocket = new WebSocket(baseUrl);
        websocket.onopen = onopen;
        websocket.onmessage = onmessage;
        websocket.onclose = onclose;
        setWebsocket(websocket);
      }
    };

    connect();

    return () => {
      if (websocket) {
        // cancel the auto-reconnect
        websocket.onclose = () => null;
        websocket.close();
      }
    };
  }, [tempApiKey]);

  return { websocket };
}

export default useWebsocket;
