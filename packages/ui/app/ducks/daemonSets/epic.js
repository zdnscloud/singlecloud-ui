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

export const loadDaemonSetsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DAEMONSETS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadDaemonSetsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadDaemonSetsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DAEMONSET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}`).pipe(
        map((resp) => a.loadDaemonSetSuccess(resp, { clusterID, namespaceID })),
        catchError((error) =>
          of(a.loadDaemonSetFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const createDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_DAEMONSET),
    mergeMap(
      ({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
        ajax({
          url,
          method: 'POST',
          body: payload,
        }).pipe(
          map((resp) => {
            resolve(resp);
            return a.createDaemonSetSuccess(resp, { clusterID, namespaceID });
          }),
          catchError((error) => {
            reject(error);
            return of(
              a.createDaemonSetFailure(error, { clusterID, namespaceID })
            );
          })
        )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_DAEMONSET_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(
        mapTo(
          push(
            `/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/daemonSets`
          )
        )
      )
    )
  );

export const updateDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_DAEMONSET),
    mergeMap(
      ({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
        ajax({
          url,
          method: 'PUT',
          body: payload,
        }).pipe(
          map((resp) => {
            resolve(resp);
            return a.updateDaemonSetSuccess(resp, { clusterID, namespaceID });
          }),
          catchError((error) => {
            reject(error);
            return of(
              a.updateDaemonSetFailure(error, { clusterID, namespaceID })
            );
          })
        )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_DAEMONSET_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(
        mapTo(
          push(
            `/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/daemonSets`
          )
        )
      )
    )
  );

export const removeDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_DAEMONSET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) =>
          a.removeDaemonSetSuccess(resp, {
            id: payload,
            clusterID,
            namespaceID,
          })
        ),
        catchError((error) =>
          of(
            a.removeDaemonSetFailure(error, {
              id: payload,
              clusterID,
              namespaceID,
            })
          )
        )
      )
    )
  );

export const scaleDaemonSetEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.SCALE_DAEMONSET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) =>
          a.scaleDaemonSetSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.scaleDaemonSetFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const afterScaleEpic = (action$) =>
  action$.pipe(
    ofType(c.SCALE_DAEMONSET_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo({ type: 'Woooo', payload: null }))
    )
  );

export default combineEpics(
  loadDaemonSetsEpic,
  loadDaemonSetEpic,
  createDaemonSetEpic,
  afterCreateEpic,
  updateDaemonSetEpic,
  afterUpdateEpic,
  scaleDaemonSetEpic,
  afterScaleEpic,
  removeDaemonSetEpic
);
