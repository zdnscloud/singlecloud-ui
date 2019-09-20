/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';

import * as c from './constants';

export const { prefix } = c;

export const initialState = fromJS({
  events: {},
  clusterID: null,
});

function eventsReducer(state = initialState, { type, payload, meta }) {
  switch (type) {
    case c.OPEN_CLUSTER:
      return state
        .set('clusterID', payload.clusterID)
        .setIn(['events', payload.clusterID], []);

    case c.CLOSE_CLUSTER:
      return state
        .setIn(['events', state.get('clusterID')], [])
        .set('clusterID', null);

    case c.SET_EVENTS:
      return state.setIn(['events', meta.clusterID], payload.events);

    default:
      return state;
  }
}

export default eventsReducer;
