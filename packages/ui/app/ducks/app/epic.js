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
  throttle,
  throttleTime,
  catchError,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { loadClusters } from 'ducks/clusters/actions';
import { makeSelectURL } from 'ducks/clusters/selectors';

import * as c from './constants';
import * as a from './actions';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from './selectors';

export const initEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.INIT_ACTION),
    mapTo(loadClusters(makeSelectURL()(state$.value)))
  );

export const changeClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CHANGE_CLUSTER),
    mergeMap(({ payload: { clusterID } }) => {
      if (clusterID) {
        return of(push(`/clusters/${clusterID}/show`));
      }
      return of(push('/clusters'));
    })
  );

export default combineEpics(initEpic, changeClusterEpic);
