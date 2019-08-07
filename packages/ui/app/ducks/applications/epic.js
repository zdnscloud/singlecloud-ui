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

export default combineEpics(
  loadApplicationsEpic,
  removeApplicationEpic,
);
