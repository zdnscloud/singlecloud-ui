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

export const loadPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_PODS),
    mergeMap(({ meta: { url, clusterID, namespaceID, deploymentID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadPodsSuccess(resp, { clusterID, namespaceID, deploymentID })
        ),
        catchError((error) =>
          of(a.loadPodsFailure(error, { clusterID, namespaceID, deploymentID }))
        )
      )
    )
  );

export const loadPodEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_POD),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID, deploymentID } }) =>
      ajax(`${url}/${payload}`).pipe(
        map((resp) => a.loadPodSuccess(resp)),
        catchError((error) => of(a.loadPodFailure(error)))
      )
    )
  );

export const removePodEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_POD),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID, deploymentID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removePodSuccess(resp, { id: payload, clusterID, namespaceID, deploymentID });
        }),
        catchError((error) => {
          return of(a.removePodFailure(error, { id: payload, clusterID, namespaceID, deploymentID }));
        })
      )
    )
  );

export default combineEpics(
  loadPodsEpic,
  loadPodEpic,
  removePodEpic
);
