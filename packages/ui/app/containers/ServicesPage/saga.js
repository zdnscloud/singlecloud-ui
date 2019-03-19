import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  LOAD_SERVICES,
  LOAD_SERVICE,
  CREATE_SERVICE,
  REMOVE_SERVICE,
} from './constants';
import {
  loadServicesRequest,
  loadServicesSuccess,
  loadServicesFailure,
  loadServiceRequest,
  loadServiceSuccess,
  loadServiceFailure,
  createServiceRequest,
  createServiceSuccess,
  createServiceFailure,
  closeCreateService,
  removeServiceRequest,
  removeServiceSuccess,
  removeServiceFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectServices,
  makeSelectClusterID,
  makeSelectNamespaceID,
} from './selectors';

export function* initialize() {
  yield* loadServices();
}

export function* loadServices() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadServicesRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/services`,
    );
    yield put(loadServicesSuccess(clusterID, namespaceID, data));
  } catch (e) {
    yield put(loadServicesFailure(e));
  }
}

export function* loadService({ payload }) {
  try {
    const clusterID = payload.id;
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadServicesRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}`,
    );
    yield put(loadServicesSuccess(data));
  } catch (e) {
    yield put(loadServicesFailure(e));
  }
}

export function* createService() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(createServiceRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/services`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: formData.get('name') }),
      },
    );
    yield put(createServiceSuccess(clusterID, data));
    yield* loadServices();
    yield put(closeCreateService());
  } catch (e) {
    yield put(createServiceFailure(e));
  }
}

export function* removeService({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(removeServiceRequest());
    const resp = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/services/${id}`,
      {
        method: 'DELETE',
      },
    );
    yield put(removeServiceSuccess(clusterID, id));
    // yield* loadServices();
  } catch (e) {
    yield put(removeServiceFailure(e));
  }
}

// Individual exports for testing
export default function* servicesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_SERVICES, loadServices);
  yield takeLatest(LOAD_SERVICE, loadService);
  yield takeLatest(CREATE_SERVICE, createService);
  yield takeLatest(REMOVE_SERVICE, removeService);
}
