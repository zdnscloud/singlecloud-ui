import { Observable, interval, of, timer } from 'rxjs';
import { mergeMap, map, mapTo, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_RESOURCE_QUOTA),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadResourceQuotaSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadResourceQuotaFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export default combineEpics(loadResourceQuotaEpic);
