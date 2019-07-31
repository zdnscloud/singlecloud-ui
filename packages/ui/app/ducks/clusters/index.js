/**
 *
 * Clusters Duck
 *
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  clusters: {},
  list: [],
  selectedCluster: {},
  openedLog: null,
  logs: [],
  openedNode: false,
  nodes: [],
});

const c = constants;

export const clustersReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_CLUSTERS:
      return state;
    case c.LOAD_CLUSTERS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state.set('clusters', fromJS(data)).set('list', fromJS(list));
    }
    case c.LOAD_CLUSTERS_FAILURE:
      return state;

    case c.REMOVE_CLUSTER:
      return state;
    case c.REMOVE_CLUSTER_SUCCESS: {
      const { id } = meta;
      return state
        .deleteIn(['clusters', id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_CLUSTER_FAILURE:
      return state;

    case c.CHANGE_CLUSTER:
      return state.set('selectedCluster', payload.clusterID);

    case c.CREATE_CLUSTER:
      return state;
    case c.CREATE_CLUSTER_SUCCESS: {
      const data = payload.response;
      return state.setIn(['clusters', data.id], fromJS(data));
    }
    case c.CREATE_CLUSTER_FAILURE:
      return state;

    case c.OPEN_CLUSTER_LOG:
      return state.set('openedLog', payload).set('logs', []);
    case c.CLOSE_CLUSTER_LOG:
      return state.set('openedLog', null);
    case c.SET_OPENING_LOG:
      return state.set('logs', payload);

    case c.OPEN_NODE:
      return state.set('openedNode', true);
    case c.CLOSE_NODE:
      return state.set('openedNode', false);

    case c.SET_NODES:
      return state.set('nodes', payload);

    case c.UPDATE_CLUSTER:
      return state;
    case c.UPDATE_CLUSTER_SUCCESS:
      // // const { clusterID } = meta;
      // // const data = payload.response;
      // // return state.setIn(['clusters', clusterID, data.id],fromJS(data));
      // const data = payload.response;
      // return state.setIn(['clusters', data.id], fromJS(data));
      return state;
    case c.UPDATE_CLUSTER_FAILURE:
        return state;

    default:
      return state;
  }
};

export default clustersReducer;
