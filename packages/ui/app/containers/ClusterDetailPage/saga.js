import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import request from 'utils/request';

import { INIT_ACTION } from './constants';
import { makeSelectClusterID } from '../App/selectors';
import { loadCluster } from '../ClustersPage/saga';

export const url = '/apis/zcloud.cn/v1/clusterDetail';

export function* initialize() {
  const clusterID = yield select(makeSelectClusterID());
  yield* loadCluster({ payload: { id: clusterID } });
}

// Individual exports for testing
export default function* clusterDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
}
