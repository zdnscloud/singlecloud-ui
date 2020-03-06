/**
 * Duck: AuditLogs
 * epic: auditLogs
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

export const loadAuditLogsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_AUDIT_LOGS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadAuditLogsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadAuditLogsFailure(error, meta));
        })
      )
    )
  );

export default combineEpics(
  loadAuditLogsEpic,
);
