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

export const executeNodeAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_NODE_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeNodeActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_NODE_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeNodeActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_NODE_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
