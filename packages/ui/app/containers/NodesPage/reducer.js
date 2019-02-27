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
  LOAD_CLUSTER_REQUEST,
  LOAD_CLUSTER_SUCCESS,
  LOAD_CLUSTER_FAILURE,
  UPDATE_CREATE_FORM,
} from './constants';

export const initialState = fromJS({
  nodes: {},
  tableList: [],
  selectedIDs: [],
  clusterID: null,
  cluster: {},
});

function nodesPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state.set('clusterID', payload.cluster_id);

    case LOAD_NODES_REQUEST:
      return state;

    case LOAD_NODES_SUCCESS: {
      const { data } = payload.data;
      const nodes = {};
      const list = data.map((item) => {
        nodes[item.id] = item;
        return item.id;
      });
      return state
        .set('tableList', fromJS(list))
        .mergeIn(['nodes'], nodes);
    }

    case LOAD_NODES_FAILURE:
      return state.set('loadNodesErrors', payload.errors);

    case LOAD_CLUSTER_REQUEST:
      return state;

    case LOAD_CLUSTER_SUCCESS:
      return state.set('cluster', fromJS(payload.data));

    case LOAD_CLUSTER_FAILURE:
      return state;

    case UPDATE_CREATE_FORM:
      return state.setIn(['createFormData', payload.name], payload.value);

    default:
      return state;
  }
}

export default nodesPageReducer;
