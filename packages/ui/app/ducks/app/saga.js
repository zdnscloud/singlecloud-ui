import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { makeSelectClusters } from 'ducks/clusters/selectors';
import { initAction as initEvents } from 'containers/EventsPage/actions';
import { loadNamespaces } from 'ducks/namespaces/actions';
import { makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { CHANGE_NAMESPACE } from 'ducks/namespaces/constants';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from './selectors';
import { INIT_ACTION, CHANGE_CLUSTER } from './constants';

export function* initialize() {
  // yield* loadClusters();
  // const clusters = yield select(makeSelectClusters());
  // const cs = clusters.toList().toJS();
  // for (let i = 0; i < cs.length; i += 1) {
  //   const c = cs[i];
  //   const url = c.links.namespaces;
  //   yield put(loadNamespaces(url, c.id));
  // }
  const id = yield select(makeSelectClusterID());
  if (id) {
    yield put(initEvents({ params: { cluster_id: id } }));
  }
}

export function* changeCluster({ payload }) {
  const id = payload.cluster;
  yield put(push(`/clusters/${id}`));
}

export function* changeNamespace({ payload }) {
  try {
    const location = yield select(makeSelectLocation());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    const ns = yield select(makeSelectCurrentNamespaceID());
    if (namespaceID) {
      const suffix = location
        .get('pathname')
        .split('/')
        .slice(5)
        .join('/');
      yield put(push(`/clusters/${clusterID}/namespaces/${ns}/${suffix}`));
    }
  } catch (e) {
    console.error(e);
  }
}

// Individual exports for testing
export default function* applicationsPageSaga() {
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(CHANGE_CLUSTER, changeCluster);
  yield takeLatest(CHANGE_NAMESPACE, changeNamespace);
}
