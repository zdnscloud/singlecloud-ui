import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  LOAD_DEPLOYMENTS,
  CREATE_DEPLOYMENT,
  REMOVE_DEPLOYMENT,
} from './constants';
import {
  loadDeploymentsRequest,
  loadDeploymentsSuccess,
  loadDeploymentsFailure,
  createDeploymentRequest,
  createDeploymentSuccess,
  createDeploymentFailure,
  removeDeploymentRequest,
  removeDeploymentSuccess,
  removeDeploymentFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectClusterID,
  makeSelectNamespaceID,
} from './selectors';

export function* initialize() {
  yield* loadDeployments();
}

export function* loadDeployments() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadDeploymentsRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments`,
    );
    yield put(loadDeploymentsSuccess(clusterID, namespaceID, data));
  } catch (e) {
    yield put(loadDeploymentsFailure(e));
  }
}

export function* createDeployment() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(createDeploymentRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.toJS()),
      },
    );
    yield put(createDeploymentSuccess(data));
    yield put(
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/deployments`),
    );
  } catch (e) {
    yield put(createDeploymentFailure(e));
  }
}

export function* removeDeployment({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(removeDeploymentRequest());
    const resp = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments/${id}`,
      {
        method: 'DELETE',
      },
    );
    yield put(removeDeploymentSuccess(clusterID, id));
    yield* loadDeployments();
  } catch (e) {
    yield put(removeDeploymentFailure(e));
  }
}

// Individual exports for testing
export default function* deploymentsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_DEPLOYMENTS, loadDeployments);
  yield takeLatest(CREATE_DEPLOYMENT, createDeployment);
  yield takeLatest(REMOVE_DEPLOYMENT, removeDeployment);
}
