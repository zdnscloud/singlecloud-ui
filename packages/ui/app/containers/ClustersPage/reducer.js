/*
 *
 * ClustersPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_CLUSTERS_REQUEST,
  LOAD_CLUSTERS_SUCCESS,
  LOAD_CLUSTERS_FAILURE,
  LOAD_CLUSTER_REQUEST,
  LOAD_CLUSTER_SUCCESS,
  LOAD_CLUSTER_FAILURE,
} from './constants';

export const initialState = fromJS({
  clusters: {},
  tableList: [],
  selectedIDs: [],
  loadClustersErrors: null,
});

function clustersPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case LOAD_CLUSTERS_REQUEST:
      return state;

    case LOAD_CLUSTERS_SUCCESS: {
      const { data } = payload.data;
      const clusters = {};
      const list = data.map(item => {
        clusters[item.id] = item;
        return item.id;
      });
      return state
        .set('loadClustersErrors', null)
        .set('tableList', fromJS(list))
        .mergeIn(['clusters'], clusters);
    }

    case LOAD_CLUSTERS_FAILURE:
      return state.set('loadClustersErrors', payload.errors);

    case LOAD_CLUSTER_REQUEST:
      return state;

    case LOAD_CLUSTER_SUCCESS:
      return state.setIn(['clusters', payload.data.id], fromJS(payload.data));

    case LOAD_CLUSTER_FAILURE:
      return state;

    default:
      return state;
  }
}

export default clustersPageReducer;
