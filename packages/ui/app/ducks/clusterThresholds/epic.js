/**
 * Duck: ClusterThresholds
 * epic: clusterThresholds
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

export const loadClusterThresholdsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CLUSTER_THRESHOLDS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadClusterThresholdsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadClusterThresholdsFailure(error, meta));
        })
      )
    )
  );

export const createClusterThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CLUSTER_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createClusterThresholdSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createClusterThresholdFailure(error, meta));
        })
      )
    )
  );

export const updateClusterThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_CLUSTER_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateClusterThresholdSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateClusterThresholdFailure(error, meta));
        })
      )
    )
  );

export const readClusterThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_CLUSTER_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readClusterThresholdSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.readClusterThresholdFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export const removeClusterThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_CLUSTER_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeClusterThresholdSuccess(resp, {
            ...meta,
            id: payload,
          });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.removeClusterThresholdFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export default combineEpics(
  loadClusterThresholdsEpic,
  createClusterThresholdEpic,
  updateClusterThresholdEpic,
  readClusterThresholdEpic,
  removeClusterThresholdEpic
);