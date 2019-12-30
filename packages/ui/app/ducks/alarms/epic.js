/**
 * Duck: Alarms
 * epic: alarms
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
  takeUntil,
  throttleTime,
  throttle,
  catchError,
} from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadAlarmsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_ALARMS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadAlarmsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadAlarmsFailure(error, meta));
        })
      )
    )
  );

export const updateAlarmEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_ALARM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateAlarmSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.updateAlarmFailure(error, meta));
        })
      )
    )
  );

export const removeAlarmEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_ALARM),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeAlarmSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.removeAlarmFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export const openAlarmChannelEpic = (action$, state$) =>
  action$.pipe(
    ofType(c.OPEN_ALARM_CHANNEL),
    mergeMap(() => {
      const { protocol, hostname, port } = window.location;
      const subject = webSocket(
        `${
          protocol === 'https:' ? 'wss:' : 'ws:'
        }//${hostname}:${port}/apis/ws.zcloud.cn/v1/alarm`
      );

      return subject
        .pipe(
          takeUntil(action$.pipe(ofType(c.CLOSE_ALARM_CHANNEL))),
          catchError((error) => of(a.alarmConnectionError(error)))
        )
        .pipe(
          map(({ type, payload }) => {
            switch (type) {
              case 'UnackNumber':
                return a.count(payload);
              case 'UnackAlarm':
                return a.newAlarm(payload);
              default:
                return a.unknownEvent(payload);
            }
          })
        );
    })
  );

export default combineEpics(
  loadAlarmsEpic,
  updateAlarmEpic,
  removeAlarmEpic,
  openAlarmChannelEpic
);
