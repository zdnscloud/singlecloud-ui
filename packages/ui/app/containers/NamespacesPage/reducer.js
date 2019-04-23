/*
 *
 * NamespacesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_NAMESPACES_REQUEST,
  LOAD_NAMESPACES_SUCCESS,
  LOAD_NAMESPACES_FAILURE,
  LOAD_NAMESPACE_REQUEST,
  LOAD_NAMESPACE_SUCCESS,
  LOAD_NAMESPACE_FAILURE,
  OPEN_CREATE_NAMESPACE,
  CLOSE_CREATE_NAMESPACE,
  CREATE_NAMESPACE_REQUEST,
  CREATE_NAMESPACE_SUCCESS,
  CREATE_NAMESPACE_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_NAMESPACE_REQUEST,
  REMOVE_NAMESPACE_SUCCESS,
  REMOVE_NAMESPACE_FAILURE,
  CHANGE_NAMESPACE,
} from './constants';

export const initialState = fromJS({
  namespaces: {},
  tableList: [],
  selectedIDs: [],
  createIsOpen: false,
  createFormData: {},
  loadNamespacesErrors: null,
  selectedNamespace: {},
});

function namespacesPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state.set('tableList', fromJS([]));

    case LOAD_NAMESPACES_REQUEST:
      return state;

    case LOAD_NAMESPACES_SUCCESS: {
      const { clusterID, data } = payload;
      const namespaces = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {}
      );
      let newState = state.mergeIn(
        ['namespaces', clusterID],
        fromJS(namespaces)
      );
      const list = data.data.map((item) => item.id);
      // load namespaces is async
      newState = newState.set('tableList', fromJS(list));
      return newState.set('loadNamespacesErrors', null);
    }

    case LOAD_NAMESPACES_FAILURE:
      return state.set('loadNamespacesErrors', payload.errors);

    case LOAD_NAMESPACE_REQUEST:
      return state;

    case LOAD_NAMESPACE_SUCCESS:
      return state.setIn(['namespaces', payload.data.id], fromJS(payload.data));

    case LOAD_NAMESPACE_FAILURE:
      return state;

    case OPEN_CREATE_NAMESPACE:
      return state.set('createIsOpen', true);

    case CLOSE_CREATE_NAMESPACE:
      return state.set('createIsOpen', false);

    case CREATE_NAMESPACE_REQUEST:
      return state;

    case CREATE_NAMESPACE_SUCCESS:
      return state;

    case CREATE_NAMESPACE_FAILURE:
      return state;

    case UPDATE_CREATE_FORM:
      return state.setIn(['createFormData', payload.name], payload.value);

    case REMOVE_NAMESPACE_REQUEST:
      return state;

    case REMOVE_NAMESPACE_SUCCESS:
      return state
        .deleteIn(['namespaces', payload.clusterID, payload.id])
        .updateIn(['tableList'], (list) =>
          list.filterNot((n) => n === payload.id)
        );

    case REMOVE_NAMESPACE_FAILURE:
      return state;

    case CHANGE_NAMESPACE:
      return state.setIn(
        ['selectedNamespace', payload.clusterID],
        payload.namespaceID
      );

    default:
      return state;
  }
}

export default namespacesPageReducer;
