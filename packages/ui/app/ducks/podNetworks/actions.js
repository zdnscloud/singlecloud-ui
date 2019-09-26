/**
 * Duck: PodNetworks
 * actions: podNetworks
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadPodNetworks = (url, meta = {}) => ({
  type: c.LOAD_POD_NETWORKS,
  payload: url,
  meta,
});

export const loadPodNetworksSuccess = (resp, meta = {}) => ({
  type: c.LOAD_POD_NETWORKS_SUCCESS,
  payload: resp,
  meta,
});

export const loadPodNetworksFailure = (error, meta = {}) => ({
  type: c.LOAD_POD_NETWORKS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
