import * as c from './constants';

/*
  actions
*/
export const loadPodNetworks = (url, clusterID) => ({
  type: c.LOAD_POD_NETWORKS,
  payload: url,
  meta: { clusterID },
});

export const loadPodNetworksSuccess = (resp, clusterID) => ({
  type: c.LOAD_POD_NETWORKS_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadPodNetworksFailure = (error, clusterID) => ({
  type: c.LOAD_POD_NETWORKS_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const loadServiceNetworks = (url, clusterID) => ({
  type: c.LOAD_SERVICE_NETWORKS,
  payload: url,
  meta: { clusterID },
});

export const loadServiceNetworksSuccess = (resp, clusterID) => ({
  type: c.LOAD_SERVICE_NETWORKS_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadServiceNetworksFailure = (error, clusterID) => ({
  type: c.LOAD_SERVICE_NETWORKS_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});
