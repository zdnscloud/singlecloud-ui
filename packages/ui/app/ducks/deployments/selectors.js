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
      substate.getIn(['deployments', clusterID, namespaceID]) || substate.clear()
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

/**
 * Default selector used by LoginPage
 */

const makeSelectDeploymentsDomain = () =>
  createSelector(
    selectDeploymentsDomain,
    (substate) => substate
  );

export default makeSelectDeploymentsDomain;
