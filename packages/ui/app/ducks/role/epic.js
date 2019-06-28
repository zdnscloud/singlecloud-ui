import { Observable, interval, of } from 'rxjs';
import {
  mergeMap,
  map,
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

export const loginEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOGIN),
    mergeMap(({ payload, meta: { resolve, reject } }) => (
      ajax({
        url: `/apis/zcloud.cn/v1/users/${payload.user}?action=login`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.loginSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.loginFailure(error));
        })
      )
    ))
  );

export const casRoleEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CAS_ROLE),
    mergeMap(({ payload, meta }) => (
      ajax(payload).pipe(
        map((resp) => a.casRoleSuccess(resp, meta)),
        catchError((error) => a.casRoleFailure(error, meta))
      )
    ))
  );

export default combineEpics(loginEpic, casRoleEpic);
