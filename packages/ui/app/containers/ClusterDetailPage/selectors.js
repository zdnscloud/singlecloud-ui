import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clusterDetailPage state domain
 */

const selectClusterDetailPageDomain = (state) =>
  state.get('clusterDetailPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusterDetail = () =>
  createSelector(
    selectClusterDetailPageDomain,
    (substate) => substate.get('clusterDetail')
  );

export const makeSelectTableList = () =>
  createSelector(
    selectClusterDetailPageDomain,
    (substate) => substate.get('tableList')
  );

/**
 * Default selector used by ClusterDetailPage
 */

export const makeSelectClusterDetailPage = () =>
  createSelector(
    selectClusterDetailPageDomain,
    (substate) => substate
  );

export default makeSelectClusterDetailPage;
