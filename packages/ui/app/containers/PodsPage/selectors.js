import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the podsPage state domain
 */

export const selectPodsPageDomain = (state) =>
  state.get('podsPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusterID = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('clusterID')
  );

export const makeSelectNamespaceID = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('namespaceID')
  );

export const makeSelectDeploymentID = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('deploymentID')
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

export const makeSelectCreateFormData = () =>
  createSelector(
    selectPodsPageDomain,
    (substate) => substate.get('createFormData')
  );

export const makeSelectFormPorts = () =>
  createSelector(
    makeSelectCreateFormData(),
    (substate) =>
      substate
        .get('containers')
        .map((ctn) =>
          ctn
            .get('exposedPorts')
            .filter((p) => typeof p.get('port') === 'number')
        )
        .flatten(true)
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
      }/apis/ws.zcloud.cn/v1/clusters/${
        clusterID
      }/namespaces/${namespaceID}/pods/${logView[0]}/containers/${logView[1]}/log`
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
