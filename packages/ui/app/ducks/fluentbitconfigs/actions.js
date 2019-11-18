/**
 * Duck: Fluentbitconfigs
 * actions: fluentbitconfigs
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadFluentbitconfigs = (url, meta = {}) => ({
  type: c.LOAD_FLUENTBITCONFIGS,
  payload: url,
  meta,
});

export const loadFluentbitconfigsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_FLUENTBITCONFIGS_SUCCESS,
  payload: resp,
  meta,
});

export const loadFluentbitconfigsFailure = (error, meta = {}) => ({
  type: c.LOAD_FLUENTBITCONFIGS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createFluentbitconfig = (data, meta = {}) => ({
  type: c.CREATE_FLUENTBITCONFIG,
  payload: data,
  meta,
});

export const createFluentbitconfigSuccess = (resp, meta = {}) => ({
  type: c.CREATE_FLUENTBITCONFIG_SUCCESS,
  payload: resp,
  meta,
});

export const createFluentbitconfigFailure = (error, meta = {}) => ({
  type: c.CREATE_FLUENTBITCONFIG_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateFluentbitconfig = (data, meta = {}) => ({
  type: c.UPDATE_FLUENTBITCONFIG,
  payload: data,
  meta,
});

export const updateFluentbitconfigSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_FLUENTBITCONFIG_SUCCESS,
  payload: resp,
  meta,
});

export const updateFluentbitconfigFailure = (error, meta = {}) => ({
  type: c.UPDATE_FLUENTBITCONFIG_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readFluentbitconfig = (id, meta = {}) => ({
  type: c.READ_FLUENTBITCONFIG,
  payload: id,
  meta,
});

export const readFluentbitconfigSuccess = (resp, meta = {}) => ({
  type: c.READ_FLUENTBITCONFIG_SUCCESS,
  payload: resp,
  meta,
});

export const readFluentbitconfigFailure = (error, meta = {}) => ({
  type: c.READ_FLUENTBITCONFIG_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeFluentbitconfig = (id, meta = {}) => ({
  type: c.REMOVE_FLUENTBITCONFIG,
  payload: id,
  meta,
});

export const removeFluentbitconfigSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_FLUENTBITCONFIG_SUCCESS,
  payload: resp,
  meta,
});

export const removeFluentbitconfigFailure = (error, meta = {}) => ({
  type: c.REMOVE_FLUENTBITCONFIG_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
