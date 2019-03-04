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
export const makeSelectDeployments = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.get('deployments'),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectDeploymentsPageDomain,
    substate => substate.get('tableList'),
  );

export const makeSelectFormData = () =>
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
