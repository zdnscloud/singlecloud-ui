import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from '../App/selectors';
import { url } from '../ClustersPage/saga';

import { INIT_ACTION, LOAD_PODS, REMOVE_POD } from './constants';
import {
  loadPodsRequest,
  loadPodsSuccess,
  loadPodsFailure,
  removePodRequest,
  removePodSuccess,
  removePodFailure,
} from './actions';
import { makeSelectDeploymentID, makeSelectPod } from './selectors';

export function* initialize() {
  yield* loadPods();
}

export function* loadPods() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    const deploymentID = yield select(makeSelectDeploymentID());
    yield put(loadPodsRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments/${deploymentID}/pods`
    );
    yield put(loadPodsSuccess(clusterID, namespaceID, deploymentID, data));
  } catch (e) {
    yield put(loadPodsFailure(e));
  }
}

export function* removePod({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    const deploymentID = yield select(makeSelectDeploymentID());
    const pod = yield select(makeSelectPod(id));
    yield put(removePodRequest());
    const resp = yield call(request, pod.getIn(['links', 'remove']), {
      method: 'DELETE',
    });
    yield put(removePodSuccess(clusterID, id));
    yield* loadPods();
  } catch (e) {
    yield put(removePodFailure(e));
  }
}

// Individual exports for testing
export default function* podsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_PODS, loadPods);
  yield takeLatest(REMOVE_POD, removePod);
}
