/**
 * Duck: Storages
 * actions: storages
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadStorages = (url, meta = {}) => ({
  type: c.LOAD_STORAGES,
  payload: url,
  meta,
});

export const loadStoragesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_STORAGES_SUCCESS,
  payload: resp,
  meta,
});

export const loadStoragesFailure = (error, meta = {}) => ({
  type: c.LOAD_STORAGES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createStorage = (data, meta = {}) => ({
  type: c.CREATE_STORAGE,
  payload: data,
  meta,
});

export const createStorageSuccess = (resp, meta = {}) => ({
  type: c.CREATE_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const createStorageFailure = (error, meta = {}) => ({
  type: c.CREATE_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateStorage = (data, meta = {}) => ({
  type: c.UPDATE_STORAGE,
  payload: data,
  meta,
});

export const updateStorageSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const updateStorageFailure = (error, meta = {}) => ({
  type: c.UPDATE_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readStorage = (id, meta = {}) => ({
  type: c.READ_STORAGE,
  payload: id,
  meta,
});

export const readStorageSuccess = (resp, meta = {}) => ({
  type: c.READ_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const readStorageFailure = (error, meta = {}) => ({
  type: c.READ_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeStorage = (id, meta = {}) => ({
  type: c.REMOVE_STORAGE,
  payload: id,
  meta,
});

export const removeStorageSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const removeStorageFailure = (error, meta = {}) => ({
  type: c.REMOVE_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
