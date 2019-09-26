/**
 * Duck: StorageClasses
 * actions: storageClasses
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadStorageClasses = (url, meta = {}) => ({
  type: c.LOAD_STORAGE_CLASSES,
  payload: url,
  meta,
});

export const loadStorageClassesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_STORAGE_CLASSES_SUCCESS,
  payload: resp,
  meta,
});

export const loadStorageClassesFailure = (error, meta = {}) => ({
  type: c.LOAD_STORAGE_CLASSES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
