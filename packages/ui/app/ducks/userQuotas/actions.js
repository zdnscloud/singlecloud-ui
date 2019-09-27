/**
 * Duck: UserQuotas
 * actions: userQuotas
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadUserQuotas = (url, meta = {}) => ({
  type: c.LOAD_USER_QUOTAS,
  payload: url,
  meta,
});

export const loadUserQuotasSuccess = (resp, meta = {}) => ({
  type: c.LOAD_USER_QUOTAS_SUCCESS,
  payload: resp,
  meta,
});

export const loadUserQuotasFailure = (error, meta = {}) => ({
  type: c.LOAD_USER_QUOTAS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createUserQuota = (data, meta = {}) => ({
  type: c.CREATE_USER_QUOTA,
  payload: data,
  meta,
});

export const createUserQuotaSuccess = (resp, meta = {}) => ({
  type: c.CREATE_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const createUserQuotaFailure = (error, meta = {}) => ({
  type: c.CREATE_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateUserQuota = (data, meta = {}) => ({
  type: c.UPDATE_USER_QUOTA,
  payload: data,
  meta,
});

export const updateUserQuotaSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const updateUserQuotaFailure = (error, meta = {}) => ({
  type: c.UPDATE_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readUserQuota = (id, meta = {}) => ({
  type: c.READ_USER_QUOTA,
  payload: id,
  meta,
});

export const readUserQuotaSuccess = (resp, meta = {}) => ({
  type: c.READ_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const readUserQuotaFailure = (error, meta = {}) => ({
  type: c.READ_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeUserQuota = (id, meta = {}) => ({
  type: c.REMOVE_USER_QUOTA,
  payload: id,
  meta,
});

export const removeUserQuotaSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const removeUserQuotaFailure = (error, meta = {}) => ({
  type: c.REMOVE_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeUserQuotaAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_USER_QUOTA_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeUserQuotaActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_USER_QUOTA_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeUserQuotaActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_USER_QUOTA_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
