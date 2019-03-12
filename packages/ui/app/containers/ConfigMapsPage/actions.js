/*
 *
 * ConfigMapsPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_CONFIG_MAPS,
  LOAD_CONFIG_MAPS_REQUEST,
  LOAD_CONFIG_MAPS_SUCCESS,
  LOAD_CONFIG_MAPS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_CONFIG_MAP,
  CREATE_CONFIG_MAP_REQUEST,
  CREATE_CONFIG_MAP_SUCCESS,
  CREATE_CONFIG_MAP_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_CONFIG_MAP,
  REMOVE_CONFIG_MAP_REQUEST,
  REMOVE_CONFIG_MAP_SUCCESS,
  REMOVE_CONFIG_MAP_FAILURE,
  SHOW_CONFIG_MAP_DATA,
  HIDE_CONFIG_MAP_DATA,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadConfigMaps = () => ({
  type: LOAD_CONFIG_MAPS,
  payload: {},
});

export const loadConfigMapsRequest = () => ({
  type: LOAD_CONFIG_MAPS_REQUEST,
  payload: {},
});

export const loadConfigMapsSuccess = (clusterID, namespaceID, data) => ({
  type: LOAD_CONFIG_MAPS_SUCCESS,
  payload: {
    clusterID,
    namespaceID,
    data,
  },
});

export const loadConfigMapsFailure = errors => ({
  type: LOAD_CONFIG_MAPS_FAILURE,
  payload: { errors },
});

export const initCreateForm = ({ params }) => ({
  type: INIT_CREATE_FORM,
  payload: { ...params },
});

export const createConfigMap = () => ({
  type: CREATE_CONFIG_MAP,
  payload: {},
});

export const createConfigMapRequest = () => ({
  type: CREATE_CONFIG_MAP_REQUEST,
  payload: {},
});

export const createConfigMapSuccess = data => ({
  type: CREATE_CONFIG_MAP_SUCCESS,
  payload: { data },
});

export const createConfigMapFailure = errors => ({
  type: CREATE_CONFIG_MAP_FAILURE,
  payload: { errors },
});

export function updateForm(name, value) {
  return {
    type: UPDATE_CREATE_FORM,
    payload: {
      name,
      value,
    },
  };
}

export const removeConfigMap = id => ({
  type: REMOVE_CONFIG_MAP,
  payload: { id },
});

export const removeConfigMapRequest = () => ({
  type: REMOVE_CONFIG_MAP_REQUEST,
  payload: {},
});

export const removeConfigMapSuccess = (clusterID, id) => ({
  type: REMOVE_CONFIG_MAP_SUCCESS,
  payload: { clusterID, id },
});

export const removeConfigMapFailure = errors => ({
  type: REMOVE_CONFIG_MAP_FAILURE,
  payload: { errors },
});

export const showConfigMapData = (id, index) => ({
  type: SHOW_CONFIG_MAP_DATA,
  payload: { id, index },
});

export const hideConfigMapData = () => ({
  type: HIDE_CONFIG_MAP_DATA,
  payload: {},
});
