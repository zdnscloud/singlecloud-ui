import { fromJS } from 'immutable';
import localforage from 'localforage';
import history from 'utils/history';
import persistentSubState from 'persistentSubState';

import configureStore from './configureStore';

localforage.config({
  // driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: 'SingleCloud',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'gsmlg', // Should be alphanumeric, with underscores.
  description: 'single cloud database',
});

// Create redux store with history
const initialState = {};

const store = { instance: null };

export const storePromise = new Promise((resolve, reject) => {
  localforage.getItem('persistentSubState').then((ps) => {
    const st = ps ? fromJS(ps) : initialState;
    store.instance = configureStore(st , history);
    resolve(store);
  });
});

export default store;
