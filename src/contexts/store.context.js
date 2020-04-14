import React, { createContext, useContext, useReducer } from 'react';
// import React, { useMemo, useRef, useState } from 'react';
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
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log(action);
    const { type, payload } = action;
    switch (type) {
      case 'insertUser':
        var updatedUser = new User(payload);
        return { users: { ...state.users, [updatedUser.id]: updatedUser } };
      case 'user_profile_change':
        var updatedUser = state.users[payload.id] || new User();
        updatedUser.setProfile(payload);
        return { users: { ...state.users, [updatedUser.id]: updatedUser } };
      case 'user_dnd_change':
        var updatedUser = state.users[payload.id] || new User();
        updatedUser.setDndStatus(payload);
        return { users: { ...state.users, [updatedUser.id]: updatedUser } };
      case 'user_presence_change':
        var updatedUser = state.users[payload.id] || new User();
        updatedUser.setPresence(payload);
        return { users: { ...state.users, [updatedUser.id]: updatedUser } };
      default:
        throw new Error(`Invalid action '${type}' for Store reducer.`);
    }
  }, initialState);

  const getUsers = () => {
    const values = Object.values(state.users);
    return values.map((user) => user.clone());
  };

  return <Store.Provider value={{ state, dispatch, getUsers }}>{props.children}</Store.Provider>;
};
