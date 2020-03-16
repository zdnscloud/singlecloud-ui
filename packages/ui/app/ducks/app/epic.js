import { push } from 'connected-react-router';
import { Observable, interval, of, timer } from 'rxjs';
import {
  mergeMap,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import getByKey from '@gsmlg/utils/getByKey';

import { loadRole } from 'ducks/role/actions';

import * as c from './constants';
import * as a from './actions';

export const httpErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(c.HTTP_ERROR),
    mergeMap(({ payload }) => {
      const status = getByKey(payload, 'status');
      if (status === 0) {
        of(a.httpConnectionError(payload));
      }
      if (status >= 400 && status < 500) {
        if (status === 401) {
          return of(loadRole());
        }
        return of(a.httpClientError(payload));
      }
      if (status >= 500) {
        return of(a.httpServerError(payload));
      }
      return of(a.httpUnhandledError(payload));
    })
  );

export default combineEpics(
  httpErrorEpic
);
