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

export const loadUserQuotasEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_USER_QUOTAS),
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.loadUserQuotasSuccess(resp)),
        catchError((error) => of(a.loadUserQuotasFailure(error)))
      )
    )
  );

export const createUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_USER_QUOTA),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createUserQuotaSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.createUserQuotaFailure(error));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_USER_QUOTA_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/userQuotas`)))
    )
  );

export const removeUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_USER_QUOTA),
    mergeMap(({ payload, meta: { url} }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.removeUserQuotaSuccess(resp, { id: payload })),
        catchError((error) =>{
          return of(a.removeUserQuotaFailure(error, { id: payload }))
        }
        )
      )
    )
  );

export const updateUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_USER_QUOTA),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateUserQuotaSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateUserQuotaFailure(error));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_USER_QUOTA_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/userQuotas`)))
    )
  );

export const requestUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REQUEST_USER_QUOTA),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.requestUserQuotaSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.requestUserQuotaFailure(error));
        })
      )
    )
  );

export const afterRequestEpic = (action$) =>
  action$.pipe(
    ofType(c.REQUEST_USER_QUOTA_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/adminUserQuotas`)))
    )
  );

export default combineEpics(
  loadUserQuotasEpic,
  createUserQuotaEpic,
  afterCreateEpic,
  removeUserQuotaEpic,
  updateUserQuotaEpic,
  afterUpdateEpic,
  requestUserQuotaEpic,
  afterRequestEpic
);
