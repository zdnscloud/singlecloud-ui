/**
 * Duck: StorageClasses
 * epic: storageClasses
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

export const loadStorageClassesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STORAGE_CLASSES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadStorageClassesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadStorageClassesFailure(error, meta));
        })
      )
    )
  );






export default combineEpics(
  loadStorageClassesEpic,
);
