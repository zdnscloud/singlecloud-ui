/**
 * Duck: Storages
 * epic: storages
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
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadStoragesEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_STORAGES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadStoragesSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadStoragesFailure(error, meta);
        })
      )
    )
  );

export const createStorageEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.CREATE_STORAGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createStorageSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.createStorageFailure(error, meta);
        })
      )
    )
  );

export const updateStorageEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.UPDATE_STORAGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateStorageSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.updateStorageFailure(error, meta);
        })
      )
    )
  );

export const readStorageEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.READ_STORAGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readStorageSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.readStorageFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const removeStorageEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.REMOVE_STORAGE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeStorageSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.removeStorageFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export default combineEpics(
  loadStoragesEpic,
  createStorageEpic,
  updateStorageEpic,
  readStorageEpic,
  removeStorageEpic,
);
