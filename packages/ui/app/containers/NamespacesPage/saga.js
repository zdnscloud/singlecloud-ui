import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { url } from '../ClustersPage/saga';

import { INIT_ACTION, LOAD_NAMESPACES } from './constants';
import {
  loadNamespacesRequest,
  loadNamespacesSuccess,
  loadNamespacesFailure,
} from './actions';
import { makeSelectClusterID } from './selectors';

export function* initialize() {
  yield* loadNamespaces();
}

export function* loadNamespaces() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    yield put(loadNamespacesRequest());
    const data = yield call(request, `${url}/${clusterID}/namespaces`);
    yield put(loadNamespacesSuccess(clusterID, data));
  } catch (e) {
    yield put(loadNamespacesFailure(e));
  }
}

// Individual exports for testing
export default function* namespacesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_NAMESPACES, loadNamespaces);
}
