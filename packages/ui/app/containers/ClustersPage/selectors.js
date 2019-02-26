import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clustersPage state domain
 */

const selectClustersPageDomain = state =>
  state.get('clustersPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClustersPage
 */

const makeSelectClustersPage = () =>
  createSelector(
    selectClustersPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectClustersPage;
export { selectClustersPageDomain };
