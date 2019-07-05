import * as c from './constants';

/*
  actions
*/
export const loadUserQuotas = (url, userQuotaID) => ({
  type: c.LOAD_USER_QUOTAS,
  payload: url,
  meta: { userQuotaID },
});

export const loadUserQuotasSuccess = (resp, userQuotaID) => ({
  type: c.LOAD_USER_QUOTAS_SUCCESS,
  payload: resp,
  meta: { userQuotaID },
});

export const loadUserQuotasFailure = (error, userQuotaID) => ({
  type: c.LOAD_USER_QUOTAS_FAILURE,
  payload: error,
  meta: { userQuotaID },
  error: true,
});

export const createUserQuota = (id, meta) => ({
  type: c.CREATE_USER_QUOTA,
  payload: id,
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

export const changeUserQuota = (userQuotaID) => ({
  type: c.CHANGE_USER_QUOTA,
  payload: { userQuotaID },
});
