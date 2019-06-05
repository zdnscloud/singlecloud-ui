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

export const loadSecretsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_SECRETS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadSecretsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadSecretsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_SECRET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}/${payload}`).pipe(
        map((resp) => a.loadSecretSuccess(resp)),
        catchError((error) => of(a.loadSecretFailure(error)))
      )
    )
  );

export const createSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_SECRET),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createSecretSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createSecretFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_SECRET_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/secrets`))))
  );

export const updateSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_SECRET),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateSecretSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateSecretFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_SECRET_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/secrets`))))
  );

export const removeSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_SECRET),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeSecretSuccess(resp, { id: payload, clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.removeSecretFailure(error, { id: payload, clusterID, namespaceID }));
        })
      )
    )
  );

export default combineEpics(
  loadSecretsEpic,
  loadSecretEpic,
  createSecretEpic,
  afterCreateEpic,
  updateSecretEpic,
  afterUpdateEpic,
  removeSecretEpic
);
