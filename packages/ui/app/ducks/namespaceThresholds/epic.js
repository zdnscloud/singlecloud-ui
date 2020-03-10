/**
 * Duck: NamespaceThresholds
 * epic: namespaceThresholds
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

export const loadNamespaceThresholdsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NAMESPACE_THRESHOLDS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadNamespaceThresholdsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadNamespaceThresholdsFailure(error, meta));
        })
      )
    )
  );

export const createNamespaceThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createNamespaceThresholdSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createNamespaceThresholdFailure(error, meta));
        })
      )
    )
  );

export const updateNamespaceThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_NAMESPACE_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateNamespaceThresholdSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateNamespaceThresholdFailure(error, meta));
        })
      )
    )
  );

export const readNamespaceThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_NAMESPACE_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readNamespaceThresholdSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readNamespaceThresholdFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeNamespaceThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_NAMESPACE_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeNamespaceThresholdSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeNamespaceThresholdFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadNamespaceThresholdsEpic,
  createNamespaceThresholdEpic,
  updateNamespaceThresholdEpic,
  readNamespaceThresholdEpic,
  removeNamespaceThresholdEpic,
);
