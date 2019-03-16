import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  LOAD_INGRESSES,
  LOAD_INGRESS,
  CREATE_INGRESS,
  REMOVE_INGRESS,
} from './constants';
import {
  loadIngressesRequest,
  loadIngressesSuccess,
  loadIngressesFailure,
  loadIngressRequest,
  loadIngressSuccess,
  loadIngressFailure,
  createIngressRequest,
  createIngressSuccess,
  createIngressFailure,
  closeCreateIngress,
  removeIngressRequest,
  removeIngressSuccess,
  removeIngressFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectIngresses,
  makeSelectClusterID,
  makeSelectNamespaceID,
} from './selectors';

export function* initialize() {
  yield* loadIngresses();
}

export function* loadIngresses() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadIngressesRequest());
    const data = yield call(request, `${url}/${clusterID}/namespaces/${namespaceID}/ingresses`);
    yield put(loadIngressesSuccess(clusterID, namespaceID, data));
  } catch (e) {
    yield put(loadIngressesFailure(e));
  }
}

export function* loadIngress({ payload }) {
  try {
    const clusterID = payload.id;
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadIngressRequest());
    const data = yield call(request, `${url}/${clusterID}/namespaces/${namespaceID}`);
    yield put(loadIngressSuccess(data));
  } catch (e) {
    yield put(loadIngressFailure(e));
  }
}

export function* createIngress() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(createIngressRequest());
    const data = yield call(request, `${url}/${clusterID}/namespaces/${namespaceID}/ingresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formData.get('name') }),
    });
    yield put(createIngressSuccess(clusterID, data));
    yield* loadIngresses();
    yield put(closeCreateIngress());
  } catch (e) {
    yield put(createIngressFailure(e));
  }
}

export function* removeIngress({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(removeIngressRequest());
    const resp = yield call(request, `${url}/${clusterID}/namespaces/${namespaceID}/ingresses/${id}`, {
      method: 'DELETE',
    });
    yield put(removeIngressSuccess(clusterID, id));
    // yield* loadIngresses();
  } catch (e) {
    yield put(removeIngressFailure(e));
  }
}

// Individual exports for testing
export default function* ingressesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_INGRESSES, loadIngresses);
  yield takeLatest(LOAD_INGRESS, loadIngress);
  yield takeLatest(CREATE_INGRESS, createIngress);
  yield takeLatest(REMOVE_INGRESS, removeIngress);
}
