import { push } from 'connected-react-router';
import { Observable, interval, of, timer } from 'rxjs';
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

export const loadNodesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NODES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadNodesSuccess(resp, clusterID)),
        catchError((error) => of(a.loadNodesFailure(error, clusterID)))
      )
    )
  );

export const createNodeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_NODE),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createNodeSuccess(resp, { clusterID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createNodeFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_NODE_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/nodes`)))
    )
  );

export const removeNodeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_NODE),
    mergeMap(({ payload, meta: { url, clusterID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.removeNodeSuccess(resp, { id: payload, clusterID })),
        catchError((error) =>
          of(a.removeNodeFailure(error, { id: payload, clusterID }))
        )
      )
    )
  );

export default combineEpics(
  loadNodesEpic,
  createNodeEpic,
  afterCreateEpic,
  removeNodeEpic
);
