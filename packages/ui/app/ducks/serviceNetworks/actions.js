/**
 * Duck: ServiceNetworks
 * actions: serviceNetworks
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadServiceNetworks = (url, meta = {}) => ({
  type: c.LOAD_SERVICE_NETWORKS,
  payload: url,
  meta,
});

export const loadServiceNetworksSuccess = (resp, meta = {}) => ({
  type: c.LOAD_SERVICE_NETWORKS_SUCCESS,
  payload: resp,
  meta,
});

export const loadServiceNetworksFailure = (error, meta = {}) => ({
  type: c.LOAD_SERVICE_NETWORKS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
