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
import { loadAllNamespaces } from 'ducks/namespaces/actions';

import * as c from './constants';
import * as a from './actions';

export const loadClustersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CLUSTERS),
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.loadClustersSuccess(resp)),
        catchError((error) => of(a.loadClustersFailure(error)))
      )
    )
  );

export const removeClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_CLUSTER),
    mergeMap(({ payload, meta: { url } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.removeClusterSuccess(resp, { id: payload })),
        catchError((error) =>
          of(a.removeClusterFailure(error, { id: payload }))
        )
      )
    )
  );

export const loadClustersAndNamespacesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CLUSTERS_AND_NAMESPACES),
    mergeMap(() =>
      concat(
        ajax('/apis/zcloud.cn/v1/clusters').pipe(
          map((resp) => a.loadClustersSuccess(resp)),
          catchError((error) => of(a.loadClustersFailure(error)))
        ),
        of(loadAllNamespaces())
      )
    )
  );

export const createClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_CLUSTER),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createClusterSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.createClusterFailure(error));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_CLUSTER_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters`))))
  );

export default combineEpics(
  loadClustersEpic,
  removeClusterEpic,
  loadClustersAndNamespacesEpic,
  createClusterEpic,
  afterCreateEpic
);
