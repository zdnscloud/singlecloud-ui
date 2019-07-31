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

export const createCluster = (data, meta) => ({
  type: c.CREATE_CLUSTER,
  payload: data,
  meta,
});

export const createClusterSuccess = (resp, meta) => ({
  type: c.CREATE_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const createClusterFailure = (error, meta) => ({
  type: c.CREATE_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const cancelCluster = (data, meta) => ({
  type: c.CANCEL_CLUSTER,
  payload: data,
  meta,
});

export const cancelClusterSuccess = (resp, meta) => ({
  type: c.CANCEL_CLUSTER_SUCCESS,
  payload: resp,
  meta,
});

export const cancelClusterFailure = (error, meta) => ({
  type: c.CANCEL_CLUSTER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const openClusterLog = (id, meta) => ({
  type: c.OPEN_CLUSTER_LOG,
  payload: id,
  meta,
});

export const closeClusterLog = () => ({
  type: c.CLOSE_CLUSTER_LOG,
  payload: {},
});

export const setOpeningLogs = (logs, meta) => ({
  type: c.SET_OPENING_LOG,
  payload: logs,
  meta,
});

export const openNode = () => ({
  type: c.OPEN_NODE,
  payload: {},
});

export const closeNode = () => ({
  type: c.CLOSE_NODE,
  payload: {},
});

export const setNodes = (nodes, meta) => ({
  type: c.SET_NODES,
  payload: nodes,
  meta,
});


