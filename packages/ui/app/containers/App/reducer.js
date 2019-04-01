/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { INIT_ACTION, CHANGE_CLUSTER, TOGGLE_EVENTS_VIEW } from './constants';

export const initialState = fromJS({
  activeCluster: '',
  showEvents: false,
});

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case CHANGE_CLUSTER:
      if (payload.cluster === '') {
        return state
          .set('showEvents', false)
          .set('activeCluster', payload.cluster);
      }
      return state.set('activeCluster', payload.cluster);

    case TOGGLE_EVENTS_VIEW:
      return state.set('showEvents', payload.showEvents);

    default:
      return state;
  }
}

export default appReducer;
