/**
 * Duck: Efks
 * actions: efks
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadEfks = (url, meta = {}) => ({
  type: c.LOAD_EFKS,
  payload: url,
  meta,
});

export const loadEfksSuccess = (resp, meta = {}) => ({
  type: c.LOAD_EFKS_SUCCESS,
  payload: resp,
  meta,
});

export const loadEfksFailure = (error, meta = {}) => ({
  type: c.LOAD_EFKS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createEfk = (data, meta = {}) => ({
  type: c.CREATE_EFK,
  payload: data,
  meta,
});

export const createEfkSuccess = (resp, meta = {}) => ({
  type: c.CREATE_EFK_SUCCESS,
  payload: resp,
  meta,
});

export const createEfkFailure = (error, meta = {}) => ({
  type: c.CREATE_EFK_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readEfk = (id, meta = {}) => ({
  type: c.READ_EFK,
  payload: id,
  meta,
});

export const readEfkSuccess = (resp, meta = {}) => ({
  type: c.READ_EFK_SUCCESS,
  payload: resp,
  meta,
});

export const readEfkFailure = (error, meta = {}) => ({
  type: c.READ_EFK_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeEfk = (id, meta = {}) => ({
  type: c.REMOVE_EFK,
  payload: id,
  meta,
});

export const removeEfkSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_EFK_SUCCESS,
  payload: resp,
  meta,
});

export const removeEfkFailure = (error, meta = {}) => ({
  type: c.REMOVE_EFK_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
