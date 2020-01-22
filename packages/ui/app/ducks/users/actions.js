/**
 * Duck: Users
 * actions: users
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadUsers = (url, meta = {}) => ({
  type: c.LOAD_USERS,
  payload: url,
  meta,
});

export const loadUsersSuccess = (resp, meta = {}) => ({
  type: c.LOAD_USERS_SUCCESS,
  payload: resp,
  meta,
});

export const loadUsersFailure = (error, meta = {}) => ({
  type: c.LOAD_USERS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createUser = (data, meta = {}) => ({
  type: c.CREATE_USER,
  payload: data,
  meta,
});

export const createUserSuccess = (resp, meta = {}) => ({
  type: c.CREATE_USER_SUCCESS,
  payload: resp,
  meta,
});

export const createUserFailure = (error, meta = {}) => ({
  type: c.CREATE_USER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateUser = (data, meta = {}) => ({
  type: c.UPDATE_USER,
  payload: data,
  meta,
});

export const updateUserSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_USER_SUCCESS,
  payload: resp,
  meta,
});

export const updateUserFailure = (error, meta = {}) => ({
  type: c.UPDATE_USER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readUser = (id, meta = {}) => ({
  type: c.READ_USER,
  payload: id,
  meta,
});

export const readUserSuccess = (resp, meta = {}) => ({
  type: c.READ_USER_SUCCESS,
  payload: resp,
  meta,
});

export const readUserFailure = (error, meta = {}) => ({
  type: c.READ_USER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeUser = (id, meta = {}) => ({
  type: c.REMOVE_USER,
  payload: id,
  meta,
});

export const removeUserSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_USER_SUCCESS,
  payload: resp,
  meta,
});

export const removeUserFailure = (error, meta = {}) => ({
  type: c.REMOVE_USER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeUserAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_USER_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeUserActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_USER_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeUserActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_USER_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
