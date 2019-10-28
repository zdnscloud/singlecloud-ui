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
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_PODS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadPodsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadPodsFailure(error, meta));
        })
      )
    )
  );

// sts
export const loadSTSPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STS_PODS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadSTSPodsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadSTSPodsFailure(error, meta));
        })
      )
    )
  );

// ds
export const loadDSPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DS_PODS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadDSPodsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadDSPodsFailure(error, meta));
        })
      )
    )
  );

// cj
export const loadCJPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CJ_PODS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadCJPodsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadCJPodsFailure(error, meta));
        })
      )
    )
  );

// job
export const loadJOBPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_JOB_PODS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadJOBPodsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadJOBPodsFailure(error, meta));
        })
      )
    )
  );

export const removePodEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_POD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removePodSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removePodFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadPodsEpic,
  loadSTSPodsEpic,
  loadDSPodsEpic,
  loadCJPodsEpic,
  loadJOBPodsEpic,
  removePodEpic
);
