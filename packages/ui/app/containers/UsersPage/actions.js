/*
 *
 * UsersPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_USERS,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_USER,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from './constants';

export function initAction() {
  return {
    type: INIT_ACTION,
  };
}

export const loadUsers = () => ({
  type: LOAD_USERS,
  payload: {},
});

export const loadUsersRequest = () => ({
  type: LOAD_USERS_REQUEST,
  payload: {},
});

export const loadUsersSuccess = (data) => ({
  type: LOAD_USERS_SUCCESS,
  payload: { data },
});

export const loadUsersFailure = (errors) => ({
  type: LOAD_USERS_FAILURE,
  payload: { errors },
});

export const loadUser = (id) => ({
  type: LOAD_USER,
  payload: { id },
});

export const loadUserRequest = () => ({
  type: LOAD_USER_REQUEST,
  payload: {},
});

export const loadUserSuccess = (data) => ({
  type: LOAD_USER_SUCCESS,
  payload: { data },
});

export const loadUserFailure = (errors) => ({
  type: LOAD_USER_FAILURE,
  payload: { errors },
});
