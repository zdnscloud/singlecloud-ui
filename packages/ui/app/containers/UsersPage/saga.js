import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import request from 'utils/request';

import { INIT_ACTION, LOAD_USERS, LOAD_USER } from './constants';
import {
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
} from './actions';
import { makeSelectUsers } from './selectors';

export const url = '/apis/zcloud.cn/v1/users';

export function* initialize() {
  yield* loadUsers();
}

export function* loadUsers() {
  try {
    yield put(loadUsersRequest());
    const data = yield call(request, url);
    yield put(loadUsersSuccess(data));
  } catch (e) {
    yield put(loadUsersFailure(e));
  }
}

export function* loadUser({ payload }) {
  try {
    const userID = payload.id;
    yield put(loadUserRequest());
    const data = yield call(request, `${url}/${userID}`);
    yield put(loadUserSuccess(data));
  } catch (e) {
    yield put(loadUserFailure(e));
  }
}

// Individual exports for testing
export default function* usersPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_USERS, loadUsers);
  yield takeLatest(LOAD_USER, loadUser);
}
