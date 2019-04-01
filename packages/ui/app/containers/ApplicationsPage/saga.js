import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  LOAD_APPLICATIONS,
  CREATE_APPLICATION,
  REMOVE_APPLICATION,
  CHANGE_NAMESPACE,
} from './constants';
import {
  loadApplicationsRequest,
  loadApplicationsSuccess,
  loadApplicationsFailure,
  createApplicationRequest,
  createApplicationSuccess,
  createApplicationFailure,
  removeApplicationRequest,
  removeApplicationSuccess,
  removeApplicationFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectClusterID,
  makeSelectFormPorts,
  makeSelectNamespaceID,
} from './selectors';

import { loadConfigMaps } from '../ConfigMapsPage/saga';
import { loadNamespaces } from '../NamespacesPage/saga';

export function* initialize() {
  yield* loadNamespaces();
  yield* loadApplications();
}

export function* loadApplications() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadApplicationsRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments`
    );
    yield put(loadApplicationsSuccess(clusterID, namespaceID, data));
  } catch (e) {
    yield put(loadApplicationsFailure(e));
  }
}

export function* createApplication() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const ports = yield select(makeSelectFormPorts());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(createApplicationRequest());
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
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapedData.toJS()),
      }
    );
    yield put(createApplicationSuccess(data));
    yield put(push(`/clusters/${clusterID}/applications`));
  } catch (e) {
    yield put(createApplicationFailure(e));
  }
}

export function* removeApplication({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(removeApplicationRequest());
    const resp = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/deployments/${id}`,
      {
        method: 'DELETE',
      }
    );
    yield put(removeApplicationSuccess(clusterID, id));
    yield* loadApplications();
  } catch (e) {
    yield put(removeApplicationFailure(e));
  }
}

export function* changeNamespace({ payload }) {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const { namespaceID } = payload;
    yield put(
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/applications`)
    );
  } catch (e) {
    console.error(e);
  }
}

// Individual exports for testing
export default function* applicationsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_APPLICATIONS, loadApplications);
  yield takeLatest(CREATE_APPLICATION, createApplication);
  yield takeLatest(REMOVE_APPLICATION, removeApplication);
  yield takeLatest(CHANGE_NAMESPACE, changeNamespace);
}
