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

export const loadCronJobsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CRONJOBS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadCronJobsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadCronJobsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CRONJOB),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}`).pipe(
        map((resp) => a.loadCronJobSuccess(resp, { clusterID, namespaceID })),
        catchError((error) => of(a.loadCronJobFailure(error, { clusterID, namespaceID })))
      )
    )
  );

export const createCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CRONJOB),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createCronJobSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createCronJobFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_CRONJOB_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/cronJobs`))))
  );

export const updateCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_CRONJOB),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateCronJobSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateCronJobFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_CRONJOB_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/cronJobs`))))
  );

export const removeCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_CRONJOB),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeCronJobSuccess(resp, { id: payload, clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.removeCronJobFailure(error, { id: payload, clusterID, namespaceID }));
        })
      )
    )
  );

export const scaleCronJobEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.SCALE_CRONJOB),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          return a.scaleCronJobSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.scaleCronJobFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterScaleEpic = (action$) =>
  action$.pipe(
    ofType(c.SCALE_CRONJOB_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo({ type: 'Woooo', payload: null })))
  );

export default combineEpics(
  loadCronJobsEpic,
  loadCronJobEpic,
  createCronJobEpic,
  afterCreateEpic,
  updateCronJobEpic,
  afterUpdateEpic,
  scaleCronJobEpic,
  afterScaleEpic,
  removeCronJobEpic
);
