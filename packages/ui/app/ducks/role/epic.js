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

import * as constants from './constants';
import * as actions from './actions';

export const loginEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(constants.LOGIN),
    mergeMap(({ payload, meta: { resolve, reject } }) => (
      ajax({
        url: `/apis/zcloud.cn/v1/users/${payload.user}?action=login`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return actions.loginSuccess(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(actions.loginFailure(error));
        })
      )
    ))
  );

export default combineEpics(
  loginEpic
);
