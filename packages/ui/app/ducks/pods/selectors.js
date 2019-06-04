import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import { makeSelectCurrentNamespace } from 'ducks/namespaces/selectors';
import {
  makeSelectDeploymentID,
  makeSelectCurrentDeployment,
} from 'ducks/deployments/selectors';
import {
  makeSelectStatefulSetID,
  makeSelectCurrentStatefulSet,
} from 'ducks/statefulSets/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the pods duck
 */
const selectPodsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDeploymentID(),
    (substate, clusterID, namespaceID, deploymentID) =>
      substate.getIn(['pods', clusterID, namespaceID, deploymentID]) || substate.clear()
  );

export const makeSelectPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectPods(),
    (substate, pods) =>
      substate.get('list').map((id) => pods.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentDeployment(),
    (deploy) => deploy.getIn(['links', 'pods'])
  );

export const makeSelectSTSPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectStatefulSetID(),
    (substate, clusterID, namespaceID, statefulSetID) =>
      substate.getIn(['stsPods', clusterID, namespaceID, statefulSetID]) || substate.clear()
  );

export const makeSelectSTSPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectSTSPods(),
    (substate, pods) =>
      substate.get('list').map((id) => pods.get(id))
  );

export const makeSelectSTSURL = () =>
  createSelector(
    makeSelectCurrentStatefulSet(),
    (deploy) => deploy.getIn(['links', 'pods'])
  );

export const makeSelectPodLog = () =>
  createSelector(
    selectPodsDomain,
    (substate) => substate.get('openingPodLog')
  );

export const makeSelectPodLogIsOpening = () =>
  createSelector(
    selectPodsDomain,
    (substate) => !!substate.get('openingPodLog')
  );

export const makeSelectOpeningLogs = () =>
  createSelector(
    selectPodsDomain,
    (substate) => substate.get('openingLogs')
  );

export const makeSelectLogURL = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      `${window.location.protocol}//${window.location.hostname}:${
         window.location.port
       }/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/pods/${
         substate.getIn(['openingPodLog', 'podID'])
       }/containers/${substate.getIn(['openingPodLog', 'containerName'])}/log`
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectPodsDomain = () =>
  createSelector(
    selectPodsDomain,
    (substate) => substate
  );

export default makeSelectPodsDomain;
