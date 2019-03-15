import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clustersPage state domain
 */

const selectClustersPageDomain = (state) =>
  state.get('clustersPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusters = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate.get('clusters'),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate.get('tableList'),
  );

/**
 * Default selector used by ClustersPage
 */

export const makeSelectClustersPage = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate,
  );

export default makeSelectClustersPage;
