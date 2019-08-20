import * as c from './constants';

/*
  actions
*/
export const loadConfigMaps = (meta) => ({
  type: c.LOAD_CONFIG_MAPS,
  payload: {},
  meta,
});

export const loadConfigMapsSuccess = (resp, meta) => ({
  type: c.LOAD_CONFIG_MAPS_SUCCESS,
  payload: resp,
  meta,
});

export const loadConfigMapsFailure = (error, meta) => ({
  type: c.LOAD_CONFIG_MAPS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadConfigMap = (id) => ({
  type: c.LOAD_CONFIG_MAP,
  payload: id,
});

export const loadConfigMapSuccess = (resp) => ({
  type: c.LOAD_CONFIG_MAP_SUCCESS,
  payload: resp,
});

export const loadConfigMapFailure = (error) => ({
  type: c.LOAD_CONFIG_MAP_FAILURE,
  payload: error,
  error: true,
});

export const createConfigMap = (data, meta) => ({
  type: c.CREATE_CONFIG_MAP,
  payload: data,
  meta,
});

export const createConfigMapSuccess = (resp, meta) => ({
  type: c.CREATE_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const createConfigMapFailure = (error, meta) => ({
  type: c.CREATE_CONFIG_MAP_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateConfigMap = (data, meta) => ({
  type: c.UPDATE_CONFIG_MAP,
  payload: data,
  meta,
});

export const updateConfigMapSuccess = (resp, meta) => ({
  type: c.UPDATE_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const updateConfigMapFailure = (error) => ({
  type: c.UPDATE_CONFIG_MAP_FAILURE,
  payload: error,
  error: true,
});

export const removeConfigMap = (id, meta) => ({
  type: c.REMOVE_CONFIG_MAP,
  payload: id,
  meta,
});

export const removeConfigMapSuccess = (resp, meta) => ({
  type: c.REMOVE_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const removeConfigMapFailure = (error, meta) => ({
  type: c.REMOVE_CONFIG_MAP_FAILURE,
  payload: error,
  meta,
  error: true,
});
