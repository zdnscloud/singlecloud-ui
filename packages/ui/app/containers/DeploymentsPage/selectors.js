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
