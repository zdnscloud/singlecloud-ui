/**
 * Duck: Horizontalpodautoscalers
 * epic: horizontalpodautoscalers
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

export const loadHorizontalpodautoscalersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_HORIZONTALPODAUTOSCALERS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadHorizontalpodautoscalersSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadHorizontalpodautoscalersFailure(error, meta));
        })
      )
    )
  );

export const createHorizontalpodautoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_HORIZONTALPODAUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createHorizontalpodautoscalerSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createHorizontalpodautoscalerFailure(error, meta));
        })
      )
    )
  );

export const updateHorizontalpodautoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_HORIZONTALPODAUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateHorizontalpodautoscalerSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateHorizontalpodautoscalerFailure(error, meta));
        })
      )
    )
  );

export const readHorizontalpodautoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_HORIZONTALPODAUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readHorizontalpodautoscalerSuccess(resp, {
            ...meta,
            id: payload,
          });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.readHorizontalpodautoscalerFailure(error, {
              ...meta,
              id: payload,
            })
          );
        })
      )
    )
  );

export const removeHorizontalpodautoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_HORIZONTALPODAUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeHorizontalpodautoscalerSuccess(resp, {
            ...meta,
            id: payload,
          });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.removeHorizontalpodautoscalerFailure(error, {
              ...meta,
              id: payload,
            })
          );
        })
      )
    )
  );

export default combineEpics(
  loadHorizontalpodautoscalersEpic,
  createHorizontalpodautoscalerEpic,
  updateHorizontalpodautoscalerEpic,
  readHorizontalpodautoscalerEpic,
  removeHorizontalpodautoscalerEpic
);
