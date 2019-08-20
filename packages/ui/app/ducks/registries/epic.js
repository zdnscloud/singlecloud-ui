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

export const updateRegistryEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_REGISTRY),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateRegistrySuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateRegistryFailure(error, meta));
        })
      )
    )
  );

export const readRegistryEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_REGISTRY),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readRegistrySuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readRegistryFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadRegistriesEpic,
  updateRegistryEpic,
  readRegistryEpic,
);
