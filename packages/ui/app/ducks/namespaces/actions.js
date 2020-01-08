/**
 * Duck: Namespaces
 * actions: namespaces
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadNamespaces = (url, meta = {}) => ({
  type: c.LOAD_NAMESPACES,
  payload: url,
  meta,
});

export const loadNamespacesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_NAMESPACES_SUCCESS,
  payload: resp,
  meta,
});

export const loadNamespacesFailure = (error, meta = {}) => ({
  type: c.LOAD_NAMESPACES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createNamespace = (data, meta = {}) => ({
  type: c.CREATE_NAMESPACE,
  payload: data,
  meta,
});

export const createNamespaceSuccess = (resp, meta = {}) => ({
  type: c.CREATE_NAMESPACE_SUCCESS,
  payload: resp,
  meta,
});

export const createNamespaceFailure = (error, meta = {}) => ({
  type: c.CREATE_NAMESPACE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readNamespace = (id, meta = {}) => ({
  type: c.READ_NAMESPACE,
  payload: id,
  meta,
});

export const readNamespaceSuccess = (resp, meta = {}) => ({
  type: c.READ_NAMESPACE_SUCCESS,
  payload: resp,
  meta,
});

export const readNamespaceFailure = (error, meta = {}) => ({
  type: c.READ_NAMESPACE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeNamespace = (id, meta = {}) => ({
  type: c.REMOVE_NAMESPACE,
  payload: id,
  meta,
});

export const removeNamespaceSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_NAMESPACE_SUCCESS,
  payload: resp,
  meta,
});

export const removeNamespaceFailure = (error, meta = {}) => ({
  type: c.REMOVE_NAMESPACE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeNamespaceAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_NAMESPACE_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeNamespaceActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_NAMESPACE_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeNamespaceActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_NAMESPACE_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
