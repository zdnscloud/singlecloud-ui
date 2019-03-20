/*
 *
 * NodesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_NODES_REQUEST,
  LOAD_NODES_SUCCESS,
  LOAD_NODES_FAILURE,
} from './constants';

export const initialState = fromJS({
  nodes: {},
  tableList: [],
  selectedIDs: [],
  clusterID: null,
});

function nodesPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('clusterID', payload.cluster_id)
        .setIn(['nodes', payload.cluster_id], fromJS({}))
        .set('tableList', fromJS([]));

    case LOAD_NODES_REQUEST:
      return state;

    case LOAD_NODES_SUCCESS: {
      const { clusterID, data } = payload;
      const nodes = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {}
      );
      let newState = state.mergeIn(['nodes', clusterID], fromJS(nodes));
      const list = data.data.map((item) => item.id);
      // load nodes is async
      if (state.get('clusterID') === clusterID)
        newState = newState.set('tableList', fromJS(list));
      return newState;
    }

    case LOAD_NODES_FAILURE:
      return state.set('loadNodesErrors', payload.errors);

    default:
      return state;
  }
}

export default nodesPageReducer;
