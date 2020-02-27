/**
 * Duck: Jobs
 * epic: jobs
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

export const loadJobsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_JOBS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadJobsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadJobsFailure(error, meta));
        })
      )
    )
  );

export const createJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createJobSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createJobFailure(error, meta));
        })
      )
    )
  );


export const readJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readJobSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readJobFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeJobSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeJobFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadJobsEpic,
  createJobEpic,
  readJobEpic,
  removeJobEpic,
);
