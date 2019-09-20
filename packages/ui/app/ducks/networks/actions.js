/**
 * Duck: Networks
 * actions: networks
 *
 */

import * as c from './constants';

/*
  actions
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
