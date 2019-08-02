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
import { CHANGE_NAMESPACE } from 'ducks/namespaces/constants';
import { loadClustersAndNamespaces } from 'ducks/clusters/actions';

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
    mapTo(loadClustersAndNamespaces())
  );

export const changeClusterEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CHANGE_CLUSTER),
    mergeMap(({ payload: { clusterID } }) => {
      if (clusterID) {
        return of(push(`/clusters/${clusterID}`));
      }
      return of(push('/clusters'));
    })
  );

export const changeNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(CHANGE_NAMESPACE),
    mergeMap(({ payload: { namespaceID: ns } }) => {
      const location = makeSelectLocation()(state$.value);
      const clusterID = makeSelectClusterID()(state$.value);
      const namespaceID = makeSelectNamespaceID()(state$.value);
      if (namespaceID) {
        const pathname = location.get('pathname');
        const suffix = pathname
          .split('/')
          .slice(5)
          .join('/');
        return of(push(`/clusters/${clusterID}/namespaces/${ns}/${suffix}`));
      }
      return of(push(location));
    })
  );

export default combineEpics(initEpic, changeClusterEpic, changeNamespaceEpic);
