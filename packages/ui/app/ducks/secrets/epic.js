/**
 * Duck: Secrets
 * epic: secrets
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

export const loadSecretsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_SECRETS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadSecretsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadSecretsFailure(error, meta));
        })
      )
    )
  );

export const createSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_SECRET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createSecretSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createSecretFailure(error, meta));
        })
      )
    )
  );

export const updateSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_SECRET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateSecretSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateSecretFailure(error, meta));
        })
      )
    )
  );

export const readSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_SECRET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readSecretSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readSecretFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeSecretEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_SECRET),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeSecretSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeSecretFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadSecretsEpic,
  createSecretEpic,
  updateSecretEpic,
  readSecretEpic,
  removeSecretEpic,
);
