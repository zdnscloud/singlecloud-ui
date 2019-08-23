/**
 * Duck: Registries
 * epic: registries
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

export const loadRegistriesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_REGISTRIES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadRegistriesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadRegistriesFailure(error, meta));
        })
      )
    )
  );

export const createRegistryEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_REGISTRY),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createRegistrySuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createRegistryFailure(error, meta));
        })
      )
    )
  );

export const removeRegistryEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_REGISTRY),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeRegistrySuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeRegistryFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadRegistriesEpic,
  createRegistryEpic,
  removeRegistryEpic,
);