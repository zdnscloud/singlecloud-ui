import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCurrentNamespace } from 'ducks/namespaces/selectors';
import {
  makeSelectCurrentID as makeSelectDeploymentID,
  makeSelectCurrent as makeSelectCurrentDeployment,
} from 'ducks/deployments/selectors';
import {
  makeSelectStatefulSetID,
  makeSelectCurrentStatefulSet,
} from 'ducks/statefulSets/selectors';
import {
  makeSelectDaemonSetID,
  makeSelectCurrentDaemonSet,
} from 'ducks/daemonSets/selectors';
import {
  makeSelectCronJobID,
  makeSelectCurrentCronJob,
} from 'ducks/cronJobs/selectors';
import { makeSelectJobID, makeSelectCurrentJob } from 'ducks/jobs/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the pods duck
 */
const selectPodsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
// deployment
export const makeSelectPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDeploymentID(),
    (substate, clusterID, namespaceID, deploymentID) =>
      substate.getIn(['pods', clusterID, namespaceID, deploymentID]) ||
      substate.clear()
  );

export const makeSelectPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectPods(),
    (substate, pods) => substate.get('list').map((id) => pods.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentDeployment(),
    (deploy) => deploy.getIn(['links', 'pods'])
  );

// stateful set
export const makeSelectSTSPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectStatefulSetID(),
    (substate, clusterID, namespaceID, statefulSetID) =>
      substate.getIn(['stsPods', clusterID, namespaceID, statefulSetID]) ||
      substate.clear()
  );

export const makeSelectSTSPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectSTSPods(),
    (substate, pods) => substate.get('stsList').map((id) => pods.get(id))
  );

export const makeSelectSTSURL = () =>
  createSelector(
    makeSelectCurrentStatefulSet(),
    (sts) => sts.getIn(['links', 'pods'])
  );

// daemon set
export const makeSelectDSPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDaemonSetID(),
    (substate, clusterID, namespaceID, daemonSetID) =>
      substate.getIn(['dsPods', clusterID, namespaceID, daemonSetID]) ||
      substate.clear()
  );

export const makeSelectDSPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectDSPods(),
    (substate, pods) => substate.get('dsList').map((id) => pods.get(id))
  );

export const makeSelectDSURL = () =>
  createSelector(
    makeSelectCurrentDaemonSet(),
    (ds) => ds.getIn(['links', 'pods'])
  );

// cron job
export const makeSelectCJPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectCronJobID(),
    (substate, clusterID, namespaceID, cronJobID) =>
      substate.getIn(['cjPods', clusterID, namespaceID, cronJobID]) ||
      substate.clear()
  );

export const makeSelectCJPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectCJPods(),
    (substate, pods) => substate.get('cjList').map((id) => pods.get(id))
  );

export const makeSelectCJURL = () =>
  createSelector(
    makeSelectCurrentCronJob(),
    (cj) => cj.getIn(['links', 'pods'])
  );

// job
export const makeSelectJOBPods = () =>
  createSelector(
    selectPodsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectJobID(),
    (substate, clusterID, namespaceID, jobID) =>
      substate.getIn(['jobPods', clusterID, namespaceID, jobID]) ||
      substate.clear()
  );

export const makeSelectJOBPodsList = () =>
  createSelector(
    selectPodsDomain,
    makeSelectJOBPods(),
    (substate, pods) => substate.get('jobList').map((id) => pods.get(id))
  );

export const makeSelectJOBURL = () =>
  createSelector(
    makeSelectCurrentJob(),
    (job) => job.getIn(['links', 'pods'])
  );

// log
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
      }/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/pods/${substate.getIn(
        ['openingPodLog', 'podID']
      )}/containers/${substate.getIn(['openingPodLog', 'containerName'])}/log`
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
