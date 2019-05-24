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
  OPEN_CONTAINER_TERMINAL,
  CLOSE_CONTAINER_TERMINAL,
} from './constants';

export const initialState = fromJS({
  termIsOpen: false,
  containerTermIsOpen: false,
});

function terminalPageReducer(state = initialState, { type, payload, meta, error }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case OPEN_TERMINAL:
      return state.set('termIsOpen', payload);

    case CLOSE_TERMINAL:
      return state.set('termIsOpen', false);

    case OPEN_CONTAINER_TERMINAL:
      return state.set('containerTermIsOpen', payload);

    case CLOSE_CONTAINER_TERMINAL:
      return state.set('containerTermIsOpen', false);

    default:
      return state;
  }
}

export default terminalPageReducer;
