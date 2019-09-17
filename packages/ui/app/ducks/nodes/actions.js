/**
 * Duck: Nodes
 * actions: nodes
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadNodes = (url, meta = {}) => ({
  type: c.LOAD_NODES,
  payload: url,
  meta,
});

export const loadNodesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_NODES_SUCCESS,
  payload: resp,
  meta,
});

export const loadNodesFailure = (error, meta = {}) => ({
  type: c.LOAD_NODES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readNode = (id, meta = {}) => ({
  type: c.READ_NODE,
  payload: id,
  meta,
});

export const readNodeSuccess = (resp, meta = {}) => ({
  type: c.READ_NODE_SUCCESS,
  payload: resp,
  meta,
});

export const readNodeFailure = (error, meta = {}) => ({
  type: c.READ_NODE_FAILURE,
  payload: error,
  meta,
  error: true,
});
