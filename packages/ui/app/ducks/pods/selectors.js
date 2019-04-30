import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import { makeSelectCurrentNamespace } from 'containers/NamespacesPage/selectors';
import {
  makeSelectDeploymentID,
  makeSelectCurrentDeployment,
} from 'ducks/deployments/selectors';

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

/**
 * Default selector used by LoginPage
 */

const makeSelectPodsDomain = () =>
  createSelector(
    selectPodsDomain,
    (substate) => substate
  );

export default makeSelectPodsDomain;
