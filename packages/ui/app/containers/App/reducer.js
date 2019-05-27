/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  CHANGE_CLUSTER,
  TOGGLE_EVENTS_VIEW,
  TOGGLE_MENU_TEXT,
} from './constants';

export const initialState = fromJS({
  activeCluster: '',
  showEvents: false,
  showMenuText: true,
});

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case CHANGE_CLUSTER:
      return state
        .set('showEvents', false)
        .set('activeCluster', payload.cluster);

    case TOGGLE_EVENTS_VIEW:
      return state.set('showEvents', payload.showEvents);

    case TOGGLE_MENU_TEXT:
      return state.set('showMenuText', payload);

    default:
      return state;
  }
}

export default appReducer;
