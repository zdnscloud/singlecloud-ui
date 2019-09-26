/**
 * Duck: UdpIngresses
 * actions: udpIngresses
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadUdpIngresses = (url, meta = {}) => ({
  type: c.LOAD_UDP_INGRESSES,
  payload: url,
  meta,
});

export const loadUdpIngressesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_UDP_INGRESSES_SUCCESS,
  payload: resp,
  meta,
});

export const loadUdpIngressesFailure = (error, meta = {}) => ({
  type: c.LOAD_UDP_INGRESSES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createUdpIngress = (data, meta = {}) => ({
  type: c.CREATE_UDP_INGRESS,
  payload: data,
  meta,
});

export const createUdpIngressSuccess = (resp, meta = {}) => ({
  type: c.CREATE_UDP_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const createUdpIngressFailure = (error, meta = {}) => ({
  type: c.CREATE_UDP_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readUdpIngress = (id, meta = {}) => ({
  type: c.READ_UDP_INGRESS,
  payload: id,
  meta,
});

export const readUdpIngressSuccess = (resp, meta = {}) => ({
  type: c.READ_UDP_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const readUdpIngressFailure = (error, meta = {}) => ({
  type: c.READ_UDP_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeUdpIngress = (id, meta = {}) => ({
  type: c.REMOVE_UDP_INGRESS,
  payload: id,
  meta,
});

export const removeUdpIngressSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_UDP_INGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const removeUdpIngressFailure = (error, meta = {}) => ({
  type: c.REMOVE_UDP_INGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
