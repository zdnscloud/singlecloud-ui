/**
 * Duck: SvcMeshTap
 * epic: svcMeshTap
 *
 */
import { push } from 'connected-react-router';
import { Observable, interval, of, timer, concat } from 'rxjs';
import { mergeMap, map, catchError, takeUntil } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { webSocket } from 'rxjs/webSocket';

import * as c from './constants';
import * as a from './actions';

export const svcMeshTap = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.SVC_MESH_TAP_START),
    mergeMap(({ payload, meta: { clusterID, namespaceID } }) => {
      const { protocol, hostname, port } = window.location;
      const subject = webSocket(
        `${
          protocol === 'https:' ? 'wss:' : 'ws:'
        }//${hostname}:${port}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/tap?resource_type=${
          payload.resource_type
        }&resource_name=${payload.resource_name}&to_resource_type=${
          payload.to_resource_type
        }&to_resource_name=${payload.to_resource_name}&method=${
          payload.method
        }&path=${payload.path}`
      );

      return subject
        .pipe(
          takeUntil(action$.pipe(ofType(c.SVC_MESH_TAP_STOP))),
          catchError((error) => of({ type: 'error', payload: error }))
        )
        .pipe(map((data) => a.svcMeshTapAdd(data, { clusterID, namespaceID })));
    })
  );

export default combineEpics(svcMeshTap);
