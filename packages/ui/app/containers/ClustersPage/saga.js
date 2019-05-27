import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import request from 'utils/request';

import {
  INIT_ACTION,
  LOAD_CLUSTERS,
  LOAD_CLUSTER,
  REMOVE_CLUSTER,
} from './constants';
import {
  loadClustersRequest,
  loadClustersSuccess,
  loadClustersFailure,
  loadClusterRequest,
  loadClusterSuccess,
  loadClusterFailure,
  removeClusterRequest,
  removeClusterSuccess,
  removeClusterFailure,
} from './actions';
import {
  makeSelectClusters,
  makeSelectMount,
} from './selectors';

export const url = '/apis/zcloud.cn/v1/clusters';

export function* initialize() {
  yield* loadClusters();
  while (true) {
    const mount = yield select(makeSelectMount());
    if (mount === false) break;
    yield delay(3000);
    yield* loadClusters();
  }
}

export function* loadClusters() {
  try {
    yield put(loadClustersRequest());
    const data = yield call(request, url);
    yield put(loadClustersSuccess(data));
  } catch (e) {
    yield put(loadClustersFailure(e));
  }
}

export function* loadCluster({ payload }) {
  try {
    const clusterID = payload.id;
    yield put(loadClusterRequest());
    const data = yield call(request, `${url}/${clusterID}`);
    yield put(loadClusterSuccess(data));
  } catch (e) {
    yield put(loadClusterFailure(e));
  }
}

export function* removeCluster({ payload }) {
  try {
    const clusterID = payload;
    yield put(removeClusterRequest());
    const data = yield call(request, `${url}/${clusterID}`, {
      method: 'DELETE',
    });
    yield put(removeClusterSuccess(clusterID));
  } catch (e) {
    yield put(removeClusterFailure(e));
  }
}

// Individual exports for testing
export default function* clustersPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_CLUSTERS, loadClusters);
  yield takeLatest(LOAD_CLUSTER, loadCluster);
  yield takeLatest(REMOVE_CLUSTER, removeCluster);
}
