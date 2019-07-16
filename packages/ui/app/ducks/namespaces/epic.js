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
  concat,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import {
  createResourceQuota,
  createResourceQuotaFailure,
} from 'ducks/resourceQuotas/actions';
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
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createNamespaceSuccess(resp, { clusterID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createNamespaceFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_NAMESPACE_SUCCESS),
    mergeMap(
      ({ payload, meta }) =>
        concat(
          // eslint-disable-next-line no-undef
          ajax(meta.url).pipe(
            map(() => createResourceQuota(meta.data)),
            catchError((error) => of(createResourceQuotaFailure(error)))
          )
        )
      // timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces`)))
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
    mergeMap(({ payload: { clusters } }) => {
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
      return concat.apply(null, list);
    })
  );

export default combineEpics(
  loadNamespacesEpic,
  createNamespaceEpic,
  afterCreateEpic,
  removeNamespaceEpic
);
