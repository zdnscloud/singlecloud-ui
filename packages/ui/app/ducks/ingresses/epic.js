/**
 * Duck: Ingress
 * epic: ingress
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

export const loadIngressesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_INGRESSES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadIngressesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadIngressesFailure(error, meta));
        })
      )
    )
  );

export const createIngressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_INGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createIngressSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createIngressFailure(error, meta));
        })
      )
    )
  );

export const readIngressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_INGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readIngressSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readIngressFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeIngressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_INGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeIngressSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeIngressFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadIngressesEpic,
  createIngressEpic,
  readIngressEpic,
  removeIngressEpic
);
