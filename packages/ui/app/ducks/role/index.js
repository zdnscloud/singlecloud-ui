/**
 *
 * Role Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import parseJWT from '@gsmlg/utils/parseJWT';

import * as c from './constants';
import * as a from './actions';

const { prefix } = c;

export { prefix };

export const initialState = fromJS({
  role: {},
  token: '',
  jwt: null,
});

export const roleReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOGIN:
      return state;

    case c.LOGIN_SUCCESS: {
      const token = getByKey(payload, ['response', 'token']);
      const jwt = parseJWT(token);
      return state
        .set('token', token)
        .set('jwt', jwt)
        .setIn(['role', 'user'], getByKey(jwt, ['payload', 'user']));
    }

    case c.LOGOUT:
      setTimeout(() => window.location = '/cas/logout');
      return initialState;

    case c.CAS_ROLE:
      return state;
    case c.CAS_ROLE_SUCCESS: {
      const user = getByKey(payload, ['response', 'user']);
      if (!user) {
        setTimeout(() => window.location = '/cas/login');
      }
      return state.setIn(['role', 'user'], user);
    }
    case c.CAS_ROLE_FAILURE:
      return state;

    default:
      return state;
  }
};

export default roleReducer;
