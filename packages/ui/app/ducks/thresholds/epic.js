/**
 * Duck: Thresholds
 * epic: thresholds
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

export const loadThresholdsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_THRESHOLDS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadThresholdsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadThresholdsFailure(error, meta));
        })
      )
    )
  );

export const updateThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateThresholdSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateThresholdFailure(error, meta));
        })
      )
    )
  );

export const readThresholdEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_THRESHOLD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readThresholdSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readThresholdFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadThresholdsEpic,
  updateThresholdEpic,
  readThresholdEpic,
);
