/**
 *
 * Role Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';

import * as c from './constants';
import * as a from './actions';

const { prefix } = c;

export { prefix };

export const initialState = fromJS({
  role: {
    user: null,
    authBy: 'JWT',
  },
});

export const roleReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOGIN:
      return state;
    case c.LOGIN_SUCCESS:
      return state;

    case c.LOGOUT:
      return state;
    case c.LOGOUT_SUCCESS:
      return initialState;

    case c.LOAD_ROLE:
      return state;
    case c.LOAD_ROLE_SUCCESS: {
      const user = getByKey(payload, ['response', 'user']);
      const authBy = getByKey(payload, ['response', 'authBy']);
      return state
        .setIn(['role', 'user'], user)
        .setIn(['role', 'authBy'], authBy);
    }
    case c.LOAD_ROLE_FAILURE:
      return state;

    default:
      return state;
  }
};

export default roleReducer;
