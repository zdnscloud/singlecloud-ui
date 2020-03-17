/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  lastNamespace: '',
  showEvents: false,
  showMenuText: true,
  termUrl: null,
  httpError: null,
});

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case c.TOGGLE_EVENTS_VIEW:
      return state.set('showEvents', payload.showEvents);

    case c.TOGGLE_MENU_TEXT:
      return state.set('showMenuText', payload);

    case c.SET_LAST_NAMESPACE:
      return state.set('lastNamespace', payload);

    case c.OPEN_TERMINAL: {
      const { kind, data } = payload;
      const { protocol, hostname, port } = window.location;
      const base = `${
        protocol === 'https:' ? 'wss:' : 'ws:'
      }//${hostname}:${port}`;
      let url = null;
      if (kind === 'cluster') {
        const { clusterID } = data;
        url = `${base}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/shell`;
      }
      if (kind === 'pod') {
        const { clusterID, namespaceID, podID, containerName } = data;
        url = `${base}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/pods/${podID}/containers/${containerName}/shell`;
      }
      return state.set('termUrl', url);
    }

    case c.CLOSE_TERMINAL:
      return state.set('termUrl', null);

    case c.CLEAR_HTTP_ERROR:
      return state.set('httpError', null);

    case c.HTTP_CONNECTION_ERROR:
    case c.HTTP_SERVER_ERROR:
      return state.set('httpError', payload);

    default:
      return state;
  }
}

export default appReducer;
