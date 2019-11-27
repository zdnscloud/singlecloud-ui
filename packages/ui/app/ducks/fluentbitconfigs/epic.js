/**
 * Duck: Fluentbitconfigs
 * epic: fluentbitconfigs
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

export const loadFluentbitconfigsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_FLUENTBITCONFIGS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadFluentbitconfigsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadFluentbitconfigsFailure(error, meta));
        })
      )
    )
  );

export const createFluentbitconfigEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_FLUENTBITCONFIG),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createFluentbitconfigSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createFluentbitconfigFailure(error, meta));
        })
      )
    )
  );

export const updateFluentbitconfigEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_FLUENTBITCONFIG),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateFluentbitconfigSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateFluentbitconfigFailure(error, meta));
        })
      )
    )
  );

export const readFluentbitconfigEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_FLUENTBITCONFIG),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readFluentbitconfigSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.readFluentbitconfigFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export const removeFluentbitconfigEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_FLUENTBITCONFIG),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeFluentbitconfigSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.removeFluentbitconfigFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export default combineEpics(
  loadFluentbitconfigsEpic,
  createFluentbitconfigEpic,
  updateFluentbitconfigEpic,
  readFluentbitconfigEpic,
  removeFluentbitconfigEpic
);
