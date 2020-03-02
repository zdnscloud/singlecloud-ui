/**
 * Duck: StorageClusters
 * epic: storageClusters
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

export const loadStorageClustersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STORAGE_CLUSTERS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadStorageClustersSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadStorageClustersFailure(error, meta));
        })
      )
    )
  );

export const createStorageClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_STORAGE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createStorageClusterSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createStorageClusterFailure(error, meta));
        })
      )
    )
  );

export const updateStorageClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_STORAGE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateStorageClusterSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateStorageClusterFailure(error, meta));
        })
      )
    )
  );

export const readStorageClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_STORAGE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readStorageClusterSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readStorageClusterFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeStorageClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_STORAGE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeStorageClusterSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeStorageClusterFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadStorageClustersEpic,
  createStorageClusterEpic,
  updateStorageClusterEpic,
  readStorageClusterEpic,
  removeStorageClusterEpic,
);
