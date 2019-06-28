import { Observable, interval, of, concat } from 'rxjs';
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

export const loginEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOGIN),
    mergeMap(({ payload, meta: { resolve, reject } }) => (
      ajax({
        url: `/web/login`,
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
      ).pipe(mapTo(a.loadRole('/web/role')))
    ))
  );

export const loadRoleEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_ROLE),
    mergeMap(({ payload, meta }) => (
      ajax(payload).pipe(
        map((resp) => a.loadRoleSuccess(resp, meta)),
        catchError((error) => a.loadRoleFailure(error, meta))
      )
    ))
  );

export const logoutEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOGOUT),
    mergeMap(({ payload }) => (
      ajax({
        url: `/web/logout`,
        method: 'GET',
      })
        .pipe(
          map((resp) => {
            return a.logoutSuccess(resp);
          }),
          catchError((error) => {
            return of(a.logoutFailure(error));
          })
        )
        .pipe(mapTo(a.loadRole('/web/role')))
    ))
  );

export default combineEpics(loginEpic, loadRoleEpic, logoutEpic);
