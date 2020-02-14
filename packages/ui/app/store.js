import { fromJS } from 'immutable';
import history from 'utils/history';
import persistentSubState from 'persistentSubState';

import configureStore from './configureStore';

// Create redux store with history
const initialState = {};

const store = configureStore(initialState, history);

export default store;
