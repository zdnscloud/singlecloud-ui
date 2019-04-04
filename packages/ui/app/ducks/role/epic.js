import { Observable, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  mergeMap,
  map,
  debounce,
  debounceTime,
  reduce,
  scan,
  throttleTime,
  throttle,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import {
  LOGIN,
  LOGOUT,
} from './index';

export const loginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN),
    mergeMap(({ payload }) => {
      ajax({
        url: '/login',
        method: 'POST',
      })
    })
  );

export default combineEpics(
  loginEpic
);
