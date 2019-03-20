/*
 *
 * IngressesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_INGRESSES_REQUEST,
  LOAD_INGRESSES_SUCCESS,
  LOAD_INGRESSES_FAILURE,
  LOAD_INGRESS_REQUEST,
  LOAD_INGRESS_SUCCESS,
  LOAD_INGRESS_FAILURE,
  OPEN_CREATE_INGRESS,
  CLOSE_CREATE_INGRESS,
  CREATE_INGRESS_REQUEST,
  CREATE_INGRESS_SUCCESS,
  CREATE_INGRESS_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_INGRESS_REQUEST,
  REMOVE_INGRESS_SUCCESS,
  REMOVE_INGRESS_FAILURE,
} from './constants';

export const initialState = fromJS({
  ingresses: {},
  tableList: [],
  selectedIDs: [],
  clusterID: null,
  createIsOpen: false,
  createFormData: {},
  loadIngressesErrors: null,
});

function ingressesPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('tableList', fromJS([]))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case LOAD_INGRESSES_REQUEST:
      return state;

    case LOAD_INGRESSES_SUCCESS: {
      const { clusterID, namespaceID, data } = payload;
      const ingresses = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {}
      );
      let newState = state.mergeIn(
        ['ingresses', clusterID, namespaceID],
        fromJS(ingresses)
      );
      const list = data.data.map((item) => item.id);
      // load ingresses is async
      if (
        state.get('clusterID') === clusterID &&
        state.get('namespaceID') === namespaceID
      )
        newState = newState.set('tableList', fromJS(list));
      return newState.set('loadIngressesErrors', null);
    }

    case LOAD_INGRESSES_FAILURE:
      return state.set('loadIngressesErrors', payload.errors);

    case LOAD_INGRESS_REQUEST:
      return state;

    case LOAD_INGRESS_SUCCESS:
      return state.setIn(['ingresses', payload.data.id], fromJS(payload.data));

    case LOAD_INGRESS_FAILURE:
      return state;

    case OPEN_CREATE_INGRESS:
      return state.set('createIsOpen', true);

    case CLOSE_CREATE_INGRESS:
      return state.set('createIsOpen', false);

    case CREATE_INGRESS_REQUEST:
      return state;

    case CREATE_INGRESS_SUCCESS:
      return state;

    case CREATE_INGRESS_FAILURE:
      return state;

    case UPDATE_CREATE_FORM:
      return state.setIn(['createFormData', payload.name], payload.value);

    case REMOVE_INGRESS_REQUEST:
      return state;

    case REMOVE_INGRESS_SUCCESS:
      return state
        .deleteIn(['ingresses', payload.clusterID, payload.id])
        .updateIn(['tableList'], (list) =>
          list.filterNot((n) => n === payload.id)
        );

    case REMOVE_INGRESS_FAILURE:
      return state;

    default:
      return state;
  }
}

export default ingressesPageReducer;
