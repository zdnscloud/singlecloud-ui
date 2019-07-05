import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the userQuotas duck
 */
export const selectUserQuotasDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectUserQuotas = () =>
  createSelector(
    selectUserQuotasDomain,
    makeSelectClusterID(),
    (substate, clusterID) =>
      substate.getIn(['userQuotas', clusterID]) || substate.clear()
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (ns) => ns.getIn(['links', 'userQuotas'])
  );

export const makeSelectUserQuotasList = () =>
  createSelector(
    selectUserQuotasDomain,
    makeSelectUserQuotas(),
    (substate, userQuotas) =>
      substate.get('list').map((id) => userQuotas.get(id))
  );

export const makeSelectCurrentUserQuotaID = () =>
  createSelector(
    selectUserQuotasDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectUserQuotasList(),
    (substate, clusterID, nid, ns) =>
      substate.getIn(['selectedUserQuota', clusterID]) ||
      nid ||
      ns.getIn([0, 'id']) ||
      ''
  );

export const makeSelectCurrentUserQuota = () =>
  createSelector(
    selectUserQuotasDomain,
    makeSelectClusterID(),
    makeSelectCurrentUserQuotaID(),
    (substate, clusterID, nid) =>
      substate.getIn(['userQuotas', clusterID, nid]) || substate.clear()
  );

/**
 * Default selector used by UserQuotas
 */
export default makeSelectUserQuotas;
