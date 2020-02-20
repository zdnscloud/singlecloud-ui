/**
 * Duck: ResourceQuota
 * epic: resourceQuota
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

export const loadResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_RESOURCE_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadResourceQuotaSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadResourceQuotaFailure(error, meta));
        })
      )
    )
  );

export const createResourceQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_RESOURCE_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createResourceQuotumSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createResourceQuotumFailure(error, meta));
        })
      )
    )
  );


export const readResourceQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_RESOURCE_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readResourceQuotumSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readResourceQuotumFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeResourceQuotumEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_RESOURCE_QUOTUM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeResourceQuotumSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeResourceQuotumFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadResourceQuotaEpic,
  createResourceQuotumEpic,
  readResourceQuotumEpic,
  removeResourceQuotumEpic,
);
