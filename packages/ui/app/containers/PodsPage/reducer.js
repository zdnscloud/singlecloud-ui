/*
 *
 * PodsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_PODS_REQUEST,
  LOAD_PODS_SUCCESS,
  LOAD_PODS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_POD_REQUEST,
  CREATE_POD_SUCCESS,
  CREATE_POD_FAILURE,
  UPDATE_CREATE_FORM,
  OPEN_LOG_VIEW,
  CLOSE_LOG_VIEW,
  ADD_LOG,
  SET_LOGS,
} from './constants';

export const initialState = fromJS({
  pods: {},
  tableList: [],
  clusterID: null,
  namespaceID: null,
  deploymentID: null,
  logs: [],
  logIsOpen: null,
});

function podsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('tableList', fromJS([]))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id)
        .set('deploymentID', payload.deployment_id);

    case LOAD_PODS_REQUEST:
      return state;

    case LOAD_PODS_SUCCESS: {
      const { clusterID, namespaceID, deploymentID, data } = payload;
      const pods = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {}
      );
      let newState = state.mergeIn(
        ['pods', clusterID, namespaceID, deploymentID],
        fromJS(pods)
      );
      const list = data.data.map((item) => item.id);

      // load pods is async
      if (
        state.get('clusterID') === clusterID &&
        state.get('namespaceID') === namespaceID &&
        state.get('deploymentID') === deploymentID
      )
        newState = newState.set('tableList', fromJS(list));

      return newState.set('loadPodsErrors', null);
    }

    case LOAD_PODS_FAILURE:
      return state.set('loadPodsErrors', payload.errors);

    case OPEN_LOG_VIEW:
      return state
        .set('logIsOpen', [payload.podID, payload.name])
        .set('logs', []);

    case CLOSE_LOG_VIEW:
      return state.set('logIsOpen', null).set('logs', []);

    case SET_LOGS:
      return state.set('logs', payload.logs);

    default:
      return state;
  }
}

export default podsPageReducer;
