/**
 * Duck: StorageClusters
 * actions: storageClusters
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadStorageClusters = (url, meta = {}) => ({
  type: c.LOAD_STORAGE_CLUSTERS,
  payload: url,
  meta,
});

export const loadStorageClustersSuccess = (resp, meta = {}) => ({
  type: c.LOAD_STORAGE_CLUSTERS_SUCCESS,
  payload: resp,
  meta,
});

export const loadStorageClustersFailure = (error, meta = {}) => ({
  type: c.LOAD_STORAGE_CLUSTERS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createStorageCluster = (data, meta = {}) => ({
  type: c.CREATE_STORAGE_CLUSTER,
  payload: data,
  meta,
});

export const createStorageClusterSuccess = (resp, meta = {}) => ({
  type: c.CREATE_STORAGE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const createStorageClusterFailure = (error, meta = {}) => ({
  type: c.CREATE_STORAGE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateStorageCluster = (data, meta = {}) => ({
  type: c.UPDATE_STORAGE_CLUSTER,
  payload: data,
  meta,
});

export const updateStorageClusterSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_STORAGE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const updateStorageClusterFailure = (error, meta = {}) => ({
  type: c.UPDATE_STORAGE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readStorageCluster = (id, meta = {}) => ({
  type: c.READ_STORAGE_CLUSTER,
  payload: id,
  meta,
});

export const readStorageClusterSuccess = (resp, meta = {}) => ({
  type: c.READ_STORAGE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const readStorageClusterFailure = (error, meta = {}) => ({
  type: c.READ_STORAGE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeStorageCluster = (id, meta = {}) => ({
  type: c.REMOVE_STORAGE_CLUSTER,
  payload: id,
  meta,
});

export const removeStorageClusterSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_STORAGE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const removeStorageClusterFailure = (error, meta = {}) => ({
  type: c.REMOVE_STORAGE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});


export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
