/**
 * Duck: BlockDevices
 * epic: blockDevices
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

export const loadBlockDevicesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_BLOCK_DEVICES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadBlockDevicesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadBlockDevicesFailure(error, meta));
        })
      )
    )
  );

export default combineEpics(loadBlockDevicesEpic);
