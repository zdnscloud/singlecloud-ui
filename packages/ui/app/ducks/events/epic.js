import { Observable, interval, of } from 'rxjs';

import {
  mergeMap,
  map,
  debounceTime,
  scan,
  catchError,
  takeUntil,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { webSocket } from 'rxjs/webSocket';

import * as c from './constants';
import * as a from './actions';

export const eventEpic = (action$) =>
  action$.pipe(
    ofType(c.OPEN_CLUSTER),
    mergeMap(({ payload: { clusterID } }) => {
      const { protocol, hostname, port } = window.location;
      const subject = webSocket(
        `${
          protocol === 'https:' ? 'wss:' : 'ws:'
        }//${hostname}:${port}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/event`
      );

      return subject
        .pipe(
          takeUntil(action$.pipe(ofType(c.CLOSE_CLUSTER))),
          catchError((error) => of(a.eventConnectionError(error, clusterID)))
        )
        .pipe(scan((acc, event) => acc.concat([event]).slice(-1000), []))
        .pipe(debounceTime(1000 / 20))
        .pipe(map((events) => a.setEvents(events, clusterID)));
    })
  );

export default combineEpics(eventEpic);
