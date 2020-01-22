/**
 * Duck: UdpIngresses
 * epic: udpIngresses
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

export const loadUdpIngressesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_UDP_INGRESSES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadUdpIngressesSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadUdpIngressesFailure(error, meta));
        })
      )
    )
  );

export const createUdpIngressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_UDP_INGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createUdpIngressSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.createUdpIngressFailure(error, meta));
        })
      )
    )
  );


export const readUdpIngressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_UDP_INGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readUdpIngressSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readUdpIngressFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const removeUdpIngressEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_UDP_INGRESS),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeUdpIngressSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeUdpIngressFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );


export default combineEpics(
  loadUdpIngressesEpic,
  createUdpIngressEpic,
  readUdpIngressEpic,
  removeUdpIngressEpic,
);
