/**
 * Duck: PersistentVolumes
 * epic: persistentVolumes
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

export const loadPersistentVolumesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_PERSISTENT_VOLUMES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadPersistentVolumesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadPersistentVolumesFailure(error, meta));
        })
      )
    )
  );

export const readPersistentVolumeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_PERSISTENT_VOLUME),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readPersistentVolumeSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.readPersistentVolumeFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export const removePersistentVolumeEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_PERSISTENT_VOLUME),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removePersistentVolumeSuccess(resp, {
            ...meta,
            id: payload,
          });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(
            a.removePersistentVolumeFailure(error, { ...meta, id: payload })
          );
        })
      )
    )
  );

export default combineEpics(
  loadPersistentVolumesEpic,
  readPersistentVolumeEpic,
  removePersistentVolumeEpic
);
