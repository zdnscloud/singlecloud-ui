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

export const loadConfigMapsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CONFIG_MAPS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadConfigMapsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadConfigMapsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadConfigMapEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CONFIG_MAP),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}/${payload}`).pipe(
        map((resp) => a.loadConfigMapSuccess(resp)),
        catchError((error) => of(a.loadConfigMapFailure(error)))
      )
    )
  );

export const createConfigMapEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CONFIG_MAP),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createConfigMapSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createConfigMapFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_CONFIG_MAP_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/configmaps`))))
  );

export const updateConfigMapEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_CONFIG_MAP),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateConfigMapSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateConfigMapFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_CONFIG_MAP_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/configmaps`))))
  );

export const removeConfigMapEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_CONFIG_MAP),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeConfigMapSuccess(resp, { id: payload, clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.removeConfigMapFailure(error, { id: payload, clusterID, namespaceID }));
        })
      )
    )
  );

export default combineEpics(
  loadConfigMapsEpic,
  loadConfigMapEpic,
  createConfigMapEpic,
  afterCreateEpic,
  updateConfigMapEpic,
  afterUpdateEpic,
  removeConfigMapEpic
);
