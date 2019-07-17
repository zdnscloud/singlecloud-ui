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
        catchError((error) => of(a.loadStorageClassesFailure(error, clusterID)))
      )
    )
  );

export const loadStoragesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STORAGES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadStoragesSuccess(resp, clusterID)),
        catchError((error) => of(a.loadStoragesFailure(error, clusterID)))
      )
    )
  );

export const loadNFSStoragesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_NFS_STORAGES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadNFSStoragesSuccess(resp, clusterID)),
        catchError((error) => of(a.loadNFSStoragesFailure(error, clusterID)))
      )
    )
  );

export const loadLVMStoragesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_LVM_STORAGES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadLVMStoragesSuccess(resp, clusterID)),
        catchError((error) => of(a.loadLVMStoragesFailure(error, clusterID)))
      )
    )
  );

export const loadBlockDevicesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_BLOCK_DEVICES),
    mergeMap(({ payload, meta: { clusterID } }) =>
      ajax(payload).pipe(
        map((resp) => a.loadBlockDevicesSuccess(resp, clusterID)),
        catchError((error) => of(a.loadBlockDevicesFailure(error, clusterID)))
      )
    )
  );

export const createStorageEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_STORAGE),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.createStorageSuccess(resp, { clusterID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.createStorageFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterCreateEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_STORAGE_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/storages`)))
    )
  );

export const removeStorageEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_STORAGE),
    mergeMap(({ payload, meta: { url, clusterID } }) =>
      ajax({
        url,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.removeStorageSuccess(resp, { id: payload, clusterID })),
        catchError((error) =>
          of(a.removeStorageFailure(error, { id: payload, clusterID }))
        )
      )
    )
  );

export const editStorageEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.EDIT_STORAGE),
    mergeMap(({ payload, meta: { resolve, reject, url, clusterID } }) =>
      ajax({
        url,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.editStorageSuccess(resp, { clusterID });
        }),
        catchError((error) => {
          reject(error);
          return of(a.editStorageFailure(error, { clusterID }));
        })
      )
    )
  );

export const afterEditEpic = (action$) =>
  action$.pipe(
    ofType(c.EDIT_STORAGE_SUCCESS),
    mergeMap(({ payload, meta }) =>
      timer(1000).pipe(mapTo(push(`/clusters/${meta.clusterID}/storages`)))
    )
  );

export default combineEpics(
  loadStoragesEpic,
  loadStroageClassesEpic,
  loadBlockDevicesEpic,
  createStorageEpic,
  afterCreateEpic,
  removeStorageEpic,
  editStorageEpic,
  afterEditEpic,
  loadNFSStoragesEpic,
  loadLVMStoragesEpic
);
