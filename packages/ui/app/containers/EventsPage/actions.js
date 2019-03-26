/*
 *
 * EventsPage actions
 *
 */

import { INIT_ACTION, ADD_EVENT, SET_EVENTS } from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: { event },
});

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: { events },
});
