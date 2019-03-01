import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { url } from '../ClustersPage/saga';

import { INIT_ACTION, LOAD_NODES } from './constants';
import {
  loadNodesRequest,
  loadNodesSuccess,
  loadNodesFailure,
} from './actions';
import { makeSelectClusterID } from './selectors';

export function* initialize() {
  yield* loadNodes();
}

export function* loadNodes() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    yield put(loadNodesRequest());
    const data = yield call(request, `${url}/${clusterID}/nodes`);
    yield put(loadNodesSuccess(clusterID, data));
  } catch (e) {
    yield put(loadNodesFailure(e));
  }
}

// Individual exports for testing
export default function* nodesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_NODES, loadNodes);
}
