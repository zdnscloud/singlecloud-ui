import * as constants from './constants';

/*
  actions
*/
export const login = (formData, meta) => ({
  type: constants.LOGIN,
  payload: { ...formData },
  meta,
});

export const loginRequest = () => ({
  type: constants.LOGIN_REQUEST,
  payload: {},
});

export const loginSuccess = (resp) => ({
  type: constants.LOGIN_SUCCESS,
  payload: resp,
});

export const loginFailure = (errors) => ({
  type: constants.LOGIN_FAILURE,
  payload: errors,
  error: true,
});

export const logout = (data) => ({
  type: constants.LOGOUT,
  payload: { data },
});

export const logoutRequest = () => ({
  type: constants.LOGOUT_REQUEST,
  payload: {},
});

export const logoutSuccess = (data) => ({
  type: constants.LOGOUT_SUCCESS,
  payload: { data },
});

export const logoutFailure = (errors) => ({
  type: constants.LOGOUT_FAILURE,
  payload: { errors },
});
