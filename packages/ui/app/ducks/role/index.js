/**
 *
 * Role Duck
 *
 */
import { fromJS } from 'immutable';

import * as constants from './constants';
import * as actions from './actions';

export { constants, actions };

/*
  reducer
*/
export const initialState = fromJS({
  role: {},
  authorization: '',
});

function roleReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default roleReducer;
