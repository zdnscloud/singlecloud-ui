/**
 *
 * StatefulSets Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  statefulSets: {},
  list: [],
});

const c = constants;

export const statefulSetsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_STATEFULSETS:
      return state;
    case c.LOAD_STATEFULSETS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['statefulSets', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_STATEFULSETS_FAILURE:
      return state;

    case c.LOAD_STATEFULSET:
      return state;
    case c.LOAD_STATEFULSET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const statefulSet = payload.response;
      // temporary add, may remove when support cancel load data
      if (statefulSet && statefulSet.id) {
        return state.setIn(['statefulSets', clusterID, namespaceID, statefulSet.id], fromJS(statefulSet));
      }
      return state;
    }
    case c.LOAD_STATEFULSET_FAILURE:
      return state;

    case c.CREATE_STATEFULSET:
      return state;
    case c.CREATE_STATEFULSET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(['statefulSets', clusterID, namespaceID, data.id], fromJS(data));
    }

    case c.CREATE_STATEFULSET_FAILURE:
      return state;

    case c.UPDATE_STATEFULSET:
      return state;
    case c.UPDATE_STATEFULSET_SUCCESS:
      return state;
    case c.UPDATE_STATEFULSET_FAILURE:
      return state;

    case c.REMOVE_STATEFULSET:
      return state;
    case c.REMOVE_STATEFULSET_SUCCESS:
      return state
        .deleteIn(['statefulSets', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_STATEFULSET_FAILURE:
      return state;

    case c.SCALE_STATEFULSET:
      return state;
    case c.SCALE_STATEFULSET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn([
        'statefulSets',
        clusterID,
        namespaceID,
        data.id,
        'replicas',
      ], data.replicas);
    }
    case c.SCALE_STATEFULSET_FAILURE:
      return state;

    default:
      return state;
  }
};

export default statefulSetsReducer;
