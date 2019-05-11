import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import request from 'utils/request';

import { makeSelectClusterID } from 'containers/App/selectors';
import { loadCluster } from 'containers/ClustersPage/saga';
import { initAction as initEvents } from 'containers/EventsPage/actions';

import { INIT_ACTION } from './constants';

export const url = '/apis/zcloud.cn/v1/clusterDetail';

export function* initialize() {
  const clusterID = yield select(makeSelectClusterID());
  yield* loadCluster({ payload: { id: clusterID } });
  yield put(initEvents({ params: { cluster_id: clusterID } }));
}

// Individual exports for testing
export default function* clusterDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
}
