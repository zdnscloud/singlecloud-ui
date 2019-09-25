/**
 * Duck: Monitors
 * epic: monitors
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

export const loadMonitorsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_MONITORS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadMonitorsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadMonitorsFailure(error, meta));
        })
      )
    )
  );

export const createMonitorEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_MONITOR),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createMonitorSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createMonitorFailure(error, meta));
        })
      )
    )
  );

export const readMonitorEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_MONITOR),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readMonitorSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readMonitorFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadMonitorsEpic,
  createMonitorEpic,
  readMonitorEpic
);
