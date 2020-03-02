/**
 * Duck: Clusters
 * epic: clusters
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

export const loadClustersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CLUSTERS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadClustersSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadClustersFailure(error, meta));
        })
      )
    )
  );

export const createClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createClusterSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createClusterFailure(error, meta));
        })
      )
    )
  );

export const updateClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateClusterSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateClusterFailure(error, meta));
        })
      )
    )
  );

export const readClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readClusterSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readClusterFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_CLUSTER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeClusterSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeClusterFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const executeClusterActionEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.EXECUTE_CLUSTER_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeClusterActionSuccess(resp, { ...meta, action });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.executeClusterActionFailure(error, { ...meta, action }));
        })
      )
    )
  );

export default combineEpics(
  loadClustersEpic,
  createClusterEpic,
  updateClusterEpic,
  readClusterEpic,
  removeClusterEpic,
  executeClusterActionEpic,
);
