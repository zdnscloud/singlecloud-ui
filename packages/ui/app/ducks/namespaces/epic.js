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
import {
  createResourceQuota,
  createResourceQuotaFailure,
  createResourceQuotaSuccess,
} from 'ducks/resourceQuotas/actions';
import { makeSelectClusters } from 'ducks/clusters/selectors';
import * as c from './constants';
import * as a from './actions';

export const loadNamespacesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NAMESPACES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadNamespacesSuccess(resp, clusterID)),
        catchError((error) => of(a.loadNamespacesFailure(error, clusterID)))
      )
    )
  );

export const createNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, data } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createNamespaceSuccess(resp, {
            data,
            clusterID,
          });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createNamespaceFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE_SUCCESS),
    mergeMap(({ payload, meta: { data, clusterID } }) =>
      concat(
        ajax({
          // url: payload.response.getIn(['links', 'resourcequotas']),
          url: payload.response.links.resourcequotas,
          method: 'POST',
          body: data,
        }).pipe(
          map((resp) => createResourceQuotaSuccess(resp, { clusterID })),
          catchError((error) => of(createResourceQuotaFailure(error)))
        ),
        of(push(`/clusters/${clusterID}/namespaces`))
      )
    )
  );

export const removeNamespaceEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_NAMESPACE),
    mergeMap(({ payload, meta: { url, clusterID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) =>
          a.removeNamespaceSuccess(resp, { id: payload, clusterID })
        ),
        catchError((error) =>
          of(a.removeNamespaceFailure(error, { id: payload, clusterID }))
        )
      )
    )
  );

export const loadAllNamespacesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_ALL_NAMESPACES),
    mergeMap(() => {
      const clusters = makeSelectClusters()(state$.value).toList();
      const list = clusters
        .map((c) => ({
          clusterID: c.get('id'),
          url: c.getIn(['links', 'namespaces']),
        }))
        .map(({ url, clusterID }) =>
          ajax(url).pipe(
            map((resp) => a.loadNamespacesSuccess(resp, clusterID)),
            catchError((error) => of(a.loadNamespacesFailure(error, clusterID)))
          )
        )
        .toJS();
      return concat(...list);
    })
  );

export default combineEpics(
  loadAllNamespacesEpic,
  loadNamespacesEpic,
  createNamespaceEpic,
  afterCreateEpic,
  removeNamespaceEpic
);
