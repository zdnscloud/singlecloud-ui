/**
 * Duck: Efks
 * epic: efks
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

export const loadEfksEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_EFKS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadEfksSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadEfksFailure(error, meta));
        })
      )
    )
  );

export const createEfkEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_EFK),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createEfkSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createEfkFailure(error, meta));
        })
      )
    )
  );

export const readEfkEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_EFK),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readEfkSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readEfkFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(loadEfksEpic, createEfkEpic, readEfkEpic);
