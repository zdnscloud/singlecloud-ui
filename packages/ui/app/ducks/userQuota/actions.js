/**
 * Duck: UserQuota
 * actions: userQuota
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadUserQuota = (url, meta = {}) => ({
  type: c.LOAD_USER_QUOTA,
  payload: url,
  meta,
});

export const loadUserQuotaSuccess = (resp, meta = {}) => ({
  type: c.LOAD_USER_QUOTA_SUCCESS,
  payload: resp,
  meta,
});

export const loadUserQuotaFailure = (error, meta = {}) => ({
  type: c.LOAD_USER_QUOTA_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createUserQuotum = (data, meta = {}) => ({
  type: c.CREATE_USER_QUOTUM,
  payload: data,
  meta,
});

export const createUserQuotumSuccess = (resp, meta = {}) => ({
  type: c.CREATE_USER_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const createUserQuotumFailure = (error, meta = {}) => ({
  type: c.CREATE_USER_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateUserQuotum = (data, meta = {}) => ({
  type: c.UPDATE_USER_QUOTUM,
  payload: data,
  meta,
});

export const updateUserQuotumSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_USER_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const updateUserQuotumFailure = (error, meta = {}) => ({
  type: c.UPDATE_USER_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readUserQuotum = (id, meta = {}) => ({
  type: c.READ_USER_QUOTUM,
  payload: id,
  meta,
});

export const readUserQuotumSuccess = (resp, meta = {}) => ({
  type: c.READ_USER_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const readUserQuotumFailure = (error, meta = {}) => ({
  type: c.READ_USER_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeUserQuotum = (id, meta = {}) => ({
  type: c.REMOVE_USER_QUOTUM,
  payload: id,
  meta,
});

export const removeUserQuotumSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_USER_QUOTUM_SUCCESS,
  payload: resp,
  meta,
});

export const removeUserQuotumFailure = (error, meta = {}) => ({
  type: c.REMOVE_USER_QUOTUM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeUserQuotumAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_USER_QUOTUM_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeUserQuotumActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_USER_QUOTUM_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeUserQuotumActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_USER_QUOTUM_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
