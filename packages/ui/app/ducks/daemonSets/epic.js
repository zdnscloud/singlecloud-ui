/**
 * Duck: DaemonSets
 * epic: daemonSets
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

export const loadDaemonSetsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DAEMON_SETS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadDaemonSetsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadDaemonSetsFailure(error, meta));
        })
      )
    )
  );

export const createDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_DAEMON_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createDaemonSetSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createDaemonSetFailure(error, meta));
        })
      )
    )
  );

export const updateDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_DAEMON_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateDaemonSetSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateDaemonSetFailure(error, meta));
        })
      )
    )
  );

export const readDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_DAEMON_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readDaemonSetSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readDaemonSetFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_DAEMON_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeDaemonSetSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeDaemonSetFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const executeDaemonSetActionEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.EXECUTE_DAEMON_SET_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeDaemonSetActionSuccess(resp, { ...meta, action });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.executeDaemonSetActionFailure(error, { ...meta, action }));
        })
      )
    )
  );

export default combineEpics(
  loadDaemonSetsEpic,
  createDaemonSetEpic,
  updateDaemonSetEpic,
  readDaemonSetEpic,
  removeDaemonSetEpic,
  executeDaemonSetActionEpic,
);
