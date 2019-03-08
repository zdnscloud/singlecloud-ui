import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the deploymentsPage state domain
 */

const selectDeploymentsPageDomain = state =>
  state.get('deploymentsPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusterID = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.get('clusterID'),
  );

export const makeSelectNamespaceID = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.get('namespaceID'),
  );

export const makeSelectDeployments = () =>
  createSelector(
    selectDeploymentsPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['deployments', clusterID, namespaceID]) || Map(),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.get('tableList'),
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.get('createFormData'),
  );

/**
 * Default selector used by DeploymentsPage
 */

const makeSelectDeploymentsPage = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectDeploymentsPage;
export { selectDeploymentsPageDomain };
