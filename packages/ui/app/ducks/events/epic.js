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
          `${protocol}//${hostname}:${port}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/event`
        );

        socket.onopen = () => {};

        socket.onmessage = (e) => {
          const evt = JSON.parse(e.data);
          observer.next(evt);
        };

        socket.onclose = () => {
          observer.complete();
        };
      })
        .pipe(scan((acc, event) => acc.concat([event]).slice(-1000), []))
        .pipe(debounceTime(100))
        .pipe(map((events) => a.setEvents(events, clusterID)))
    )
  );

export default combineEpics(eventEpic);
