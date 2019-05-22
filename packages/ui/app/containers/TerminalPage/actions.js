/*
 *
 * TerminalPage actions
 *
 */

import {
  INIT_ACTION,
  OPEN_TERMINAL,
  CLOSE_TERMINAL,
} from './constants';

export const initAction = () => ({
  type: INIT_ACTION,
  payload: {},
});

export const openTerminal = (id) => ({
  type: OPEN_TERMINAL,
  payload: id,
});

export const closeTerminal = () => ({
  type: CLOSE_TERMINAL,
  payload: {},
});
