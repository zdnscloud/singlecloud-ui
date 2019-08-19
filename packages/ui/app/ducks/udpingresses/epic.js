/**
 * Duck: Udpingresses
 * epic: udpingresses
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

export const loadUdpingressesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_UDPINGRESSES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadUdpingressesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadUdpingressesFailure(error, meta));
        })
      )
    )
  );

export const createUdpingressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_UDPINGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createUdpingressSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createUdpingressFailure(error, meta));
        })
      )
    )
  );

export const readUdpingressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_UDPINGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readUdpingressSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readUdpingressFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeUdpingressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_UDPINGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeUdpingressSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeUdpingressFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const afterCreateUdpingressEpic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_UDPINGRESS_SUCCESS),
    mergeMap(({ payload, meta }) => of(push(`/clusters/${meta.clusterID}/namespaces/${meta.namespaceID}/udpingresses`)))
  );

export default combineEpics(
  loadUdpingressesEpic,
  createUdpingressEpic,
  readUdpingressEpic,
  removeUdpingressEpic,
  afterCreateUdpingressEpic,
);
