import { Observable, interval } from 'rxjs';
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
    mergeMap(({ payload }) => (
      ajax({
        url: `/apis/zcloud.cn/v1/users/${payload.username}?action=login`,
        method: 'POST',
        body: payload,
      }).pipe(
        map(actions.loginSuccess),
        catchError(actions.loginFailure)
      )
    ))
  );

export default combineEpics(
  loginEpic
);
