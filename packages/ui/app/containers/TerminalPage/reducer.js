/*
 *
 * TerminalPage reducer
 *
 */

import { fromJS } from 'immutable';
import { INIT_ACTION } from './constants';

export const initialState = fromJS({});

function terminalPageReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_ACTION:
      return state;
    default:
      return state;
  }
}

export default terminalPageReducer;
