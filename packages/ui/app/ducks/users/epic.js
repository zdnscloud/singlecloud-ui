import { push } from 'connected-react-router';
import { Observable, interval, of, timer } from 'rxjs';
import {
  mergeMap,
  map,
  mapTo,
  debounce,
  debounceTime,
  reduce,
  scan,
  throttleTime,
  throttle,
  catchError,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadUsersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_USERS),
    mergeMap(() => (
      ajax('/apis/zcloud.cn/v1/users').pipe(
        map((resp) => a.loadUsersSuccess(resp)),
        catchError((error) => of(a.loadUsersFailure(error)))
      )
    ))
  );

export const loadUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_USER),
    mergeMap(({ payload }) => (
      ajax(`/apis/zcloud.cn/v1/users/${payload.id}`).pipe(
        map((resp) => a.loadUserSuccess(resp)),
        catchError((error) => of(a.loadUserFailure(error)))
      )
    ))
  );

export const createUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_USER),
    mergeMap(({ payload, meta: { resolve, reject } }) => (
      ajax({
        url: `/apis/zcloud.cn/v1/users`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createUserSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.createUserFailure(error));
        })
      )
    ))
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_USER_SUCCESS),
    mergeMap(() => timer(3000).pipe(mapTo(push('/users'))))
  );

export const updateUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_USER),
    mergeMap(({ payload, meta: { resolve, reject } }) => (
      ajax({
        url: `/apis/zcloud.cn/v1/users`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateUserSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateUserFailure(error));
        })
      )
    ))
  );

export const removeUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_USER),
    mergeMap(({ payload, meta: { resolve, reject } }) => (
      ajax({
        url: `/apis/zcloud.cn/v1/users`,
        method: 'DELETE',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.removeUserSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.removeUserFailure(error));
        })
      )
    ))
  );

export default combineEpics(
  loadUsersEpic,
  loadUserEpic,
  createUserEpic,
  afterCreateEpic,
  updateUserEpic,
  removeUserEpic
);
