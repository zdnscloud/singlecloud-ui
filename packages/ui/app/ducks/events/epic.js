import { Observable, interval } from 'rxjs';
import {
  mergeMap,
  map,
  debounce,
  debounceTime,
  reduce,
  scan,
  throttleTime,
  throttle,
  takeUntil,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import SockJS from 'sockjs-client';

import * as c from './constants';
import * as a from './actions';

export const eventEpic = (action$) =>
  action$.pipe(
    ofType(c.OPEN_CLUSTER),
    mergeMap(({ payload: { clusterID } }) =>
      Observable.create((observer) => {
        const { protocol, hostname, port } = window.location;
        const socket = new SockJS(
          `${protocol}//${hostname}:${port}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/event`,
          null,
          { transports: 'websocket' }
        );

        socket.onopen = () => {};

        socket.onmessage = (e) => {
          const evt = JSON.parse(e.data);
          observer.next(evt);
        };

        socket.onclose = () => {
          observer.complete();
        };

        return () => socket.close();
      })
        .pipe(takeUntil(action$.pipe(ofType(c.CLOSE_CLUSTER))))
        .pipe(scan((acc, event) => acc.concat([event]).slice(-1000), []))
        .pipe(debounceTime(1000 / 20))
        .pipe(map((events) => a.setEvents(events, clusterID)))
    )
  );

export default combineEpics(eventEpic);
