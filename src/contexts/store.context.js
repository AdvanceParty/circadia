import React, { createContext, useContext, useReducer } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import User from '../models/User';

// import useWebSocket from 'react-use-websocket';
// const wsConfig = require('../../websocket.config');
// const baseUrl = wsConfig[process.env.NODE_ENV] || wsConfig.default;
// console.info(`--> Connecting to websocket at: ${baseUrl}`);

// create the context
export const Store = createContext();
export const useStore = () => useContext(Store);

// initial state
const initialState = {
  users: {},
};

// create a provider
const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'user_profile_change':
        const updatedUser = state.users[payload.id] || new User();
        updatedUser.setProfile(payload);
        return { users: { ...state.users, updatedUser } };
      case 'user_dnd_change':
        const updatedUser = state.users[payload.id] || new User();
        updatedUser.setDndStatus(payload);
        return { users: { ...state.users, updatedUser } };
      case 'user_presence_change':
        const updatedUser = state.users[payload.id] || new User();
        updatedUser.setPresence(payload);
        return { users: { ...state.users, updatedUser } };
      default:
        throw new Error(`Invalid action '${tpye}' for Store reducer.`);
    }
  };

  return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>;
};
