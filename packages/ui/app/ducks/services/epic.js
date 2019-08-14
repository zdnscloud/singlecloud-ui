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
        map((resp) => a.loadServicesSuccess(resp, meta)),
        catchError((error) => of(a.loadServicesFailure(error, meta)))
      )
    )
  );

export const createServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_SERVICE),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createServiceSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.createServiceFailure(error));
        })
      )
    )
  );

export const updateServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_SERVICE),
    mergeMap(({ payload, meta: { url, id } }) =>
      ajax({
        url: `${url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => a.updateServiceSuccess(resp, { id })),
        catchError((error) =>
          of(a.updateServiceFailure(error, { id }))
        )
      )
    )
  );

export const readServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_SERVICE),
    mergeMap(({ payload, meta: { url } }) =>
      ajax({
        url: `${url}`,
        method: 'GET',
      }).pipe(
        map((resp) => a.readServiceSuccess(resp, { id: payload })),
        catchError((error) =>
          of(a.readServiceFailure(error, { id: payload }))
        )
      )
    )
  );

export const removeServiceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_SERVICE),
    mergeMap(({ payload, meta: { url } }) =>
      ajax({
        url: `${url}`,
        method: 'REMOVE',
      }).pipe(
        map((resp) => a.removeServiceSuccess(resp, { id: payload })),
        catchError((error) =>
          of(a.removeServiceFailure(error, { id: payload }))
        )
      )
    )
  );

export const afterCreateServiceEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_SERVICE_SUCCESS),
    mergeMap(({ payload, meta }) => mapTo(push(`/services`)))
  );

export default combineEpics(
  loadServicesEpic,
  createServiceEpic,
  updateServiceEpic,
  readServiceEpic,
  removeServiceEpic,
  afterCreateServiceEpic,
);
