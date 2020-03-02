/**
 * Duck: WorkFlows
 * epic: workFlows
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

export const loadWorkFlowsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_WORK_FLOWS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadWorkFlowsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadWorkFlowsFailure(error, meta));
        })
      )
    )
  );

export const createWorkFlowEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_WORK_FLOW),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createWorkFlowSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createWorkFlowFailure(error, meta));
        })
      )
    )
  );

export const updateWorkFlowEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_WORK_FLOW),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateWorkFlowSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateWorkFlowFailure(error, meta));
        })
      )
    )
  );

export const readWorkFlowEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_WORK_FLOW),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readWorkFlowSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readWorkFlowFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeWorkFlowEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_WORK_FLOW),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeWorkFlowSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeWorkFlowFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadWorkFlowsEpic,
  createWorkFlowEpic,
  updateWorkFlowEpic,
  readWorkFlowEpic,
  removeWorkFlowEpic,
);
