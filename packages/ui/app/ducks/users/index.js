/**
 *
 * Users Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  users: {},
  usersList: [],
});

const c = constants;

export const usersReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_USERS:
      return state;
    case c.LOAD_USERS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state.set('users', fromJS(data)).set('usersList', fromJS(list));
    }
    case c.LOAD_USERS_FAILURE:
      return state;

    case c.LOAD_USER:
      return state;
    case c.LOAD_USER_SUCCESS:
      return state;
    case c.LOAD_USER_FAILURE:
      return state;

    case c.CREATE_USER:
      return state;
    case c.CREATE_USER_SUCCESS: {
      const data = payload.response;
      return state.setIn(['users', data.id], fromJS(data));
    }

    case c.CREATE_USER_FAILURE:
      return state;

    case c.UPDATE_USER:
      return state;
    case c.UPDATE_USER_SUCCESS:
      return state;
    case c.UPDATE_USER_FAILURE:
      return state;

    case c.REMOVE_USER:
      return state;
    case c.REMOVE_USER_SUCCESS:
      return state;
    case c.REMOVE_USER_FAILURE:
      return state;

    default:
      return state;
  }
};

export default usersReducer;
