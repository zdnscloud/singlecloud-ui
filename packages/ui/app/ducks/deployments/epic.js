/**
 * Duck: Deployments
 * epic: deployments
 *
 */
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

export const loadDeploymentsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DEPLOYMENTS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadDeploymentsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadDeploymentsFailure(error, meta));
        })
      )
    )
  );

export const createDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_DEPLOYMENT),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createDeploymentSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createDeploymentFailure(error, meta));
        })
      )
    )
  );

export const updateDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_DEPLOYMENT),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateDeploymentSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateDeploymentFailure(error, meta));
        })
      )
    )
  );

export const readDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_DEPLOYMENT),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readDeploymentSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readDeploymentFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeDeploymentEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_DEPLOYMENT),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeDeploymentSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeDeploymentFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadDeploymentsEpic,
  createDeploymentEpic,
  updateDeploymentEpic,
  readDeploymentEpic,
  removeDeploymentEpic,
);
