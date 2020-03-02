/**
 * Duck: WorkFlowTasks
 * epic: workFlowTasks
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

export const loadWorkFlowTasksEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_WORK_FLOW_TASKS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadWorkFlowTasksSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadWorkFlowTasksFailure(error, meta));
        })
      )
    )
  );

export const createWorkFlowTaskEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_WORK_FLOW_TASK),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createWorkFlowTaskSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createWorkFlowTaskFailure(error, meta));
        })
      )
    )
  );


export const readWorkFlowTaskEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_WORK_FLOW_TASK),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readWorkFlowTaskSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readWorkFlowTaskFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeWorkFlowTaskEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_WORK_FLOW_TASK),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeWorkFlowTaskSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeWorkFlowTaskFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadWorkFlowTasksEpic,
  createWorkFlowTaskEpic,
  readWorkFlowTaskEpic,
  removeWorkFlowTaskEpic,
);
