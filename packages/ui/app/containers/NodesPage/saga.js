import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import {
  INIT_ACTION,
  LOAD_CLUSTER,
  LOAD_NODES,
} from './constants';
import {
  loadNodesRequest,
  loadNodesSuccess,
  loadNodesFailure,
  loadClusterRequest,
  loadClusterSuccess,
  loadClusterFailure,
} from './actions';
import {
  makeSelectClusterID,
  makeSelectCluster,
} from './selectors';

const url = '/zcloud.cn/v1/clusters';

export function* initialize() {
  yield* loadCluster();
}

export function* loadCluster() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    yield put(loadClusterRequest());
    const data = yield call(request, `${url}/${clusterID}`);
    yield put(loadClusterSuccess(data));
    yield* loadNodes();
  } catch (e) {
    yield put(loadClusterFailure(e));
  }
}

export function* loadNodes() {
  try {
    const cluster = yield select(makeSelectCluster());
    yield put(loadNodesRequest());
    const data = yield call(request, cluster.getIn(['links', 'nodes']));
    yield put(loadNodesSuccess(data));
  } catch (e) {
    yield put(loadNodesFailure(e));
  }
}

// Individual exports for testing
export default function* nodesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_NODES, loadNodes);
  yield takeLatest(LOAD_CLUSTER, loadCluster);
}
