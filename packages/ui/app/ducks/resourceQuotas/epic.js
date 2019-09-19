/**
 * Duck: ResourceQuotas
 * epic: resourceQuotas
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

export const loadResourceQuotasEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_RESOURCE_QUOTAS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadResourceQuotasSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadResourceQuotasFailure(error, meta));
        })
      )
    )
  );

export const createResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_RESOURCE_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createResourceQuotaSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createResourceQuotaFailure(error, meta));
        })
      )
    )
  );

export const readResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_RESOURCE_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readResourceQuotaSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.readResourceQuotaFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export const removeResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_RESOURCE_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeResourceQuotaSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.removeResourceQuotaFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export default combineEpics(
  loadResourceQuotasEpic,
  createResourceQuotaEpic,
  readResourceQuotaEpic,
  removeResourceQuotaEpic
);
