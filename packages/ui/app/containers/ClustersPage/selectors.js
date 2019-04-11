import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { makeSelectClusterID } from '../App/selectors';

/**
 * Direct selector to the clustersPage state domain
 */

const selectClustersPageDomain = (state) =>
  state.get('clustersPage', initialState);

const selectNamespacesPageDomain = (state) =>
  state.get('namespacesPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusters = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate.get('clusters')
  );

export const makeSelectCurrentCluster = () =>
  createSelector(
    selectClustersPageDomain,
    makeSelectClusterID(),
    (substate, id) => substate.getIn(['clusters', id]) || substate.clear()
  );

export const makeSelectTableList = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate.get('tableList')
  );

export const makeSelectClustersAndNamespaces = () =>
  createSelector(
    selectClustersPageDomain,
    selectNamespacesPageDomain,
    (cstate, nsstate) =>
      cstate.get('clusters').map((c) => c.set('namespaces', nsstate.getIn(['namespaces', c.get('id')], c.clear())))
  );

/**
 * Default selector used by ClustersPage
 */

export const makeSelectClustersPage = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate
  );

export default makeSelectClustersPage;
