/**
 * Duck: Services
 * epic: services
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

export const loadServicesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_SERVICES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadServicesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadServicesFailure(error, meta));
        })
      )
    )
  );

export const createServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_SERVICE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createServiceSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createServiceFailure(error, meta));
        })
      )
    )
  );

export const updateServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_SERVICE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateServiceSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateServiceFailure(error, meta));
        })
      )
    )
  );

export const readServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_SERVICE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readServiceSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readServiceFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_SERVICE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeServiceSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeServiceFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const afterCreateServiceEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_SERVICE_SUCCESS),
    mergeMap(({ payload, meta }) => of(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/services`)))
  );

export default combineEpics(
  loadServicesEpic,
  createServiceEpic,
  updateServiceEpic,
  readServiceEpic,
  removeServiceEpic,
  afterCreateServiceEpic,
);
