import * as c from './constants';

/*
  actions
*/
export const loadOuterServices = (url, clusterID, namespaceID) => ({
  type: c.LOAD_OUTER_SERVICES,
  payload: url,
  meta: { clusterID, namespaceID },
});

export const loadOuterServicesSuccess = (resp, clusterID, namespaceID) => ({
  type: c.LOAD_OUTER_SERVICES_SUCCESS,
  payload: resp,
  meta: { clusterID, namespaceID },
});

export const loadOuterServicesFailure = (error, clusterID, namespaceID) => ({
  type: c.LOAD_OUTER_SERVICES_FAILURE,
  payload: error,
  meta: { clusterID, namespaceID },
  error: true,
});

export const loadInnerServices = (url, clusterID, namespaceID) => ({
  type: c.LOAD_INNER_SERVICES,
  payload: url,
  meta: { clusterID, namespaceID },
});

export const loadInnerServicesSuccess = (resp, clusterID, namespaceID) => ({
  type: c.LOAD_INNER_SERVICES_SUCCESS,
  payload: resp,
  meta: { clusterID, namespaceID },
});

export const loadInnerServicesFailure = (error, clusterID, namespaceID) => ({
  type: c.LOAD_INNER_SERVICES_FAILURE,
  payload: error,
  meta: { clusterID, namespaceID },
  error: true,
});
