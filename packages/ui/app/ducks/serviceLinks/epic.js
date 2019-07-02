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

export const loadOuterServicesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_OUTER_SERVICES),
    mergeMap(({ payload, meta: { clusterID, namespaceID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadOuterServicesSuccess(resp, clusterID, namespaceID)),
        catchError((error) =>
          of(a.loadOuterServicesFailure(error, clusterID, namespaceID))
        )
      )
    )
  );

export const loadInnerServicesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_INNER_SERVICES),
    mergeMap(({ payload, meta: { clusterID, namespaceID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadInnerServicesSuccess(resp, clusterID, namespaceID)),
        catchError((error) =>
          of(a.loadInnerServicesFailure(error, clusterID, namespaceID))
        )
      )
    )
  );

export default combineEpics(loadOuterServicesEpic, loadInnerServicesEpic);
