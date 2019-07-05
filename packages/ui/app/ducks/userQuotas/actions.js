import * as c from './constants';

/*
  actions
*/
export const loadUserQuotas = (url, clusterID) => ({
  type: c.LOAD_USER_QUOTAS,
  payload: url,
  meta: { clusterID },
});

export const loadUserQuotasSuccess = (resp, clusterID) => ({
  type: c.LOAD_USER_QUOTAS_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadUserQuotasFailure = (error, clusterID) => ({
  type: c.LOAD_USER_QUOTAS_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const createUserQuota = (data, meta) => ({
  type: c.CREATE_USER_QUOTA,
  payload: data,
  meta,
});

export const createUserQuotaSuccess = (resp, meta) => ({
  type: c.CREATE_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const createUserQuotaFailure = (error, meta) => ({
  type: c.CREATE_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeUserQuota = (id, meta) => ({
  type: c.REMOVE_USER_QUOTA,
  payload: id,
  meta,
});

export const removeUserQuotaSuccess = (resp, meta) => ({
  type: c.REMOVE_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const removeUserQuotaFailure = (error, meta) => ({
  type: c.REMOVE_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const changeUserQuota = (userQuotaID, clusterID) => ({
  type: c.CHANGE_USER_QUOTA,
  payload: { userQuotaID, clusterID },
});

export const loadAllUserQuotas = (clusters) => ({
  type: c.LOAD_ALL_USER_QUOTAS,
  payload: { clusters },
});
