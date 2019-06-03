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

export const loadNamespacesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NAMESPACES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadNamespacesSuccess(resp, clusterID)),
        catchError((error) =>
          of(a.loadNamespacesFailure(error, clusterID)))
      )
    )
  );

export const createNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createNamespaceSuccess(resp, { clusterID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createNamespaceFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces`))))
  );

export const removeNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_NAMESPACE),
    mergeMap(({ payload, meta: { url, clusterID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeNamespaceSuccess(resp, { id: payload, clusterID });
        }),
        catchError((error) => {
          return of(a.removeNamespaceFailure(error, { id: payload, clusterID }));
        })
      )
    )
  );

export default combineEpics(
  loadNamespacesEpic,
  createNamespaceEpic,
  afterCreateEpic
);
