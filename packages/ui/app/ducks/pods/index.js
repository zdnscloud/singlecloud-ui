/**
 *
 * Pods Duck
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
  pods: {},
  list: [],
  openingPodLog: null,
  openingLogs: [],
});

const c = constants;

export const podsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_PODS:
      return state;
    case c.LOAD_PODS_SUCCESS: {
      const { clusterID, namespaceID, deploymentID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['pods', clusterID, namespaceID, deploymentID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_PODS_FAILURE:
      return state;

    case c.LOAD_POD:
      return state;
    case c.LOAD_POD_SUCCESS: {
      const { clusterID, namespaceID, deploymentID } = meta;
      const pod = payload.response;
      return state.setIn(['pods', clusterID, namespaceID, deploymentID, pod.id], fromJS(pod));
    }
    case c.LOAD_POD_FAILURE:
      return state;

    case c.REMOVE_POD:
      return state;
    case c.REMOVE_POD_SUCCESS:
      return state;
    case c.REMOVE_POD_FAILURE:
      return state;

    case c.OPEN_POD_LOG: {
      const { clusterID, namespaceID, deploymentID } = meta;
      const { podID, containerName } = payload;
      return state.set('openingPodLog', {
        clusterID,
        namespaceID,
        deploymentID,
        podID,
        containerName,
      });
    }
    case c.CLOSE_POD_LOG:
      return state
        .set('openingPodLog', null)
        .set('openingLogs', fromJS([]));

    case c.SET_OPENING_LOGS:
      return state.set('openingLogs', payload);

    default:
      return state;
  }
};

export default podsReducer;
