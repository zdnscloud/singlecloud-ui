import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { url } from '../ClustersPage/saga';

import {
  INIT_ACTION,
  LOAD_CONFIG_MAPS,
  CREATE_CONFIG_MAP,
  REMOVE_CONFIG_MAP,
} from './constants';
import {
  loadConfigMapsRequest,
  loadConfigMapsSuccess,
  loadConfigMapsFailure,
  createConfigMapRequest,
  createConfigMapSuccess,
  createConfigMapFailure,
  removeConfigMapRequest,
  removeConfigMapSuccess,
  removeConfigMapFailure,
} from './actions';
import {
  makeSelectCreateFormData,
  makeSelectClusterID,
  makeSelectNamespaceID,
} from './selectors';

export function* initialize() {
  yield* loadConfigMaps();
}

export function* loadConfigMaps() {
  try {
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(loadConfigMapsRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/configmaps`,
    );
    yield put(loadConfigMapsSuccess(clusterID, namespaceID, data));
  } catch (e) {
    yield put(loadConfigMapsFailure(e));
  }
}

export function* createConfigMap() {
  try {
    const formData = yield select(makeSelectCreateFormData());
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(createConfigMapRequest());
    const data = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/configmaps`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.toJS()),
      },
    );
    yield put(createConfigMapSuccess(data));
    yield put(
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/configmaps`),
    );
  } catch (e) {
    yield put(createConfigMapFailure(e));
  }
}

export function* removeConfigMap({ payload }) {
  try {
    const { id } = payload;
    const clusterID = yield select(makeSelectClusterID());
    const namespaceID = yield select(makeSelectNamespaceID());
    yield put(removeConfigMapRequest());
    const resp = yield call(
      request,
      `${url}/${clusterID}/namespaces/${namespaceID}/configmaps/${id}`,
      {
        method: 'DELETE',
      },
    );
    yield put(removeConfigMapSuccess(clusterID, id));
    yield* loadConfigMaps();
  } catch (e) {
    yield put(removeConfigMapFailure(e));
  }
}

// Individual exports for testing
export default function* configMapsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_CONFIG_MAPS, loadConfigMaps);
  yield takeLatest(CREATE_CONFIG_MAP, createConfigMap);
  yield takeLatest(REMOVE_CONFIG_MAP, removeConfigMap);
}
