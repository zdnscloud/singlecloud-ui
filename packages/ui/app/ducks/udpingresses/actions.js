/**
 * Duck: Udpingresses
 * actions: udpingresses
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadUdpingresses = (url, meta = {}) => ({
  type: c.LOAD_UDPINGRESSES,
  payload: url,
  meta,
});

export const loadUdpingressesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_UDPINGRESSES_SUCCESS,
  payload: resp,
  meta,
});

export const loadUdpingressesFailure = (error, meta = {}) => ({
  type: c.LOAD_UDPINGRESSES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createUdpingress = (data, meta = {}) => ({
  type: c.CREATE_UDPINGRESS,
  payload: data,
  meta,
});

export const createUdpingressSuccess = (resp, meta = {}) => ({
  type: c.CREATE_UDPINGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const createUdpingressFailure = (error, meta = {}) => ({
  type: c.CREATE_UDPINGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readUdpingress = (id, meta = {}) => ({
  type: c.READ_UDPINGRESS,
  payload: id,
  meta,
});

export const readUdpingressSuccess = (resp, meta = {}) => ({
  type: c.READ_UDPINGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const readUdpingressFailure = (error, meta = {}) => ({
  type: c.READ_UDPINGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeUdpingress = (id, meta = {}) => ({
  type: c.REMOVE_UDPINGRESS,
  payload: id,
  meta,
});

export const removeUdpingressSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_UDPINGRESS_SUCCESS,
  payload: resp,
  meta,
});

export const removeUdpingressFailure = (error, meta = {}) => ({
  type: c.REMOVE_UDPINGRESS_FAILURE,
  payload: error,
  meta,
  error: true,
});
