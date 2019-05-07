import { all } from 'redux-saga/effects';

import appSaga from 'containers/App/saga';
import serviceSaga from 'containers/ServicesPage/saga';
import clusterSaga from 'containers/ClustersPage/saga';
import clusterDetailSaga from 'containers/ClusterDetailPage/saga';
import ingressSaga from 'containers/IngressesPage/saga';
import nodeSaga from 'containers/NodesPage/saga';
import namespaceSaga from 'containers/NamespacesPage/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    serviceSaga(),
    clusterSaga(),
    clusterDetailSaga(),
    ingressSaga(),
    nodeSaga(),
    namespaceSaga(),
  ]);
}
