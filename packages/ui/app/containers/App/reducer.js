/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { INIT_ACTION, CHANGE_CLUSTER } from './constants';

export const initialState = fromJS({
  activeCluster: '',
});

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case CHANGE_CLUSTER:
      return state.set('activeCluster', payload.cluster);

    default:
      return state;
  }
}

export default appReducer;
