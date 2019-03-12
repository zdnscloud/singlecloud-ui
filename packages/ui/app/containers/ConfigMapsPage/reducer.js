/*
 *
 * ConfigMapsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ACTION,
  LOAD_CONFIG_MAPS_REQUEST,
  LOAD_CONFIG_MAPS_SUCCESS,
  LOAD_CONFIG_MAPS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_CONFIG_MAP_REQUEST,
  CREATE_CONFIG_MAP_SUCCESS,
  CREATE_CONFIG_MAP_FAILURE,
  UPDATE_CREATE_FORM,
  SHOW_CONFIG_MAP_DATA,
  HIDE_CONFIG_MAP_DATA,
} from './constants';

export const initialState = fromJS({
  configMaps: {},
  tableList: [],
  createFormData: { name: '', configs: [] },
  clusterID: null,
  namespaceID: null,
  opening: null,
});

function configMapsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_ACTION:
      return state
        .set('tableList', fromJS([]))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case LOAD_CONFIG_MAPS_REQUEST:
      return state;

    case LOAD_CONFIG_MAPS_SUCCESS: {
      const { clusterID, namespaceID, data } = payload;
      const configMaps = data.data.reduce(
        (meno, item) => ({
          ...meno,
          [item.id]: item,
        }),
        {},
      );
      let newState = state.mergeIn(
        ['configMaps', clusterID, namespaceID],
        fromJS(configMaps),
      );
      const list = data.data.map(item => item.id);

      // load configMaps is async
      if (
        state.get('clusterID') === clusterID &&
        state.get('namespaceID') === namespaceID
      )
        newState = newState.set('tableList', fromJS(list));

      return newState.set('loadConfigMapsErrors', null);
    }

    case LOAD_CONFIG_MAPS_FAILURE:
      return state.set('loadConfigMapsErrors', payload.errors);

    case INIT_CREATE_FORM:
      return state
        .set('createFormData', fromJS({ name: '', configs: [] }))
        .set('clusterID', payload.cluster_id)
        .set('namespaceID', payload.namespace_id);

    case CREATE_CONFIG_MAP_REQUEST:
      return state;

    case CREATE_CONFIG_MAP_SUCCESS:
      return state;

    case CREATE_CONFIG_MAP_FAILURE:
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

    case SHOW_CONFIG_MAP_DATA:
      return state.set('opening', { ...payload });

    case HIDE_CONFIG_MAP_DATA:
      return state.set('opening', null);

    default:
      return state;
  }
}

export default configMapsPageReducer;
