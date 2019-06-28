import { push } from 'connected-react-router';
import { Observable, interval, of, timer } from 'rxjs';
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

export const loadStroageClassesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STORAGECLASSES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadStorageClassesSuccess(resp, clusterID)),
        catchError((error) =>
          of(a.loadStorageClassesFailure(error, clusterID)))
      )
    )
  );

export const loadNFSStoragesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NFS_STORAGES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadNFSStoragesSuccess(resp, clusterID)),
        catchError((error) =>
          of(a.loadNFSStoragesFailure(error, clusterID)))
      )
    )
  );

export const loadLVMStoragesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_LVM_STORAGES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadLVMStoragesSuccess(resp, clusterID)),
        catchError((error) =>
          of(a.loadLVMStoragesFailure(error, clusterID)))
      )
    )
  );

export default combineEpics(
  loadStroageClassesEpic,
  loadNFSStoragesEpic,
  loadLVMStoragesEpic
);
