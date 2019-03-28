import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { loadClusters } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  CHANGE_CLUSTER,
} from './constants';

export function* initialize() {
  yield* loadClusters();
}

export function* changeCluster({ payload }) {
  const id = payload.cluster;
  yield put(push('/clusters/' + id));
}

// Individual exports for testing
export default function* applicationsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(CHANGE_CLUSTER, changeCluster);
}
