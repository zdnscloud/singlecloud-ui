/**
 * Duck: ResourceQuotas
 * actions: resourceQuotas
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadResourceQuotas = (url, meta = {}) => ({
  type: c.LOAD_RESOURCE_QUOTAS,
  payload: url,
  meta,
});

export const loadResourceQuotasSuccess = (resp, meta = {}) => ({
  type: c.LOAD_RESOURCE_QUOTAS_SUCCESS,
  payload: resp,
  meta,
});

export const loadResourceQuotasFailure = (error, meta = {}) => ({
  type: c.LOAD_RESOURCE_QUOTAS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createResourceQuota = (data, meta = {}) => ({
  type: c.CREATE_RESOURCE_QUOTA,
  payload: data,
  meta,
});

export const createResourceQuotaSuccess = (resp, meta = {}) => ({
  type: c.CREATE_RESOURCE_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const createResourceQuotaFailure = (error, meta = {}) => ({
  type: c.CREATE_RESOURCE_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readResourceQuota = (id, meta = {}) => ({
  type: c.READ_RESOURCE_QUOTA,
  payload: id,
  meta,
});

export const readResourceQuotaSuccess = (resp, meta = {}) => ({
  type: c.READ_RESOURCE_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const readResourceQuotaFailure = (error, meta = {}) => ({
  type: c.READ_RESOURCE_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeResourceQuota = (id, meta = {}) => ({
  type: c.REMOVE_RESOURCE_QUOTA,
  payload: id,
  meta,
});

export const removeResourceQuotaSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_RESOURCE_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const removeResourceQuotaFailure = (error, meta = {}) => ({
  type: c.REMOVE_RESOURCE_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
