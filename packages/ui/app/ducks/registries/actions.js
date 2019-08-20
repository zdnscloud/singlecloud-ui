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

export const updateRegistry = (data, meta = {}) => ({
  type: c.UPDATE_REGISTRY,
  payload: data,
  meta,
});

export const updateRegistrySuccess = (resp, meta = {}) => ({
  type: c.UPDATE_REGISTRY_SUCCESS,
  payload: resp,
  meta,
});

export const updateRegistryFailure = (error, meta = {}) => ({
  type: c.UPDATE_REGISTRY_FAILURE,
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

