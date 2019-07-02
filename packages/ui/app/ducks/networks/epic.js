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

export const loadPodNetworksEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_POD_NETWORKS),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadPodNetworksSuccess(resp, clusterID)),
        catchError((error) => of(a.loadPodNetworksFailure(error, clusterID)))
      )
    )
  );

export const loadServiceNetworksEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_SERVICE_NETWORKS),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadServiceNetworksSuccess(resp, clusterID)),
        catchError((error) =>
          of(a.loadServiceNetworksFailure(error, clusterID))
        )
      )
    )
  );

export default combineEpics(loadPodNetworksEpic, loadServiceNetworksEpic);
