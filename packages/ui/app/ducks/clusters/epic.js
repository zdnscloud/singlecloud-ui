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
import { loadAllNamespaces } from 'ducks/namespaces/actions';

import * as c from './constants';
import * as a from './actions';
import { makeSelectClusters } from './selectors';

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
        map((resp) => {
          return a.removeClusterSuccess(resp, { id: payload });
        }),
        catchError((error) => {
          return of(a.removeClusterFailure(error, { id: payload }));
        })
      )
    )
  );

export const loadClustersAndNamespacesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CLUSTERS_AND_NAMESPACES),
    mergeMap(() => (
      ajax('/apis/zcloud.cn/v1/clusters').pipe(
        map((resp) => a.loadClustersSuccess(resp)),
        catchError((error) => of(a.loadClustersFailure(error)))
      )
    ))
  );

export default combineEpics(
  loadClustersEpic,
  removeClusterEpic,
  loadClustersAndNamespacesEpic
);
