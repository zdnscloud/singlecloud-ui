import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import {
  INIT_ACTION,
  CREATE_CLUSTER,
  LOAD_CLUSTERS,
} from './constants';
import {
  loadClustersRequest,
  loadClustersSuccess,
  loadClustersFailure,
  createClusterRequest,
  createClusterSuccess,
  createClusterFailure,
  closeCreateCluster,
} from './actions';
import { makeSelectCreateFormData } from './selectors';

const url = '/zcloud.cn/v1/clusters';

export function* initialize() {
  yield* loadClusters();
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

export function* createCluster() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    yield put(createClusterRequest());
    const data = yield call(request, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formData.get('name') }),
    });
    yield put(createClusterSuccess(data));
    yield* loadClusters();
    yield put(closeCreateCluster());
  } catch (e) {
    yield put(createClusterFailure(e));
  }
}

// Individual exports for testing
export default function* clustersPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_CLUSTERS, loadClusters);
  yield takeLatest(CREATE_CLUSTER, createCluster);
}
