/**
 * Duck: SvcMeshWorkloads
 * epic: svcMeshWorkloads
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

export const loadSvcMeshWorkloadsEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_SVC_MESH_WORKLOADS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadSvcMeshWorkloadsSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadSvcMeshWorkloadsFailure(error, meta);
        })
      )
    )
  );

export const readSvcMeshWorkloadEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.READ_SVC_MESH_WORKLOAD),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readSvcMeshWorkloadSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.readSvcMeshWorkloadFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export default combineEpics(
  loadSvcMeshWorkloadsEpic,
  readSvcMeshWorkloadEpic,
);
