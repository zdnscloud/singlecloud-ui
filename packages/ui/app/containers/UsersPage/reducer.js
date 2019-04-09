/*
 *
 * UsersPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from './constants';

export const initialState = fromJS({
  users: {},
  tableList: [],
  selectedIDs: [],
  loadUsersErrors: null,
});

function usersPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case LOAD_USERS_REQUEST:
      return state;

    case LOAD_USERS_SUCCESS: {
      const { data } = payload.data;
      const users = {};
      const list = data.map((item) => {
        users[item.id] = item;
        return item.id;
      });
      return state
        .set('loadUsersErrors', null)
        .set('tableList', fromJS(list))
        .set('users', fromJS(users));
    }

    case LOAD_USERS_FAILURE:
      return state.set('loadUsersErrors', payload.errors);

    case LOAD_USER_REQUEST:
      return state;

    case LOAD_USER_SUCCESS:
      return state.setIn(['users', payload.data.id], fromJS(payload.data));

    case LOAD_USER_FAILURE:
      return state;

    default:
      return state;
  }
}

export default usersPageReducer;
