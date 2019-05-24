/*
 *
 * TerminalPage actions
 *
 */

import {
  INIT_ACTION,
  OPEN_TERMINAL,
  CLOSE_TERMINAL,
  OPEN_CONTAINER_TERMINAL,
  CLOSE_CONTAINER_TERMINAL,
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

export const openContainerTerminal = (pod) => ({
  type: OPEN_CONTAINER_TERMINAL,
  payload: pod,
});

export const closeContainerTerminal = () => ({
  type: CLOSE_CONTAINER_TERMINAL,
  payload: {},
});
