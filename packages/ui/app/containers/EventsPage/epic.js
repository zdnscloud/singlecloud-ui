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
import { ofType } from 'redux-observable';
import SockJS from 'sockjs-client';

import { INIT_ACTION } from './constants';
import { addEvent, setEvents } from './actions';

export const eventEpic = (action$) =>
  action$.pipe(
    ofType(INIT_ACTION),
    mergeMap(({ payload }) =>
      Observable.create((observer) => {
        const socket = new SockJS(
          `${window.location.protocol}//${window.location.hostname}:${
            window.location.port
          }/apis/ws.zcloud.cn/v1/clusters/${payload.cluster_id}/event`
        );

        socket.onopen = () => {};

        socket.onmessage = (e) => {
          const evt = JSON.parse(e.data);
          // console.log(evt);
          observer.next(evt);
        };

        socket.onclose = () => {
          observer.complete();
        };
      })
        .pipe(scan((acc, event) => acc.concat([event]), []))
        .pipe(debounceTime(100))
        .pipe(map((events) => setEvents(events)))
    )
  );

export default eventEpic;
