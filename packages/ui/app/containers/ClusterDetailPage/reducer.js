/*
 *
 * ClusterDetailPage reducer
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
  clusterDetail: {},
  tableList: [],
  selectedIDs: [],
  loadClusterDetailErrors: null,
});

function clusterDetailPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case LOAD_CLUSTERS_REQUEST:
      return state;

    case LOAD_CLUSTERS_SUCCESS: {
      const { data } = payload.data;
      const clusterDetail = {};
      const list = data.map((item) => {
        clusterDetail[item.id] = item;
        return item.id;
      });
      return state
        .set('loadClusterDetailErrors', null)
        .set('tableList', fromJS(list))
        .mergeIn(['clusterDetail'], fromJS(clusterDetail));
    }

    case LOAD_CLUSTERS_FAILURE:
      return state.set('loadClusterDetailErrors', payload.errors);

    case LOAD_CLUSTER_REQUEST:
      return state;

    case LOAD_CLUSTER_SUCCESS:
      return state.setIn(
        ['clusterDetail', payload.data.id],
        fromJS(payload.data)
      );

    case LOAD_CLUSTER_FAILURE:
      return state;

    default:
      return state;
  }
}

export default clusterDetailPageReducer;
