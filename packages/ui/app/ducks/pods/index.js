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
  openingPodLog: null,
  openingLogs: [],
  pods: {},
  list: [],
  stsPods: {},
  stsList: [],
  dsPods: {},
  dsList: [],
});

const c = constants;

export const podsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
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

    // deploy
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

    // sts
    case c.LOAD_STS_PODS:
      return state;
    case c.LOAD_STS_PODS_SUCCESS: {
      const { clusterID, namespaceID, statefulSetID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['stsPods', clusterID, namespaceID, statefulSetID], fromJS(data))
        .set('stsList', fromJS(list));
    }
    case c.LOAD_STS_PODS_FAILURE:
      return state;

    // ds
    case c.LOAD_DS_PODS:
      return state;
    case c.LOAD_DS_PODS_SUCCESS: {
      const { clusterID, namespaceID, daemonSetID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['dsPods', clusterID, namespaceID, daemonSetID], fromJS(data))
        .set('dsList', fromJS(list));
    }
    case c.LOAD_DS_PODS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default podsReducer;
