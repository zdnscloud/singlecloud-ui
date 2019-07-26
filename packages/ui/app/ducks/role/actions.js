import * as c from './constants';

/*
  actions
*/
export const login = (formData, meta) => ({
  type: c.LOGIN,
  payload: { ...formData },
  meta,
});

export const loginSuccess = (resp, meta) => ({
  type: c.LOGIN_SUCCESS,
  payload: resp,
  meta,
});

export const loginFailure = (errors, meta) => ({
  type: c.LOGIN_FAILURE,
  payload: errors,
  meta,
  error: true,
});

export const logout = (data, meta) => ({
  type: c.LOGOUT,
  payload: { data },
  meta,
});

export const logoutSuccess = (data, meta) => ({
  type: c.LOGOUT_SUCCESS,
  payload: { data },
  meta,
});

export const logoutFailure = (errors, meta) => ({
  type: c.LOGOUT_FAILURE,
  payload: { errors },
  meta,
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
