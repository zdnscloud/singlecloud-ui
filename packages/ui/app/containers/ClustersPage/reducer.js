/*
 *
 * ClustersPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  OPEN_CREATE_CLUSTER,
  CLOSE_CREATE_CLUSTER,
  LOAD_CLUSTERS,
  LOAD_CLUSTERS_REQUEST,
  LOAD_CLUSTERS_SUCCESS,
  LOAD_CLUSTERS_FAILURE,
  CREATE_CLUSTER,
  CREATE_CLUSTER_REQUEST,
  CREATE_CLUSTER_SUCCESS,
  CREATE_CLUSTER_FAILURE,
  UPDATE_CREATE_FORM,
} from './constants';

export const initialState = fromJS({
  clusters: {},
  tableList: [],
  selectedIDs: [],
  createIsOpen: false,
  createFormData: {},
});

function clustersPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state;

    case OPEN_CREATE_CLUSTER:
      return state.set('createIsOpen', true);

    case CLOSE_CREATE_CLUSTER:
      return state.set('createIsOpen', false);

    case LOAD_CLUSTERS_REQUEST:
      return state;

    case LOAD_CLUSTERS_SUCCESS: {
      const { data } = payload.data;
      const clusters = {};
      const list = data.map((item) => {
        clusters[item.id] = item;
        return item.id;
      });
      return state
        .set('tableList', fromJS(list))
        .mergeIn(['clusters'], clusters);
    }

    case LOAD_CLUSTERS_FAILURE:
      return state.set('loadClustersErrors', payload.errors);

    case CREATE_CLUSTER_REQUEST:
      return state;

    case CREATE_CLUSTER_SUCCESS:
      return state;

    case CREATE_CLUSTER_FAILURE:
      return state;

    case UPDATE_CREATE_FORM:
      return state.setIn(['createFormData', payload.name], payload.value);

    default:
      return state;
  }
}

export default clustersPageReducer;
