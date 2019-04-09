import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { loadClusters } from '../ClustersPage/saga';
import { loadNamespaces } from '../NamespacesPage/saga';
import { initAction as initEvents } from '../EventsPage/actions';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from './selectors';
import { makeSelectCurrentNamespace } from '../NamespacesPage/selectors';

import { INIT_ACTION, CHANGE_CLUSTER } from './constants';
import { CHANGE_NAMESPACE } from '../NamespacesPage/constants';

export function* initialize() {
  yield* loadClusters();
  const id = yield select(makeSelectClusterID());
  if (id) {
    yield put(initEvents({ params: { cluster_id: id } }));
  }
}

export function* changeCluster({ payload }) {
  const id = payload.cluster;
  yield put(initEvents({ params: { cluster_id: id } }));
  yield put(push(`/clusters/${id}`));
}

export function* changeNamespace({ payload }) {
  try {
    const location = yield select(makeSelectLocation());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    const ns = yield select(makeSelectCurrentNamespace());
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
