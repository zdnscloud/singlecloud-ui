import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { prefix } from './constants';

/**
 * Direct selector to the clusters duck
 */
export const selectClustersDomain = (state) => state.get(prefix);
export const selectDomain = (state) => state.get(prefix);
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
    (substate, clusters) => substate.get('list').map((id) => clusters.get(id))
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/clusters/:id/*'),
     (match) => {
       if (match && match.params) {
         return match.params.id;
       }
       return '';
     }
   );

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentID(),
    (substate, id) =>
      substate.getIn(['clusters', id]) || substate.clear()
  );

export const makeSelectCurrentCluster = () =>
  createSelector(
    selectClustersDomain,
    makeSelectCurrentID(),
    (substate, clusterID) =>
      substate.getIn(['clusters', clusterID]) || substate.clear()
  );

export const makeSelectPodLogIsOpening = () =>
  createSelector(
    selectClustersDomain,
    (state) => !!state.get('openedLog')
  );

export const makeSelectLoggingCluster = () =>
  createSelector(
    selectClustersDomain,
    (state) => state.get('openedLog')
  );

export const makeSelectOpeningLogs = () =>
  createSelector(
    selectClustersDomain,
    (state) => state.get('logs')
  );

export const makeSelectLogURL = () =>
  createSelector(
    selectClustersDomain,
    (state) =>
      `${window.location.protocol}//${window.location.hostname}:${
        window.location.port
      }/apis/ws.zcloud.cn/v1/clusters/${state.get('openedLog')}/zkelog`
  );

export const makeSelectNodeIsOpening = () =>
  createSelector(
    selectClustersDomain,
    (state) => !!state.get('openedNode')
  );

export const makeSelectNodesList = () =>
  createSelector(
    selectClustersDomain,
    (state) => state.get('nodes') || state.clear()
  );

/**
 * Default selector used by Clusters
 */
export default makeSelectClusters;
