/*
 *
 * ServicesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_SERVICES_REQUEST,
  LOAD_SERVICES_SUCCESS,
  LOAD_SERVICES_FAILURE,
  LOAD_SERVICE_REQUEST,
  LOAD_SERVICE_SUCCESS,
  LOAD_SERVICE_FAILURE,
  OPEN_CREATE_SERVICE,
  CLOSE_CREATE_SERVICE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_SUCCESS,
  REMOVE_SERVICE_FAILURE,
} from './constants';

export const initialState = fromJS({
  services: {},
  tableList: [],
  selectedIDs: [],
  clusterID: null,
  namespaceID: null,
  loadServicesErrors: null,
});

function servicesPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('tableList', fromJS([]))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case LOAD_SERVICES_REQUEST:
      return state;

    case LOAD_SERVICES_SUCCESS: {
      const { clusterID, namespaceID, data } = payload;
      const services = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {},
      );
      let newState = state.mergeIn(
        ['services', clusterID, namespaceID],
        fromJS(services),
      );
      const list = data.data.map((item) => item.id);

      // load services is async
      if (
        state.get('clusterID') === clusterID &&
        state.get('namespaceID') === namespaceID
      )
        newState = newState.set('tableList', fromJS(list));

      return newState.set('loadServicesErrors', null);
    }

    case LOAD_SERVICES_FAILURE:
      return state.set('loadServicesErrors', payload.errors);

    case LOAD_SERVICE_REQUEST:
      return state;

    case LOAD_SERVICE_SUCCESS:
      return state.setIn(
        [
          'services',
          state.get('clusterID'),
          state.get('namespaceID'),
          payload.data.id,
        ],
        fromJS(payload.data),
      );

    case LOAD_SERVICE_FAILURE:
      return state;

    case OPEN_CREATE_SERVICE:
      return state.set('createIsOpen', true);

    case CLOSE_CREATE_SERVICE:
      return state.set('createIsOpen', false);

    case CREATE_SERVICE_REQUEST:
      return state;

    case CREATE_SERVICE_SUCCESS:
      return state;

    case CREATE_SERVICE_FAILURE:
      return state;

    case UPDATE_CREATE_FORM:
      return state.setIn(['createFormData', payload.name], payload.value);

    case REMOVE_SERVICE_REQUEST:
      return state;

    case REMOVE_SERVICE_SUCCESS:
      return state
        .deleteIn(['services', payload.clusterID, payload.id])
        .updateIn(['tableList'], (list) =>
          list.filterNot((n) => n === payload.id),
        );

    case REMOVE_SERVICE_FAILURE:
      return state;

    default:
      return state;
  }
}

export default servicesPageReducer;
