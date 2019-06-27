import * as c from './constants';

/*
  actions
*/
export const login = (formData, meta) => ({
  type: c.LOGIN,
  payload: { ...formData },
  meta,
});

export const loginRequest = () => ({
  type: c.LOGIN_REQUEST,
  payload: {},
});

export const loginSuccess = (resp) => ({
  type: c.LOGIN_SUCCESS,
  payload: resp,
});

export const loginFailure = (errors) => ({
  type: c.LOGIN_FAILURE,
  payload: errors,
  error: true,
});

export const logout = (data) => ({
  type: c.LOGOUT,
  payload: { data },
});

export const logoutRequest = () => ({
  type: c.LOGOUT_REQUEST,
  payload: {},
});

export const logoutSuccess = (data) => ({
  type: c.LOGOUT_SUCCESS,
  payload: { data },
});

export const logoutFailure = (errors) => ({
  type: c.LOGOUT_FAILURE,
  payload: { errors },
});

export const casRole = (url, meta) => ({
  type: c.CAS_ROLE,
  payload: url,
  meta,
});

export const casRoleSuccess = (data, meta) => ({
  type: c.CAS_ROLE_SUCCESS,
  payload: data,
  meta,
});

export const casRoleFailure = (errors, meta) => ({
  type: c.CAS_ROLE_FAILURE,
  payload: errors,
  meta,
  error: true,
});
