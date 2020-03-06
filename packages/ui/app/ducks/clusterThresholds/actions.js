/**
 * Duck: ClusterThresholds
 * actions: clusterThresholds
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadClusterThresholds = (url, meta = {}) => ({
  type: c.LOAD_CLUSTER_THRESHOLDS,
  payload: url,
  meta,
});

export const loadClusterThresholdsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_CLUSTER_THRESHOLDS_SUCCESS,
  payload: resp,
  meta,
});

export const loadClusterThresholdsFailure = (error, meta = {}) => ({
  type: c.LOAD_CLUSTER_THRESHOLDS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createClusterThreshold = (data, meta = {}) => ({
  type: c.CREATE_CLUSTER_THRESHOLD,
  payload: data,
  meta,
});

export const createClusterThresholdSuccess = (resp, meta = {}) => ({
  type: c.CREATE_CLUSTER_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const createClusterThresholdFailure = (error, meta = {}) => ({
  type: c.CREATE_CLUSTER_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateClusterThreshold = (data, meta = {}) => ({
  type: c.UPDATE_CLUSTER_THRESHOLD,
  payload: data,
  meta,
});

export const updateClusterThresholdSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_CLUSTER_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const updateClusterThresholdFailure = (error, meta = {}) => ({
  type: c.UPDATE_CLUSTER_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readClusterThreshold = (id, meta = {}) => ({
  type: c.READ_CLUSTER_THRESHOLD,
  payload: id,
  meta,
});

export const readClusterThresholdSuccess = (resp, meta = {}) => ({
  type: c.READ_CLUSTER_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const readClusterThresholdFailure = (error, meta = {}) => ({
  type: c.READ_CLUSTER_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeClusterThreshold = (id, meta = {}) => ({
  type: c.REMOVE_CLUSTER_THRESHOLD,
  payload: id,
  meta,
});

export const removeClusterThresholdSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_CLUSTER_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const removeClusterThresholdFailure = (error, meta = {}) => ({
  type: c.REMOVE_CLUSTER_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
