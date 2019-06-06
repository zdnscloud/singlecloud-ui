import * as c from './constants';

/*
  actions
*/
export const loadNodes = (url, clusterID) => ({
  type: c.LOAD_NODES,
  payload: url,
  meta: { clusterID },
});

export const loadNodesSuccess = (resp, clusterID) => ({
  type: c.LOAD_NODES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadNodesFailure = (error, clusterID) => ({
  type: c.LOAD_NODES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const createNode = (data, meta) => ({
  type: c.CREATE_NODE,
  payload: data,
  meta,
});

export const createNodeSuccess = (resp, meta) => ({
  type: c.CREATE_NODE_SUCCESS,
  payload: resp,
  meta,
});

export const createNodeFailure = (error, meta) => ({
  type: c.CREATE_NODE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeNode = (id, meta) => ({
  type: c.REMOVE_NODE,
  payload: id,
  meta,
});

export const removeNodeSuccess = (resp, meta) => ({
  type: c.REMOVE_NODE_SUCCESS,
  payload: resp,
  meta,
});

export const removeNodeFailure = (error, meta) => ({
  type: c.REMOVE_NODE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const changeNode = (nodeID, clusterID) => ({
  type: c.CHANGE_NODE,
  payload: { nodeID, clusterID },
});
