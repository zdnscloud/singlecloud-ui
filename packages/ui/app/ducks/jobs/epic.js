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

export const loadJobsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_JOBS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadJobsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadJobsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_JOB),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}`).pipe(
        map((resp) => a.loadJobSuccess(resp, { clusterID, namespaceID })),
        catchError((error) => of(a.loadJobFailure(error, { clusterID, namespaceID })))
      )
    )
  );

export const createJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_JOB),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createJobSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createJobFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_JOB_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/jobs`))))
  );

export const updateJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_JOB),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateJobSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateJobFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_JOB_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/jobs`))))
  );

export const removeJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_JOB),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeJobSuccess(resp, { id: payload, clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.removeJobFailure(error, { id: payload, clusterID, namespaceID }));
        })
      )
    )
  );

export const scaleJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.SCALE_JOB),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          return a.scaleJobSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.scaleJobFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterScaleEpic = (action$) =>
  action$.pipe(
    ofType(c.SCALE_JOB_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo({ type: 'Woooo', payload: null })))
  );

export default combineEpics(
  loadJobsEpic,
  loadJobEpic,
  createJobEpic,
  afterCreateEpic,
  updateJobEpic,
  afterUpdateEpic,
  scaleJobEpic,
  afterScaleEpic,
  removeJobEpic
);
