/**
 * Duck: Storageclasses
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

export const readStorageClass = (id, meta = {}) => ({
  type: c.READ_STORAGE_CLASS,
  payload: id,
  meta,
});

export const readStorageClassSuccess = (resp, meta = {}) => ({
  type: c.READ_STORAGE_CLASS_SUCCESS,
  payload: resp,
  meta,
});

export const readStorageClassFailure = (error, meta = {}) => ({
  type: c.READ_STORAGE_CLASS_FAILURE,
  payload: error,
  meta,
  error: true,
});
