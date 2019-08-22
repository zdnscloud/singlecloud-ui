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

export const loadApplicationsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_APPLICATIONS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) => a.loadApplicationsSuccess(resp,{ clusterID, namespaceID })),
        catchError((error) => of(a.loadApplicationsFailure(error,{ clusterID, namespaceID })))
      )
    )
  );

export const loadChartEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CHART),
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.loadChartSuccess(resp)),
        catchError((error) => of(a.loadChartFailure(error)))
      )
    )
  );


export const removeApplicationEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_APPLICATION),
    mergeMap(({ payload, meta: { url} }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.removeApplicationSuccess(resp, { id: payload })),
        catchError((error) =>{
          return of(a.removeApplicationFailure(error, { id: payload }))
        }
        )
      )
    )
  );

export const createApplicationEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_APPLICATION),
    mergeMap(({ payload, meta: { resolve, reject, url ,clusterID, namespaceID} }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createApplicationSuccess(resp ,{ clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createApplicationFailure(error));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_APPLICATION_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push( `/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/applications`)))
    )
  );

export default combineEpics(
  loadApplicationsEpic,
  removeApplicationEpic,
  loadChartEpic,
  createApplicationEpic,
  afterCreateEpic,
);
