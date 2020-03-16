/**
 * Duck: PersistentVolumeClaims
 * epic: persistentVolumeClaims
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

export const loadPersistentVolumeClaimsEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_PERSISTENT_VOLUME_CLAIMS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadPersistentVolumeClaimsSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadPersistentVolumeClaimsFailure(error, meta);
        })
      )
    )
  );

export const removePersistentVolumeClaimEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.REMOVE_PERSISTENT_VOLUME_CLAIM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removePersistentVolumeClaimSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.removePersistentVolumeClaimFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export default combineEpics(
  loadPersistentVolumeClaimsEpic,
  removePersistentVolumeClaimEpic,
);
