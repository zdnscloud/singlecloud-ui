/**
 * Duck: NamespaceThresholds
 * actions: namespaceThresholds
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadNamespaceThresholds = (url, meta = {}) => ({
  type: c.LOAD_NAMESPACE_THRESHOLDS,
  payload: url,
  meta,
});

export const loadNamespaceThresholdsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_NAMESPACE_THRESHOLDS_SUCCESS,
  payload: resp,
  meta,
});

export const loadNamespaceThresholdsFailure = (error, meta = {}) => ({
  type: c.LOAD_NAMESPACE_THRESHOLDS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createNamespaceThreshold = (data, meta = {}) => ({
  type: c.CREATE_NAMESPACE_THRESHOLD,
  payload: data,
  meta,
});

export const createNamespaceThresholdSuccess = (resp, meta = {}) => ({
  type: c.CREATE_NAMESPACE_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const createNamespaceThresholdFailure = (error, meta = {}) => ({
  type: c.CREATE_NAMESPACE_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateNamespaceThreshold = (data, meta = {}) => ({
  type: c.UPDATE_NAMESPACE_THRESHOLD,
  payload: data,
  meta,
});

export const updateNamespaceThresholdSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_NAMESPACE_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const updateNamespaceThresholdFailure = (error, meta = {}) => ({
  type: c.UPDATE_NAMESPACE_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readNamespaceThreshold = (id, meta = {}) => ({
  type: c.READ_NAMESPACE_THRESHOLD,
  payload: id,
  meta,
});

export const readNamespaceThresholdSuccess = (resp, meta = {}) => ({
  type: c.READ_NAMESPACE_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const readNamespaceThresholdFailure = (error, meta = {}) => ({
  type: c.READ_NAMESPACE_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeNamespaceThreshold = (id, meta = {}) => ({
  type: c.REMOVE_NAMESPACE_THRESHOLD,
  payload: id,
  meta,
});

export const removeNamespaceThresholdSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_NAMESPACE_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const removeNamespaceThresholdFailure = (error, meta = {}) => ({
  type: c.REMOVE_NAMESPACE_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
