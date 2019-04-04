/**
 *
 * Role Duck
 *
 */
import { fromJS } from 'immutable';

const prefix = 'ducks/role';
/*
  constants
*/
export const LOGIN = `${prefix}/login`;
export const LOGIN_REQUEST = `${prefix}/login-request`;
export const LOGIN_SUCCESS = `${prefix}/login-success`;
export const LOGIN_FAILURE = `${prefix}/login-failure`;

export const LOGOUT = `${prefix}/logout`;
export const LOGOUT_REQUEST = `${prefix}/logout-request`;
export const LOGOUT_SUCCESS = `${prefix}/logout-success`;
export const LOGOUT_FAILURE = `${prefix}/logout-failure`;

/*
  actions
*/
export const login = (data) => ({
  type: LOGIN,
  payload: { data },
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
  payload: {},
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: { data },
});

export const loginFailure = (errors) => ({
  type: LOGIN_FAILURE,
  payload: { errors },
});

export const logout = (data) => ({
  type: LOGOUT,
  payload: { data },
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
  payload: {},
});

export const logoutSuccess = (data) => ({
  type: LOGOUT_SUCCESS,
  payload: { data },
});

export const logoutFailure = (errors) => ({
  type: LOGOUT_FAILURE,
  payload: { errors },
});

/*
  reducer
*/
export const initialState = fromJS({
  role: {},
  authorization: '',
});

function roleReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default roleReducer;
