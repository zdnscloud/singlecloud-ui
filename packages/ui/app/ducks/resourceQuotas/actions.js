import * as c from './constants';

/* 
 actions 
*/
export const loadResourceQuota = (meta) => ({
  type: c.LOAD_RESOURCE_QUOTA,
  payload: {},
  meta,
});

export const loadResourceQuotaSuccess = (resp, meta) => ({
  type: c.LOAD_RESOURCE_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const loadResourceQuotaFailure = (error, meta) => ({
  type: c.LOAD_RESOURCE_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createResourceQuota = (data, meta) => ({
  type: c.CREATE_RESOURCE_QUOTA,
  payload: data,
  meta,
});

export const createResourceQuotaSuccess = (resp, meta) => ({
  type: c.CREATE_RESOURCE_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const createResourceQuotaFailure = (error, meta) => ({
  type: c.CREATE_RESOURCE_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});
