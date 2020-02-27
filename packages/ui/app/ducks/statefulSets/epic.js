/**
 * Duck: StatefulSets
 * epic: statefulSets
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

export const loadStatefulSetsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STATEFUL_SETS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadStatefulSetsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadStatefulSetsFailure(error, meta));
        })
      )
    )
  );

export const createStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_STATEFUL_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createStatefulSetSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createStatefulSetFailure(error, meta));
        })
      )
    )
  );

export const updateStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_STATEFUL_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateStatefulSetSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateStatefulSetFailure(error, meta));
        })
      )
    )
  );

export const readStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_STATEFUL_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readStatefulSetSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readStatefulSetFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_STATEFUL_SET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeStatefulSetSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeStatefulSetFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const executeStatefulSetActionEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.EXECUTE_STATEFUL_SET_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeStatefulSetActionSuccess(resp, { ...meta, action });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.executeStatefulSetActionFailure(error, { ...meta, action }));
        })
      )
    )
  );

export default combineEpics(
  loadStatefulSetsEpic,
  createStatefulSetEpic,
  updateStatefulSetEpic,
  readStatefulSetEpic,
  removeStatefulSetEpic,
  executeStatefulSetActionEpic,
);
