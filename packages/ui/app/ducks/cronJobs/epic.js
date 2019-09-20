/**
 * Duck: Cronjobs
 * epic: cronJobs
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

export const loadCronJobsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CRON_JOBS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadCronJobsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadCronJobsFailure(error, meta));
        })
      )
    )
  );

export const createCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CRON_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createCronJobSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createCronJobFailure(error, meta));
        })
      )
    )
  );

export const updateCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_CRON_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateCronJobSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateCronJobFailure(error, meta));
        })
      )
    )
  );

export const readCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_CRON_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readCronJobSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readCronJobFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_CRON_JOB),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeCronJobSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeCronJobFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadCronJobsEpic,
  createCronJobEpic,
  updateCronJobEpic,
  readCronJobEpic,
  removeCronJobEpic
);
