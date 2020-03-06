/**
 * Duck: ConfigMaps
 * actions: configMaps
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadConfigMaps = (url, meta = {}) => ({
  type: c.LOAD_CONFIG_MAPS,
  payload: url,
  meta,
});

export const loadConfigMapsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_CONFIG_MAPS_SUCCESS,
  payload: resp,
  meta,
});

export const loadConfigMapsFailure = (error, meta = {}) => ({
  type: c.LOAD_CONFIG_MAPS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createConfigMap = (data, meta = {}) => ({
  type: c.CREATE_CONFIG_MAP,
  payload: data,
  meta,
});

export const createConfigMapSuccess = (resp, meta = {}) => ({
  type: c.CREATE_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const createConfigMapFailure = (error, meta = {}) => ({
  type: c.CREATE_CONFIG_MAP_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateConfigMap = (data, meta = {}) => ({
  type: c.UPDATE_CONFIG_MAP,
  payload: data,
  meta,
});

export const updateConfigMapSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const updateConfigMapFailure = (error, meta = {}) => ({
  type: c.UPDATE_CONFIG_MAP_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readConfigMap = (id, meta = {}) => ({
  type: c.READ_CONFIG_MAP,
  payload: id,
  meta,
});

export const readConfigMapSuccess = (resp, meta = {}) => ({
  type: c.READ_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const readConfigMapFailure = (error, meta = {}) => ({
  type: c.READ_CONFIG_MAP_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeConfigMap = (id, meta = {}) => ({
  type: c.REMOVE_CONFIG_MAP,
  payload: id,
  meta,
});

export const removeConfigMapSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_CONFIG_MAP_SUCCESS,
  payload: resp,
  meta,
});

export const removeConfigMapFailure = (error, meta = {}) => ({
  type: c.REMOVE_CONFIG_MAP_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
