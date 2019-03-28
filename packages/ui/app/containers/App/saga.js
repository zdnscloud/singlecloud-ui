import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import { loadClusters } from '../ClustersPage/saga';

import {
  INIT_ACTION,
} from './constants';

export function* initialize() {
  yield* loadClusters();
}

// Individual exports for testing
export default function* applicationsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
}
