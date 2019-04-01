import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { createMatchSelector } from 'connected-react-router/immutable';
import { initialState } from './reducer';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from '../App/selectors';

/**
 * Direct selector to the podsPage state domain
 */

export const selectPodsPageDomain = (state) =>
  state.get('applicationDetailPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectDeploymentID = () =>
  createSelector(
    createMatchSelector(
      '/clusters/:cluster_id/namespaces/:namespace_id/applications/:deployment_id'
    ),
    (match) => {
      if (match && match.params) {
        return match.params.deployment_id;
      }
      return '';
    }
  );

export const makeSelectPods = () =>
  createSelector(
    selectPodsPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDeploymentID(),
    (substate, clusterID, namespaceID, deploymentID) =>
      substate.getIn(['pods', clusterID, namespaceID, deploymentID]) || Map()
  );

export const makeSelectTableList = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('tableList')
  );

export const makeSelectLogViewIsOpen = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => !!substate.get('logIsOpen')
  );

export const makeSelectLogViewState = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('logIsOpen') || []
  );

export const makeSelectLogs = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('logs')
  );

export const makeSelectLogsURL = () =>
  createSelector(
    selectPodsPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDeploymentID(),
    makeSelectLogViewState(),
    (substate, clusterID, namespaceID, deploymentID, logView) =>
      `${window.location.protocol}//${window.location.hostname}:${
        window.location.port
      }/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/pods/${
        logView[0]
      }/containers/${logView[1]}/log`
  );

export const makeSelectPod = (id) =>
  createSelector(
    selectPodsPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDeploymentID(),
    (substate, clusterID, namespaceID, deploymentID) =>
      substate.getIn(['pods', clusterID, namespaceID, deploymentID, id]) ||
      Map()
  );
/**
 * Default selector used by PodsPage
 */

const makeSelectPodsPage = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.toJS()
  );

export default makeSelectPodsPage;
