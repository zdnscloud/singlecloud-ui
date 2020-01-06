/**
 * Duck: ResourceQuota
 * actions: resourceQuota
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadResourceQuota = (url, meta = {}) => ({
  type: c.LOAD_RESOURCE_QUOTA,
  payload: url,
  meta,
});

export const loadResourceQuotaSuccess = (resp, meta = {}) => ({
  type: c.LOAD_RESOURCE_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const loadResourceQuotaFailure = (error, meta = {}) => ({
  type: c.LOAD_RESOURCE_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createResourceQuotum = (data, meta = {}) => ({
  type: c.CREATE_RESOURCE_QUOTUM,
  payload: data,
  meta,
});

export const createResourceQuotumSuccess = (resp, meta = {}) => ({
  type: c.CREATE_RESOURCE_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const createResourceQuotumFailure = (error, meta = {}) => ({
  type: c.CREATE_RESOURCE_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readResourceQuotum = (id, meta = {}) => ({
  type: c.READ_RESOURCE_QUOTUM,
  payload: id,
  meta,
});

export const readResourceQuotumSuccess = (resp, meta = {}) => ({
  type: c.READ_RESOURCE_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const readResourceQuotumFailure = (error, meta = {}) => ({
  type: c.READ_RESOURCE_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeResourceQuotum = (id, meta = {}) => ({
  type: c.REMOVE_RESOURCE_QUOTUM,
  payload: id,
  meta,
});

export const removeResourceQuotumSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_RESOURCE_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const removeResourceQuotumFailure = (error, meta = {}) => ({
  type: c.REMOVE_RESOURCE_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
