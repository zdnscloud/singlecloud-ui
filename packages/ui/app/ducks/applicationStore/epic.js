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

export const loadChartsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CHARTS),
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.loadChartsSuccess(resp)),
        catchError((error) => of(a.loadChartsFailure(error)))
      )
    )
  );

export const loadChartEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CHARTS),
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.loadChartSuccess(resp)),
        catchError((error) => of(a.loadChartFailure(error)))
      )
    )
  );

export const createChartEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CHART),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createChartSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.createChartFailure(error));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_CHART_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/applicationStore`)))
    )
  );

export default combineEpics(
  loadChartsEpic,
  createChartEpic,
  afterCreateEpic,
  loadChartEpic,
);
