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
  concat,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadUserQuotasEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_USER_QUOTAS),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadUserQuotasSuccess(resp, clusterID)),
        catchError((error) => of(a.loadUserQuotasFailure(error, clusterID)))
      )
    )
  );

export const createUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_USER_QUOTA),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createUserQuotaSuccess(resp, { clusterID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createUserQuotaFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_USER_QUOTA_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/userQuotas`)))
    )
  );

export const removeUserQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_USER_QUOTA),
    mergeMap(({ payload, meta: { url, clusterID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) =>
          a.removeUserQuotaSuccess(resp, { id: payload, clusterID })
        ),
        catchError((error) =>
          of(a.removeUserQuotaFailure(error, { id: payload, clusterID }))
        )
      )
    )
  );

export const loadAllUserQuotasEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_ALL_USER_QUOTAS),
    mergeMap(({ payload: { clusters } }) => {
      const list = clusters
        .map((c) => ({
          clusterID: c.get('id'),
          url: c.getIn(['links', 'userQuotas']),
        }))
        .map(({ url, clusterID }) =>
          ajax(url).pipe(
            map((resp) => a.loadUserQuotaSuccess(resp, clusterID)),
            catchError((error) => of(a.loadUserQuotaFailure(error, clusterID)))
          )
        )
        .toJS();
      return concat.apply(null, list);
    })
  );

export default combineEpics(
  loadUserQuotasEpic,
  createUserQuotaEpic,
  afterCreateEpic,
  removeUserQuotaEpic
);
