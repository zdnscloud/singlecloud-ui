/**
 *
 * DaemonSets Duck
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
  daemonSets: {},
  list: [],
});

const c = constants;

export const daemonSetsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_DAEMONSETS:
      return state;
    case c.LOAD_DAEMONSETS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['daemonSets', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_DAEMONSETS_FAILURE:
      return state;

    case c.LOAD_DAEMONSET:
      return state;
    case c.LOAD_DAEMONSET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const daemonSet = payload.response;
      // temporary add, may remove when support cancel load data
      if (daemonSet && daemonSet.id) {
        return state.setIn(
          ['daemonSets', clusterID, namespaceID, daemonSet.id],
          fromJS(daemonSet)
        );
      }
      return state;
    }
    case c.LOAD_DAEMONSET_FAILURE:
      return state;

    case c.CREATE_DAEMONSET:
      return state;
    case c.CREATE_DAEMONSET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['daemonSets', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }

    case c.CREATE_DAEMONSET_FAILURE:
      return state;

    case c.UPDATE_DAEMONSET:
      return state;
    case c.UPDATE_DAEMONSET_SUCCESS:
      return state;
    case c.UPDATE_DAEMONSET_FAILURE:
      return state;

    case c.REMOVE_DAEMONSET:
      return state;
    case c.REMOVE_DAEMONSET_SUCCESS:
      return state
        .deleteIn(['daemonSets', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_DAEMONSET_FAILURE:
      return state;

    case c.SCALE_DAEMONSET:
      return state;
    case c.SCALE_DAEMONSET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['daemonSets', clusterID, namespaceID, data.id, 'replicas'],
        data.replicas
      );
    }
    case c.SCALE_DAEMONSET_FAILURE:
      return state;

    default:
      return state;
  }
};

export default daemonSetsReducer;
