/**
 *
 * Role Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import parseJWT from '@gsmlg/utils/parseJWT';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

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
    case constants.LOGIN:
      return state;

    case constants.LOGIN_SUCCESS: {
      const token = getByKey(payload, ['response', 'token']);
      const jwt = parseJWT(token);
      return state
        .set('token', token)
        .set('jwt', jwt)
        .setIn(['role', 'user'], getByKey(jwt, ['payload', 'user']));
    }

    default:
      return state;
  }
};

export default roleReducer;
