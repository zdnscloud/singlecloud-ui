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
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadDeploymentsEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_DEPLOYMENTS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadDeploymentsSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadDeploymentsFailure(error, meta);
        })
      )
    )
  );

export const createDeploymentEpic = (action$, state$, { ajax, catchAjaxError }) =>
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
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.createDeploymentFailure(error, meta);
        })
      )
    )
  );

export const updateDeploymentEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.UPDATE_DEPLOYMENT),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateDeploymentSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.updateDeploymentFailure(error, meta);
        })
      )
    )
  );

export const readDeploymentEpic = (action$, state$, { ajax, catchAjaxError }) =>
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
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.readDeploymentFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const removeDeploymentEpic = (action$, state$, { ajax, catchAjaxError }) =>
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
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.removeDeploymentFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const executeDeploymentActionEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.EXECUTE_DEPLOYMENT_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeDeploymentActionSuccess(resp, { ...meta, action });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.executeDeploymentActionFailure(error, { ...meta, action });
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
  executeDeploymentActionEpic,
);
