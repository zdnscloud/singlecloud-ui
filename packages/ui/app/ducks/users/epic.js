/**
 * Duck: Users
 * epic: users
 *
 */
import { push } from 'connected-react-router';
import { Observable, interval, of, timer, concat } from 'rxjs';
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
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadUsersSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadUsersFailure(error, meta));
        })
      )
    )
  );

export const createUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_USER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createUserSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createUserFailure(error, meta));
        })
      )
    )
  );

export const updateUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_USER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateUserSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateUserFailure(error, meta));
        })
      )
    )
  );

export const readUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_USER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readUserSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readUserFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeUserEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_USER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeUserSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeUserFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const executeUserActionEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.EXECUTE_USER_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeUserActionSuccess(resp, { ...meta, action });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.executeUserActionFailure(error, { ...meta, action }));
        })
      )
    )
  );

export default combineEpics(
  loadUsersEpic,
  createUserEpic,
  updateUserEpic,
  readUserEpic,
  removeUserEpic,
  executeUserActionEpic,
);
