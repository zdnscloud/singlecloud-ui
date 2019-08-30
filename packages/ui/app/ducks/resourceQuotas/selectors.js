import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import {
  makeSelectCurrentID as makeSelectNamespaceID,
  makeSelectCurrentNamespace,
} from 'ducks/namespaces/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the resourceQuota duck
 */

const selectResourceQuotaDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectResourceQuota = () =>
  createSelector(
    selectResourceQuotaDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['resourcequotas', clusterID, namespaceID]) ||
      substate.clear()
  );

export const makeSelectNamespacesList = () =>
  createSelector(
    selectResourceQuotaDomain,
    makeSelectResourceQuota(),
    (substate, resourceQuota) =>
      substate.get('list').map((id) => resourceQuota.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'resourcequotas'])
  );

export const makeSelectResourceQuotaID = () =>
  createSelector(
    createMatchSelector(
      '/clusters/:cluster_id/namespaces/:namespace_id/resourceQuota'
    ),
    (match) => {
      if (match && match.params) {
        return match.params;
      }
      return '';
    }
  );

export const makeSelectCurrentResourceQuota = () =>
  createSelector(
    selectResourceQuotaDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectResourceQuotaID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['resourcequotas', clusterID, namespaceID]) ||
      substate.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectResourceQuotaDomain = () =>
  createSelector(
    selectResourceQuotaDomain,
    (substate) => substate
  );

export default makeSelectResourceQuotaDomain;
