import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectClusterID } from 'ducks/app/selectors';
import { selectNamespacesDomain } from 'ducks/namespaces/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the clusters duck
 */
export const selectClustersDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectClustersDomain,
    (substate) => '/apis/zcloud.cn/v1/clusters'
  );

export const makeSelectClusters = () =>
  createSelector(
    selectClustersDomain,
    (substate) => substate.get('clusters') || substate.clear()
  );

export const makeSelectClustersList = () =>
  createSelector(
    selectClustersDomain,
    makeSelectClusters(),
    (substate, clusters) =>
      substate.get('list').map((id) => clusters.get(id))
  );

export const makeSelectCurrentCluster = () =>
  createSelector(
    selectClustersDomain,
    makeSelectClusterID(),
    (substate, clusterID) =>
      substate.getIn(['clusters', clusterID]) || substate.clear()
  );

export const makeSelectClustersAndNamespaces = () =>
  createSelector(
    selectClustersDomain,
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

/**
 * Default selector used by Clusters
 */
export default makeSelectClusters;
