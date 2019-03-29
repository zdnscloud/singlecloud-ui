/*
 *
 * ApplicationsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_APPLICATIONS_REQUEST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_APPLICATION_REQUEST,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_FAILURE,
  UPDATE_CREATE_FORM,
  CHANGE_NAMESPACE,
} from './constants';

const defaultFormData = {
  name: '',
  replicas: '',
  containers: [],
  namespaceID: null,
  advancedOptions: {
    exposedServiceType: '',
    exposedServices: [],
  },
};

export const initialState = fromJS({
  applications: {},
  tableList: [],
  createFormData: defaultFormData,
  clusterID: null,
  namespaceID: null,
});

function applicationsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('tableList', fromJS([]))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', 'default');

    case CHANGE_NAMESPACE:
      return state
        .set('tableList', fromJS([]))
        .set('namespaceID', payload.namespaceID);

    case LOAD_APPLICATIONS_REQUEST:
      return state;

    case LOAD_APPLICATIONS_SUCCESS: {
      const { clusterID, namespaceID, data } = payload;
      const applications = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {}
      );
      let newState = state.mergeIn(
        ['applications', clusterID, namespaceID],
        fromJS(applications)
      );
      const list = data.data.map((item) => item.id);

      // load applications is async
      if (
        state.get('clusterID') === clusterID &&
        state.get('namespaceID') === namespaceID
      )
        newState = newState.set('tableList', fromJS(list));

      return newState.set('loadApplicationsErrors', null);
    }

    case LOAD_APPLICATIONS_FAILURE:
      return state.set('loadApplicationsErrors', payload.errors);

    case INIT_CREATE_FORM:
      return state
        .set('createFormData', fromJS(defaultFormData))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case CREATE_APPLICATION_REQUEST:
      return state;

    case CREATE_APPLICATION_SUCCESS:
      return state;

    case CREATE_APPLICATION_FAILURE:
      return state;

    case UPDATE_CREATE_FORM: {
      let newState;
      if (Array.isArray(payload.name)) {
        if (payload.value == null) {
          newState = state.deleteIn(['createFormData'].concat(payload.name));
        } else {
          newState = state.setIn(
            ['createFormData'].concat(payload.name),
            payload.value
          );
        }
      } else if (payload.value == null) {
        newState = state.deleteIn(['createFormData', payload.name]);
      } else {
        newState = state.setIn(['createFormData', payload.name], payload.value);
      }
      const ports = newState
        .getIn(['createFormData', 'containers'])
        .map((ctn) =>
          ctn
            .get('exposedPorts')
            .filter((p) => typeof p.get('port') === 'number')
        )
        .flatten(true);

      return newState.updateIn(
        ['createFormData', 'advancedOptions', 'exposedServices'],
        (exposedServices) =>
          exposedServices.filter((svc) =>
            ports.find(
              (port) =>
                port.get('port') === svc.get('port') &&
                port.get('protocol') === svc.get('protocol')
            )
          )
      );
    }

    default:
      return state;
  }
}

export default applicationsPageReducer;
