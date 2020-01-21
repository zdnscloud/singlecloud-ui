/**
 * Duck: Namespaces
 * epic: namespaces
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

export const loadNamespacesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NAMESPACES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadNamespacesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadNamespacesFailure(error, meta));
        })
      )
    )
  );

export const createNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createNamespaceSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createNamespaceFailure(error, meta));
        })
      )
    )
  );

export const readNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_NAMESPACE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readNamespaceSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readNamespaceFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_NAMESPACE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeNamespaceSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeNamespaceFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadNamespacesEpic,
  createNamespaceEpic,
  readNamespaceEpic,
  removeNamespaceEpic
);
