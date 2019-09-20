/**
 * Duck: Applications
 * epic: applications
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

export const loadApplicationsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_APPLICATIONS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadApplicationsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadApplicationsFailure(error, meta));
        })
      )
    )
  );

export const createApplicationEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_APPLICATION),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createApplicationSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createApplicationFailure(error, meta));
        })
      )
    )
  );

export const readApplicationEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_APPLICATION),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readApplicationSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readApplicationFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeApplicationEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_APPLICATION),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeApplicationSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.removeApplicationFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export default combineEpics(
  loadApplicationsEpic,
  createApplicationEpic,
  readApplicationEpic,
  removeApplicationEpic
);
