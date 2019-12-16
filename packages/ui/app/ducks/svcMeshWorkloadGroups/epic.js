/**
 * Duck: SvcMeshWorkloadGroups
 * epic: svcMeshWorkloadGroups
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

export const loadSvcMeshWorkloadGroupsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_SVC_MESH_WORKLOAD_GROUPS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadSvcMeshWorkloadGroupsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadSvcMeshWorkloadGroupsFailure(error, meta));
        })
      )
    )
  );






export default combineEpics(
  loadSvcMeshWorkloadGroupsEpic,
);
