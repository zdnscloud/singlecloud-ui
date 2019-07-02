import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectCurrentNamespace } from 'ducks/namespaces/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the deployments duck
 */

const selectDeploymentsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectDeployments = () =>
  createSelector(
    selectDeploymentsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['deployments', clusterID, namespaceID]) ||
      substate.clear()
  );

export const makeSelectDeploymentsList = () =>
  createSelector(
    selectDeploymentsDomain,
    makeSelectDeployments(),
    (substate, deployments) =>
      substate.get('list').map((id) => deployments.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'deployments'])
  );

export const makeSelectDeploymentID = () =>
  createSelector(
    createMatchSelector(
      '/clusters/:cluster_id/namespaces/:namespace_id/deployments/:deployment_id'
    ),
    (match) => {
      if (match && match.params) {
        return match.params.deployment_id;
      }
      return '';
    }
  );

export const makeSelectCurrentDeployment = () =>
  createSelector(
    selectDeploymentsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDeploymentID(),
    (substate, clusterID, namespaceID, deploymentID) =>
      substate.getIn(['deployments', clusterID, namespaceID, deploymentID]) ||
      substate.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectDeploymentsDomain = () =>
  createSelector(
    selectDeploymentsDomain,
    (substate) => substate
  );

export default makeSelectDeploymentsDomain;
