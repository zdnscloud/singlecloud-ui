/* eslint-disable import/no-cycle */
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
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { push } from 'connected-react-router';
import getByKey from '@gsmlg/utils/getByKey';

import * as c from './constants';
import * as a from './actions';
import { makeSelectIsLogin, makeSelectIsCAS } from './selectors';

export const loginEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOGIN),
    mergeMap(({ payload, meta: { resolve, reject } }) =>
      ajax({
        url: `/web/login`,
        method: 'POST',
        body: payload,
      })
        .pipe(
          map((resp) => {
            resolve(resp);
            return a.loginSuccess(resp);
          }),
          catchAjaxError((error) => {
            reject(error);
            return a.loginFailure(error);
          })
        )
        .pipe(mapTo(a.loadRole('/web/role')))
    )
  );

export const loadRoleEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_ROLE),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          const user = getByKey(resp, ['response', 'user']);
          const authBy = getByKey(resp, ['response', 'authBy']);
          const isLogin = makeSelectIsLogin()(state$.value);
          if (!user) {
            if (meta && meta.logout) {
              if (meta.isCAS) {
                window.location.reload();
              } else {
                import('store').then((exports) => {
                  const store = getByKey(exports, ['default']);
                  setTimeout(() => {
                    store.dispatch(push('/login'));
                  }, 100);
                });
              }
            } else if (
              authBy === 'CAS' &&
              !window.location.pathname.include('/login')
            ) {
              window.location.reload();
            } else {
              import('store').then((exports) => {
                const store = getByKey(exports, ['default']);
                setTimeout(() => {
                  store.dispatch(push('/login'));
                }, 100);
              });
            }
          } else if (!isLogin && window.location.pathname.includes('/login')) {
            import('store').then((exports) => {
              const store = getByKey(exports, ['default']);
              setTimeout(() => {
                store.dispatch(push('/'));
              }, 100);
            });
          }
          return a.loadRoleSuccess(resp, meta);
        }),
        catchAjaxError((error) => a.loadRoleFailure(error, meta))
      )
    )
  );

export const logoutEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOGOUT),
    mergeMap(({ payload }) => {
      const logoutURL = '/web/logout';
      const isCAS = makeSelectIsCAS()(state$.value);
      if (isCAS) {
        window.location.href = logoutURL;
        return of(a.logoutSuccess());
      }
      return ajax({
        url: logoutURL,
        method: 'GET',
      })
        .pipe(
          map((resp) => a.logoutSuccess(resp)),
          catchAjaxError((error) => a.logoutFailure(error))
        )
        .pipe(mapTo(a.loadRole('/web/role', { logout: true, isCAS })));
    })
  );

export default combineEpics(loginEpic, loadRoleEpic, logoutEpic);
