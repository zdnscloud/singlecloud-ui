/**
 * Duck: Registries
 * actions: registries
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadRegistries = (url, meta = {}) => ({
  type: c.LOAD_REGISTRIES,
  payload: url,
  meta,
});

export const loadRegistriesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_REGISTRIES_SUCCESS,
  payload: resp,
  meta,
});

export const loadRegistriesFailure = (error, meta = {}) => ({
  type: c.LOAD_REGISTRIES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createRegistry = (data, meta = {}) => ({
  type: c.CREATE_REGISTRY,
  payload: data,
  meta,
});

export const createRegistrySuccess = (resp, meta = {}) => ({
  type: c.CREATE_REGISTRY_SUCCESS,
  payload: resp,
  meta,
});

export const createRegistryFailure = (error, meta = {}) => ({
  type: c.CREATE_REGISTRY_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readRegistry = (id, meta = {}) => ({
  type: c.READ_REGISTRY,
  payload: id,
  meta,
});

export const readRegistrySuccess = (resp, meta = {}) => ({
  type: c.READ_REGISTRY_SUCCESS,
  payload: resp,
  meta,
});

export const readRegistryFailure = (error, meta = {}) => ({
  type: c.READ_REGISTRY_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeRegistry = (id, meta = {}) => ({
  type: c.REMOVE_REGISTRY,
  payload: id,
  meta,
});

export const removeRegistrySuccess = (resp, meta = {}) => ({
  type: c.REMOVE_REGISTRY_SUCCESS,
  payload: resp,
  meta,
});

export const removeRegistryFailure = (error, meta = {}) => ({
  type: c.REMOVE_REGISTRY_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
