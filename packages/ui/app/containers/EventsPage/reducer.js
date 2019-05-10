/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { INIT_ACTION, ADD_EVENT, SET_EVENTS } from './constants';

export const initialState = fromJS({
  events: {},
  selectedIDs: [],
  clusterID: null,
});

function eventsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('clusterID', payload.cluster_id)
        .setIn(['events', payload.cluster_id], []);

    case ADD_EVENT:
      return state.updateIn(['events', state.get('clusterID')], (events) =>
        events.push(payload.event)
      );

    case SET_EVENTS:
      return state.setIn(
        ['events', state.get('clusterID')],
        payload.events
      );

    default:
      return state;
  }
}

export default eventsPageReducer;
