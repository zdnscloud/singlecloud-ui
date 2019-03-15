import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the deploymentsPage state domain
 */

export const selectDeploymentsPageDomain = (state) =>
  state.get('deploymentsPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusterID = () =>
  createSelector(
    selectDeploymentsPageDomain,
    (substate) => substate.get('clusterID'),
  );

export const makeSelectNamespaceID = () =>
  createSelector(
    selectDeploymentsPageDomain,
    (substate) => substate.get('namespaceID'),
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
    (substate) => substate.get('tableList'),
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectDeploymentsPageDomain,
    (substate) => substate.get('createFormData'),
  );

export const makeSelectFormPorts = () =>
  createSelector(
    makeSelectCreateFormData(),
    (substate) =>
      substate
        .get('containers')
        .map((ctn) =>
          ctn
            .get('exposedPorts')
            .filter((p) => typeof p.get('port') === 'number'),
        )
        .flatten(true),
  );

/**
 * Default selector used by DeploymentsPage
 */

const makeSelectDeploymentsPage = () =>
  createSelector(
    selectDeploymentsPageDomain,
    (substate) => substate.toJS(),
  );

export default makeSelectDeploymentsPage;
