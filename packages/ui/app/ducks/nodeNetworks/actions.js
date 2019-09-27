/**
 * Duck: NodeNetworks
 * actions: nodeNetworks
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadNodeNetworks = (url, meta = {}) => ({
  type: c.LOAD_NODE_NETWORKS,
  payload: url,
  meta,
});

export const loadNodeNetworksSuccess = (resp, meta = {}) => ({
  type: c.LOAD_NODE_NETWORKS_SUCCESS,
  payload: resp,
  meta,
});

export const loadNodeNetworksFailure = (error, meta = {}) => ({
  type: c.LOAD_NODE_NETWORKS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
