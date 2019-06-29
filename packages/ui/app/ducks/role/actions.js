import * as c from './constants';

/*
  actions
*/
export const login = (formData, meta) => ({
  type: c.LOGIN,
  payload: { ...formData },
  meta,
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

export const logoutSuccess = (data) => ({
  type: c.LOGOUT_SUCCESS,
  payload: { data },
});

export const logoutFailure = (errors) => ({
  type: c.LOGOUT_FAILURE,
  payload: { errors },
});

export const loadRole = (url, meta) => ({
  type: c.LOAD_ROLE,
  payload: url,
  meta,
});

export const loadRoleSuccess = (data, meta) => ({
  type: c.LOAD_ROLE_SUCCESS,
  payload: data,
  meta,
});

export const loadRoleFailure = (errors, meta) => ({
  type: c.LOAD_ROLE_FAILURE,
  payload: errors,
  meta,
  error: true,
});
