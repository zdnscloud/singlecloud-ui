import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { url } from '../ClustersPage/saga';

import { INIT_ACTION, LOAD_PODS, CREATE_POD, REMOVE_POD } from './constants';
import {
  loadPodsRequest,
  loadPodsSuccess,
  loadPodsFailure,
  createPodRequest,
  createPodSuccess,
  createPodFailure,
  removePodRequest,
  removePodSuccess,
  removePodFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectClusterID,
  makeSelectFormPorts,
  makeSelectNamespaceID,
  makeSelectDeploymentID,
} from './selectors';

import { loadConfigMaps } from '../ConfigMapsPage/saga';

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

export function* createPod() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const ports = yield select(makeSelectFormPorts());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(createPodRequest());
    const mapedData = formData.update('containers', (containers) =>
      containers.map((ctn) => {
        const cmd = (ctn.get('command').match(/("[^"]*")|[^\s]+/g) || []).map(
          (n) => n.replace(/^"|"$/g, '')
        );
        const args = (ctn.get('args').match(/("[^"]*")|[^\s]+/g) || []).map(
          (n) => n.replace(/^"|"$/g, '')
        );
        return ctn.set('command', cmd).set('args', args);
      })
    );
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/pods`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapedData.toJS()),
      }
    );
    yield put(createPodSuccess(data));
    yield put(push(`/clusters/${clusterID}/namespaces/${namespaceID}/pods`));
  } catch (e) {
    yield put(createPodFailure(e));
  }
}

export function* removePod({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(removePodRequest());
    const resp = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/pods/${id}`,
      {
        method: 'DELETE',
      }
    );
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
  yield takeLatest(CREATE_POD, createPod);
  yield takeLatest(REMOVE_POD, removePod);
}
