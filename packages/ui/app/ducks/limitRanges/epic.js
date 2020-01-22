/**
 * Duck: LimitRanges
 * epic: limitRanges
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

export const loadLimitRangesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_LIMIT_RANGES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadLimitRangesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadLimitRangesFailure(error, meta));
        })
      )
    )
  );

export const createLimitRangeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_LIMIT_RANGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createLimitRangeSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createLimitRangeFailure(error, meta));
        })
      )
    )
  );


export const readLimitRangeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_LIMIT_RANGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readLimitRangeSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readLimitRangeFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeLimitRangeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_LIMIT_RANGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeLimitRangeSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeLimitRangeFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadLimitRangesEpic,
  createLimitRangeEpic,
  readLimitRangeEpic,
  removeLimitRangeEpic,
);
