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

export const loadStatefulSetsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STATEFULSETS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadStatefulSetsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadStatefulSetsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STATEFULSET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}`).pipe(
        map((resp) => a.loadStatefulSetSuccess(resp, { clusterID, namespaceID })),
        catchError((error) => of(a.loadStatefulSetFailure(error, { clusterID, namespaceID })))
      )
    )
  );

export const createStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_STATEFULSET),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createStatefulSetSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createStatefulSetFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_STATEFULSET_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/statefulSets`))))
  );

export const updateStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_STATEFULSET),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateStatefulSetSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateStatefulSetFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_STATEFULSET_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/statefulSets`))))
  );

export const removeStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_STATEFULSET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeStatefulSetSuccess(resp, { id: payload, clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.removeStatefulSetFailure(error, { id: payload, clusterID, namespaceID }));
        })
      )
    )
  );

export const scaleStatefulSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.SCALE_STATEFULSET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          return a.scaleStatefulSetSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.scaleStatefulSetFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterScaleEpic = (action$) =>
  action$.pipe(
    ofType(c.SCALE_STATEFULSET_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo({ type: 'Woooo', payload: null })))
  );

export default combineEpics(
  loadStatefulSetsEpic,
  loadStatefulSetEpic,
  createStatefulSetEpic,
  afterCreateEpic,
  updateStatefulSetEpic,
  afterUpdateEpic,
  scaleStatefulSetEpic,
  afterScaleEpic,
  removeStatefulSetEpic
);
