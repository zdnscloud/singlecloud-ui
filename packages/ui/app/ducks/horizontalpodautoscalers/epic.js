/**
 * Duck: HorizontalPodAutoscalers
 * epic: horizontalPodAutoscalers
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

export const loadHorizontalPodAutoscalersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_HORIZONTAL_POD_AUTOSCALERS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadHorizontalPodAutoscalersSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadHorizontalPodAutoscalersFailure(error, meta));
        })
      )
    )
  );

export const createHorizontalPodAutoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_HORIZONTAL_POD_AUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createHorizontalPodAutoscalerSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createHorizontalPodAutoscalerFailure(error, meta));
        })
      )
    )
  );

export const updateHorizontalPodAutoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_HORIZONTAL_POD_AUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateHorizontalPodAutoscalerSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateHorizontalPodAutoscalerFailure(error, meta));
        })
      )
    )
  );

export const readHorizontalPodAutoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_HORIZONTAL_POD_AUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readHorizontalPodAutoscalerSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readHorizontalPodAutoscalerFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeHorizontalPodAutoscalerEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_HORIZONTAL_POD_AUTOSCALER),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeHorizontalPodAutoscalerSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeHorizontalPodAutoscalerFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(
  loadHorizontalPodAutoscalersEpic,
  createHorizontalPodAutoscalerEpic,
  updateHorizontalPodAutoscalerEpic,
  readHorizontalPodAutoscalerEpic,
  removeHorizontalPodAutoscalerEpic,
);
