import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodesPage state domain
 */

const selectNodesPageDomain = (state) => state.get('nodesPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectClusterID = () =>
  createSelector(
    selectNodesPageDomain,
    (substate) => substate.get('clusterID'),
  );

export const makeSelectNodes = () =>
  createSelector(
    selectNodesPageDomain,
    makeSelectClusterID(),
    (substate, clusterID) => substate.getIn(['nodes', clusterID]),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectNodesPageDomain,
    (substate) => substate.get('tableList'),
  );

/**
 * Default selector used by NodesPage
 */

export const makeSelectNodesPage = () =>
  createSelector(
    selectNodesPageDomain,
    (substate) => substate,
  );

export default makeSelectNodesPage;
