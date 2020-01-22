/**
 * Duck: Clusters
 * actions: clusters
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadClusters = (url, meta = {}) => ({
  type: c.LOAD_CLUSTERS,
  payload: url,
  meta,
});

export const loadClustersSuccess = (resp, meta = {}) => ({
  type: c.LOAD_CLUSTERS_SUCCESS,
  payload: resp,
  meta,
});

export const loadClustersFailure = (error, meta = {}) => ({
  type: c.LOAD_CLUSTERS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createCluster = (data, meta = {}) => ({
  type: c.CREATE_CLUSTER,
  payload: data,
  meta,
});

export const createClusterSuccess = (resp, meta = {}) => ({
  type: c.CREATE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const createClusterFailure = (error, meta = {}) => ({
  type: c.CREATE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateCluster = (data, meta = {}) => ({
  type: c.UPDATE_CLUSTER,
  payload: data,
  meta,
});

export const updateClusterSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const updateClusterFailure = (error, meta = {}) => ({
  type: c.UPDATE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readCluster = (id, meta = {}) => ({
  type: c.READ_CLUSTER,
  payload: id,
  meta,
});

export const readClusterSuccess = (resp, meta = {}) => ({
  type: c.READ_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const readClusterFailure = (error, meta = {}) => ({
  type: c.READ_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeCluster = (id, meta = {}) => ({
  type: c.REMOVE_CLUSTER,
  payload: id,
  meta,
});

export const removeClusterSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const removeClusterFailure = (error, meta = {}) => ({
  type: c.REMOVE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeClusterAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_CLUSTER_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeClusterActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_CLUSTER_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeClusterActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_CLUSTER_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
