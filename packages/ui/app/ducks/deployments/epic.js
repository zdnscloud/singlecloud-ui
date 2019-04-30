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

export const loadDeploymentsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DEPLOYMENTS),
    mergeMap(({ meta: { url, clusterID, namespaceID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadDeploymentsSuccess(resp, { clusterID, namespaceID })
        ),
        catchError((error) =>
          of(a.loadDeploymentsFailure(error, { clusterID, namespaceID }))
        )
      )
    )
  );

export const loadDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DEPLOYMENT),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax(`${url}`).pipe(
        map((resp) => a.loadDeploymentSuccess(resp, { clusterID, namespaceID })),
        catchError((error) => of(a.loadDeploymentFailure(error, { clusterID, namespaceID })))
      )
    )
  );

export const createDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_DEPLOYMENT),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createDeploymentSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createDeploymentFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_DEPLOYMENT_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/deployments`))))
  );

export const updateDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_DEPLOYMENT),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID, namespaceID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.updateDeploymentSuccess(resp, { clusterID, namespaceID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.updateDeploymentFailure(error, { clusterID, namespaceID }));
        })
      )
    )
  );

export const afterUpdateEpic = (action$) =>
  action$.pipe(
    ofType(c.UPDATE_DEPLOYMENT_SUCCESS),
    mergeMap(({ payload, meta }) => timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/deployments`))))
  );

export const removeDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_DEPLOYMENT),
    mergeMap(({ payload, meta: { url, clusterID, namespaceID } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          return a.removeDeploymentSuccess(resp, { id: payload, clusterID, namespaceID });
        }),
        catchError((error) => {
          return of(a.removeDeploymentFailure(error, { id: payload, clusterID, namespaceID }));
        })
      )
    )
  );

export default combineEpics(
  loadDeploymentsEpic,
  loadDeploymentEpic,
  createDeploymentEpic,
  afterCreateEpic,
  updateDeploymentEpic,
  afterUpdateEpic,
  removeDeploymentEpic
);
