import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from '../App/selectors';
import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  INIT_CREATE_FORM,
  LOAD_APPLICATIONS,
  CREATE_APPLICATION,
  REMOVE_APPLICATION,
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
import { makeSelectCreateFormData, makeSelectFormPorts } from './selectors';

import { loadNamespaces } from '../NamespacesPage/saga';

export function* initialize() {
  yield* loadNamespaces();
  yield* loadApplications();
}

export function* initCreateion() {
  yield* loadNamespaces();
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
    const location = yield select(makeSelectLocation());
    const suffix = location
      .get('pathname')
      .split('/')
      .slice(5)
      .join('/');
    yield put(
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/${suffix}`)
    );
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

// Individual exports for testing
export default function* applicationsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(INIT_CREATE_FORM, initCreateion);
  yield takeLatest(LOAD_APPLICATIONS, loadApplications);
  yield takeLatest(CREATE_APPLICATION, createApplication);
  yield takeLatest(REMOVE_APPLICATION, removeApplication);
}
