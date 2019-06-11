import * as c from './constants';

/*
  actions
*/
export const loadNamespaces = (url, clusterID) => ({
  type: c.LOAD_NAMESPACES,
  payload: url,
  meta: { clusterID },
});

export const loadNamespacesSuccess = (resp, clusterID) => ({
  type: c.LOAD_NAMESPACES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadNamespacesFailure = (error, clusterID) => ({
  type: c.LOAD_NAMESPACES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const createNamespace = (data, meta) => ({
  type: c.CREATE_NAMESPACE,
  payload: data,
  meta,
});

export const createNamespaceSuccess = (resp, meta) => ({
  type: c.CREATE_NAMESPACE_SUCCESS,
  payload: resp,
  meta,
});

export const createNamespaceFailure = (error, meta) => ({
  type: c.CREATE_NAMESPACE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeNamespace = (id, meta) => ({
  type: c.REMOVE_NAMESPACE,
  payload: id,
  meta,
});

export const removeNamespaceSuccess = (resp, meta) => ({
  type: c.REMOVE_NAMESPACE_SUCCESS,
  payload: resp,
  meta,
});

export const removeNamespaceFailure = (error, meta) => ({
  type: c.REMOVE_NAMESPACE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const changeNamespace = (namespaceID, clusterID) => ({
  type: c.CHANGE_NAMESPACE,
  payload: { namespaceID, clusterID },
});

export const loadAllNamespaces = (clusters) => ({
  type: c.LOAD_ALL_NAMESPACES,
  payload: { clusters },
});
