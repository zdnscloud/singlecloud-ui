import * as c from './constants';

/*
  actions
*/
export const loadClusters = (url, clusterID) => ({
  type: c.LOAD_CLUSTERS,
  payload: url,
  meta: { clusterID },
});

export const loadClustersSuccess = (resp, clusterID) => ({
  type: c.LOAD_CLUSTERS_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadClustersFailure = (error, clusterID) => ({
  type: c.LOAD_CLUSTERS_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const removeCluster = (id, meta) => ({
  type: c.REMOVE_CLUSTER,
  payload: id,
  meta,
});

export const removeClusterSuccess = (resp, meta) => ({
  type: c.REMOVE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const removeClusterFailure = (error, meta) => ({
  type: c.REMOVE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const changeCluster = (clusterID) => ({
  type: c.CHANGE_CLUSTER,
  payload: { clusterID },
});

export const loadClustersAndNamespaces = () => ({
  type: c.LOAD_CLUSTERS_AND_NAMESPACES,
  payload: {},
});

export const createClusters = (data, meta) => ({
  type: c.CREATE_CLUSTERS,
  payload: data,
  meta,
});

export const createClustersSuccess = (resp, meta) => ({
  type: c.CREATE_CLUSTERS_SUCCESS,
  payload: resp,
  meta,
});

export const createClustersFailure = (error, meta) => ({
  type: c.CREATE_CLUSTERS_FAILURE,
  payload: error,
  meta,
  error: true,
});


