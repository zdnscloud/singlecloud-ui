/*
 *
 * NamespacesPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_NAMESPACES,
  LOAD_NAMESPACES_REQUEST,
  LOAD_NAMESPACES_SUCCESS,
  LOAD_NAMESPACES_FAILURE,
  LOAD_NAMESPACE,
  LOAD_NAMESPACE_REQUEST,
  LOAD_NAMESPACE_SUCCESS,
  LOAD_NAMESPACE_FAILURE,
  OPEN_CREATE_NAMESPACE,
  CLOSE_CREATE_NAMESPACE,
  CREATE_NAMESPACE,
  CREATE_NAMESPACE_REQUEST,
  CREATE_NAMESPACE_SUCCESS,
  CREATE_NAMESPACE_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_NAMESPACE,
  REMOVE_NAMESPACE_REQUEST,
  REMOVE_NAMESPACE_SUCCESS,
  REMOVE_NAMESPACE_FAILURE,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadNamespaces = () => ({
  type: LOAD_NAMESPACES,
  payload: {},
});

export const loadNamespacesRequest = () => ({
  type: LOAD_NAMESPACES_REQUEST,
  payload: {},
});

export const loadNamespacesSuccess = (clusterID, data) => ({
  type: LOAD_NAMESPACES_SUCCESS,
  payload: { clusterID, data },
});

export const loadNamespacesFailure = (errors) => ({
  type: LOAD_NAMESPACES_FAILURE,
  payload: { errors },
});

export const loadNamespace = (id) => ({
  type: LOAD_NAMESPACE,
  payload: { id },
});

export const loadNamespaceRequest = () => ({
  type: LOAD_NAMESPACE_REQUEST,
  payload: {},
});

export const loadNamespaceSuccess = (data) => ({
  type: LOAD_NAMESPACE_SUCCESS,
  payload: { data },
});

export const loadNamespaceFailure = (errors) => ({
  type: LOAD_NAMESPACE_FAILURE,
  payload: { errors },
});

export const openCreateNamespace = () => ({
  type: OPEN_CREATE_NAMESPACE,
  payload: {},
});

export const closeCreateNamespace = () => ({
  type: CLOSE_CREATE_NAMESPACE,
  payload: {},
});

export const createNamespace = () => ({
  type: CREATE_NAMESPACE,
  payload: {},
});

export const createNamespaceRequest = () => ({
  type: CREATE_NAMESPACE_REQUEST,
  payload: {},
});

export const createNamespaceSuccess = (clusterID, data) => ({
  type: CREATE_NAMESPACE_SUCCESS,
  payload: { clusterID, data },
});

export const createNamespaceFailure = (errors) => ({
  type: CREATE_NAMESPACE_FAILURE,
  payload: { errors },
});

export const updateCreateForm = (name, value) => ({
  type: UPDATE_CREATE_FORM,
  payload: { name, value },
});

export const removeNamespace = (id) => ({
  type: REMOVE_NAMESPACE,
  payload: { id },
});

export const removeNamespaceRequest = () => ({
  type: REMOVE_NAMESPACE_REQUEST,
  payload: {},
});

export const removeNamespaceSuccess = (clusterID, id) => ({
  type: REMOVE_NAMESPACE_SUCCESS,
  payload: { clusterID, id },
});

export const removeNamespaceFailure = (errors) => ({
  type: REMOVE_NAMESPACE_FAILURE,
  payload: { errors },
});