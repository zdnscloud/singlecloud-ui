/**
 * Duck: Ingresses
 * actions: ingresses
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadIngresses = (url, meta = {}) => ({
  type: c.LOAD_INGRESSES,
  payload: url,
  meta,
});

export const loadIngressesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_INGRESSES_SUCCESS,
  payload: resp,
  meta,
});

export const loadIngressesFailure = (error, meta = {}) => ({
  type: c.LOAD_INGRESSES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createIngress = (data, meta = {}) => ({
  type: c.CREATE_INGRESS,
  payload: data,
  meta,
});

export const createIngressSuccess = (resp, meta = {}) => ({
  type: c.CREATE_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const createIngressFailure = (error, meta = {}) => ({
  type: c.CREATE_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateIngress = (data, meta = {}) => ({
  type: c.UPDATE_INGRESS,
  payload: data,
  meta,
});

export const updateIngressSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const updateIngressFailure = (error, meta = {}) => ({
  type: c.UPDATE_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readIngress = (id, meta = {}) => ({
  type: c.READ_INGRESS,
  payload: id,
  meta,
});

export const readIngressSuccess = (resp, meta = {}) => ({
  type: c.READ_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const readIngressFailure = (error, meta = {}) => ({
  type: c.READ_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeIngress = (id, meta = {}) => ({
  type: c.REMOVE_INGRESS,
  payload: id,
  meta,
});

export const removeIngressSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const removeIngressFailure = (error, meta = {}) => ({
  type: c.REMOVE_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
