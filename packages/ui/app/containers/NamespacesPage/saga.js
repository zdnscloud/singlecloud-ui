import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  LOAD_NAMESPACES,
  LOAD_NAMESPACE,
  CREATE_NAMESPACE,
  REMOVE_NAMESPACE,
} from './constants';
import {
  loadNamespacesRequest,
  loadNamespacesSuccess,
  loadNamespacesFailure,
  loadNamespaceRequest,
  loadNamespaceSuccess,
  loadNamespaceFailure,
  createNamespaceRequest,
  createNamespaceSuccess,
  createNamespaceFailure,
  closeCreateNamespace,
  removeNamespaceRequest,
  removeNamespaceSuccess,
  removeNamespaceFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectNamespaces,
  makeSelectClusterID,
} from './selectors';

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

export function* loadNamespace({ payload }) {
  try {
    const clusterID = payload.id;
    yield put(loadNamespaceRequest());
    const data = yield call(request, `${url}/${clusterID}`);
    yield put(loadNamespaceSuccess(data));
  } catch (e) {
    yield put(loadNamespaceFailure(e));
  }
}

export function* createNamespace() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const clusterID = yield select(makeSelectClusterID());
    yield put(createNamespaceRequest());
    const data = yield call(request, `${url}/${clusterID}/namespaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formData.get('name') }),
    });
    yield put(createNamespaceSuccess(clusterID, data));
    yield* loadNamespaces();
    yield put(closeCreateNamespace());
  } catch (e) {
    yield put(createNamespaceFailure(e));
  }
}

export function* removeNamespace({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    yield put(removeNamespaceRequest());
    const resp = yield call(request, `${url}/${clusterID}/namespaces/${id}`, {
      method: 'DELETE',
    });
    yield put(removeNamespaceSuccess(clusterID, id));
    // yield* loadNamespaces();
  } catch (e) {
    yield put(removeNamespaceFailure(e));
  }
}

// Individual exports for testing
export default function* namespacesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_NAMESPACES, loadNamespaces);
  yield takeLatest(LOAD_NAMESPACE, loadNamespace);
  yield takeLatest(CREATE_NAMESPACE, createNamespace);
  yield takeLatest(REMOVE_NAMESPACE, removeNamespace);
}
