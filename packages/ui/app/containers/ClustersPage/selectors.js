import { createSelector } from 'reselect';
import { makeSelectClusterID } from 'containers/App/selectors';
import { selectNamespacesDomain } from 'ducks/namespaces/selectors';

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
    (substate) => substate.get('clusters') || substate.clear()
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
    selectNamespacesDomain,
    (cstate, nsstate) =>
      cstate
        .get('clusters')
        .map((c) =>
          c.set(
            'namespaces',
            nsstate.getIn(['namespaces', c.get('id')], c.clear())
          )
        )
  );

export const makeSelectMount = () =>
  createSelector(
    selectClustersPageDomain,
    (substate) => substate.get('mount')
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
