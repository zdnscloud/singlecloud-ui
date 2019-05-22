/**
 *
 * TerminalPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  OPEN_TERMINAL,
  CLOSE_TERMINAL,
} from './constants';

export const initialState = fromJS({
  termIsOpen: false,
});

function terminalPageReducer(state = initialState, { type, payload, meta, error }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case OPEN_TERMINAL:
      return state.set('termIsOpen', payload);

    case CLOSE_TERMINAL:
      return state.set('termIsOpen', false);

    default:
      return state;
  }
}

export default terminalPageReducer;
