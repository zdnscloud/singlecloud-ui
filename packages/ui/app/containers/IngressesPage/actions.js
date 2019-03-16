/*
 *
 * IngressesPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_INGRESSES,
  LOAD_INGRESSES_REQUEST,
  LOAD_INGRESSES_SUCCESS,
  LOAD_INGRESSES_FAILURE,
  LOAD_INGRESS,
  LOAD_INGRESS_REQUEST,
  LOAD_INGRESS_SUCCESS,
  LOAD_INGRESS_FAILURE,
  OPEN_CREATE_INGRESS,
  CLOSE_CREATE_INGRESS,
  CREATE_INGRESS,
  CREATE_INGRESS_REQUEST,
  CREATE_INGRESS_SUCCESS,
  CREATE_INGRESS_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_INGRESS,
  REMOVE_INGRESS_REQUEST,
  REMOVE_INGRESS_SUCCESS,
  REMOVE_INGRESS_FAILURE,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadIngresses = () => ({
  type: LOAD_INGRESSES,
  payload: {},
});

export const loadIngressesRequest = () => ({
  type: LOAD_INGRESSES_REQUEST,
  payload: {},
});

export const loadIngressesSuccess = (clusterID, namespaceID, data) => ({
  type: LOAD_INGRESSES_SUCCESS,
  payload: { clusterID, namespaceID, data },
});

export const loadIngressesFailure = (errors) => ({
  type: LOAD_INGRESSES_FAILURE,
  payload: { errors },
});

export const loadIngress = (id) => ({
  type: LOAD_INGRESS,
  payload: { id },
});

export const loadIngressRequest = () => ({
  type: LOAD_INGRESS_REQUEST,
  payload: {},
});

export const loadIngressSuccess = (data) => ({
  type: LOAD_INGRESS_SUCCESS,
  payload: { data },
});

export const loadIngressFailure = (errors) => ({
  type: LOAD_INGRESS_FAILURE,
  payload: { errors },
});

export const openCreateIngress = () => ({
  type: OPEN_CREATE_INGRESS,
  payload: {},
});

export const closeCreateIngress = () => ({
  type: CLOSE_CREATE_INGRESS,
  payload: {},
});

export const createIngress = () => ({
  type: CREATE_INGRESS,
  payload: {},
});

export const createIngressRequest = () => ({
  type: CREATE_INGRESS_REQUEST,
  payload: {},
});

export const createIngressSuccess = (clusterID, data) => ({
  type: CREATE_INGRESS_SUCCESS,
  payload: { clusterID, data },
});

export const createIngressFailure = (errors) => ({
  type: CREATE_INGRESS_FAILURE,
  payload: { errors },
});

export const updateCreateForm = (name, value) => ({
  type: UPDATE_CREATE_FORM,
  payload: { name, value },
});

export const removeIngress = (id) => ({
  type: REMOVE_INGRESS,
  payload: { id },
});

export const removeIngressRequest = () => ({
  type: REMOVE_INGRESS_REQUEST,
  payload: {},
});

export const removeIngressSuccess = (clusterID, id) => ({
  type: REMOVE_INGRESS_SUCCESS,
  payload: { clusterID, id },
});

export const removeIngressFailure = (errors) => ({
  type: REMOVE_INGRESS_FAILURE,
  payload: { errors },
});
