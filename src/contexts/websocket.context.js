import React, { createContext, useContext, useEffect, useRef, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStore } from '../contexts/store.context';
import { useAuth0 } from '../contexts/auth0.context';

const wsConfig = require('../websocket.config');
const baseUrl = wsConfig[process.env.NODE_ENV] || wsConfig.default;
console.info(`--> Connecting to websocket at: ${baseUrl}`);

// create the context
export const WebsocketContext = createContext();
export const useWS = () => useContext(WebsocketContext);

// create a provider
export const WebsocketContextProvider = (props) => {
  const { dispatch } = useStore();
  let type;

  const onMessage = (msg) => {
    const { event, data, userId } = JSON.parse(msg.data);
    switch (event) {
      case WS_EVENTS.USER_PROFILE_CHANGE:
        type = 'updateUserProfile';
        break;
      case WS_EVENTS.USER_DND_CHANGE:
        type = 'updateUserDnd';
        break;
      case WS_EVENTS.USER_PRESENCE_CHANGE:
        type = 'updateUserPresence';
        break;
      default:
      // ignore
    }

    if (type) {
      dispatch({
        payload: { ...data, id: userId },
        type,
      });
    }
  };

  const onClose = () => {
    console.log('Websocket Closed');
  };
  const onOpen = () => {
    console.log('Websocket Opened');
  };

  const options = {
    onOpen: () => onOpen(),
    onClose: () => onClose(),
    onMessage: (msg) => onMessage(msg),
    shouldReconnect: (closeEvent) => true, //Will attempt to reconnect on all close events, such as server shutting down
  };

  const { token } = useAuth0();
  const [readyState] = useWebSocket(
    baseUrl,
    useMemo(() => options, [])
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
  }[readyState];

  return (
    <WebsocketContext.Provider value={{ connectionStatus }}>
      {props.children}
    </WebsocketContext.Provider>
  );
};

const WS_EVENTS = {
  USER_PROFILE_CHANGE: 'user_profile_change',
  USER_DND_CHANGE: 'user_dnd_change',
  USER_PRESENCE_CHANGE: 'user_presence_change',
};
