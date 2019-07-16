import { Observable, interval, of, timer } from 'rxjs';
import { mergeMap, map, mapTo, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { push } from 'connected-react-router';
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

export const createResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_RESOURCE_QUOTA),
    mergeMap(
      ({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
        ajax({
          url,
          method: 'POST',
          body: payload,
        }).pipe(
          map((resp) => {
            resolve(resp);
            return a.createResourceQuotaSuccess(resp, {
              clusterID,
              namespaceID,
            });
          }),
          catchError((error) => {
            reject(error);
            return of(
              a.createResourceQuotaFailure(error, { clusterID, namespaceID })
            );
          })
        )
    )
  );

export const updateResourceQuotaEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_RESOURCE_QUOTA),
    mergeMap(
      ({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
        ajax({
          url,
          method: 'PUT',
          body: payload,
        }).pipe(
          map((resp) => {
            resolve(resp);
            return a.updateResourceQuotaSuccess(resp, {
              clusterID,
              namespaceID,
            });
          }),
          catchError((error) => {
            reject(error);
            return of(
              a.updateResourceQuotaFailure(error, {
                clusterID,
                namespaceID,
              })
            );
          })
        )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_RESOURCE_QUOTA_SUCCESS),
    mergeMap(({ payload, meta, clusterID }) =>
      timer(1000).pipe(mapTo(push(`/clusters/${clusterID}/namespaces`)))
    )
  );

export default combineEpics(
  loadResourceQuotaEpic,
  createResourceQuotaEpic,
  updateResourceQuotaEpic,
  afterUpdateEpic
);
