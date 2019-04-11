import * as c from './constants';

/*
  actions
*/
export const loadUsers = () => ({
  type: c.LOAD_USERS,
  payload: {},
});

export const loadUsersSuccess = (resp) => ({
  type: c.LOAD_USERS_SUCCESS,
  payload: resp,
});

export const loadUsersFailure = (error) => ({
  type: c.LOAD_USERS_FAILURE,
  payload: error,
  error: true,
});

export const loadUser = () => ({
  type: c.LOAD_USER,
  payload: {},
});

export const loadUserSuccess = () => ({
  type: c.LOAD_USER_SUCCESS,
  payload: {},
});

export const loadUserFailure = () => ({
  type: c.LOAD_USER_FAILURE,
  payload: {},
});

export const createUser = (data, meta) => ({
  type: c.CREATE_USER,
  payload: data,
  meta,
});

export const createUserSuccess = (resp) => ({
  type: c.CREATE_USER_SUCCESS,
  payload: resp,
});

export const createUserFailure = () => ({
  type: c.CREATE_USER_FAILURE,
  payload: {},
});

export const updateUser = () => ({
  type: c.UPDATE_USER,
  payload: {},
});

export const updateUserSuccess = () => ({
  type: c.UPDATE_USER_SUCCESS,
  payload: {},
});

export const updateUserFailure = () => ({
  type: c.UPDATE_USER_FAILURE,
  payload: {},
});

export const removeUser = (id) => ({
  type: c.REMOVE_USER,
  payload: id,
});

export const removeUserSuccess = (resp, id) => ({
  type: c.REMOVE_USER_SUCCESS,
  payload: resp,
  meta: { id },
});

export const removeUserFailure = (error, id) => ({
  type: c.REMOVE_USER_FAILURE,
  payload: error,
  meta: { id },
});
