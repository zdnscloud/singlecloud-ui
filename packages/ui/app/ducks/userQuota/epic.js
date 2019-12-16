/**
 * Duck: UserQuota
 * epic: userQuota
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

export const loadUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_USER_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadUserQuotaSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadUserQuotaFailure(error, meta));
        })
      )
    )
  );

export const createUserQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_USER_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createUserQuotumSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createUserQuotumFailure(error, meta));
        })
      )
    )
  );

export const updateUserQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_USER_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateUserQuotumSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateUserQuotumFailure(error, meta));
        })
      )
    )
  );

export const readUserQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_USER_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readUserQuotumSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readUserQuotumFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeUserQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_USER_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeUserQuotumSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeUserQuotumFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadUserQuotaEpic,
  createUserQuotumEpic,
  updateUserQuotumEpic,
  readUserQuotumEpic,
  removeUserQuotumEpic,
);
