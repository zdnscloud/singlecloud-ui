/*
 *
 * DeploymentsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_DEPLOYMENTS_REQUEST,
  LOAD_DEPLOYMENTS_SUCCESS,
  LOAD_DEPLOYMENTS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_DEPLOYMENT_REQUEST,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAILURE,
  UPDATE_CREATE_FORM,
} from './constants';

export const initialState = fromJS({
  depolyments: {},
  tableList: [],
  createFormData: { name: '', replicas: '', containers: [] },
  clusterID: null,
  namespaceID: null,
});

function deploymentsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('tableList', fromJS([]))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case LOAD_DEPLOYMENTS_REQUEST:
      return state;

    case LOAD_DEPLOYMENTS_SUCCESS: {
      const { clusterID, namespaceID, data } = payload;
      const deployments = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {},
      );
      let newState = state.mergeIn(
        ['deployments', clusterID, namespaceID],
        fromJS(deployments),
      );
      const list = data.data.map(item => item.id);

      // load deployments is async
      if (
        state.get('clusterID') === clusterID &&
        state.get('namespaceID') === namespaceID
      )
        newState = newState.set('tableList', fromJS(list));

      return newState.set('loadDeploymentsErrors', null);
    }

    case LOAD_DEPLOYMENTS_FAILURE:
      return state.set('loadDeploymentsErrors', payload.errors);

    case INIT_CREATE_FORM:
      return state
        .set(
          'createFormData',
          fromJS({ name: '', replicas: '', containers: [] }),
        )
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case CREATE_DEPLOYMENT_REQUEST:
      return state;

    case CREATE_DEPLOYMENT_SUCCESS:
      return state;

    case CREATE_DEPLOYMENT_FAILURE:
      return state;

    case UPDATE_CREATE_FORM: {
      if (Array.isArray(payload.name)) {
        if (payload.value == null) {
          return state.deleteIn(['createFormData'].concat(payload.name));
        }
        return state.setIn(
          ['createFormData'].concat(payload.name),
          payload.value,
        );
      }
      if (payload.value == null) {
        return state.deleteIn(['createFormData', payload.name]);
      }
      return state.setIn(['createFormData', payload.name], payload.value);
    }

    default:
      return state;
  }
}

export default deploymentsPageReducer;
