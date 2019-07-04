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
import { loadAllNamespaces } from 'ducks/namespaces/actions';

import * as c from './constants';
import * as a from './actions';
import { makeSelectUserQuotas } from './selectors';

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

export const removeUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_USER_QUOTA),
    mergeMap(({ payload, meta: { url } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.removeUserQuotaSuccess(resp, { id: payload })),
        catchError((error) =>
          of(a.removeUserQuotaFailure(error, { id: payload }))
        )
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
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/userQuotas`))))
  );

export default combineEpics(
  loadUserQuotasEpic,
  removeUserQuotaEpic,
  createUserQuotaEpic,
  afterCreateEpic
);
